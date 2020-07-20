import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) => {
    const [temp, setTemp] = useState()
    const [icon, setIcon] = useState([])
    const [windSpeed, setWindSpeed] = useState()
    const [windAng, setWindAng] = useState()
    const [windDir, setWindDir] = useState()
    const api_key = process.env.REACT_APP_API_KEY
    const request = 'http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + city
    console.log(request)
    

    const hook = () => {
        console.log('effect')
        axios
          .get(request)
          .then(response => {
            console.log('promise fulfilled - weather')
            setTemp(response.data.current.temperature)
            setIcon(response.data.current.weather_icons)
            setWindSpeed(response.data.current.wind_speed)
            setWindSpeed(response.data.current.wind_speed)
            setWindAng(response.data.current.wind_degree)
            setWindDir(response.data.current.wind_dir)
            console.log(icon)
            
          })
      }
      
      useEffect(hook, [])
      return(
          <div>
              <h2>Weather in {city}</h2>
              <b>temperature: </b> {temp} Celcius <br></br>
            <img src={icon} width="100" height="100"/> <br></br>
            <b>wind: </b> {windSpeed} mph @ {windAng} degrees {windDir}
          </div>
      )
}

export default Weather