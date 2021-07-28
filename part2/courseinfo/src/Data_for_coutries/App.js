import React, { useEffect, useState } from 'react';
import axios from 'axios';



const App = () => {

    const [input, SetInput] = useState('');
    const [countries, SetCountries] = useState([]);

    // SetCountries(JSON.stringify(response.data))
    useEffect(() => {
        console.log('effect');
        axios
            .get(`https://restcountries.eu/rest/v2/name/${input}`)
            .then(response => {
                console.log(typeof response.data)
                SetCountries(JSON.stringify(response.data))
            })
    }, [input])

    //console.log('render', countries.length, 'countries');

    const handleInputChange = (e) => {
        SetInput(e.target.value);
    };

    console.log(typeof countries);    

    //.map(country => <p key={country.name}>{country}</p>)
    return (
        <div>
            Find Countries:
            <input value={input} onChange={handleInputChange} />
            <div>{countries}</div>
        </div>
    )
};

export default App;