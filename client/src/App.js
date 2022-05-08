import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header/Header';
import Map from './components/map/Map';
import React, { useState, useEffect } from 'react';
import { Toasts } from './components/Toasts/Toasts';

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="App">
        <Header user={user} setUser={setUser} />
        <Map user={user} setUser={setUser} />
        <Toasts />
    </div>
  );
}

export default App;
