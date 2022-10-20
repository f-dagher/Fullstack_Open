import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log("Failed")
      }) 
  }, [])


  //Function for form to add person 
  const addPerson = (event) => {
    event.preventDefault();
  
    //Create a new Array of person names to compare only the names
    const names = persons.map(person => person.name.toLowerCase());
    const personObject = {
      name: newName,
      number: newNumber
    }

    //check to see if name is added only add person if name is unique including lowercase
    if (names.includes(newName.toLowerCase())){
      alert(`${newName} is already added to phonebook`);
    }
    else {
      personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.log("Failed")
      })      
    }  
  }

  const removePerson = id => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Are you sure you want to delete '${person.name}'?`))
    {    personsService
        .remove(id)
        .then(updatedPersons => {
          //setPersons(persons.map(person => person.id !== id ? person : updatedPersons))
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          console.log("Failed")
        }) 
    }
  }

  //Handle adding a name to form
  const handleAddName = (event) => {
    setNewName(event.target.value);
  }
  
  //Handle adding new number to person
  const handleAddNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  }

  //person array with filter restrictions (if any)
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} filterFunction ={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        addName={handleAddName}
        addNumber={handleAddNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      {personsToShow.map(persons => 
          <Person 
            key={persons.name} 
            person={persons}
            removePerson={() => removePerson(persons.id)}
            />
        )}
    </div>
  )
}

/*
const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
*/

export default App