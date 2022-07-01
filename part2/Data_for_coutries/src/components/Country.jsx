import Weather from "./Weather";


const Languages = ({ languages }) => {
    const langArray = [];
    for (const lan in languages) {
        langArray.push([lan, languages[lan]]);
    };

    return (
        <div className="languages">
            {
                langArray.map((lan, index) => <p key={index}> {lan[1]}</p>)
            }
        </div>
    )
}

const Country = ({ country }) => {
    if (country === undefined) return null;

    console.log('single country', country,);
    const languages = country.languages; // type object
    return (
        <div className="country-info d-flex flex-column">
            <div className="country-baic" style={{ flex: 3 }}>
                <h3>{country.name.common}</h3>
                <p><b>Capital:</b>{country.capital[0]}</p>
                <p><b>Population:</b> {country.population}</p>
                <div>
                    <h4>Languages</h4>
                    <Languages languages={languages} />
                </div>
                <img src={country.flags.png} alt="flag" width={200} style={{ boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)' }} />
            </div>
            <div  className="country-weather" style={{ flex: 1 }}>
                <Weather name={country.name.common} />
            </div>

        </div>
    )
}

export default Country;