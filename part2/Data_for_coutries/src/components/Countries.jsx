import Country from "./Country";

const Countries = ({ input, countries, showInfo }) => {
    if (input.length > 0 && countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countries.length === 1) {
        return <Country country={countries[0]}></Country>
    }

    console.log('passdata', countries)
    return (
        <div>
            <ul>
                {countries.map(country =>
                    <li key={country.name}>{country.name}
                        <button onClick={() => showInfo(country.name)}>Show</button>
                    </li>
                )}
            </ul>
        </div>
    )
};

export default Countries;