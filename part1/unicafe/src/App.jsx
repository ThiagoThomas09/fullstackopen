import { useState } from 'react'

const Header = () => {
  return (
    <h2>give feedback</h2>
  )
}

const Content = () => {
  return (
    <h2>statistics</h2>
  )
}

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;
  const average = total > 0 ? (props.good-props.bad) / total : 0;
  const positive = total > 0 ? (props.good * 100) / total : 0;

  if(total === 0) {
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positive} %`} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <Button handleClick={()=>setGood(good+1)} text="good" />
      <Button handleClick={()=>setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={()=>setBad(bad+1)} text="bad" />
      <Content />
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
    
  );
};

export default App
