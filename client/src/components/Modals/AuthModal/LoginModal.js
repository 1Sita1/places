import { React, useState, useRef } from "react"
import { Modal, Button } from 'react-bootstrap'
import useInput from "../../../hooks/useInput"

const LoginModal = ({ show, handleClose, switchMode, setUser }) => {

    const loginInput = useInput("")
    const passwordInput = useInput("")
    const [waitingResponse, setWaitingResponse] = useState(false)

    const submitRef = useRef(null)
    const dismissRef = useRef(null)



    const handleLogin = (e) => {
        e.preventDefault()

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                username: loginInput.value, 
                password: passwordInput.value
            })
        }

        
        if (!loginInput.value || !passwordInput.value) return

        setWaitingResponse(true)

        fetch("http://localhost:5000/api/login", options)
        .then(result => result.json())
        .then(json => {
            console.log(json)
            if (json.success) {
                dismissRef.current.click()
                setUser(json.user)
            }
            else {
                console.log("failed")
            }
        })
        .finally(() => setWaitingResponse(false))
    }

    const onKeyUp = (e) => {
        if (e.key != "Enter") return

        if (loginInput.value == "") loginInput.ref.current.focus()
        else if (passwordInput.value == "") passwordInput.ref.current.focus()
        else {
            submitRef.current.click()
            submitRef.current.focus()
        }
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Log in</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label className="col-form-label">Username</label>
                    <input 
                        ref={loginInput.ref} 
                        className="form-control" 
                        type="text" 
                        id="loginInput" 
                        onChange={loginInput.onChange} 
                        onKeyPress={onKeyUp} 
                        placeholder="Your fancy username" 
                        required>
                    </input>
                </div>
                <div className="form-group">
                    <label className="col-form-label">Password</label>
                    <input 
                        ref={passwordInput.ref} 
                        type="password" 
                        className="form-control" 
                        id="passwordInput" 
                        onChange={passwordInput.onChange} 
                        onKeyPress={onKeyUp} 
                        placeholder="Your super secret password" 
                        required>
                    </input>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <small className="text-muted" style={{"cursor" : "pointer"}} onClick={switchMode}>Dont have an account?</small>
                <Button ref={submitRef} type="submit" className="btn btn-primary" onClick={handleLogin}>
                    <span>Log in</span>
                    {waitingResponse ? <span className="spinner-border spinner-border-sm ml-4" role="status" aria-hidden="true"></span> : null}
                </Button>
                <Button ref={dismissRef} onClick={handleClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LoginModal