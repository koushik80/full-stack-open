import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
//import anecdotesService from '../services/anecdotesService'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    //const newAnecdote = await anecdotesService.createNew(content)
    dispatch(createAnecdote(content))
    dispatch(setNotification(`New anecdote '${content}' successfully added`, 5))
    //props.createAnecdote(content).then(() => {
      //props.setNotification(`New anecdote '${content}' successfully added`, 5))}
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote"></input>
      <button type="submit">add</button>
    </form>
  )
}

export default AnecdoteForm

