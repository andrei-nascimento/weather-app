
export default async function getCurrentWeather(locationCoords) {
    
    const axios = require('axios')

    const lat = locationCoords.latitude

    const lon = locationCoords.longitude

    var results = []

    await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=724f177a2e52ca169b6e97b6f24553ff`)
        .then(function (response){
            
            const data = response.data
            const locationName = (data.sys.country + ', ' + data.name)
            const tempMin = data.main.temp_min
            const tempMax = data.main.temp_max
            const wind = data.wind.speed
            const humidity = data.main.humidity
            const currentTemp = data.main.temp

            results = [currentTemp, tempMin, tempMax, locationName, wind, humidity]

        })
        .catch((error) => {
            console.log(error)
        })

    return results
}