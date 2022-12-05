// Exercise: 2.15-2.18

import React, { useState, useEffect } from "react";
import "./App.css";
import Persons from "./components/Persons";
import Alert from "./components/Alert";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => { // connection with the backend
    personService
      .getPeople() //used get request from the backend via axios.ref: services->persons.js
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error =>
        console.log(error)
      )
  }, [])

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

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    const confirmDelete = window.confirm(`If you want to delete ${person.name} click OK`);
    if (confirmDelete) {
      personService
        .remove(id) //by using an HTTP DELETE request with axios in the backend.ref: services->persons.js
        .then(returnedPerson => {
          persons.map(person => person.id !== id ? person : returnedPerson)
        })
      setPersons(persons.filter(person => person.id !== id))
      setNotification({ //to display notification
        text: `${person.name} has been deleted successfully from the phonebook.`,
        type: 'notification'
      })
      setTimeout(() => { //added timing to display notification
        setNotification(null)
      }, 5000)
    }
  };

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
      <h2>Phonebook</h2><br />
      <Notification
        notification={notification}
      />
      <Filter
        filter={filter}
        handleFilter={handleFilter}
      /><br /><hr />
      <h3>Add a new</h3><br />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      /><br />
      <h3>Numbers</h3><br /><hr />
      <Persons
        persons={filteredPersons}
        deletePerson={deletePerson}
      />
    </div>
  )
};

export default App;


