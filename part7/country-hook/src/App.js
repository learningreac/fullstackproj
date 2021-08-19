import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [data, setData] = useState(null);
  const [found, setFound] = useState(true)

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(response => {
        setFound(true)
        setData(response.data[0])
        console.log('data', data)
      })
      .catch(error => {
         // if is to make sure the message is not undefine. the message is undefined at the first render
        if (error.response.data.message)
          setFound(false)
        // console.log('error ------', error.response.data.message)
      })
  }, [name])

  console.log('found at last', found);

  return { // simple version of object literal: same key and value
    found,
    data
  }
}


const Country = ({ country }) => {
  /* if (!country ) {
     return null
   }
   */

  if (country.found === false) {
    return (
      <div>
        not found...
      </div>
    )
  }

  if (country.data !== null) {
    return (
      <div>
        <h3>{country.data.name} </h3>
        <div>capital {country.data.capital} </div>
        <div>population {country.data.population}</div>
        <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
      </div>
    )
  }

  return null
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  console.log('country', country)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
