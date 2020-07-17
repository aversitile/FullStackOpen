import React from 'react'

const Country = ({country, set}) => {
    const setSearch = () => {
        set(country.name)
        console.log('search set to: ' + country.name)
        
    }
    return (
        <div>
            {country.name}
            <button onClick={setSearch}>Show</button>
            </div>
    )
}

export default Country