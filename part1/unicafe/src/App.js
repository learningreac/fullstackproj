import React, { useState } from 'react';


const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
};

const Button = ({ text }) => (
  <button> {text} </button>
);


const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = ((good * 1 + neutral * 0 + bad * (-1)) / all).toFixed(1);
  const positive = ((good / all) * 100).toFixed(1) + "%";

  if (all === 0) {
    return (
      <p>No feedback given.</p>
    )
  } 
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} />
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(6);
  const [neutral, setNeutral] = useState(2);
  const [bad, setBad] = useState(1)


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" />
      <Button text="Neutral" />
      <Button text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App