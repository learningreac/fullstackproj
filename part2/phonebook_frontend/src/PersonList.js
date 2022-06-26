

const Persons = ({ personsToShow, deletePerson }) => {
    console.log('personstoshow', personsToShow);
    return (
        // delete person.id  
        // delete function is passed from APP, App does not know the id. the id is a local variable, it pass to the function when call it.
        // notice also how the event handdler is defined here to Onclick.
        // Onclick can not be assigned directly to a function call. 
        <table className="table table-striped">
            <thead className="table-dark">
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
            {personsToShow.map(person => {
                return (
                    <tr key={person.id}>
                        <td> {person.name} </td>
                        <td> {person.number} </td>
                        <td>  <button onClick={() => deletePerson(person.id)}> Delete </button> </td>
                    </tr>
                )
            }
            )}
            </tbody>
        </table>
    )
};

export default Persons;