const Person = ({ person, deletePerson }) =>
  <li>
    {person.name} {person.number}
    <button onClick={() => deletePerson(person.id)}
      style={{
        color: "red",
        backgroundColor: "black",
        padding: "5px",
        borderRadius: "5px"
      }}>Delete
    </button>
  </li>

export default Person;