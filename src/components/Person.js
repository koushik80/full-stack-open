const Person = ({ person, deletePerson }) => {
  const personStyle = {
    color: 'red',
    backgroundColor: 'black',
    padding: '5px',
    borderRadius: '5px'
  };

  return (
    <li>
      {person.name} {person.number}
      <button
        onClick={() => deletePerson(person.id)}
        style={personStyle}>Delete
      </button>
    </li >
  )
};

export default Person;