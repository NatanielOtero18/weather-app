
const key = "a852e3e20314ee971cc748da65b4f9fc";

async function GetWeatherData(lat, lon) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`, {
            mode: 'cors'
        });
        let weatherData = await response.json();       
        return weatherData;       
    } catch (error) {
        console.log(error);
    }
}

async function SearchLocation(city) {
    try {
        let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`, {
            mode: 'cors'
        });
        let GeoData = await response.json();
        return GeoData;
    } catch (error) {
        console.log(error);
    }
}

async function GetWeatherDataFiveDays(lat, lon) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`, {
            mode: 'cors'
        });
        let weatherForecast = await response.json();
        return weatherForecast;

    } catch (error) {
        console.log(error);
    }
}



export { GetWeatherData, SearchLocation, GetWeatherDataFiveDays }