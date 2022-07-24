import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'


const WeatherData = ( {country} ) => {
    const [weather, setWeather] = useState([]);
    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
          .then(response => {
            setWeather(response.data)
          })
      }, [])

    return (
        <div>
            <h1> Weather in {country.capital} </h1>
            <p> Temperature: {weather.main.temp} Celcius</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            <p> Wind: {weather.wind.speed} m/s</p>
        </div>
    )
}
export default WeatherData

