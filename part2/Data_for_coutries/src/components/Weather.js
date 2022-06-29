//weather stack:http://api.weatherstack.com/current?access_key=youkey&query=Finland

import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ name }) => {
    const [weather, setWeather] = useState({});
    const api_key = process.env.REACT_APP_WEATHER_API_KEY;

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