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
                        "img": "logo512.png"
                    },
                    {
                        "lat": 54.182183767826714,
                        "lng": 19.921526987879226,
                        "time": "2022-01-28T05:44:46.088Z",
                        "rarity": "gold",
                        "img": "logo192.png"
                    },
                    {
                        "lat": 54.425776380634495,
                        "lng": 23.525042612879226,
                        "time": "2022-01-28T05:44:47.184Z",
                        "rarity": "silver",
                        "img": "example.jpg"
                    },
                    {
                        "lat": 52.425776380634495,
                        "lng": 23.525042612879226,
                        "time": "2022-01-28T05:44:47.114Z",
                        "rarity": "bronze",
                        "img": "test2.jpg"
                    },
                    {
                        "lat": 50.425776380634495,
                        "lng": 23.525042612879226,
                        "time": "2022-01-28T05:44:47.182Z",
                        "rarity": "silver",
                        "img": "logo512.png"
                    },
                ]
            )
        }, 2000)
    })
    return result
}

export default getMarkers