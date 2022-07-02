//weather stack:http://api.weatherstack.com/current?access_key=youkey&query=Finland

import useSWR from "swr";
import CountryInfoService from '../services/countrieInfo'

const WeatherSwr = ({ name }) => {
    const api_key = process.env.REACT_APP_WEATHER_API_KEY;
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=';
    const { data: weather, error } = useSWR(name ? `${weatherUrl}${api_key}&query=${name}` : null, CountryInfoService.fetcher);


    if (error) return <div>failed to load.</div>
    if (weather === undefined) {
        return <div>Weather data loading...</div>
    };

    return (

        <div className="weather">
            <h3>{`Weather in ${name}`}</h3>
            <p><b>Temperature:</b>{weather.current.temperature} Celcius</p>
            <img src={weather.current.weather_icons} alt='weather icon' style={{ boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)' }}></img>
            <p><b>Wind:</b> {weather.current.wind_speed} mph  <b>direction:</b>{weather.current.wind_dir}</p>

        </div>)
};

export default WeatherSwr