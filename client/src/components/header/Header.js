import React from 'react'

function Header() {
    return(
        <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-dark mg-0'>
            <div className='container-fluid'>
                <span className='navbar-brand h2'>MP</span>
                <button type='button' className='btn btn-primary'>Add spot</button>
            </div>
        </div>
    )
}

export default Header