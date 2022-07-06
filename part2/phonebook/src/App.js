import { useState } from 'react'
import Person from './components/Person'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')



  //Function for form to add person 
  const addPerson = (event) => {
    event.preventDefault();
    /*
      Create a new Array of person names to compare only the names
      Since persons is an object array
    */
    const names = persons.map(person => person.name);
    const personObject = {
      name: newName,
      number: newNumber
    }

    //check to see if name is added only add person if name is unique
    if (names.includes(newName)){
      alert(`${newName} is already added to phonebook`);
    }
    else {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }  
  }

  //Handle adding person to form
  const handleAddPerson = (event) => {
    setNewName(event.target.value);
  }
  
  //Handle adding new number to person
  const handleAddNumber = (event) => {
    setNewNumber(event.target.value);
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
          number: <input
            value={newNumber}
            onChange={handleAddNumber}
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