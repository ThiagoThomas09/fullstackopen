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

const Display = ({ text, value }) => (
  <p>{text} {value}</p>
)

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;
  const average = total > 0 ? (props.good-props.bad) / total : 0;
  const positive = total > 0 ? (props.good * 100) / total : 0;

  if(total === 0) {
    return <p>No feedback given</p>
  }
  return (
    <div>
      <Display text="good" value={props.good} />
      <Display text="neutral" value={props.neutral} />
      <Display text="bad" value={props.bad} />
      <Display text="all" value={total} />
      <Display text="average" value={average} />
      <Display text="positive" value={`${positive} %`} />
    </div>
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
