import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api"
import mapStyles from "./MapStyles";
import "./Map.css"
import InfoBar from "../InfoBar/InfoBar";
import SpotModal from "../Modals/SpotModal/SpotModal";
import AuthModal from "../Modals/AuthModal/AuthModal";
import { Button } from "react-bootstrap";

const libraries = [
    "places"
]

const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
}
const center = {
    lat: 54.56,
    lng: 21.19
}
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    streetViewControl: true, 
}
const defaultZoom = 4


function Map({ user, setUser }){

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAw6mcd0lwML_h3PPeH0n_nt6bu_TNnfSE",
        libraries: libraries
    })

    const [markers, setMarkers] = useState([])
    const [suggestedMarkers, setSuggestedMarkers] = useState([])
    const [selected, setSelected] = useState(null)
    const [controlDialog, setControlDialog] = useState(null)
    const [authModal, setAuthModal] = useState(false)
    const [spotModal, setSpotModal] = useState(false)
    const [zoom, setZoom] = useState(defaultZoom)

    const mapRef = useRef()
    const onMapLoad = useCallback(map => {
        mapRef.current = map
    }, [])

    useEffect(() => {
        fetch(`${ process.env.REACT_APP_HOST }/api/markers`)
        .then(result => result.json())
        .then(json => setMarkers(json))
        .catch(err => console.error(err))

        fetch(`${ process.env.REACT_APP_HOST }/api/admin/suggestedplaces`,
        { credentials: "include", })
        .then(result => result.json())
        .then(json => setSuggestedMarkers(json.places))
        .catch(err => setSuggestedMarkers([]))
    }, [user])

    const onMapClick = (event) => {
        setSelected(null)
        setControlDialog(null)
    }
    const mapRightClick = (event) => {
        setControlDialog({lat: event.latLng.lat(), lng: event.latLng.lng()})
    }

    const controlDialogClose = () => {
        setControlDialog(null)
    }

    const onZoomChanged = function() {
        setZoom(this.zoom)
    }

    const addSpot = () => {
        if(user) setSpotModal(true)
        else {
            setAuthModal(true)
        }
    } 



    if (loadError) return "Error loading maps"
    if (!isLoaded) return "Loading maps"

    return (
        <>
        
            <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                zoom={defaultZoom}
                center={center}
                options={options}
                onClick={onMapClick}
                onRightClick={mapRightClick}
                onZoomChanged={onZoomChanged}
                onLoad={onMapLoad}
            >
                { 
                    markers.map(marker => {
                        if (zoom <= 5 && (marker.rarity == "silver" || marker.rarity == "bronze")) return null
                        if (zoom <= 7 && (marker.rarity == "bronze")) return null

                        return (
                            <Marker 
                                key={marker._id} 
                                position={{lat: marker.location.lat, lng: marker.location.lng}}
                                icon={{
                                    url: "markers/" + marker.rarity + "Marker.svg",
                                    scaledSize: new window.google.maps.Size(30, 30),
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 20),
                                }}
                                onClick={() => {setSelected(null); setSelected(marker)}}
                            />
                        )
                    }) 
                }

                {
                    suggestedMarkers.map(marker => {
                        return (
                            <Marker 
                                key={marker._id} 
                                position={{lat: marker.location.lat, lng: marker.location.lng}}
                                icon={{
                                    url: "markers/suggestedMarker.png",
                                    scaledSize: new window.google.maps.Size(30, 30),
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 20),
                                }}
                                onClick={() => {setSelected(null); setSelected(marker)}}
                            />
                        )
                    })
                }

                { controlDialog ? 
                    <InfoWindow position={controlDialog} onCloseClick={controlDialogClose}>
                        <div style={{padding: 4}}>
                            <Button onClick={addSpot}>Add spot</Button>
                        </div>
                    </InfoWindow> 
                : null }

            </GoogleMap>

            { selected !== null ? (
                <InfoBar
                    header={selected.header}
                    img={ process.env.REACT_APP_HOST + '/uploads/' + selected.img }
                    rating={selected.rating}
                    created={selected.created}
                    body={selected.body}
                    id={selected._id}
                    onCloseClick={() => setSelected(null)}
                    user={user}
                > 
                </InfoBar>) 
            : null }

            <AuthModal
                show={authModal}
                handleClose={() => setAuthModal(false)}
                setUser={setUser}
            >
            </AuthModal>

            <SpotModal 
                show={spotModal} 
                setSpotModal={setSpotModal} 
                position={controlDialog}
                user={user}
            >
            </SpotModal>
        
        </>
    );
}

export default Map