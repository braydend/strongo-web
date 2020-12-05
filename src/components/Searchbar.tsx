import React, { ChangeEvent, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";

type SearchbarProps = {
  onChange: (x: string) => void;
};

const Searchbar = ({ onChange }: SearchbarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setQuery(value);
    onChange(value);
  };

  return (
    <InputGroup className="mb-3 mt-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">
          Search for an exercise:
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl value={query} onChange={handleChange} placeholder="Search" />
    </InputGroup>
  );
};

export default Searchbar;
