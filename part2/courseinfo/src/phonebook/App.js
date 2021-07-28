import React, { useState } from 'react'


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

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNum] = useState('');
  const [newFilter, setFilter] = useState('');


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
      setPersons(persons.concat(personObj));
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