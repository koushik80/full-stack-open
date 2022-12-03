import React from 'react';

const CountryInfo = ({ country }) => (
  <div>
    <h1>{country[0].name}</h1>
    <p>capital {country[0].capital}</p>
    <p>population {country[0].population}</p>
    <h2>languages</h2>
    <ul>
      {country[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={country[0].flag} width="33%" height="33%" alt="" />
  </div>
);

export default CountryInfo;
