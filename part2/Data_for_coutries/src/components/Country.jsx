import Weather from "./Weather";


const Country = ({ country }) => {
    //console.log('single country', country, country.name);
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p><b>Capital:</b>{country.capital[0]}</p>
            <p><b>Population:</b> {country.population}</p>
            <div>
                <h2>Languages</h2>
                <p> {country.languages}</p>
                
            </div>
            <img src={country.flag} alt="flag" width={200} style={{ boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)' }} />
            <Weather name={country.name.common} />
        </div>
    )
}

export default Country;


// {/* <ul>
//                     {country.languages}
//                     {/* {country.languages.map(lan => <li key={lan.name}>{lan.name}</li>)} */}
//                 </ul> */}