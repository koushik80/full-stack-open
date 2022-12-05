const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <div>
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange}
        />
      </div><br />
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumberChange}
        /><br />
      </div><br />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
)

export default PersonForm;