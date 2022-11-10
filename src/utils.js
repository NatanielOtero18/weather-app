
function formatDate(element, city) {
    let offset = new Date().getTimezoneOffset() * 60;
    let clean = element.dt + offset; 
    let date = new Date((clean + city.timezone) * 1000);
    let formatedTime = date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0');
    return formatedTime;

}

function formatIcon(element) {
    const icon = element.weather[0].icon.slice(0, 2);
    const pod = element.sys.pod; 
    return icon + pod;
}


/**
 * 
 * @param {*} array : array to clean and copy
 * @param {*} value : criteria of wich elements get copied to the new array
 */
function cleanArray(array, value, today, timezone) {
    let result = [];
    const actual = new Date((today + timezone) * 1000);
    const actualDay = actual.getDate() + "/" + actual.getMonth();



    const filteredToday = array.filter((element) => {
        const date = new Date((element.dt + timezone) * 1000);
        const dateDay = date.getDate() + "/" + date.getMonth();
        return dateDay !== actualDay;
             
        
    })


    let date = filteredToday[0].dt_txt.slice(5, 10);
    let dayForecast = splitArray(filteredToday, date);
    console.log(dayForecast);
    result = result.concat(getForecastItem(dayForecast));
    for (let i = 0; i < filteredToday.length; i++) {
        if (date !== filteredToday[i].dt_txt.slice(5, 10)) {
            date = filteredToday[i].dt_txt.slice(5, 10);
            let dayForecast = splitArray(filteredToday, date);
            result = result.concat(getForecastItem(dayForecast));
        }
    }


    return result;

}

const splitArray = (array, criteria) => {
    const splitedArray = array.filter(element => element.dt_txt.slice(5, 10) === criteria)
    return splitedArray;
}

const getForecastItem = (array) => {
    let forecastItem;
    const forecastElement = (id, date, maxTemp, minTemp, avgClim) => {
        return {
            id: id,
            date: date,
            maxTemp: maxTemp,
            minTemp: minTemp,
            avgClim: avgClim
        }
    }
    forecastItem = forecastElement(array[0].dt, array[0].dt_txt, array[0].main.temp, array[0].main.temp, array[0].weather[0].icon.slice(0, 2))
    let m = 0;
    let mf = 1;
    for (let i = 0; i < array.length; i++) {

        if (array[i].main.temp > forecastItem.maxTemp) {
            forecastItem.maxTemp = array[i].main.temp;
        }
        if (array[i].main.temp < forecastItem.minTemp) {
            forecastItem.minTemp = array[i].main.temp;
        }
        for (let j = i; j < array.length; j++) {

            if (array[i].weather[0].icon.slice(0, 2) === forecastElement.avgClim)
                m++;
            if (mf < m) {
                mf = m;
                forecastElement.avgClim = array[i].weather[0].icon.slice(0, 2);
            }

        }
        m = 0;
    }
    return forecastItem;
}


export { cleanArray, formatDate, formatIcon }