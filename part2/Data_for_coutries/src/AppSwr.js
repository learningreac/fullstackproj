import React, { useState } from 'react';
import useSWR from 'swr';
import Countries from './components/Countries';
import Country from './components/Country';

import CountryInfoService from './services/countrieInfo';


const baseUrl = 'https://restcountries.com/v3.1/name';
const AppSwr = () => {
    const [input, SetInput] = useState('');
    const [singleCountry, setSingleCountry] = useState(null);  // undefined will still not cause conditional rendering
    const { data: countrydata, error } = useSWR(input ? `${baseUrl}/${input}` : null, CountryInfoService.fetcher);
    console.log("data", countrydata, error);


    const handleInputChange = (e) => {
        SetInput(e.target.value);
    };

    return (
        <div className='container'>
            <h1 className='title text-center my-5'> Search for Countries and Weather</h1>
            <div className='d-flex flex-column d-sm-flex flex-sm-row'>
                <div className='left m-2' style={{ flex: 2 }}>
                    <div className="mb-3">
                        <label htmlFor="formCountryNameInput" className="form-label fw-bold"> Find Countries:</label>
                        <input type="text" className="form-control" id="formCountryNameInput" placeholder="Country name" value={input} onChange={handleInputChange} />
                    </div>

                    {countrydata && <Countries countries={countrydata} input={input} setSingleCountry={setSingleCountry} />}
                </div>
                
                <div className='right m-2' style={{ flex: 3 }}>
                    {singleCountry && <Country country={singleCountry}></Country>}

                </div>

            </div>
        </div>
    )
};

export default AppSwr;