import { useQuery, useMutation, useQueryClient } from 'react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'


const App = () => {

  const dispatch = useNotificationDispatch()

  const setNotifcation = (anecdote, delay) => {
    delay = delay * 1000
    dispatch({type: 'SHOW', message: `You voted for '${anecdote.content}'`})
    setTimeout(() => {
      dispatch({type: 'CLEAR'})
    }, delay)
  }

  const queryClient = useQueryClient()

  const result = useQuery(
    'anecdotes', getAnecdotes,
    {
      retry: 1,
      refetchOnWindowFocus: false
    }
  )
  console.log(result)

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    setNotifcation(anecdote, 5)
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span>Error: {'anecdote service not available due to problems in the server'}</span>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
