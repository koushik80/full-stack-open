import React from "react";
import Language from "./Language";
import Weather from "./Weather";

const CountryInfo = ({ country }) => (
    <div>
    <h1>{country.name}</h1>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>
    <h2>languages</h2>
    <ul>
      {country.languages.map(language => (<Language key={language.name} language={language.name} />))}
    </ul>
    <img src={country.flag} width="33%" height="33%" alt="" />
    <Weather capital={country.capital} />
  </div>
);

export default CountryInfo;
