import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`${ process.env.REACT_APP_HOST }/api/user`, {
      credentials: "include"
    })
    .then(data => data.json())
    .then(json => {
      setUser(json.user)
    })
  }, [])

  return (
    <div className="App">
        <Header user={user} setUser={setUser} />
        <Map user={user} setUser={setUser} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </div>
  );
}

export default App;
