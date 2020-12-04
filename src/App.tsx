import React, { useContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Switch from "react-bootstrap/esm/Switch";
import { ExercisePage } from "./components/Pages/ExercisePage";
import UserContext from "./components/Context/UserContext";
import LoginPage from "./components/Pages/Login";

function App() {
  const { user } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">{user ? <ExercisePage /> : <LoginPage />}</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
