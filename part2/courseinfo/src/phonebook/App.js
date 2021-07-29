import React, { useEffect, useState } from 'react';
import peoplesService from './services/peoples';

const Filter = ({ showFilter, handleShowChange }) => {
  return (
    <div>
      <label>filter shown with:</label>
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

const Notification = ({ message }) => {
  const messageStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderstyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  if (message === null) return null
  return (
    <div style={messageStyle}>{message}</div>
  )
};

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNum] = useState('');
  const [newFilter, setFilter] = useState('');
  const [message, setMessage] = useState(null)

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


  const updatePerson = () => {
    const person = persons.find(p => p.name === newName);
    const changedPerson = { ...person, number: newNumber };
    let targetId = person.id;
    peoplesService
      .update(targetId, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== targetId ? p : returnedPerson))
      })
  };

  const addPerson = (event) => {
    event.preventDefault();
    //console.log('button clicked', event.target);  
    // console.log('repeated?',persons.every(person => person.name === newName)) 
    //change from array.every() to array.some

    if (persons.some(person => person.name === newName)) {
      //alert(`${newName} is already added to phonebook`);
      if (window.confirm(`${newName} is already added to phonebook,replace the old number with new one?`)) {
        console.log('confirms workd to be updated');
        updatePerson();
      }
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
    };
    //setPersons(persons.concat(personObj));
    setNewName('');
    setNewNum('');
    setFilter('');
    setMessage(`Added ${newName}`);
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  };

  let regex = new RegExp('^' + newFilter, "i"); // '^' means start with that letter
  const personsToShow = newFilter.length === 0
    ? persons
    : persons.filter(person => person.name.match(regex))

  const handleNameChange = (event) => {
    //
    console.log(event.target.value);
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
    const fname = persons.filter(p => p.id === id)[0].name;
    if (window.confirm(`Delete ${fname}`)) {
      setPersons(persons.filter(p => p.id !== id));

      peoplesService
        .toBeDeleted(id)
        .then()

    }
  };



  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
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