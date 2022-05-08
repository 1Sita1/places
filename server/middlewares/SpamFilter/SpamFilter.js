module.exports = (database) => {
    return (req, res, next) => {
        const user = res.locals.user
        const timeout = 600

        database.getSuggestedPlaces({created: {
            by: user.name
        }})
        .then(results => {
            let failed = false
            results.forEach(place => { 
                if(Date.now() / 1000 - place.created.at <= timeout) failed = true
            })
            failed ? res.status(400).send({
                success: false,
                message: `New suggestion allowed every ${timeout / 60} minutes`
            }) : next()
        })
    }
}