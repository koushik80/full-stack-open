// Exercises 2.6.-2.10.
import React, { useState } from "react";
import "./App.css";
import Persons from "./components/Persons";
import Alert from "./components/Alert";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const addPerson = (e) => {
    e.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

  //checking existing name

  const checkPerson = persons.find(person =>
    person.name.toLowerCase() === personObject.name.toLowerCase())   //to accept name in lowercase

    //if same name is exist will display alert message
    if (checkPerson && checkPerson.number === newNumber) {
      Alert(personObject)
    } else { //if not exist person's details will be added
      setPersons(persons.concat(personObject))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  };

  const handleFilter = (e) => {
    setFilter(e.target.value)
  };

  const filteredPersons =
    filter === '' ? persons : persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase()));       //filtering logic to show case insensitive and return result that contain uppercase

  return (
    <div>
      <h2>Phonebook</h2> <br />
      <Filter
        filter={filter}
        handleFilter={handleFilter}
      />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>

        <Persons persons={filteredPersons} />
    </div>
  )
};

export default App;
