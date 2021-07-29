import axios from 'axios';
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

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map(person => <p key={person.name}> {person.name} {person.number}</p>)}
    </div>

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

  console.log('persons',persons);


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
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App