import { useState } from 'react'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <p>{text}: {value}</p>
)

const Statistics = ({ score }) => {
  const [good, neutral, bad] = score
  const total_vote = good + neutral + bad
  const average = (good - bad) / total_vote
  const positive_percentage = good / total_vote * 100 + ' %'

  return (
    <>
      <h2>Statistics</h2>
      {total_vote!==0 ?
        <div>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='Total Votes' value={total_vote} />
          <StatisticLine text='Average' value={average} />
          <StatisticLine text='Positive Percentage' value={positive_percentage} />
        </div> :
        <div>{'No feedback given'}</div>
      }
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
      <Statistics score={[good, neutral, bad]} />
    </div>
  )
}

export default App