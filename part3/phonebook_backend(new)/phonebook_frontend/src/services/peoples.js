import axios from "axios";
//const baseUrl = 'http://localhost:3003/api/persons'; // change to 3003 as backend is now at port 3003.
const baseUrl = '/api/persons'; // this one not working at the front endside. as it goes to localhost:3000/api/notes
                                //proxy can help fix this.

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
};

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data)
};

const toBeDeleted = id => { // delete is a reserverd keyword
   // console.log('promise',`${baseUrl}/${id}`);
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {getAll, create, toBeDeleted, update};