function sanitizeUser(user) {
    const sanitizedUser = JSON.parse(JSON.stringify(user))

    sanitizedUser.id = sanitizedUser._id
    delete sanitizedUser.password
    delete sanitizedUser._id
    delete sanitizedUser.__v

    return sanitizedUser
}

module.exports = sanitizeUser