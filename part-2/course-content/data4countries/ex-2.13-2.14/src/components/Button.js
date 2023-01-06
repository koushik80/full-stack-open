import {useState} from "react";

const Button = ({ country }) => {
  // eslint-disable-next-line
   const [countries, setCountries] = useState([]);
  return (
    <button onClick={() => setCountries([country])}>show</button>
  )
}

export default Button;



