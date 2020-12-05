import { useEffect, useState } from "react";

export const useFormValidation = <T>(
  initialState: T,
  validate: any,
  action: () => void
) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;

      if (noErrors) {
        action();
        setValues(initialState);
        setIsSubmitting(false);
      } else {
        // toast(Object.values(errors).join(" "));
        setIsSubmitting(false);
      }
    }
  }, [errors]);

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
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
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
