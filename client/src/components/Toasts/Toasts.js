import React, { useState, useEffect } from 'react'
import { Toast, ToastContainer } from "react-bootstrap"

export const Toasts = () => {

    const [toasts, setToasts] = useState([])

    useEffect(() => {
        // fetch
        const result = [{id: 0, show: true}, {id: 1, show: true}]
        setToasts(result)
    }, []);

    const handleClose = (id) => {
        setToasts(prev => {
            return toasts.map(toast => {
                if (toast.id === id) toast.show = false
                return toast
            })
        })
    }

    return (
        <ToastContainer className="p-3" position={"bottom-end"}>
            { 
                toasts.map((toast) => {
                    return (
                        <Toast 
                            show={toast.show} 
                            onClose={() => handleClose(toast.id)} 
                            key={toast.id}
                        >
                            <Toast.Header>
                                <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                />
                                <strong className="me-auto">Bootstrap</strong>
                                <small>11 mins ago</small>
                            </Toast.Header>
                            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                        </Toast>
                    )
                }) 
            }
        </ToastContainer>
    )
}
