import React from 'react'
import Country from './Country'
import CountryDetail from './CountryDetail'

const Countries = ({countries, filter}) => {

    const filtered = (filter === '')
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    if (filtered.length >= 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }

    if (filtered.length === 1) {
        return (
            <div>
                <CountryDetail country={filtered[0]}/>
            </div>
        )
    }

    return (
        <ul>
            {filtered.map((country, index) =>
                <Country country={country} key={index}/>
                )}
        </ul>
    )
}

export default Countries