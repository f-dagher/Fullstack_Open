import { updateVote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
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

  const vote = (anecdote) => {
    console.log('Anecdote to update: ', anecdote)
    dispatch(updateVote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AnecdoteList