import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, remove }) => {

    const filtered = (filter === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (  
    <ul>
        {filtered.map(person => 
          <Person person={person} key = {person.id} remove={() => remove(person.id)}/>
        )}
    </ul>
  )}

export default Persons