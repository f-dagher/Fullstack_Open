import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({ anecdotes, selected }) => {
  return (
    <div>
      {anecdotes[selected]}
    </div>
  )
}

const Votes = ({selected, points}) => {
  return (
    <div>
      has {points[selected]} votes
    </div>
  )
}

const Header = ({title}) => {
  return (
    <h1>
      {title}
    </h1>
  )
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0});
  const [mostSelected, setMostSelected] = useState(0);

  
  const handleRandom = () => {
    const rand = Math.floor(Math.random() * anecdotes.length);
    setSelected(rand);
  }

  const handlePoints = () => {
    const copy = {...points};
    copy[selected] += 1;
    setPoints(copy);

    let max = 0;
    let index = 0;
    for (let i=0; i < anecdotes.length; i++){
      if (copy[i] > max){
        max = copy[i];
        index = i;
      }
    }
    setMostSelected(index);
  }

  return (
    <div>
      <Header title={"Ancedote of the day"} />
      <Anecdote anecdotes={anecdotes} selected={selected} />
      <Votes points={points} selected={selected} />
      <Button text="Next anecdote" handleClick={handleRandom} />
      <Button text="vote" handleClick={handlePoints} />
      <Header title={"Ancedote with the most votes"} />
      <Anecdote anecdotes={anecdotes} selected={mostSelected} />
      <Votes selected={mostSelected} points={points} />
    </div>
  )
}
export default App