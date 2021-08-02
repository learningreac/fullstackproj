import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Weather from './Weather';

const Countries = ({ input, countries, showInfo }) => {
    if (input.length > 0 && countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countries.length === 1) {
        return <Country country={countries[0]}></Country>
    }
    return (
        <div>
            <ul>
                {countries.map(country =>
                    <li key={country.name}>{country.name}
                        <button onClick={() => showInfo(country.name)}>Show</button>
                    </li>
                )}
            </ul>
        </div>
    )
};



const Country = ({ country }) => {
    //console.log('single country', country, country.name);
    return (
        <div>
            <h1>{country.name}</h1>
            <p><b>Capital:</b>{country.capital}</p>
            <p><b>Population:</b> {country.population}</p>
            <div>
                <h2>Languages</h2>
                <ul>
                    {country.languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
                </ul>
            </div>
            <img src={country.flag} alt="flag" width={200} style={{ boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)' }} />
            <Weather name={country.name} />
        </div>
    )
}

const App = () => {

    const [input, SetInput] = useState('');
    const [countries, SetCountries] = useState([]);

    // SetCountries(JSON.stringify(response.data))
    useEffect(() => {

        axios
            .get(`https://restcountries.eu/rest/v2/name/${input}`)
            .then(response => {
                console.log(response.data);
                console.log(typeof response.data)
                SetCountries(response.data);
            })
    }, [input])

    //console.log('render', countries.length, 'countries');

    const handleInputChange = (e) => {
        SetInput(e.target.value);
    };

    const handleShowInfo = (name) => {
       let targetCountry = countries.find(country => country.name === name);
        console.log(targetCountry);
        console.log(typeof targetCountry); // OBJ
        SetCountries([targetCountry]);
    };



    //.map(country => <p key={country.name}>{country}</p>)  // this one cause the bug
    return (
        <div>
            Find Countries:
            <input value={input} onChange={handleInputChange} />
            <Countries countries={countries} input={input} showInfo={handleShowInfo} />
        </div>
    )
};

export default App;