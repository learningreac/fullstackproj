import Country from "./Country";

const Countries = ({ input, countries,  setSingleCountry }) => {
    

    if (input.length > 0 && countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countries.length === 1) {
        setSingleCountry(countries[0])
    }

    const handleShowInfo = (name) => {
        let target = countries.find(country => country.name.common === name);
        setSingleCountry(target);
    };

    return (
        <div>
            <ul className="">
                {countries.map(country =>
                    <li key={country.name.common}>{country.name.common}
                        <button className="btn btn-primary btn-sm" onClick={() => handleShowInfo(country.name.common)}>Show</button>
                    </li>
                )}
            </ul>
        </div>
    )
};

export default Countries;