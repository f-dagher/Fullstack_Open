import React from 'react';

const Country = ( {country, setCountry} ) => {
    return (
      <> 
        {country.name.common}
      </>
    )
  }

export default Country