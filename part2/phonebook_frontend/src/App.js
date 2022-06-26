import React, { useEffect, useState } from 'react';
import peoplesService from './services/peoples';
import Persons from './PersonList';

//must run json server to get the intial data

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
      <div class="mb-3">
        <label for="phonebookNameInput" class="form-label">Name</label>
        <input type="name" class="form-control"
          id="phonebookNameInput" aria-describedby="nameInput"
          value={newName} onChange={handleNameChange} />
      </div>

      <div class="mb-3">
        <label for="phonebookNumberInput" class="form-label">Number</label>
        <input type="number" class="form-control"
          id="phonebookNameInput" aria-describedby="NumberInput"
          value={newNumber} onChange={handleNumChange} />
      </div>


      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  )
};


const Notification = ({ message }) => {
  const messageStyle = {
    color: 'green',
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
      .catch(error => {
        console.log('fail')
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
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumChange = (e) => {
    // console.log(typeof e.target.value);
    setNewNum(e.target.value);
  };

  const handleShowChange = (e) => {
    //console.log(e.target.value);
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