import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('a new name');
  const [newNumber, setNewNum] = useState('phone number');


  const addPerson = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);

    if (persons.every(item => item.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObj = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(personObj));
      setNewName('');
      setNewNum('')
    }

  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumChange = (e) => {
    setNewNum(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <label>Name:</label>
        <input value={newName} onChange={handleNameChange} />
        <br/>
        <label>Number:</label>
        <input value={newNumber} onChange={handleNumChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}> {person.name} {person.number}</p>)}
    </div>
  )
}

export default App