import { React, useState, useRef } from "react"
import { Modal, Button } from 'react-bootstrap'
import useInput from "../../../hooks/useInput"

const RegisterModal = ({ show, handleClose, switchMode, setUser }) => {

    const emailInput = useInput("")
    const loginInput = useInput("")
    const passwordInput = useInput("")
    const password2Input = useInput("")
    const [waitingResponse, setWaitingResponse] = useState(false)

    const submitRef = useRef(null)
    const dismissRef = useRef(null)



    const handleRegister = (e) => {
        e.preventDefault()

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: emailInput.value,
                username: loginInput.value, 
                password: passwordInput.value
            })
        }

        const isEmpty = !(emailInput.value && loginInput.value && passwordInput.value && password2Input.value)
        console.log(emailInput.value)
        if (isEmpty) return
        if (passwordInput.value != password2Input.value) return

        setWaitingResponse(true)
    
        console.log(options)
        fetch("http://localhost:5000/api/register", options)
        .then(result => result.json())
        .then(json => {
            console.log(json)
            if(json.success) {
                dismissRef.current.click()
                setUser(json.user)
            }
        })
        .finally(() => setWaitingResponse(false))
    }

    const onKeyUp = (e) => {
        if (e.key != "Enter") return

        if (emailInput.value == "") emailInput.ref.current.focus()
        else if (loginInput.value == "") loginInput.ref.current.focus()
        else if (passwordInput.value == "") passwordInput.ref.current.focus()
        else if (password2Input.value == "") password2Input.ref.current.focus()
        else {
            submitRef.current.click()
            submitRef.current.focus()
        }
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label className="col-form-label">Email</label>
                    <input 
                        ref={emailInput.ref} 
                        className="form-control" 
                        type="email" 
                        id="emailInput" 
                        aria-describedby="emailHelp" 
                        onChange={emailInput.onChange} 
                        onKeyPress={onKeyUp} 
                        placeholder="name@example.com"
                        required>
                    </input>
                </div>
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
                <div className="form-group">
                    <label className="col-form-label">Password again</label>
                    <input 
                        ref={password2Input.ref} 
                        type="password" 
                        className="form-control" 
                        id="passwordInput2" 
                        onChange={password2Input.onChange} 
                        onKeyPress={onKeyUp} 
                        placeholder="Your super secret password again" 
                        required>
                    </input>
                    <small className="text-danger">{passwordInput.value !== password2Input.value ? "Passwords do not match" : null}</small>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <small className="text-muted" style={{"cursor" : "pointer"}} onClick={switchMode}>Already registered?</small>
                <Button ref={submitRef} type="submit" className="btn btn-primary" onClick={handleRegister}>
                    <span>Register</span>
                    {waitingResponse ? <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span> : null}
                </Button>
                <Button ref={dismissRef} onClick={handleClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RegisterModal