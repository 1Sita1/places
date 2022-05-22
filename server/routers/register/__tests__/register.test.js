const request = require("supertest")
const createApp = require("../../../app.js")

jest.mock("../../../helpers/dbhelper/dbhelper")
const mockedDb = require("../../../helpers/dbhelper/dbhelper")
const app = createApp(mockedDb)


beforeEach(() => {
    jest.clearAllMocks()
})

describe('Register tests', () => {
    describe('Email validation', () => {
        it("Rejects invalid email 1", async () => {
            mockedDb.createUser.mockImplementationOnce(user => user)

            const response = await request(app)
                .post('/api/register')
                .send({
                    email: "test@gmail",
                    username: "test",
                    password: "test1234"
                })
            expect(response.body.success).toBe(false)
            expect(mockedDb.createUser).toHaveBeenCalledTimes(0)
        })

        it("Rejects invalid email 2", async () => {
            const response = await request(app)
                .post('/api/register')
                .send({
                    email: "test",
                    username: "test",
                    password: "test1234"
                })
            expect(response.body.success).toBe(false)
            expect(mockedDb.createUser).toHaveBeenCalledTimes(0)
        })
        

        it("Rejects invalid email 3", async () => {
            const response = await request(app)
                .post('/api/register')
                .send({
                    email: "",
                    username: "test",
                    password: "test1234"
                })
            expect(response.body.success).toBe(false)
            expect(mockedDb.createUser).toHaveBeenCalledTimes(0)
        })
    })

    describe('Password validation', () => {
        it("Rejects short password", async () => {
            const response = await request(app)
                .post('/api/register')
                .send({
                    email: "test@gmail.com",
                    username: "test",
                    password: ""
                })
            expect(response.body.success).toBe(false)
            expect(mockedDb.createUser).toHaveBeenCalledTimes(0)
        })
    })

    describe("When user already exists", () => {
        it("fails correctly", async () => {
            mockedDb.getUser.mockReturnValueOnce(Promise.resolve({
                email: "test@gmail.com",
                username: "test",
                password: "XXX"
            }))


            const response = await request(app)
                .post('/api/register')
                .send({
                    email: "test@gmail.com",
                    username: "test",
                    password: "test1234"
                })
            expect(response.body.success).toBe(false)
            expect(mockedDb.createUser).toHaveBeenCalledTimes(0)
        })
    })

    describe("When everything is good", () => {
        it("Acceptes correct data", async () => {
            mockedDb.getUser.mockReturnValueOnce(Promise.resolve(null))
            
            const response = await request(app)
                .post('/api/register')
                .send({
                    email: "test@gmail.com",
                    username: "test",
                    password: "test1234"
                })
            expect(response.body.success).toBe(true)
            expect(mockedDb.createUser).toHaveBeenCalledTimes(1)
        })
    })
})
