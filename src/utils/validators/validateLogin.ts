const validateLogin = (values: { email: string; password: string }) => {
  let emailError;
  let passwordError;
  let errors = {};

  //email errors
  if (!values.email) {
    emailError = "An email is required.";
    Object.assign(errors, { email: emailError });
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    emailError = "An invalid email was entered.";
    Object.assign(errors, { email: emailError });
  }
  //password errors
  if (!values.password) {
    passwordError = "A password is required.";
    Object.assign(errors, { password: passwordError });
  } else if (values.password.length < 6) {
    passwordError = "Password must be atleast 6 characters.";
    Object.assign(errors, { password: passwordError });
  }

  return errors;
};

export default validateLogin;
