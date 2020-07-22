import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import axios from 'axios'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('initial effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('initial promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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
    }

    personsService
    .add(nameObj)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
    })

    setNewName('')
    setNewNumber('')

    // setPersons(persons.concat(nameObj))
    // setNewName('')
    // setNewNumber('')
  }

  const remove = id => {
    const name = persons.filter(p => p.id === id)[0].name
    if (window.confirm(`Delete ${name}`)) {
      personsService
      .remove(id)
      setPersons(persons.filter(p => p.id !== id))
    }
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
      <Persons persons={persons} filter={filter} remove={remove}/>
    </div>
  )
}

export default App