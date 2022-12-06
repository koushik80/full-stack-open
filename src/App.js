//ex: experimental lesson
// https://fullstackopen.com/en/part2/adding_styles_to_react_app
// running command in the local server:
// npx json-server --port 3001 --watch db2.json

import { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./services/notes";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
    })
  };

  // defined an initial version of the toggleImportanceOf event handler function and passes it to every Note component
  const toggleImportanceOf = id => {
    //console.log(`importance of ${id} needs to be toggled`);
    //const url = `http://localhost:3001/notes/${id}`   // defines the unique url for each note resource based on its id.
    const note = notes.find(n => n.id === id)    // find method is used to find the note wanted to modify, and then assigned it to the note variable.
    const changedNote = { ...note, important: !note.important }   // created a new object that is an exact copy of the old note, apart from the important property.

    //The callback function sets the component's notes state to a new array that contains all the items from the previous notes array,
    //except for the old note which is replaced by the updated version of it returned by the server.
    //This is accomplished with the map method:
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already deleted from server`
      )
      setTimeout(() => setErrorMessage(null), 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  };

  // The map method creates a new array by mapping every item from the old array into an item in the new array.
  // In the example, the new array is created conditionally so that if note.id !== id is true;
  // simply copied the item from the old array into the new array.
  //If the condition is false, then the note object returned by the server is added to the array instead.

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;


