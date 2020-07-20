import React from 'react'
import Language from './Language'
import Weather from './Weather'

const CountryDetail = ({country}) => {

    return (
        <div>
            <h1>{country.name}</h1>
            <div>captial {country.capital}</div>
            <div>population {country.population}</div>
            <h2>spoken languages</h2>
            <ul>{country.languages.map((lang, index) => 
                <Language name={lang.name} key={index}/>
            )}</ul>
            <img src={country.flag} width="200" height="100"/>
            <Weather city={country.capital}/>
        </div>
    )
}

export default CountryDetail