// Exercises 2.6.-2.10.
import React, { useState } from "react";
import "./App.css";
import Person from "./components/Person";
import Alert from "./components/Alert";


const App = () => {

  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
    }

    if (persons.find(person =>
      person.name === personObject.name)) {
      Alert(personObject)
    } else {
      setPersons(persons.concat(personObject))
    }

    setNewName('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
};

export default App;
