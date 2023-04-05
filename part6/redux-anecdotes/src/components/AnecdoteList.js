import { changeVote } from '../reducers/anecdoteReducer'
import {  useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if ( state.filter === '' ) {
      return state.anecdotes
    }
    return state.anecdotes.filter((anecdote) => 
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })
  console.log('AnecdoteList: ', anecdotes)
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