import { React, useState, useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap'
import AuthModal from '../Modals/AuthModal/AuthModal'
import './Header.css'

function Header({user, setUser}) {

    const [authModal, setAuthModal] = useState(false) 

    const handleLogout = (e) => {
        fetch(`${ process.env.REACT_APP_HOST }/api/logout`, {
            method: "POST",
            credentials: "include"
        })
        .then(() => setUser(null))
    }    

    return(
        <>
            <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-dark bg-transparent text-white px-4' id='modal'>
                <div className='container-fluid d-flex align-items-center justify-content-between'>
                    <span className='navbar-brand h2' style={{cursor: "default"}}>I-Places</span>
                    <span>

                        { 
                            user ? 
                                <span style={{display: "flex", alignItems: "center"}}>
                                    <h5 style={{marginRight: "15px"}}>{ user.name }</h5> 
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