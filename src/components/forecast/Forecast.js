import React from 'react';
import styles from './Forecast.module.css';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';



const Forecast = (props) => {

    const { forecast } = props;
   
    return <div>
        <div className={styles.forecastContainer}>
            <div className={styles.forecastTitle}>
                <div>
                    Five days forecast:
                </div>
            </div>
            <AnimationOnScroll key={forecast.lenght} animateIn="animate__fadeInUp" >
            <div className={`${styles.weatherCardContainer}`} >
            {
                forecast.map((element) => {
                    return <div className={styles.weatherCard} key={element.id}>
                        <div>
                            {
                                element.date.slice(5, 10)
                            }
                        </div>
                        <div >
                            <img src={require(`../../assets/icons/${element.avgClim}d.svg`)} alt={element.avgClim} />
                        </div>
                        <div className={styles.forecastTemp}>
                            <ThermostatIcon sx={{ fontSize: '1em', color: 'rgba(146, 25, 25, 0.795)' }} /> Max: {Math.round(element.maxTemp)}ºC
                        </div>
                        <div className={styles.forecastTemp}>
                            <ThermostatIcon sx={{ fontSize: '1em', color: 'lightblue' }} /> Min: {Math.round(element.minTemp)}ºC
                        </div>
                    </div>
                })
            }
            </div>
            </AnimationOnScroll>
        </div>

    </div>
}

export default Forecast;