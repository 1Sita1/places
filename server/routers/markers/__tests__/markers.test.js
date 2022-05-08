const request = require("supertest")
const createApp = require("../../../app")
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config()
const mockedDb = require("../../../helpers/dbhelper/dbhelper")
jest.mock("../../../helpers/dbhelper/dbhelper")

const app = createApp(mockedDb)


beforeEach(() => {
    jest.clearAllMocks()
})

describe("Getting markers", () => {
    it("Sends all markers", (done) => {
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
        request(app)
            .get("/api/markers?type=golden")
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body[0].type).toBe("golden")
                done()
            })
            .catch(err => done(err))
    })

    it("Sends silver markers", (done) => {
        request(app)
            .get("/api/markers?type=silver")
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body[0].type).toBe("silver")
                done()
            })
            .catch(err => done(err))
    })

    it("Sends bronze markers", (done) => {
        request(app)
            .get("/api/markers?type=bronze")
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body[0].type).toBe("bronze")
                done()
            })
            .catch(err => done(err))
    })
})


describe("Adding a marker", () => {
    it("Returns created marker", async () => {
        const response = await request(app)
            .post("/api/markers")
            .set("token", jwt.sign({ name: "test" }, process.env.JWT_KEY))
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
});
