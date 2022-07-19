import React from 'react';
import Country from './Country'
import FoundCountry from './FoundCountry'

const Display = ( {countries, newFilter} ) => {
    const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()));
   
    if (countriesToShow.length > 9) {
     return (
       <p>
         Too many matches, specify another filter
       </p>
     )
    }
    else if (countriesToShow.length <= 9 && countriesToShow.length > 1) {
     return (
       <div>
       {countriesToShow.map(countries => 
         <Country key={countries.name.common} country={countries} />
       )}
     </div>
     )
    }
    else if (countriesToShow.length ===  1){
     return (
       <div>
         {countriesToShow.map(countries => 
         <FoundCountry key={countries.name.common} country={countries} />
       )}
       </div>
     )
    }
   
   }
export default Display