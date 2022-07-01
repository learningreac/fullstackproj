import Weather from "./Weather";


const Languages = ({ languages }) => {
    const langArray = [];
    for (const lan in languages) {
        langArray.push([lan, languages[lan]]);
    };

    console.log(langArray);

    return (
        <div className="languages">
            {
                langArray.map((lan, index) => <p key={index}> {lan[1]}</p>)
            }
        </div>
    )
}

const Country = ({ country }) => {
    console.log('single country', country, );
    const languages = country.languages; // type object
    
    if(country) {
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p><b>Capital:</b>{country.capital[0]}</p>
                <p><b>Population:</b> {country.population}</p>
                <div>
                    <h2>Languages</h2>
                    <Languages languages={languages} /> 
    
    
                </div>
                <img src={country.flags.png} alt="flag" width={200} style={{ boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)' }} />
                <Weather name={country.name.common} />
            </div>
        )
    } else {
        return null;
    }
   
}

export default Country;