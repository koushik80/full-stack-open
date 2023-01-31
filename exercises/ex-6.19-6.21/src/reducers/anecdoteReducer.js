import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotesService'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    initAnecdote: (state, action) =>  {
      return action.payload
    },
    setVote: (state, action) => {
      const id = action.payload
      const updatedAnecdote = state.find(n => n.id === id)
      const changedAnecdote = {
        ...updatedAnecdote,
        votes: updatedAnecdote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id
          ? anecdote
          : changedAnecdote
      )
    },
    createAnecdotes: (state, action) => {
      const content = action.payload
      return state.concat(content)
    },
    appendAnecdote(state, action) {
      state.concat(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()

    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content)

    dispatch(createAnecdotes(newAnecdote))
  }
}

export const vote = anecdote => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.update(anecdote)

    dispatch(setVote(updatedAnecdote.id))
  }
}




export const { initAnecdote, setVote, createAnecdotes, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer