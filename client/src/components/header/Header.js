import { React, useState, useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap'
import AuthModal from '../AuthModal/AuthModal';

function Header({user, setUser}) {

    const [modalShow, setModalShow] = useState(false)

    const handleLogout = (e) => {
        setUser(null)
    }

    const handleShow = () => {
        setModalShow(true)
    }

    const handleClose = () => {
        console.log("awdaw")
        setModalShow(false)
    }

    return(
        <>
            <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-dark bg-transparent text-white px-4' id='modal'>
                <div className='container-fluid d-flex align-items-center justify-content-between'>
                    <span className='navbar-brand h2' style={{cursor: "default"}}>MP</span>
                    <span>
                    { user ? 
                        <span style={{display: "flex", alignItems: "center"}}>
                            <h5 style={{marginRight: "15px"}}>{user.name}</h5> 
                            <Button variant="outline-danger" size="sm" onClick={handleLogout}>Log out</Button>
                        </span>
                    :
                        <Button variant="primary" onClick={handleShow}>
                            Log in
                        </Button>
                    }
                        <AuthModal show={modalShow} handleClose={handleClose} user={user} setUser={setUser}></AuthModal>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Header