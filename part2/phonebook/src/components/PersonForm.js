import React from 'react';

const PersonForm = ( {name, number, addName, addNumber, addPerson} ) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input
            value={name} 
            onChange={addName}
          />
        </div>
        <div>
          number: <input
            value={number}
            onChange={addNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm