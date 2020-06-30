import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = ({text, value, pct}) => {
  if (pct === 1) {
    return (
      <div>
        {text} {value} %
      </div>
    )
  }

  return (
    <div>
      {text} {value}
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  
  const avg = (good - bad) / (good + bad + neutral)
  const pctPos = (good / (good + bad + neutral) * 100)

  if (good + neutral + bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  return(
  <div> 
    <h1>statistics</h1>
    <Statistic text="good" value={good}/>
    <Statistic text="neutral" value={neutral}/>
    <Statistic text="bad" value={bad}/>
    <Statistic text="average" value={avg}/>
    <Statistic text="positive" value={pctPos} pct={1}/>
  </div>
  )
}



const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)