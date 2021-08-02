//weather stack:http://api.weatherstack.com/current?access_key=45f520cd5d7c0ab7d6c0d6482199d0ce&query=Finland

import axios from "axios";
import { useEffect, useState } from "react";



const Weather = ({ name }) => {
    const [weather, setWeather] = useState({});
    //const api_key = process.env.REACT_APP_WEATHER_API_KEY;
    const api_key = '45f520cd5d7c0ab7d6c0d6482199d0ce';
    console.log('key', api_key);

    useEffect(() => {

        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${name}`)
            .then(response => {
                console.log('weather', response.data.current);
                setWeather(response.data.current);
            })
    }, [api_key,name]);

    if (weather === undefined) {
        console.log('weather undefined')
        return null
    };
    // this API call return data slowly,
    //so add this undefined condition render here in case it says cannot read temperature of undefined.
  
    return (

        <div>
            <h2>{`Weather in ${name}`}</h2>
            <p><b>temperature:</b>{weather.temperature} Celcius</p>
            <img src={weather.weather_icons} alt='weather icon' style={{ boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)' }}></img>
            <p><b>wind:</b> {weather.wind_speed} mph  <b>direction:</b>{weather.wind_dir}</p>

        </div>)
};

export default Weather