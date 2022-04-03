import { React, useState, useEffect, useRef, useContext } from 'react'
import loginApi from '../../fakeAPI/login'

export const Auth = ({user, setUser}) => {

    const [mode, setMode] = useState("login")
    const [email, setEmail] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [waitingResponse, setWaitingResponse] = useState(false)

    const emailRef = useRef(null)
    const loginRef = useRef(null)
    const dismissRef = useRef(null)
    const passwordRef = useRef(null)
    const password2Ref = useRef(null)
    const submitRef = useRef(null)



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

    useEffect(() => console.log(user))



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
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"  aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title">{mode == "login" ? "Log in" : "Register"}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>
                        <div className="modal-body" style={{"textAlign": "left"}}>
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
                                <small className="text-danger">{password != password2 ? "Passwords do not match" : null}</small>
                            </div> : null}
                        </div>
                        <div className="modal-footer">
                            <small className="text-muted" onClick={changeMode} style={{"cursor" : "pointer"}}>{mode == "login" ? "Dont have an account?" : "Already registered?"}</small>
                            <button ref={submitRef} type="submit" className="btn btn-primary" onClick={handleAuth}>
                                {mode == "login" ? "Log in" : "Register"}
                                {waitingResponse ? <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span> : null}
                            </button>
                            <button ref={dismissRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
