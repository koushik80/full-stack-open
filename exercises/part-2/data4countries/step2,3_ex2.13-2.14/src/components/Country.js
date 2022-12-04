
import Button from "./Button";

const Country = ({ country }) => (
  <li>
    {country.name} <Button />
  </li>
);

export default Country;