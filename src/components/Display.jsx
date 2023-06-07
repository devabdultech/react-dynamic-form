/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import FormDataContext from "../context/FormContext";
import CountryDropdown from "./CountryDropdown";
import "../css/Display.css";

const Display = () => {
  const { formData, countryData, updateFormData, updateCountryData } =
    useContext(FormDataContext);
  const [editing, setEditing] = useState(false);
  const [editedCountryData, setEditedCountryData] = useState({});
  const [editedZipCode, setEditedZipCode] = useState("");
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");

  useEffect(() => {
    setEditedCountryData(countryData);
    setEditedZipCode(formData.zipCode);
    setEditedFirstName(formData.firstName);
    setEditedLastName(formData.lastName);
  }, [countryData, formData]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    updateCountryData(editedCountryData);
    updateFormData((prevData) => ({
      ...prevData,
      country: editedCountryData.country,
      state: editedCountryData.state,
      city: editedCountryData.city,
      zipCode: editedZipCode,
      firstName: editedFirstName,
      lastName: editedLastName,
    }));
  };

  const handleCountryFormChange = (newValues) => {
    setEditedCountryData((prevValues) => ({
      ...prevValues,
      ...newValues,
    }));
  };

  const handleZipCodeChange = (event) => {
    setEditedZipCode(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setEditedFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setEditedLastName(event.target.value);
  };

  return (
    <div className="display-container">
      <h2>Display Information</h2>
      <div className="display-content">
        <div className="display-field">
          <label>First Name:</label>
          {editing ? (
            <input
              type="text"
              value={editedFirstName}
              onChange={handleFirstNameChange}
            />
          ) : (
            <span>{editedFirstName}</span>
          )}
        </div>
        <div className="display-field">
          <label>Last Name:</label>
          {editing ? (
            <input
              type="text"
              value={editedLastName}
              onChange={handleLastNameChange}
            />
          ) : (
            <span>{editedLastName}</span>
          )}
        </div>
        <div className="display-field">
          <label>Country:</label>
          {editing ? (
            <CountryDropdown
              values={editedCountryData}
              onChange={handleCountryFormChange}
            />
          ) : (
            <span>{editedCountryData.country?.name}</span>
          )}
        </div>
        <div className="display-field">
          <label>State:</label>
          <span>{editedCountryData.state?.name}</span>
        </div>
        <div className="display-field">
          <label>City:</label>
          <span>{editedCountryData.city?.name}</span>
        </div>
        <div className="display-field">
          <label>Zip Code:</label>
          {editing ? (
            <input
              type="text"
              value={editedZipCode}
              onChange={handleZipCodeChange}
            />
          ) : (
            <span>{formData.zipCode}</span>
          )}
        </div>
      </div>
      {editing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <EditButton onClick={handleEdit} />
      )}
    </div>
  );
};

const EditButton = ({ onClick }) => {
  return <button onClick={onClick}>Edit</button>;
};

export default Display;
