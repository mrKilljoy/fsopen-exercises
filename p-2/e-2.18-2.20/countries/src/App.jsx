import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [countries, setCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!value || value.length < 3) {
      setDisplayedCountries([]);
      setCurrentCountry(null);
    }

    setDisplayedCountries(countries.filter(x => x.name.common.toLowerCase().includes(value.toLowerCase())));
  }

  const handleCountryClick = (country) => {
    if (!country)
      return;

    console.log('clicked country:', country);
    setCurrentCountry(country);
  }

  const initializeCountryList = () => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(x => x.data)
      .then(x => setCountries(x))
      .catch(err => console.error('failed to fetch countries:', err));
  }

  useEffect(initializeCountryList, []);

  return (
    <>
      <div>
        <p>Find countries:</p>
        <input type="text" value={input} onChange={handleInputChange} />
      </div>
      <div>
        {input != null && input.length > 2 &&
          <>
            <ul>
              {displayedCountries.map((x) =>
                <>
                  <li key={x.name.common}>{x.name.common} <button onClick={() => handleCountryClick(x)}>Show</button></li>
                </>
              )}
            </ul>
            {currentCountry != null &&
              <div>
                <h2>{currentCountry.name.common}</h2>
                <p>Capital: {currentCountry.capital}</p>
                <p>Area: {currentCountry.area}</p>
                <h3>Languages:</h3>
                <ul>
                  {Object.values(currentCountry.languages).map((x) => <li key={x}>{x}</li>)}
                </ul>
                <img src={currentCountry.flags.png} alt={`Flag of ${currentCountry.name.common}`} />
              </div>
            }
          </>
        }
      </div>
    </>
  )
}

export default App
