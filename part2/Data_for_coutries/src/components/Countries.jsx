
const Countries = ({ input, countries, setSingleCountry }) => {

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
        <div className="countryList">
            <div className="list-group list-group-flush">
                {countries.map(country =>
                    <div key={country.name.common} className="d-flex justify-content-between m-1">
                        <h5 className="listItem" >{country.name.common} </h5>
                        <button className="btn btn-primary btn-sm" onClick={() => handleShowInfo(country.name.common)}>Show</button>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Countries;