import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'


const App = () => {
  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <form>
        <input
        value={newSearch}
        onChange={handleSearchChange}
        />
      </form>
      {<Countries countries={countries} filter={newSearch}/>}
    </div>
  )
}
export default App;
