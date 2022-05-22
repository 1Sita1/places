const request = require("supertest")
const createApp = require("../../../app")

jest.mock("../../../helpers/dbhelper/dbhelper")
const mockedDb = require("../../../helpers/dbhelper/dbhelper")
const app = createApp(mockedDb)


beforeEach(() => {
    jest.clearAllMocks()
})

describe("User validation", () => {
    it("Rejects wrong username or password", async () => {
        const response = await request(app)
            .post("/api/login")
            .send({
                username: "test",
                password: "qwerty1234"
            })
        expect(response.status).toBe(400) // TODO
    }) 

    it("Rejects wrong email or password", async () => {
        const response = await request(app)
            .post("/api/login")
            .send({
                email: "testbebeboba@gmail.com",
                password: "qwerty1234"
            })
        expect(response.status).toBe(400) // TODO
    }) 

    it("Accepts right username and passowrd", async () => {
        mockedDb.getUser = jest.fn(() => Promise.resolve({
            _id: 123456, 
            username: "test",
            password: "$2a$10$9MqVBcXGJApLH4ZUmHR/..i8wMoLl.yFpYxyYQSlkp33qbEfbszG6"
        }))
        const response = await request(app)
            .post("/api/login")
            .send({
                username: "test",
                password: "supertest"
            })
        expect(response.status).toBe(200)
    })

    it("Accepts right email and passowrd", async () => {
        mockedDb.getUser = jest.fn(() => Promise.resolve({
            _id: 123456, 
            username: "test",
            password: "$2a$10$9MqVBcXGJApLH4ZUmHR/..i8wMoLl.yFpYxyYQSlkp33qbEfbszG6"
        }))
        const response = await request(app)
            .post("/api/login")
            .send({
                email: "test@gmail.com",
                password: "supertest"
            })
        expect(response.status).toBe(200)
    })
});
