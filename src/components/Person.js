const Person = ({ person, i }) =>
    <li key={i}>{person.name} {person.number}</li>

export default Person;