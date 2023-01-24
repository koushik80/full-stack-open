import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  //const dispatch = useDispatch()

  //const voteHandler = () => {
      //dispatch(vote(anecdote))
      //dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
    //}

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === null ) {
      return anecdotes
    }
    const regex = new RegExp(filter, 'i')
    return anecdotes.filter(anecdote => anecdote.content.match(regex))
  })

  const voteHandler = (anecdote) => {
      dispatch(vote(anecdote.id))
      dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
    }

  const countVotes = (v1, v2) => v2.votes - v1.votes

  return (
    <div>
      <div>
        {
          anecdotes.sort(countVotes).map(anecdote =>
            <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => voteHandler(anecdote)} />
          )
        }
      </div>
    </div>
  )
}

export default AnecdoteList