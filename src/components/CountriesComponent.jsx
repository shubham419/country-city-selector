import { useState } from "react";
import styles from "./CountriesComponent.module.css";
import { fetchCities, fetchCountries, fetchStates } from "../api/api";
import { useEffect } from "react";

const CountriesComponent = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const getCountriesData = async () => {
    const data = await fetchCountries(); 
    if (data) setCountries(data);
  };

  const getStateData = async () => {
    if (selectedCountry) {
      const data = await fetchStates(selectedCountry);
      if (data) setStates(data);
    }
  };

  const getCitiesData = async () => {
    console.log("searching cities")
    if (selectedCountry && selectedState) {
      console.log("both present")
      const data = await fetchCities(selectedCountry, selectedState);
      if (data) setCities((prv) => {
        console.log(prv)
        return data;
      });
    }
  };

  const countryHandler = (event) => {
    setSelectedCountry(event.target.value);
    setCities([]);
    setSelectedState("");
    setSelectedCity("");
  };

  const stateHandler = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity("");
  };

  const cityHandler = (event) => {
    setSelectedCity(event.target.value);
  };

  useEffect(() => {
    console.log("mount phase");
    getCountriesData();
  }, []);

  useEffect(() => {
    getStateData();
  }, [selectedCountry]);

  useEffect(() => {
    getCitiesData();
  }, [selectedState]);

  return (
    <div className={styles.wrapper}>
      <h1>Select Location</h1>
      <div>
        <select onChange={countryHandler}>
          <option value="" disabled selected hidden>
            Select Country
          </option>
          {countries.map((country) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>
        <select onChange={stateHandler}>
          <option value="" disabled selected hidden>
            Select State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select onChange={cityHandler}>
          <option value="" disabled selected hidden>
            Select State
          </option>
          {cities.map((city) => (
            <option value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCity ? <p>{`You selected ${selectedCity}, ${selectedState}, ${selectedCountry}`}</p> : null}
    </div>
  );
};

export default CountriesComponent;
