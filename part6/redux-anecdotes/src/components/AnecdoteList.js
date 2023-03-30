import { changeVote } from '../reducers/anecdoteReducer'
import {  useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(changeVote(id))
  }

  const anecdotesToShow =
    anecdotes
      .filter(anecdote => anecdote)
      .sort((a, b) => b.votes - a.votes)
  
  return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AnecdoteList