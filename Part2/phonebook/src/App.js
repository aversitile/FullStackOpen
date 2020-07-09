import React, { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [ filter, setFilter ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    //if new name is already ther alert

    var isCopy = persons.reduce(function(sum, person) {
      if (newName === person.name) {
        return sum + 1 
      }
      return sum
    }, 0)

    if (isCopy >= 1) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const nameObj = { 
      name: newName,
      number: newNumber,
      id: newName
    }

    setPersons(persons.concat(nameObj))
    setNewName('')
    setNewNumber('')
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input value={filter} onChange={handleFilterChange}/>
        </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App