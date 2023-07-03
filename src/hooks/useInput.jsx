import { useState } from "react";
import useValidation from "./useValidation";

const useInput = (initialValue, validation) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDitry] = useState(false);
  const valid = useValidation(value, validation);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onBlur = (event) => {
    setDitry(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid
  };
};

export default useInput;
