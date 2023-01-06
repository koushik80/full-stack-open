//ex: 2.19.-2.20

//local server:
//npx json-server --port 3001 --watch db.json

import React, { useState, useEffect } from "react";
import "./App.css";
import Persons from "./components/Persons";
import Alert from "./components/Alert";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => { // connection with the backend
    personService
      .getPeople() //used HTTP GET from the backend via axios.ref: services->persons.js
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
    }
    // checking both name and his existing number is matching with new number
    if (checkPerson && checkPerson.number !== newNumber) {
      const confirmNewNumber = window.confirm(`Do you want to update ${checkPerson.name}'s number with a new one?`);
      // when number is confirmed then update the number by using HTTP PUT with axios. ref: services->persons.js
      if (confirmNewNumber) {
        const updatedDetails = { ...checkPerson, number: newNumber }
        personService
          .update(checkPerson.id, updatedDetails)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== checkPerson.id
                    ? person
                    : returnedPerson
              )
            )
            setNotification({
              text: `${checkPerson.name}'s number has been updated.`,
              type: 'notification'
            })
            setTimeout(() => setNotification(null), 5000) //added timing to display notification
          })
          .catch(error =>
            setPersons(persons.filter(person =>
              person.name !== checkPerson.name
            )
            )
        )
        setNotification({
          text: `Information of ${checkPerson.name} has already been removed from the server.`,
          type: 'error'
        })
        setTimeout(() => setNotification(null), 5000)
      }
    }
    if (!checkPerson) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .catch(error => {
          setNotification({
            text: error.response.data.error,
            type: 'error'
          })
          setTimeout(() => setNotification(null), 5000)
        })
      setNotification({
        text: `${personObject.name} successfully added to the phonebook.`,
        type: 'notification'
      })
      setTimeout(() => setNotification(null), 5000)
    }
    setNewName('')
    setNewNumber('')
  };

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    const confirmDelete = window.confirm(`If you want to delete ${person.name} click OK`);
    if (confirmDelete) {
      personService
        .remove(id) //by using an HTTP DELETE method with axios in the backend.ref: services->persons.js
        .then(returnedPerson => {
          persons.map(person => person.id !== id ? person : returnedPerson)
        })
      setPersons(persons.filter(person => person.id !== id))
      setNotification({ //to display notification
        text: `${person.name} has been removed successfully from the phonebook.`,
        type: 'notification'
      })
      setTimeout(() => setNotification(null), 5000)
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

