import React, { useState } from 'react';


const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}> {text} </button>
);

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
};

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

  const [clicks, setClicks] = useState({
    good:2, neutral:6, bad:0
  })

  const handleGoodClick = () => {
    const newClicks = {
      ...clicks,
      good: clicks.good + 1
    }
    setClicks(newClicks);
  };

  const handleNeutralClick = () => 
    setClicks({...clicks, neutral:clicks.neutral + 1});

  const handleBadClick = () => 
    setClicks({...clicks, bad:clicks.bad + 1})
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" handleClick={handleGoodClick}/>
      <Button text="Neutral" handleClick={handleNeutralClick} />
      <Button text="Bad" handleClick={handleBadClick}/>
      <Statistics good={clicks.good} neutral={clicks.neutral} bad={clicks.bad} />
    </div>
  )
}

export default App