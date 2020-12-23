import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import validateLogin from "../utils/validators/validateLogin";
import validateRegistration from "../utils/validators/validateRegistration";
import { useFormValidation } from "./useFormValidation";

type FormType = {
  email: string;
  password: string;
};

const INITIAL_STATE: FormType = {
  email: "",
  password: "",
};

type Props = {
  onSubmit: () => void;
  validator: (values: FormType) => {};
};

const TestComponent: React.FC<Props> = ({ onSubmit, validator }) => {
  const {
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
    errors,
  } = useFormValidation<FormType>(INITIAL_STATE, validator, onSubmit);

  const hasErrors = Object.keys(errors).length !== 0;
  const hasValues = Object.values(values).filter((v) => !!v).length !== 0;

  return (
    <div>
      <input
        value={values.email}
        id="email"
        data-testid="email-input"
        onChange={handleChange}
      />
      <input
        value={values.password}
        id="password"
        onChange={handleChange}
        data-testid="password-input"
      />
      <button onClick={handleSubmit}>Submit</button>
      {hasErrors && (
        <div data-testid="errors">
          {Object.values(errors).map((e, i) => (
            <p key={`${e}-${i}`}>{e}</p>
          ))}
        </div>
      )}
      {hasValues && (
        <div data-testid="values">
          {Object.values(values).map((v, i) => (
            <p key={`${v}-${i}`}>{v}</p>
          ))}
        </div>
      )}
      {isSubmitting && <div>Submitting</div>}
    </div>
  );
};

describe("useFormValidation", () => {
  const setUp = (customProps?: Partial<Props>) => {
    const validator = validateLogin;

    const props: Props = {
      ...customProps,
      onSubmit: jest.fn(),
      validator,
    };

    return render(<TestComponent {...props} />);
  };

  test("errors are returned when no values are submitted", () => {
    setUp();

    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByTestId("errors")).toBeInTheDocument();
    expect(screen.queryByTestId("values")).not.toBeInTheDocument();
  });

  describe("validation errors", () => {
    test("email error", () => {
      setUp();

      fireEvent.change(screen.getByTestId("email-input"), {
        target: {
          value: "bademail",
        },
      });
      fireEvent.click(screen.getByText("Submit"));

      expect(screen.getByTestId("errors")).toBeInTheDocument();
      expect(
        screen.getByText("An invalid email was entered.")
      ).toBeInTheDocument();
      expect(screen.queryByText("bademail")).toBeInTheDocument();
    });
  });
});
