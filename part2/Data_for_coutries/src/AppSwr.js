import React, { useState } from 'react';
import useSWR from 'swr';
import Countries from './components/Countries';
import Country from './components/Country';

import CountryInfoService from './services/countrieInfo';
// import { countriesdata } from './mockdata';

const baseUrl = 'https://restcountries.com/v3.1/name';
const AppSwr = () => {
    const [input, SetInput] = useState('');
    const [singleCountry, setSingleCoutry] = useState(null);  // undefined will still not cause conditional rendering
    const { data: countrydata, error } = useSWR(input ? `${baseUrl}/${input}` : null, CountryInfoService.fetcher);
    console.log("data", countrydata, error);

   
    const handleInputChange = (e) => {
        SetInput(e.target.value);
    };

    const handleShowInfo = (name) => {
        let target = countrydata.find(country => country.name.common === name);
        setSingleCoutry(target);
    };
    console.log('target', singleCountry);

    return (
        <div className='container'>
            <h1 className='title text-center m-5'> Search for Countries and Weather</h1>
            <div className='d-flex justify-content-around'>
                <div className='left'>
                    <h2> Find Countries:</h2>
                    <input value={input} onChange={handleInputChange} />
                    {countrydata && <Countries countries={countrydata} input={input} showInfo={handleShowInfo} />}
                </div>
                <div className='right'>
                {singleCountry && <Country country={singleCountry}></Country>}

                </div>

            </div>
        </div>
    )
};

export default AppSwr;