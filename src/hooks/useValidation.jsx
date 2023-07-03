import { useState, useEffect } from "react";

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          if (value.length < validations[validation]) {
            setMinLengthError(true);
          } else {
            setMinLengthError(false)
          }
          break;
        case 'maxLength':
          if (value.length > validations[validation]) {
            setMaxLengthError(true);
          } else {
            setMaxLengthError(false)
          }
          break;
        case 'isEmpty':
          if (value) {
            setEmpty(false);
          } else {
            setEmpty(true);
          }
          break;
        case 'isEmail':
          if (re.test(String(value).toLocaleLowerCase())) {
            setEmailError(false);
          } else {
            setEmailError(true);
          }
          break;
        default:
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || minLengthError || maxLengthError || emailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, maxLengthError, emailError]);

  return {
    isEmpty,
    emailError,
    minLengthError,
    maxLengthError,
    inputValid,
  }
};

export default useValidation;
