import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Display from './components/Display'
import FoundCountry from './components/FoundCountry';


function App() {
  const [countries, setCountries] = useState([]); //Store countries from API
  const [newFilter, setNewFilter] = useState('');
  const [show, setShow] = useState ([]); //Store the country clicked by the button

  //Get countries from API Database
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  //Country to show when the button is clicked
  const countryToShow = show.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()));
  //Total amount of counties used to determine logic below
  const totalCountires = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()));

  //If the user finds the country by searching 
  //OR changes their mind and wants to find another country,
  //reset show
  const handleFilter = (event) => {
    setNewFilter(event.target.value);
    if (totalCountires.length === 1 || totalCountires.length === 250) {
      setShow([]);
    }
  }
  
  //Set  show (which is filtered by countryToShow), to the country clicked by the button
  const handleShow = (country) => {
    setShow(country);
  }  


  return (
    <div>
      <Filter filter={newFilter} filterFunction ={handleFilter} />
      <Display newFilter={newFilter} countries={countries} handleShow={handleShow}/>
      
      {countryToShow.map(countries => 
         <FoundCountry key={countries.name.common} country={countries}/>
       )}
      
    </div>
  )
}
export default App;
