/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { Country, State, City } from "country-state-city";
import FormDataContext from "../context/FormContext";
import "../css/CountryDropdown.css";

const CountryDropdown = ({ values, onChange }) => {
  const { country, state, city, zipCode } = values;

  const { saveCountryData } = useContext(FormDataContext);

  const [defaultCountry, setDefaultCountry] = useState(
    "--- Select a Country ---"
  );
  const [defaultState, setDefaultState] = useState("--- Select a State ---");
  const [defaultCity, setDefaultCity] = useState("--- Select a City ---");

  const [countries, setCountries] = useState();
  const [states, setStates] = useState();
  const [cities, setCities] = useState();

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (country) {
      setStates(State.getStatesOfCountry(country?.isoCode));
      setCities([]);
    }
  }, [country]);

  useEffect(() => {
    if (state && country) {
      setCities(City.getCitiesOfState(country?.isoCode, state?.isoCode));
    }
  }, [state, country]);

  const handleChangeCountry = (e) => {
    const selectedCountry = countries?.find((c) => c.name === e.target.value);
    const newValues = {
      ...values,
      country: selectedCountry,
      state: null,
      city: null,
      zipCode: "",
    };

    setDefaultCountry(e.target.value);
    setDefaultState("--- Select a State ---");
    setDefaultCity("--- Select a City ---");
    setStates(State.getStatesOfCountry(selectedCountry?.isoCode));
    setCities([]);
    onChange(newValues);
  };

  const handleChangeState = (e) => {
    const selectedState = states?.find((s) => s.name === e.target.value);
    const newValues = {
      ...values,
      state: selectedState,
      city: null,
    };

    setDefaultState(e.target.value);
    setCities(City.getCitiesOfState(country?.isoCode, selectedState?.isoCode));
    onChange(newValues);
  };

  const handleChangeCity = (e) => {
    const selectedCity = cities?.find((c) => c.name === e.target.value);
    const newValues = {
      ...values,
      city: selectedCity,
    };

    setDefaultCity(e.target.value);
    onChange(newValues);
  };

  const handleChangeZipCode = (e) => {
    const newValues = {
      ...values,
      zipCode: e.target.value,
    };

    onChange(newValues);
  };

  return (
    <>
      <div className="form-group">
        <label className="form-label">Country</label>

        <select
          onChange={handleChangeCountry}
          value={defaultCountry}
          className="form-select"
        >
          <option>--- Select a Country ---</option>
          {countries?.map((country, index) => (
            <option value={country.name} key={index}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {country && (
        <>
          <div className="form-group">
            <label className="form-label">State</label>

            <select
              onChange={handleChangeState}
              value={defaultState}
              className="form-select"
            >
              <option>--- Select a State ---</option>
              {states?.map((state, index) => (
                <option value={state.name} key={index}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">City</label>

            <select
              onChange={handleChangeCity}
              value={defaultCity}
              className="form-select"
            >
              <option>--- Select a City ---</option>
              {cities?.map((city, index) => (
                <option value={city.name} key={index}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Zip Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={handleChangeZipCode}
              className="form-input"
            />
          </div>
        </>
      )}
    </>
  );
};

export default CountryDropdown;
