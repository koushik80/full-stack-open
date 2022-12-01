const Person = ({ person, i }) =>
    <li key={i}>{person.name}</li>


export default Person;