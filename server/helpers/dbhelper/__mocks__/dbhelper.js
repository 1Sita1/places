module.exports = {
    createUser: jest.fn(() => Promise.resolve()),
    getUser: jest.fn(() => Promise.resolve()),
    suggestPlace: jest.fn(() => Promise.resolve()),
    getPlaces: jest.fn((params) => {
        const place = {
            type: params.type
        }
        return Promise.resolve(new Array(10).fill(place))
    }),
    getSuggestedPlaces: jest.fn(() => {
        const place = {
            _id: 123456,
            lat: 54,
            lng: 21,
            img: "TEST",
            header: "test",
            body: "test",
            created: {
                by: "me",
                at: 1652010127
            }
        }
        return Promise.resolve(new Array(10).fill(place))
    }),
    rejectSuggestion: jest.fn(() => Promise.resolve()),
    acceptSuggestion: jest.fn(() => Promise.resolve()),
}