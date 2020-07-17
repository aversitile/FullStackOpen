import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [newSearch, setNewSearch] = useState('')


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
    </div>
  )
}
export default App;
