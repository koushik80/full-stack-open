import React from "react";
import Country from "./Country";
import CountryInfo from "./CountryInfo";


const Countries = ({ countries, filterValue }) => {
  let filteredCountry = [];

  if (filterValue.length > 0) {
    filteredCountry = countries.filter(country =>
      country.name.toLowerCase().includes(filterValue.toLowerCase()))
  } else {
    filteredCountry = countries
  }

  if (filteredCountry.length > 10) {
    return 'Too many matches, specify another filter';

  } else if (filteredCountry.length === 1) {
    return (
      <div>
        <CountryInfo country={filteredCountry[0] } />
      </div>
        )
  } else {
    return (
      <div>
        <ul>
          {filteredCountry.map(country =>
            <Country
                key={country.name}
                country={country}
            />
          )}
        </ul>
      </div>
    )
  }
}

export default Countries;
