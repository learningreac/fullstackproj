import Weather from "./Weather";
import WeatherSwr from "./WeatherSwr";


const Languages = ({ languages }) => {
    const langArray = [];
    for (const lan in languages) {
        langArray.push([lan, languages[lan]]);
    };

    return (
        <ul className="languages" >
            {
                langArray.map((lan, index) => <li key={index}> {lan[1]}</li>)
            }
        </ul>
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
                <p><b>Languages:</b></p>
                <Languages languages={languages} />

                <h4>Flag</h4>
                <img src={country.flags.png} alt="flag" width={200} style={{ boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)' }} />
            </div>
            <div className="country-weather mt-5" style={{ flex: 2 }}>
                <WeatherSwr name={country.name.common} />
            </div>

        </div>
    )
}

export default Country;