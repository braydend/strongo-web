import React from 'react';
import './App.css';
import Layout from './components/Layout';
import { UserProvider } from './utils/UserContext';


function App() {
  return (
    <UserProvider>
      <div className="App">
        <Layout />
      </div>
    </UserProvider>
  );
}

export default App;
