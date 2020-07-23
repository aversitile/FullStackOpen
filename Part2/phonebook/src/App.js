import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Notification from './components/Notification'
import axios from 'axios'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [ filter, setFilter ] = useState('')

  const [ notification, setNotification ] = useState(null)
  const [ notificationType, setNotificationType] = useState("success")

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
    const nameObj = { 
      name: newName,
      number: newNumber,
    }

    var isCopy = persons.reduce(function(sum, person) {
      if (newName === person.name) {
        return sum + 1 
      }
      return sum
    }, 0)

    if (isCopy >= 1) {
      if (window.confirm(`${newName} is already added to phonebook, 
      replace old number with new one?`)) {
        const id = persons.find(p => p.name === newName).id
        personsService
        .update(id, nameObj)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
          setNotification(`Changed number for ${returnedPerson.name}`)
          setNotificationType("success")
          setTimeout(() => {
            setNotification(null)
          }, 5000) 
        })
        .catch(error => {
          setNotification(`${newName} has already been removed from the server`)
          setNotificationType("error")
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
      }
      return
    }

    

    personsService
    .add(nameObj)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNotification(`Added ${returnedPerson.name}`)
      setNotificationType("success")
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })

    setNewName('')
    setNewNumber('')

  }

  const remove = id => {
    const name = persons.filter(p => p.id === id)[0].name
    if (window.confirm(`Delete ${name}`)) {
      personsService
      .remove(id)
      setPersons(persons.filter(p => p.id !== id))
      setNotification(`Deleted ${name}`)
      setNotificationType("success")
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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
      <Notification message={notification} type={notificationType} />

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