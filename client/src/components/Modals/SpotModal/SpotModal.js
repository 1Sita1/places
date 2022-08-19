import React, { useState, useRef } from "react"
import { Modal, Button } from 'react-bootstrap'
import useInput from "../../../hooks/useInput"
import InfoBar from "../../InfoBar/InfoBar"
import "./SpotModal.css"


const SpotModal = (props) => {

    const [waitingResponse, setWaitingResponse] = useState(false)
    const [img, setImg] = useState("yes.gif")
    const [imgForUpload, setImgForUpload] = useState(null)
    const headerInput = useInput("Example header")
    const descInput = useInput("Wasaaaap wasassaaaaaap")

    const filesRef = useRef(null)

    const eventHandler = (event, ...rest) => {
        switch(event) {

            case "submit": 
                setWaitingResponse(true)
                console.log(props)
                const formData = new FormData()
                formData.append("location", JSON.stringify(props.position))
                formData.append("header", headerInput.value)
                formData.append("place-img", imgForUpload)
                formData.append("body", descInput.value)

                const options = {
                    method: "POST",
                    credentials: 'include',
                    body: formData
                }

                fetch(`${ process.env.REACT_APP_HOST }/api/markers`, options)
                .then(result => result.json())
                .then(json => {
                    console.log(json)
                })
                .catch(err => console.log(err))
                .finally(() => setWaitingResponse(false))
            break;

            case "close":
                props.setSpotModal(null)
            break;

            case "fileUpload":
                setImgForUpload(rest[0])
                const reader  = new FileReader();
                reader.readAsDataURL(rest[0]);
                reader.onloadend = (progEvent) => {
                    setImg(progEvent.currentTarget.result)
                }
            break;

        }
    }


    return (
        <Modal size="lg" show={props.show} onHide={() => eventHandler("close")}>
            <Modal.Header closeButton>
                <Modal.Title>New spot</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label className="col-form-label">Spot header</label>
                <input 
                    ref={headerInput.ref} 
                    className="form-control"
                    onChange={(e) => headerInput.onChange(e)} 
                    onKeyPress={() => null} 
                    placeholder={headerInput.value}
                    required>
                </input>

                <label className="col-form-label">Add picture</label>
                <input 
                    ref={filesRef} 
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => eventHandler("fileUpload", e.target.files[0])}
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
                        img={ img } 
                        header={headerInput.value} 
                        rating={{
                            votes: 0,
                            stars: new Array(5).fill(false)
                        }} 
                        created={{
                            at: Date.now() / 1000,
                            by: props.user ? props.user.name : "UNKNOWN"
                        }} 
                        style={{position: "static", transform: "scale(0.8)"}}
                    >
                        { descInput.value }
                    </InfoBar>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    type="submit" 
                    className="btn btn-primary" 
                    onClick={() => eventHandler("submit")}
                >
                    Submit
                    {waitingResponse ? 
                        <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span> 
                    : null}
                </Button>
                <Button 
                    onClick={() => eventHandler("close")} 
                    type="button" 
                    className="btn btn-secondary" 
                    data-bs-dismiss="modal"
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default SpotModal