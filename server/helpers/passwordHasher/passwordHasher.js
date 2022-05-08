const bcrypt = require("bcrypt")

module.exports = {
    hash: async (password) => {
        const salt = await bcrypt.genSalt(10)
        const result = await bcrypt.hash(password, salt)
        return result
    },

    compare: async (string, hashed) => {
        const result = await bcrypt.compare(string, hashed)
        return result
    } 
}