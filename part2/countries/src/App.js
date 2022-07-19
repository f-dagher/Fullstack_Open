import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Display from './components/Display'


function App() {
  const [countries, setCountries] = useState([]); //Store countries from API
  const [newFilter, setNewFilter] =useState('');

  //Get countries from API Database
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  }

  return (
    <div>
      <Filter filter={newFilter} filterFunction ={handleFilter} />
      <Display newFilter={newFilter} countries={countries} />
    </div>
  )
}

export default App;
