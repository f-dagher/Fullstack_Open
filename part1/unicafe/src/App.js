import { useState } from 'react'

const Header = ({header}) => {
  return (
    <div>
      <h1>{header}</h1>
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)
const StatisticLinePositive = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value} %</td>
  </tr>
)

const Statistics = ({good, neutral, bad, all, average, positiveFeedback}) => {
  if (all === 0){
    return(
      <div>
        No feedback given
      </div>
    )
  }
  
  return(
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good}/>
          <StatisticLine text={"neutral"} value={neutral}/>
          <StatisticLine text={"bad"} value={bad}/>
          <StatisticLine text={"all"} value={all}/>
          <StatisticLine text={"average"} value={average}/>
          <StatisticLinePositive text={"positive"} value={positiveFeedback}/>
        </tbody>
      </table>
  );
  
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
  }

  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positiveFeedback = (good/all) * 100;

  return (
    <div>
      <Header header = "give feedback" />
      <Button handleClick= {handleGood} text="good" />
      <Button handleClick= {handleNeutral} text="neutral" />
      <Button handleClick= {handleBad} text="bad" />
      <Header header= "statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positiveFeedback={positiveFeedback} />
    </div>
  )
}

export default App
