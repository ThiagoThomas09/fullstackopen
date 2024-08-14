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
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getRandomInt = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex)
  };

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  const maxVotes = Math.max(...votes)
  const topAnecdoreIndex = votes.indexOf(maxVotes)

  return (
    <div>
      <Header />
      <Button handleClick={()=>setGood(good+1)} text="good" />
      <Button handleClick={()=>setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={()=>setBad(bad+1)} text="bad" />
      <Content />
      <Statistics good={good} neutral={neutral} bad={bad}/>
      <h3>Anecdote of the day</h3>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVotes}>vote</button>
      <button onClick={getRandomInt}>next anecdote</button>
      <h3>Anecdotes with most votes</h3>
      {maxVotes === 0 ? (
        <p>No votes yet</p>
      ) : (
        <div>
          <p>{anecdotes[topAnecdoreIndex]}</p>
          <p>has {votes[topAnecdoreIndex]} votes</p>
        </div>
      )}
      

    </div>
    
  );
};

export default App
