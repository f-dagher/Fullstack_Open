import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [msgStyle, setMsgStyle] =useState(null)


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
    const numbers = persons.map(person => person.number.replace(/\s+/g, ''));
    const personObject = {
      name: newName,
      number: newNumber
    }

    //checks to see if number is in the phonebook
    if(numbers.includes(newNumber.replace(/\s+/g, ''))){
      alert(`the number '${newNumber}' is already assigned to someone in the phonebook`)
    }
    //checks to see if a name has been entered
    else if(newName===""){
      alert("Please enter a name")
    }
    //check to see if name is in the phonebook(case insensitive). Then calls on updatePerson to confirm if 
    //user wants to update the phonebook to the new number
    else if (names.includes(newName.toLowerCase())){
      const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
      updatePerson(person.id)
    }
    else {
      personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setMsgStyle('sucess');
        setMessage( `Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMsgStyle('fail')
        setMessage(
          `Information of ${newName} has been already added to the server`
        )
        setTimeout(() => {
          setMsgStyle('fail')
          setMessage(null)
        }, 5000)
      })      
    }  
  }

  //remove person from database
  const removePerson = id => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Are you sure you want to delete '${person.name}'?`))
    {    
      personsService
        .remove(id)
        .then(() => {
          setMsgStyle('sucess');
          setMessage( `Removed ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          setMsgStyle('fail')
          setMessage(
            `Information of ${person.name} has been already removed from server`
          )
          setTimeout(() => {
            console.log('checking for delete')
            setMsgStyle('fail')
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        }) 
    }
  }


  //change the number of the person with confirmation
  const updatePerson = id => {
    const person = persons.find(p => p.id === id)
    const changedPersons = { ...person, number: newNumber }
  
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        console.log(person)
        personsService
        .update(id, changedPersons)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setNewName('');
          setNewNumber('');
          setMsgStyle('sucess');
          setMessage(`Changed ${newName}'s phone number`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMsgStyle('fail')
          setMessage(
            `Information of ${newName} has been already removed from server`
          )
          setTimeout(() => {
            setMsgStyle('fail')
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
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
      <Notification msgStyle={msgStyle} message={message} />
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

export default App