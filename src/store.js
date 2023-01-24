import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { createAnecdotes } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdotesService  from './services/anecdotesService'



const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
        filter: filterReducer
    }
})


anecdotesService.getAll().then(anecdote =>
  anecdote.forEach(anecdote => {
    store.dispatch(createAnecdotes(anecdote))
  })
)


export default store