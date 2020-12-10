import { useState } from "react";

export const useFormValidation = <T>(
  initialState: T,
  validate: any,
  action: () => void
) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = <T>(event: any, key?: string, value?: T) => {
    if (key && value) {
      setValues((previousValues: any) => ({
        ...previousValues,
        [key]: value,
      }));

      return;
    }
    const targetValue = event.target.value;
    const id = event.target.id;
    setValues((previousValues: any) => ({
      ...previousValues,
      [key || id]: value || targetValue,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const validationErrors = validate(values);
    const noErrors = Object.keys(validationErrors).length === 0;

    if (noErrors) {
      action();
    }

    setErrors(validationErrors);
    setIsSubmitting(false);
  };

  return {
    handleSubmit,
    handleChange,
    values,
    setValues,
    isSubmitting,
    errors,
  };
};
