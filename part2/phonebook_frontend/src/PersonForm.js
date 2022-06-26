
const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumChange }) => {
    return (
      <form onSubmit={addPerson}>
        <div className="mb-2">
          <label for="phonebookNameInput" className="form-label">Name</label>
          <input type="name" className="form-control"
            id="phonebookNameInput" aria-describedby="nameInput"
            value={newName} onChange={handleNameChange} />
        </div>
  
        <div className="mb-2">
          <label for="phonebookNumberInput" className="form-label">Number</label>
          <input type="number" className="form-control"
            id="phonebookNameInput" aria-describedby="NumberInput"
            value={newNumber} onChange={handleNumChange} />
        </div>
  
  
        <button type="submit" className="btn btn-primary">Add New</button>
      </form>
    )
  };

  export default PersonForm;