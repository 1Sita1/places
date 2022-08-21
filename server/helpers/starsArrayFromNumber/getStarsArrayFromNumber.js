module.exports = function(value) {
    const stars = [
        value >= 1, 
        value > 1.5,
        value > 2.5,
        value > 3.5,
        value > 4.5,
    ]

    return stars
}