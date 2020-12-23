import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./components/Context/UserContext";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Container>
        <App />
      </Container>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
