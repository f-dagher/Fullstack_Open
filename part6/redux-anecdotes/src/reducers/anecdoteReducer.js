import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    changeVote(state, action) {
      const anecdote = action.payload
      const id = anecdote.id
      console.log('id', id)
      const anecdoteToChange = state.find(a => a.id === id)
      console.log('anecdoteToChange: ', anecdoteToChange)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes +1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )  
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  },
})

export const { changeVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, anecdote)
    dispatch(changeVote(updatedAnecdote))
  }
}


export default anecdoteSlice.reducer