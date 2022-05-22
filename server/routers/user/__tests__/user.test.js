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

describe("Getting userdata", () => {
    it("Declines unauthorized request", async () => {
        const response = await request(app)
            .get("/api/user")
            .set("Cookie", "token=" + fakeToken)
        expect(response.status).toBe(403)
    })

    it("Sends user data", async () => {
        mockedDb.getUser.mockReturnValueOnce(Promise.resolve({ name: "test" }))

        const response = await request(app)
            .get("/api/user")
            .set("Cookie", "token=" + token)
        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.user.name).toBe("test")
    })
})


describe("Getting favorite places", () => {
    it("Declines unauthorized request", async () => {
        const response = await request(app)
            .get("/api/user/favorites")
            .set("Cookie", "token=" + fakeToken)
        expect(response.status).toBe(403)
    })

    it("Sends user's favorite places", async () => {
        mockedDb.getUser.mockReturnValueOnce(Promise.resolve({
            favorites: [{}, {}, {}, {}]
        }))

        const response = await request(app)
            .get("/api/user/favorites")
            .set("Cookie", "token=" + token)
        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.favorites).toBeInstanceOf(Array)
    })
})

describe("Adding new favorite place", () => {
    it("Declines unauthorized request", async () => {
        const response = await request(app)
            .post("/api/user/favorites")
            .set("Cookie", "token=" + fakeToken)
        expect(response.status).toBe(403)
    })

    it("Adds a new favorite place", async () => {
        mockedDb.getUser.mockReturnValueOnce(Promise.resolve({
            favorites: [{}, {}, {}, {}]
        }))

        const favorite = {
            _id: 123123,
            header: "mene töihin vittu saatana",
        }
        mockedDb.getPlace.mockImplementationOnce(({ _id }) => _id == favorite._id ? favorite : null)

        mockedDb.saveUser.mockImplementationOnce((user) => Promise.resolve(user))

        const response = await request(app)
            .post("/api/user/favorites")
            .set("Cookie", "token=" + token)
            .send({
                _id: 123123 
            })
        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.favorites).toContainEqual(favorite)
    })
})

describe("Deleting a favorite place", () => {
    it("Declines unauthorized request", async () => {
        const response = await request(app)
            .delete("/api/user/favorites/123123")
            .set("Cookie", "token=" + fakeToken)
        expect(response.status).toBe(403)
    })

    it("Deletes favorite place", async () => {
        mockedDb.getUser.mockReturnValueOnce(Promise.resolve({
            favorites: [{}, { _id: 123123 }, {}, {}]
        }))

        mockedDb.saveUser.mockImplementationOnce((user) => Promise.resolve(user))

        const response = await request(app)
            .delete("/api/user/favorites/123123")
            .set("Cookie", "token=" + token)
        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
    })
})
