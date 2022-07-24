import React from 'react';

const Country = ( {country, handleShow} ) => {
    return (
      <> 
        {country.name.common} { }
        <button onClick={() => handleShow([country])}> show </button>
      </>
    )
  }

export default Country