import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ThemeContext, { themes } from './contexts/ThemeContext';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    const [user, setUser] = useState(null)
    const [theme, setTheme] = useState(themes.dark)
    const [inPanorama, setInPanorama] = useState(false)

    useEffect(() => {
        fetch(`${ process.env.REACT_APP_HOST }/api/user`, {
            credentials: "include"
        })
        .then(data => data.json())
        .then(json => {
            setUser(json.user)
        })
        .catch(e => {})
    }, [])

    return (
        <ThemeContext.Provider value={{ current: theme, setTheme }}>
            <div className="App">
                { !inPanorama && <Header user={user} setUser={setUser} /> }
                <Map user={user} setUser={ setUser } setInPanorama={ setInPanorama } />
                <ToastContainer
                    position="bottom-right"
                    theme={ theme.name }
                />
            </div>
        </ThemeContext.Provider>
    )
}

export default App
