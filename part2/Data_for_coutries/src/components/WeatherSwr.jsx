//weather stack:http://api.weatherstack.com/current?access_key=youkey&query=Finland

import useSWR from "swr";
import CountryInfoService from '../services/countrieInfo'

const WeatherSwr = ({ name }) => {
    const api_key = process.env.REACT_APP_WEATHER_API_KEY;
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=';
    const {data:weather, error} = useSWR(name ? `${weatherUrl}${api_key}&query=${name}` : null, CountryInfoService.fetcher);

 
    console.log('swrweather', weather);

    if (weather === undefined) {
        console.log('weather undefined')
        return null
    };
    // this API call return data slowly,
    //so add this undefined condition render here in case it says cannot read temperature of undefined.
  
    return (

        <div className="weather mt-5">
            <h3>{`Weather in ${name}`}</h3>
            <p><b>temperature:</b>{weather.current.temperature} Celcius</p>
            <img src={weather.current.weather_icons} alt='weather icon' style={{ boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)' }}></img>
            <p><b>wind:</b> {weather.current.wind_speed} mph  <b>direction:</b>{weather.current.wind_dir}</p>

        </div>)
};

export default WeatherSwr