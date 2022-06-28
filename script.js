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
    const $errorLocationNotFound = document.getElementById('locationNotFound')

    const iceLollyElements = [
        document.querySelector('.purple'),
        document.querySelector('.green'),
        document.querySelector('.red'),
        document.querySelector('.stick')
    ]

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
        $cityName.value = weatherData.cityName
        $currentDate.textContent = `${weatherData.date.getDay()} ${monthName(weatherData.date.getMonth())} ${1900+weatherData.date.getYear()}`
        $currentHour.textContent = `${weatherData.date.getHours()}u${weatherData.date.getMinutes()}`
        $currentTemp.textContent = weatherData.temp
        $currentStatus.textContent = weatherData.status
        $currentSunUp.textContent = weatherData.sun.up
        $currentSunDown.textContent = weatherData.sun.down
        $currentWindDirection.style.transform = `rotate(${weatherData.wind.direction}deg)`
        $currentWindSpeed.textContent = weatherData.wind.speed
        let partsHidden = Math.floor(weatherData.temp / 15)
        hideLollyParts(partsHidden)
    }

    const hideLollyParts = partsHidden => {
        for(i = 0; i < iceLollyElements.length; i++){
            if(i < partsHidden){
                iceLollyElements[i].classList.add("hidden")
            }else{
                iceLollyElements[i].classList.remove("hidden")
            }
        }
    }

    const monthName = new Intl.DateTimeFormat("EN-UK", { month: "long" }).format;

    const convertKelvinToCelcius = kelvin => {
        return kelvin - 273.15
    }

    const timestampToHHuMM = timestamp => {
        const pad = time => (time<10) ? '0' + time : time;
        let date = new Date(timestamp);
        return `${pad(date.getHours())}u${pad(date.getMinutes())}`
    }

    const handleAPIData = apiData => {
        console.log(apiData)
        if(apiData["cod"] != undefined && apiData["cod"] == '404'){
            $errorLocationNotFound.classList.remove('hidden')
            return;
        }
        $errorLocationNotFound.classList.add('hidden')

        weatherData.cityName = apiData.name
        weatherData.temp = Math.round(convertKelvinToCelcius(apiData.main.temp))
        weatherData.status = apiData.weather[0].description
        weatherData.sun.up = timestampToHHuMM(apiData.sys.sunrise)
        weatherData.sun.down = timestampToHHuMM(apiData.sys.sunset)
        weatherData.wind.direction = apiData.wind.deg
        weatherData.wind.speed = apiData.wind.speed
    }

    const handleClickUpdateLocation = () =>{
        updateData($cityName.value)
    }

    const updateData = async (location = "gent") => {
        weatherData.date = new Date()
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=64e7b66076bcafc8bd1808e4edf08fd8`).then(r => r.json()).then(answer => {handleAPIData(answer)})
        updateView();
    }

    document.getElementById("updateLocation").addEventListener('click', handleClickUpdateLocation)
    updateData()
}