import React from 'react';

import OpacityIcon from '@mui/icons-material/Opacity';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CompressIcon from '@mui/icons-material/Compress';
import { formatDate, formatIcon } from '../../utils';



import styles from './rightNow.module.css'
import "animate.css/animate.min.css";

const RightNow = props => {
  const { currentWeather, weatherHours, forecastCity } = props;

  console.log(weatherHours);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>
        <div>
          {currentWeather.name}, {currentWeather.sys.country}
        </div>
      </div>
      <div className={styles.conditions}>
        <div key={currentWeather.id} className={`${styles.temperature} ${styles.slide} ${styles.delayOne}`}>

          <img src={require(`../../assets/icons/${currentWeather.weather[0].icon}.svg`)} alt={currentWeather.weather[0].description} />


          <div className={styles.tempTitle}>
            Right now:
          </div>
          <div className={styles.tempNumber}>
            <ThermostatIcon sx={{ fontSize: '1em', color: 'black' }} /> {Math.round(currentWeather.main.temp)}ºC
          </div>

        </div>
        <div className={styles.seconContainer}>
          <div className={styles.moreInfo}>
            <div className={styles.item}>
              <ThermostatIcon sx={{ fontSize: '1em', color: 'white' }} /> RF: {Math.round(currentWeather.main.feels_like)} ºC
            </div>
            <div className={styles.item}>
              <OpacityIcon sx={{ fontSize: '1em', color: 'rgb(7, 65, 255, 0.5)' }} />Humidity: {currentWeather.main.humidity}%
            </div>
            <div className={styles.item}>
              <CompressIcon sx={{ fontSize: '1em', color: 'black' }} />Presure: {currentWeather.main.pressure}mb
            </div>
          </div>
          <div className={styles.forecastContainer}>
            <div className={styles.forecastTitle}>
              <div>
                Hourly forecast:
              </div>
            </div>

            <div key={forecastCity.id} className={`${styles.weatherCardContainer} ${styles.fade} ${styles.delayThree}`} >
              {
                weatherHours.map(element => {
                  let formatedTime = formatDate(element,forecastCity);
                  let formatedIcon = formatIcon(element);

                  return <div key={element.dt} className={styles.weatherCard} >
                    <div>
                      {
                        formatedTime
                      }
                    </div>
                    <div >
                      <img src={require(`../../assets/icons/${formatedIcon}.svg`)} alt={element.weather[0].description} />
                    </div>
                    <div className={styles.forecastTemp}>
                      <ThermostatIcon sx={{ fontSize: '1em', color: 'white' }} /> {Math.round(element.main.temp)}ºC
                    </div>
                  </div>
                })
              }
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default RightNow;

