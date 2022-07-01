import axios from "axios";
const baseUrl = 'https://restcountries.com/v3.1/name';

const getAll = async (input) => {
    // console.log(input)
    const request = axios.get(`${baseUrl}/${input}`);
    return request.then(response => response.data)
};

const CountryInfoService = { getAll };

export default CountryInfoService;