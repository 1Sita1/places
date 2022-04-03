

export default (login, password) => {
    return new Promise((resolve, reject) => {
        if (login == "test" && password == "123") setTimeout(resolve, 1000)
        else setTimeout(reject, 1000)
    })
}