/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import CountryDropdown from "./CountryDropdown";
import Display from "./Display";
import "../css/Form.css";
import FormDataContext from "../context/FormContext";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { saveFormData, saveCountryData } = useContext(FormDataContext);

  const [countryFormValues, setCountryFormValues] = useState({
    country: null,
    state: null,
    city: null,
    zipCode: "",
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Save the form data to your app
    saveFormData(data);
    saveCountryData(countryFormValues);
    // Reset the form inputs
    reset();
    // Navigate to the display route
    navigate("/display");
  };

  const handleCountryFormChange = (newValues) => {
    setCountryFormValues((prevValues) => ({
      ...prevValues,
      ...newValues,
    }));
  };

  const handleCancel = () => {
    reset();
    setCountryFormValues({
      country: null,
      state: null,
      city: null,
      zipCode: "",
    });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <label>
        First Name:
        <input
          type="text"
          className="form-input"
          {...register("firstName", { required: true })}
        />
        {errors.firstName && (
          <span className="form-error">This field is required</span>
        )}
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          className="form-input"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && (
          <span className="form-error">This field is required</span>
        )}
      </label>

      <CountryDropdown
        values={countryFormValues}
        onChange={handleCountryFormChange}
      />

      <br />
      {/* Add more form fields as needed */}
      <div className="form-buttons">
        <button type="submit" className="form-button">
          Save
        </button>
        <button type="button" className="form-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
