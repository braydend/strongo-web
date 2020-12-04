import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Exercises } from "./components/Pages/Exercises";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Exercises />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
