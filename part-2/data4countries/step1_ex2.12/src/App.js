//ex: 2.12
import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.value)
  };


  return (
    <div>
      <Filter
        filter={filter}
        handleFilter={handleFilter}
      />
      <Countries
        countries={countries}
        filterValue={filter}
      />
    </div>
  )
}

export default App;
