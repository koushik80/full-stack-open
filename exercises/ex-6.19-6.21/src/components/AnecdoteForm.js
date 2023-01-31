import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.createAnecdote(content).then(() => {
      props.setNotification(`New anecdote '${content}' successfully added`, 5)
    })
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote"></input>
      <button type="submit">add</button>
    </form>
  )
}

export default connect(null, { createAnecdote, setNotification  })(AnecdoteForm)


