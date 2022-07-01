import Country from "./Country";

const Countries = ({ input, countries, showInfo }) => {
    

    if (input.length > 0 && countries.length > 10) {
      
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countries.length === 1) {
        return <Country country={countries[0]}></Country>
    }

    return (
        <div>
            <ul className="">
                {countries.map(country =>
                    <li key={country.name.common}>{country.name.common}
                        <button className="btn btn-primary btn-sm" onClick={() => showInfo(country.name.common)}>Show</button>
                    </li>
                )}
            </ul>
        </div>
    )
};

export default Countries;