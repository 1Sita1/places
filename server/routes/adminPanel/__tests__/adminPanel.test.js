const request = require("supertest")
const createApp = require("../../../app")
const jwt = require("jsonwebtoken")
jest.mock("../../../helpers/dbhelper/dbhelper")
const mockedDb = require("../../../helpers/dbhelper/dbhelper")
const dotenv = require('dotenv')
dotenv.config()

const app = createApp(mockedDb)
let token = null
let fakeToken = null
let adminToken = null

beforeAll(() => {
    adminToken = jwt.sign({ name: process.env.ADMIN_NAME, admin: true }, process.env.JWT_KEY)
    token = jwt.sign({ name: process.env.ADMIN_NAME }, process.env.JWT_KEY)
    fakeToken = jwt.sign({ name: process.env.ADMIN_NAME }, "AWdawdwadoijawpodIJWAJdoajwopj")
})

beforeEach(() => {
    //jest.clearAllMocks()
})

describe("Getting suggested markers", () => {
    it("Accepts admin", (done) => {
        mockedDb.getSuggestedPlaces.mockReturnValueOnce(Promise.resolve(
            new Array(10).fill({
                lat: 54,
                lng: 21,
                img: "TEST",
                header: "test",
                body: "test",
            })
        ))

        request(app)
            .get("/api/admin/suggestedplaces") 
            .set("Cookie", "token=" + adminToken)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.success).toBe(true)
                done()
            })
            .catch(err => done(err))
    })

    it("Rejects non-admin", (done) => {
        request(app)
            .get("/api/admin/suggestedplaces")
            .set("Cookie", "token=" + token)
            .expect(403)
            .then(response => {
                done()
            })
            .catch(err => done(err))
    })
})

describe("Deleting marker", () => {
    it("Accepts admin", (done) => {
        mockedDb.rejectSuggestion.mockReturnValueOnce(Promise.resolve({
            lat: 54,
            lng: 21,
            img: "TEST",
            header: "test",
            body: "test",
        }))

        request(app)
        .delete("/api/admin/suggestedplaces?id=12345") 
        .set("Cookie", "token=" + adminToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body.success).toBe(true)
            done()
        })
        .catch(err => done(err))
    })

    it("Rejects non-admin", (done) => {
        request(app)
        .delete("/api/admin/suggestedplaces?id=12345") 
        .set("Cookie", "token=" + token)
        .expect(403)
        .then(response => {
            done()
        })
        .catch(err => done(err))
    })
})

describe("Approving marker", () => {
    it("Rejects non-admin", (done) => {
        request(app)
        .put("/api/admin/suggestedplaces?id=12345&rarity=bronze") 
        .set("Cookie", "token=" + fakeToken)
        .expect(403)
        .then(response => {
            done()
        })
        .catch(err => done(err))
    })
})



