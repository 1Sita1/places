import { React, useState, useRef } from "react"
import { Modal, Button } from 'react-bootstrap'
import loginApi from '../../fakeAPI/login'

const AuthModal = ({ show, handleClose, setUser }) => {

    const [mode, setMode] = useState("login")
    const [email, setEmail] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [waitingResponse, setWaitingResponse] = useState(false)

    const emailRef = useRef(null)
    const loginRef = useRef(null)
    const passwordRef = useRef(null)
    const password2Ref = useRef(null)
    const submitRef = useRef(null)
    const dismissRef = useRef(null)



    const handleAuth = (e) => {
        if (mode == "register") {
            if (!email || !login || !password || !password2) return
            e.preventDefault()

            if (password != password2) return

            setWaitingResponse(true)
            loginApi(login, password).then(() => {
                alert("success")
            }).catch(() => {
                alert("failed")
            }).finally(() => setWaitingResponse(false))
        }
        else {
            if (!login || !password) return
            e.preventDefault()

            setWaitingResponse(true)
            loginApi(login, password).then(() => {
                dismissRef.current.click()
                setUser({
                    name: "abobusS",
                })
            }).catch(() => {
                alert("failed")
            }).finally(() => setWaitingResponse(false))
        }
    }

    const changeMode = () => {
        setMode(mode => mode == "login" ? "register" : "login")
    }

    const onKeyUp = (e) => {
        if (e.key != "Enter") return

        if (mode == "register") {
            if (email == "") emailRef.current.focus()
            else if (login == "") loginRef.current.focus()
            else if (password == "") passwordRef.current.focus()
            else if (password2 == "") password2Ref.current.focus()
            else {
                submitRef.current.click()
                submitRef.current.focus()
            }
        }
        else {
            if (login == "") loginRef.current.focus()
            else if (password == "") passwordRef.current.focus()
            else {
                submitRef.current.click()
                submitRef.current.focus()
            }
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{mode == "login" ? "Log in" : "Register"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {mode == "register"? <div className="form-group">
                    <label className="col-form-label">Email</label>
                    <input ref={emailRef} className="form-control" type="email" id="emailInput" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} onKeyPress={onKeyUp} placeholder="name@example.com" required></input>
                </div> : null}
                <div className="form-group">
                    <label className="col-form-label">Username</label>
                    <input ref={loginRef} className="form-control" type="text" id="loginInput" onChange={(e) => setLogin(e.target.value)} onKeyPress={onKeyUp} placeholder="Your fancy username" required></input>
                </div>
                <div className="form-group">
                    <label className="col-form-label">Password</label>
                    <input ref={passwordRef} type="password" className="form-control" id="passwordInput" onChange={(e) => setPassword(e.target.value)} onKeyPress={onKeyUp} placeholder="Your super secret password" required></input>
                </div>
                {mode == "register"? <div className="form-group">
                    <label className="col-form-label">Password again</label>
                    <input ref={password2Ref} type="password" className="form-control" id="passwordInput2" onChange={(e) => setPassword2(e.target.value)} onKeyPress={onKeyUp} placeholder="Your super secret password again" required></input>
                    <small className="text-danger">{password !== password2 ? "Passwords do not match" : null}</small>
                </div> : null}
            </Modal.Body>
            <Modal.Footer>
                <small className="text-muted" onClick={changeMode} style={{"cursor" : "pointer"}}>{mode == "login" ? "Dont have an account?" : "Already registered?"}</small>
                <Button ref={submitRef} type="submit" className="btn btn-primary" onClick={handleAuth}>
                    {mode == "login" ? "Log in" : "Register"}
                    {waitingResponse ? <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span> : null}
                </Button>
                <Button ref={dismissRef} onClick={handleClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AuthModal