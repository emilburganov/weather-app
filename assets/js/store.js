const store = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : {
    url: 'https://weatherapi-com.p.rapidapi.com/current.json?',
    weather: {
        city: 'Kazan',
        temp: 0,
        time: '2023-01-01 00:00',
        isDay: 1,
        description: '',
        properties: {
            cloudcover: {},
            humidity: {},
            windSpeed: {},
            pressure: {},
            uvIndex: {},
            visibility: {},
        },
    },
}

export default store
