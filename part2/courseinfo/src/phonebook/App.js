import { identifier } from '@babel/types';
import React, { useEffect, useState } from 'react';
import peoplesService from './services/peoples';

const Filter = ({ showFilter, handleShowChange }) => {
  return (
    <div>filter shown with
      <input value={showFilter} onChange={handleShowChange}></input>
    </div>
  )
};

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumChange }) => {
  return (
    <form onSubmit={addPerson}>
      <label>Name:</label>
      <input value={newName} onChange={handleNameChange} />
      <br />
      <label>Number:</label>
      <input value={newNumber} onChange={handleNumChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
};

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    // delete person.id  
    // delete function is passed from APP, App does not know the id. the id is a local variable, it pass to the function when call it.
    // notice also how the event handdler is defined here to Onclick.
    // Onclick can not be assigned directly to a function call. 
    <ul>
      {personsToShow.map(person => {
        return (
            <li key={person.id}> {person.name} {person.number} 
              <button onClick={() => deletePerson(person.id)}> Delete </button>
            </li>
        )
      }
      )}
    </ul>
  )
};


const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNum] = useState('');
  const [newFilter, setFilter] = useState('');

  useEffect(() => {
    /*console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data)) */
    peoplesService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, []);


  const addPerson = (event) => {
    event.preventDefault();
    //console.log('button clicked', event.target);

    if (persons.every(item => item.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObj = {
        name: newName,
        number: newNumber
      };

      /*axios
        .post('http://localhost:3001/persons', personObj)
        .then(response => {
          setPersons(persons.concat(response.data));
        });
      */
      peoplesService
        .create(personObj)
        .then(returnedData => {
          setPersons(persons.concat(returnedData))
        })

      //setPersons(persons.concat(personObj));
      setNewName('');
      setNewNum('');
      setFilter('');
    };
  };

  let regex = new RegExp('^' + newFilter, "i"); // '^' means start with that letter
  const personsToShow = newFilter.length === 0
    ? persons
    : persons.filter(person => person.name.match(regex))

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumChange = (e) => {
    // console.log(typeof e.target.value);
    setNewNum(e.target.value);
  };

  const handleShowChange = (e) => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };

  const deletePerson = (id) => {
    console.log('delete', id)
    setPersons(persons.filter(p => p.id !== id))
  }; 

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter showFilter={newFilter} handleShowChange={handleShowChange} />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumChange={handleNumChange}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App