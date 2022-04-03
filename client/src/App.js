import './App.css';
import Header from './components/header/Header';
import Map from './components/map/Map';
import React, {useState} from 'react';

function App() {

  const [user, setUser] = useState(null)




  return (
    <div className="App">
        <Header user={user} setUser={setUser}></Header>
        <Map />
    </div>
  );
}

export default App;
