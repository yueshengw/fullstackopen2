import { useState } from 'react'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const Display = ({ score }) => {
  const [good, neutral, bad] = score
  const total_vote = good + neutral + bad

  return (
    <>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total Votes: {total_vote}</p> 
      <p>Average: {(good - bad) / total_vote}</p>
      <p>Positive Percentage: {total_vote!=0?good / total_vote * 100 + ' %':'No vote yet'}</p>
    </>
  )
}

const Feedback = ({ handleClick }) => {
  const [incrementGood, incrementNeutral, incrementBad] = handleClick;

  return (
    <>
      <h2>Give Feedback</h2>
      <Button text='Good' handleClick={incrementGood} />
      <Button text='Neutral' handleClick={incrementNeutral} />
      <Button text='Bad' handleClick={incrementBad} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    console.log('Good +1')
    setGood(good + 1)
  }

  const incrementNeutral = () => {
    console.log('Neutral +1')
    setNeutral(neutral + 1)
  }

  const incrementBad = () => {
    console.log('Bad +1')
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Unicafe</h1>
      <Feedback handleClick={[incrementGood, incrementNeutral, incrementBad]} />
      <Display score={[good, neutral, bad]} />
    </div>
  )
}

export default App