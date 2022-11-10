import React, { useState, useEffect } from 'react'


import Navbar from './components/navbar/Navbar';
import RightNow from './components/rightNow/rightNow';
import LoadingSpinner from './components/loadingSpinner/loadingSpinner';
import { GetWeatherData, SearchLocation, GetWeatherDataFiveDays } from './Wheater';
import { cleanArray } from './utils';




import styles from './App.module.css';
import Forecast from './components/forecast/Forecast';




const App = props => {

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false)
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLon, setCurrentLon] = useState(0);
  const [weatherHours, setWeatherHours] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [currentWeather, setCurrentWheater] = useState({});
  const [forecastCity, setForecastCity] = useState({});


  useEffect(() => {

    if (navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCurrentLat(position.coords.latitude);
        setCurrentLon(position.coords.longitude);
        GetWheater(position.coords.latitude, position.coords.longitude);
      });
    } else alert("This browser doesn't support geolocation")

  }, [])




  const GetWheater = (lat, lon) => {
    setLoading(false)
    try {
      GetWeatherData(lat, lon).then(data => {
        setCurrentWheater(data);
        GetForecast(lat, lon, data.dt, data.timezone);
        changeBackground(data.weather[0].main, data.sys);
        /*setTimeout(() => {         
         
        }, 2000);*/
        setLoading(true)

      })
    } catch (error) {
      console.log(error);
    }
  }

  const GetForecast = (lat, lon, today, timezone) => {
    try {
      GetWeatherDataFiveDays(lat, lon).then(data => {
        setWeatherHours(data.list.slice(0, 4));
        console.log(data);
        const forecastPlaceholder = cleanArray(data.list, GetSign(lon), today, timezone)
        setForecast(forecastPlaceholder);
        setForecastCity(data.city);
      })
    } catch (error) {
      console.log(error);
    }
  }

  const GetSign = (lon) => {
    if (Math.sign(lon) === 1) {
      return "00:00:00";
    } else {
      if (Math.sign(lon) === -1) {
        return "12:00:00";
      }

    }
  }

  const searchChangeHandler = (e) => {
    setSearch(e.target.value);
  }

  const searchLocationSubmit = async (e) => {
    if (search !== '') {

      SearchLocation(search).then(data => {
        const { lat, lon } = data[0];
        GetWheater(lat, lon);
      })

      setSearch('');
      window.scrollTo(0, 0);

    }

  }

  const GeoLocateMe = () => {
    GetWheater(currentLat, currentLon);
    window.scrollTo(0, 0);

  }

  const changeBackground = (main, sys) => {


    let now = Math.floor(Date.now() / 1000);
    if (main === "Clear") {
      if (now < sys.sunrise || now > sys.sunset) {
        document.body.className = styles.ClearNight;
      }
      else {
        document.body.className = styles[main];
      }

    } else {
      document.body.className = styles[main];
    }

  }

  return (
    <div>
      <Navbar
        search={search}
        searchChangeHandler={searchChangeHandler}
        searchLocationSubmit={searchLocationSubmit}
        GeoLocateMe={GeoLocateMe}
      />
      {
        loading ?
          <div className={styles.mainContainer}>
            <RightNow

              currentWeather={currentWeather}
              weatherHours={weatherHours}
              forecastCity={forecastCity}
            />
            <Forecast
              forecast={forecast}
            />
          </div>

          : <LoadingSpinner />}
    </div>
  )
}

export default App;
