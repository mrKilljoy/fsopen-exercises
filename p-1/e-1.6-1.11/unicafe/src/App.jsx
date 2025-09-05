import { useState } from 'react'

const Button = function ({ onClick, text }) {
  return (<button onClick={onClick}>{text}</button>)
}

const StatisticsLine = function({ caption, value}) {
  //return (<p>{caption}: {value}</p>)
  return (<tr><td>{caption}</td><td>{value}</td></tr>)
}

const Statistics = function ({ good, neutral, bad }) {
  const anyReviews = good > 0 || neutral > 0 || bad > 0;
  return (<div>
    <h1>Statistics</h1>
    {!anyReviews ? <p>No feedback</p> :
      <>
      <table>
      
        <StatisticsLine caption={"good"} value={good} />
        <StatisticsLine caption={"neutral"} value={neutral} />
        <StatisticsLine caption={"bad"} value={bad} />
        <StatisticsLine caption={"total"} value={good + neutral + bad} />
        <StatisticsLine caption={"average"} value={(good + neutral + bad) / 3} />
        <StatisticsLine caption={"positive (%)"} value={(good / (good + neutral + bad)) * 100 + "%"} />
        </table>
      </>
    }
  </div>)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <h1>Leave feedback</h1>
        <Button onClick={() => setGood(good + 1)} text="good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button onClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App