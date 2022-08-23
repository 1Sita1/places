import { React, useState, useEffect, useRef, useContext } from 'react'
import { Button } from 'react-bootstrap'
import Toggle from '../Toggle/Toggle'
import AuthModal from '../Modals/AuthModal/AuthModal'
import ThemeContext, { themes } from '../../contexts/ThemeContext'
import './Header.css'

function Header({user, setUser}) {

    const [authModal, setAuthModal] = useState(false) 
    const theme = useContext(ThemeContext)

    const handleLogout = (e) => {
        fetch(`${ process.env.REACT_APP_HOST }/api/logout`, {
            method: "POST",
            credentials: "include"
        })
        .then(() => setUser(null))
    }    

    return(
        <>
            <div 
                className={`navbar navbar-expand-lg fixed-top navbar-dark ${ theme.current.name === "dark" ? "bg-dark-20" : "bg-light-20" } text-white px-4`}
                id='modal'
            >
                <div className='container-fluid d-flex align-items-center justify-content-between'>
                    <span className={ "navbar-brand h2 text-" + theme.current.background } style={{cursor: "default"}}>I-Places</span>
                    <span className='d-flex align-items-center'>
                        <span className='d-flex align-items-center' style={{ marginRight: "30px" }}>
                            <Toggle
                                defaultChecked={ theme.name === "Light" }
                                icons={{
                                    checked: <img style={{ width: "20px", height: "auto" }} src='themes/Light.png'></img>,
                                    unchecked: <img style={{ width: "20px", height: "auto" }} src='themes/Dark.png'></img>,
                                }}
                                onChange={e => {
                                    if (theme.current.name === "light") theme.setTheme(themes.dark)
                                    else theme.setTheme(themes.light)
                                }} 
                            />
                        </span>
                        { 
                            user ? 
                                <span style={{display: "flex", alignItems: "center"}}>
                                    <h5 className={ "text-" + theme.current.background } style={{marginRight: "15px"}}>{ user.name }</h5> 
                                    <Button variant="outline-danger" size="sm" onClick={handleLogout}>Log out</Button>
                                </span>
                            :
                                <Button variant="primary" onClick={() => setAuthModal(true)}>
                                    Log in
                                </Button>
                        }

                        <AuthModal
                            show={authModal}
                            handleClose={() => setAuthModal(false)}
                            setUser={setUser}
                        >
                        </AuthModal>
                         
                    </span>
                </div>
            </div>
        </>
    )
}

export default Header