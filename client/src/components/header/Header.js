import { React, useState, useContext } from 'react'
import { Auth } from '../Auth/Auth';

function Header({user, setUser}) {

    const addSpot = (e) => {
        
    }

    return(
        <>
            <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-dark bg-transparent text-white'>
                <div className='container-fluid d-flex align-items-center justify-content-between'>
                    <span className='navbar-brand h2'>MP</span>
                    <span>
                        { user ? 
                            <>
                                <span style={{marginRight: "30px"}}>{user.name}</span>
                                <button 
                                    type='button' 
                                    className={"btn btn-success"} 
                                    onClick={addSpot}
                                >                   
                                    Add spot
                                </button>
                            </>
                        :   
                            <>
                                <button 
                                    type='button' 
                                    className={"btn btn-primary"} 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#exampleModalCenter"
                                >                   
                                    Add spot
                                </button>
                            </>
                        }
                    </span>
                </div>
            </div>
            <Auth user={user} setUser={setUser}></Auth>
        </>
    )
}

export default Header