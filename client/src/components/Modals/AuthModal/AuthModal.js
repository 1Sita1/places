import React, { useState } from 'react'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

function AuthModal(props) {
    const [mode, setMode] = useState("login")

    const switchMode = () => {
        setMode((oldMode) => {
            if (oldMode === "login") return "register"
            if (oldMode === "register") return "login"
        })
    }

    return (
        mode === "login" ? 
            <LoginModal
                { ...props }
                switchMode={switchMode}
            ></LoginModal> 
            :
            <RegisterModal
                { ...props }
                switchMode={switchMode}
            ></RegisterModal>
    )
}

export default AuthModal