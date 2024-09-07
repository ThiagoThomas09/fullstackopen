import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (search) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const filteredCountries = response.data.filter(country =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          );          
          setCountries(filteredCountries)
        })
        .catch(error => {
          console.log('Error fetching countries', error);
        })
    }
  }, [search])

  return (
    <div>
      <label>find countries
        <input 
          type="text" 
          value={search} 
          onChange={handleSearchChange}
        />
      </label>
      
      {countries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {countries.length > 1 && countries.length <= 10 && (
        <ul>
          {countries.map(country => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      )}
      {countries.length === 1 && (
        <div>
          <h1>{countries[0].name.common}</h1>
          <p>capital: {countries[0].capital}</p>
          <p>area: {countries[0].area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.keys(countries[0].languages).map((code) => (
            <li key={code}>{countries[0].languages[code]}</li>
            ))}
          </ul>
          <img src={countries[0].flags.png} alt='flag'/>
        </div>
      )}
    </div>
  )
}

export default App
