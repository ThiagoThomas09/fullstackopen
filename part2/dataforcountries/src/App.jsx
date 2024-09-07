import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setSelectedCountry(null);
    setWeather(null);
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
    } else {
      setCountries([])
    }
  }, [search])

  useEffect(() => {
    if(countries.length === 1) {
      setSelectedCountry(countries[0]);
    }
  }, [countries])

  useEffect(() => {
    if (selectedCountry) {
      const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY;
      
      const capital = selectedCountry.capital[0]
      
      const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${api_key}&units=metric`

      axios
        .get(weatherApiUrl)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => {
          console.log('Error', error);
        })
    }
  }, [selectedCountry])



  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

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
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      )}

      {selectedCountry && (
        <div>
        <h1>{selectedCountry.name.common}</h1>
        <p>capital: {selectedCountry.capital}</p>
        <p>area: {selectedCountry.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.keys(selectedCountry.languages).map((code) => (
          <li key={code}>{selectedCountry.languages[code]}</li>
          ))}
        </ul>
        <img src={selectedCountry.flags.png} alt='flag'/>
      </div>
      )}

      {weather && (
        <div>
          <h3>Weather in {weather.name}</h3>
          <p>Temperature: {weather.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon" />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default App
