const request = require("supertest")
const createApp = require("../../../app")
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config()

jest.mock("../../../helpers/dbhelper/dbhelper")
const mockedDb = require("../../../helpers/dbhelper/dbhelper")

const app = createApp(mockedDb)

let token = null
let fakeToken = null

beforeAll(() => {
    token = jwt.sign({ name: test }, process.env.JWT_KEY)
    fakeToken = jwt.sign({ name: test }, "AWdawdwadoijawpodIJWAJdoajwopj")
})


function getTestMarkersArray(rarity) {
    return new Array(10).fill({ 
        lat: 5,
        lng: 5,
        img: "Test",
        rarity: rarity,
        rating: {
            stars: 4,
            avg: 4.4,
            votes: 100
        },
        header: "Test",
        body: "Test",
        created: {
            by: "Test",
            date: Date.now() / 1000 - 90000,
        }
    })
}


beforeEach(() => {
    jest.clearAllMocks()
})

describe("Getting markers", () => {
    it("Sends all markers", (done) => {
        const testMarkers = getTestMarkersArray("bronze")
        mockedDb.getPlaces.mockReturnValueOnce(Promise.resolve(testMarkers))

        request(app)
            .get("/api/markers")
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done()
            })
            .catch(err => done(err))
    })

    it("Sends golden markers", (done) => {
        const testMarkers = getTestMarkersArray("golden")
        mockedDb.getPlaces.mockReturnValueOnce(Promise.resolve(testMarkers))

        request(app)
            .get("/api/markers?type=golden")
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body[0].rarity).toBe("golden")
                done()
            })
            .catch(err => done(err))
    })

    it("Sends silver markers", (done) => {
        const testMarkers = getTestMarkersArray("silver")
        mockedDb.getPlaces.mockReturnValueOnce(Promise.resolve(testMarkers))

        request(app)
            .get("/api/markers?type=silver")
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body[0].rarity).toBe("silver")
                done()
            })
            .catch(err => done(err))
    })

    it("Sends bronze markers", (done) => {
        const testMarkers = getTestMarkersArray("bronze")
        mockedDb.getPlaces.mockReturnValueOnce(Promise.resolve(testMarkers))

        request(app)
            .get("/api/markers?type=bronze")
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body[0].rarity).toBe("bronze")
                done()
            })
            .catch(err => done(err))
    })
})


describe("Adding a marker", () => {
    it("Returns created marker", async () => {
        mockedDb.suggestPlace.mockReturnValueOnce(Promise.resolve({
            marker: {
                lat: 54,
                lng: 21,
                img: "TEST",
                header: "test",
                body: "test"
            }
        }))

        mockedDb.getSuggestedPlaces.mockReturnValueOnce(Promise.resolve([
            {
                lat: 54,
                lng: 21,
                img: "TEST",
                header: "test",
                body: "test",
                created: {
                    at: 1652607324
                }
            }
        ]))

        const response = await request(app)
            .post("/api/markers")
            .set('Cookie', "token=" + jwt.sign({ name: "test" }, process.env.JWT_KEY))
            .send({
                marker: {
                    lat: 54,
                    lng: 21,
                    img: "TEST",
                    header: "test",
                    body: "test"
                }
            })
        expect(response.status).toBe(201)
    })
})

describe("Rating place", () => {
    it("Accept authorized request", async () => {
        mockedDb.getPlaces.mockReturnValueOnce(Promise.resolve([{
            _id: 1234,
            rating: {
                votes: 5,
                votes_value: 20,
                avg: 4
            }
        }]))

        mockedDb.getUser.mockReturnValueOnce(Promise.resolve({
            votes: []
        }))

        const response = await request(app)
            .put("/api/markers?id=1234&vote=4")
            .set('Cookie', "token=" + jwt.sign({ name: "test" }, process.env.JWT_KEY))
        expect(response.status).toBe(200)
    })

    it("Declines unauthorized request 1", async () => {
        const response = await request(app)
            .put("/api/markers?id=1234&vote=4")
            .set('Cookie', "token=" + fakeToken)
        expect(response.status).toBe(403)
    })

    it("Declines unauthorized request 2", async () => {
        const response = await request(app)
            .put("/api/markers?id=1234&vote=4")
            .set('Cookie', "token=")
        expect(response.status).toBe(403)
    })

    it("Declines unauthorized request 3", async () => {
        const response = await request(app)
            .put("/api/markers?id=1234&vote=4")
            .set('Cookie', "")
        expect(response.status).toBe(403)
    })


    it("Not allowing to dupe votes", async () => {
        mockedDb.getPlaces.mockReturnValueOnce(Promise.resolve([{
            _id: 1234,
            rating: {
                votes: 5,
                votes_value: 20,
                avg: 4
            }
        }]))

        mockedDb.getUser.mockReturnValueOnce(Promise.resolve({
            votes: [{
                _id: 1234,
                vote: 3,
                at: Date.now() / 1000
            }]
        }))

        const response = await request(app)
            .put("/api/markers?id=1234&vote=4")
            .set('Cookie', "token=" + token)
        expect(response.status).toBe(200)
        expect(response.body.isFirstTime).toBe(false)
    })

    it("Rejects invalid vote", async () => {
        const response = await request(app)
            .put("/api/markers?id=1234&vote=100")
            .set('Cookie', "token=" + token)
        expect(response.status).toBe(400)
    })

    it("Saves vote", async () => {
        mockedDb.getPlaces.mockReturnValueOnce(Promise.resolve([{
            _id: 1234,
            rating: {
                votes: 5,
                votes_value: 20,
                avg: 4
            }
        }]))

        mockedDb.getUser.mockReturnValueOnce(Promise.resolve({
            votes: []
        }))

        const response = await request(app)
            .put("/api/markers?id=1234&vote=4")
            .set('Cookie', "token=" + token)
        expect(response.status).toBe(200)
        expect(response.body.isFirstTime).toBe(true)
    })
})