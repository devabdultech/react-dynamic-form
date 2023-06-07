/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState(null);
  const [countryData, setCountryData] = useState(null);

  const saveFormData = (data) => {
    setFormData(data);
  };

  const updateFormData = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const saveCountryData = (data) => {
    setCountryData(data);
  };

  return (
    <FormDataContext.Provider
      value={{
        formData,
        saveFormData,
        updateFormData,
        countryData,
        saveCountryData,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};

export default FormDataContext;
