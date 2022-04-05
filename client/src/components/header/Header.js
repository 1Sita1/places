import { React, useState, useEffect, useRef } from 'react'
import { Auth } from '../Auth/Auth';

function Header({user, setUser}) {

    const [modal, setModal] = useState(false)

    const addSpot = (e) => {
        setModal(true)
    }

    return(
        <>
            <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-dark bg-transparent text-white px-4' id='modal'>
                <div className='container-fluid d-flex align-items-center justify-content-between'>
                    <span className='navbar-brand h2'>MP</span>
                    <span>
                        <Auth user={user} setUser={setUser}></Auth>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Header