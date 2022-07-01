import React, { useEffect, useState } from 'react';
import Countries from './components/Countries';

import CountryInfoService from './services/countrieInfo';
import { countriesdata } from './mockdata';

const App = () => {
    const [input, SetInput] = useState('');
    const [countries, SetCountries] = useState(countriesdata);
    // console.log('top', input, countries[0])

    useEffect(() => {
        CountryInfoService.getAll(input)
            .then(initialData => {
                console.log(initialData);
                console.log(typeof initialData)
                SetCountries(initialData)
            })

    }, [input])



    const handleInputChange = (e) => {
        SetInput(e.target.value);
    };

    const handleShowInfo = (name) => {
        let targetCountry = countries.find(country => country.name.common === name);
        // console.log(targetCountry);
        // console.log(typeof targetCountry); // OBJ
        SetCountries([targetCountry]);
    };


    return (
        <div className='container'>
           <h1> Find Countries:</h1>
            <input value={input} onChange={handleInputChange} />
            <Countries countries={countries} input={input} showInfo={handleShowInfo} />
        </div>
    )
};

export default App;