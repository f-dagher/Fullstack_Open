import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Display from './components/Display'
import FoundCountry from './components/FoundCountry';


function App() {
  const [countries, setCountries] = useState([]); //Store countries from API
  const [newFilter, setNewFilter] = useState('');
  const [show, setShow] = useState ([]);

  //Get countries from API Database
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const totalCountries = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()));
  const countryToShow = show.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()));
  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  }
  
  const handleShow = (country) => {
    setShow(country);
  }  

  return (
    <div>
      <Filter filter={newFilter} filterFunction ={handleFilter} />
      <Display newFilter={newFilter} countries={countries} handleShow={handleShow} />
      {countryToShow.map(countries => 
         <FoundCountry key={countries.name.common} country={countries} />
       )}
      
    </div>
  )
}

export default App;
