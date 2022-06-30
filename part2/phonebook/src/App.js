import { useState } from 'react'
import Person from './components/Person'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  //Function for form to add person 
  const addPerson = (event) => {
    event.preventDefault();
    /*
      Create a new Array of person names to compare only the names
      Since persons is an object array
    */
    const names = persons.map(person => person.name);
    const nameObject = {
      name: newName
    }

    //check to see if name is added only add person if name is unique
    if (names.includes(newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(nameObject))
      setNewName('')
    }  
  }

  //Handle adding person to form
  const handleAddPerson = (event) => {
    setNewName(event.target.value);
  }
  
 

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName} 
            onChange={handleAddPerson}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(persons => 
          <Person key={persons.name} person={persons} />
        )}
    </div>
  )
}

export default App

//      <div>debug: {newName}</div>