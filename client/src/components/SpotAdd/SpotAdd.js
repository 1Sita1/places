import React, { useState, useRef } from "react"
import { Modal, Button } from 'react-bootstrap'
import useInput from "../../hooks/useInput"
import InfoBar from "../InfoBar/InfoBar"
import "./SpotAdd.css"

const SpotAdd = (props) => {

    const [waitingResponse, setWaitingResponse] = useState(false)
    const [img, setImg] = useState("yes.gif")
    const headerInput = useInput("Example header")
    const descInput = useInput("Wasaaaap wasassaaaaaap")

    const filesRef = useRef(null)

    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()

    today = dd + '.' + mm + '.' + yyyy;


    const submitHandler = () => {
        setWaitingResponse(true)
        const request = {
            position: props.position,
            header: headerInput.value,
            image: img,
            description: descInput.value
        }
        console.log(request)
    }

    const closeHandler = () => {
        props.setSpotModal(null)
    }

    const filesUploaded = (files) => {
        const reader  = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = (progEvent) => {
            setImg(progEvent.currentTarget.result)
        }
    }
    
    
    const onKeyUp = (e) => {

    }

    return (
        <Modal size="lg" show={props.show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>New spot</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label className="col-form-label">Spot header</label>
                <input 
                    ref={headerInput.ref} 
                    className="form-control"
                    onChange={(e) => headerInput.onChange(e)} 
                    onKeyPress={onKeyUp} 
                    placeholder={headerInput.value}
                    required>
                </input>

                <label className="col-form-label">Add picture</label>
                <input 
                    ref={filesRef} 
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => filesUploaded(e.target.files)}
                    required>
                </input>

                <label className="col-form-label">Add description</label>
                <textarea 
                    ref={descInput.ref} 
                    type="file"
                    className="form-control"
                    rows="4" cols="50"
                    onChange={(e) => descInput.onChange(e)}
                    required>
                </textarea>

                <div 
                    className="py-2 mt-4" 
                    style={{display: "flex", justifyContent: "center", backgroundColor: "var(--bs-gray-800)"}}
                >
                    <InfoBar 
                        img={img} 
                        header={headerInput.value} 
                        rating={{
                            votes: 0,
                            stars: new Array(5).fill(false)
                        }} 
                        created={{
                            date: today,
                            by: props.user ? props.user.name : "UNKNOWN"
                        }} 
                        style={{position: "static", transform: "scale(0.8)"}}
                    >
                        { descInput.value }
                    </InfoBar>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" className="btn btn-primary" onClick={submitHandler}>
                    Submit
                    {waitingResponse ? 
                        <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span> 
                    : null}
                </Button>
                <Button onClick={closeHandler} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</Button>
            </Modal.Footer>
        </Modal>
    )

}

export default SpotAdd