{
    /* Getting our dom elements */
    const $cityName = document.getElementById('cityName')
    const $currentDate = document.getElementById('currentDate')
    const $currentHour = document.getElementById('currentHour')
    const $currentTemp = document.getElementById('currentTemp')
    const $currentStatus = document.getElementById('currentStatus')
    const $currentSunUp = document.getElementById('currentSunUp')
    const $currentSunDown = document.getElementById('currentSunDown')
    const $currentWindDirection = document.getElementById('currentWindDirection')
    const $currentWindSpeed = document.getElementById('currentWindSpeed')

    const weatherData = {
        "cityName": "unknown",
        "date":{
            "year": "yyyy",
            "month": "mm",
            "day": "dd",
            "hour": "uu",
            "minute": "mm",
        },
        "temp": "unknown",
        "status": "unknown",
        "sun": {
            "up": "unknown",
            "down": "unknown",
        },
        "wind": {
            "direction": 90,
            "speed": "unknown"
        },
    }
    const updateView = () => {
        $cityName.textContent = weatherData.cityName
        $currentDate.textContent = `${weatherData.day} ${weatherData.month} ${weatherData.year}`
        $currentHour.textContent = `${weatherData.hour}u${weatherData.minute}`
        $currentTemp.textContent = weatherData.temp
        $currentStatus.textContent = weatherData.status
        $currentSunUp.textContent = weatherData.sun.up
        $currentSunDown.textContent = weatherData.sun.down
        $currentWindDirection.style.transform = `rotate(${weatherData.wind.direction}deg)`
        $currentWindSpeed.textContent = weatherData.wind.speed
    }

    updateView();
}