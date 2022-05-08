const request = require("supertest")
const createApp = require("../../../app")
const jwt = require("jsonwebtoken")
const mockedDb = require("../../../helpers/dbhelper/dbhelper")
jest.mock("../../../helpers/dbhelper/dbhelper")
const dotenv = require('dotenv')
dotenv.config()

const app = createApp(mockedDb)
let token = null
let fakeToken = null

beforeAll(() => {
    token = jwt.sign({ name: process.env.ADMIN_NAME }, process.env.JWT_KEY)
    fakeToken = jwt.sign({ name: process.env.ADMIN_NAME }, "AWdawdwadoijawpodIJWAJdoajwopj")
})

beforeEach(() => {
    //jest.clearAllMocks()
})

describe("Getting markers", () => {
    it("Accepts admin", (done) => {
        request(app)
            .get("/api/admin/suggestedplaces") 
            .set("token", token)
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
            .set("token", fakeToken)
            .expect(403)
            .then(response => {
                done()
            })
            .catch(err => done(err))
    })
})

describe("Deleting marker", () => {
    it("Accepts admin", (done) => {
        request(app)
        .delete("/api/admin/suggestedplaces?id=12345") 
        .set("token", token)
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
        .set("token", fakeToken)
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
        .set("token", fakeToken)
        .expect(403)
        .then(response => {
            done()
        })
        .catch(err => done(err))
    })
})



