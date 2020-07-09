import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter }) => {

    const filtered = (filter === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (  
    <ul>
        {filtered.map(person => 
          <Person key={person.name} person={person}/>
        )}
    </ul>
  )}

export default Persons