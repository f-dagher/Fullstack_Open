import React from 'react'

const Person = ( {person, removePerson} ) => {
    return (
      <li> 
        {person.name} {person.number} {" "}
        <button onClick={removePerson}>Delete</button>
         </li>
    )
  }

export default Person