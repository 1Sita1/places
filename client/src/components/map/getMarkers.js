function getMarkers() {
    let result = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                [
                    {
                        "lat": 54.883376403267576,
                        "lng": 20.998187144129226,
                        "time": "2022-01-28T05:44:45.785Z",
                        "rarity": "bronze",
                        "rating" : {
                            stars: [true, true, true, false, false],
                            votes: 1927
                        },
                        "img": "placeImg/effel.jpg"
                    },
                    {
                        "lat": 54.182183767826714,
                        "lng": 19.921526987879226,
                        "time": "2022-01-28T05:44:46.088Z",
                        "rarity": "gold",
                        "rating" : {
                            stars: [true, true, true, true, false],
                            votes: 96215
                        },
                        "img": "placeImg/leipzig.jpg"
                    },
                    {
                        "lat": 54.425776380634495,
                        "lng": 23.525042612879226,
                        "time": "2022-01-28T05:44:47.184Z",
                        "rarity": "silver",
                        "rating" : {
                            stars: [true, true, false, false, false],
                            votes: 1
                        },
                        "img": "placeImg/example.jpg"
                    },
                    {
                        "lat": 52.425776380634495,
                        "lng": 23.525042612879226,
                        "time": "2022-01-28T05:44:47.114Z",
                        "rarity": "bronze",
                        "rating" : {
                            stars: [true, false, false, false, false],
                            votes: 178
                        },
                        "img": "placeImg/test2.jpg"
                    },
                    {
                        "lat": 50.425776380634495,
                        "lng": 23.525042612879226,
                        "time": "2022-01-28T05:44:47.182Z",
                        "rarity": "silver",
                        "rating" : {
                            stars: [true, true, true, true, true],
                            votes: 971
                        },
                        "img": "placeImg/brand.jpg"
                    },
                ]
            )
        }, 2000)
    })
    return result
}

export default getMarkers