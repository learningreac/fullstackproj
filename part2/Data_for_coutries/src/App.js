import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

import CountryInfoService from './services/countrieInfo';


const App = () => {
    const [input, SetInput] = useState('');
    const [countries, SetCountries] = useState([]);
    console.log('top',input, countries)

    useEffect(() => {
        // axios
        //     .get(`https://restcountries.com/v3.1/name/${input}`) 
        //     .then(response => {
        //         console.log(response.data);
        //         console.log(typeof response.data);
        //         SetCountries(JSON.stringify(response.data));
        //         // SetCountries(response.data);
        //     })

        CountryInfoService.getAll(input);
    }, [input])


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