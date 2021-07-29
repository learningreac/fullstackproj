import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Countries = ({input,countries}) => {
    if(input.length>0 && countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    return (
        <div>{countries.map(country => <p key={country.name}>{country.name}</p>)}</div>
    )
}

const App = () => {

    const [input, SetInput] = useState('');
    const [countries, SetCountries] = useState([]);

    // SetCountries(JSON.stringify(response.data))
    useEffect(() => {
        console.log('effect');
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

    console.log(typeof countries);    

    //.map(country => <p key={country.name}>{country}</p>)  // this one cause the bug
    return (
        <div>
            Find Countries:
            <input value={input} onChange={handleInputChange} />
           <Countries countries={countries} input={input}/>
        </div>
    )
};

export default App;