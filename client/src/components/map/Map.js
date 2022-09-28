import React, { 
    useCallback, 
    useEffect, 
    useRef, 
    useState, 
    useContext 
} from "react"

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    StreetViewPanorama
} from "@react-google-maps/api"

import "./Map.css"
import InfoBar from "../InfoBar/InfoBar";
import SpotModal from "../Modals/SpotModal/SpotModal";
import AuthModal from "../Modals/AuthModal/AuthModal";
import ThemeContext from "../../contexts/ThemeContext";
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
const defaultMapOptions = {
    styles: null,
    disableDefaultUI: true,
    streetViewControl: true,
    mapTypeControl: true,
    gestureHandling: "greedy"
}
const defaultZoom = 4


function Map({ user, setUser, setInPanorama }){

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
        libraries: libraries
    })

    const [markers, setMarkers] = useState([])
    const [suggestedMarkers, setSuggestedMarkers] = useState([])
    const [selected, setSelected] = useState(null)
    const [controlDialog, setControlDialog] = useState(null)
    const [authModal, setAuthModal] = useState(false)
    const [spotModal, setSpotModal] = useState(false)
    const [zoom, setZoom] = useState(defaultZoom)
    const [mapOptions, setMapOptions] = useState(defaultMapOptions)

    const theme = useContext(ThemeContext)

    const inPanorama = useRef(false)

    const mapRef = useRef()
    const onMapLoad = useCallback(map => {
        mapRef.current = map
    }, [])

    useEffect(() => {
        setMapOptions(oldMapOptions => {
            return {
                ...oldMapOptions,
                styles: theme.current.mapStyles
            }
        })
    }, [theme])

    useEffect(() => {

        // Fetching default markers
        fetch(`${ process.env.REACT_APP_HOST }/api/markers`)
        .then(result => result.json())
        .then(json => setMarkers(json))
        .catch(err => console.error(err))

        // Fetching submitted markers if user is admin
        fetch(`${ process.env.REACT_APP_HOST }/api/admin/suggestedplaces`,
        { credentials: "include", })
        .then(result => result.json())
        .then(json => setSuggestedMarkers(json.places))
        .catch(err => setSuggestedMarkers([]))
    }, [user])

    const onMapClick = (event) => {
        // Dismissing all dialogs on map click
        setSelected(null)
        setControlDialog(null)
    }
    const mapRightClick = (event) => {
        // Setting dialog for submitting a new place
        setControlDialog({lat: event.latLng.lat(), lng: event.latLng.lng()})
    }

    const onZoomChanged = function() {
        // Why the hell i need to do that with "this"????
        setZoom(this.zoom)
    }

    const dismissSpotModal = () => {
        setControlDialog(null)
        setSpotModal(false)
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
                options={mapOptions}
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
                    <InfoWindow position={controlDialog} onCloseClick={ () => setControlDialog(null) }>
                        <div style={{padding: 4}}>
                            <Button onClick={addSpot}>Add spot</Button>
                        </div>
                    </InfoWindow> 
                : null }

                <StreetViewPanorama
                    onVisibleChanged={ () => {
                        inPanorama.current = !inPanorama.current
                        setInPanorama(inPanorama.current) 
                    } }
                />

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
                    approvedBy={selected.approvedBy}
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
                setSpotModal={dismissSpotModal} 
                position={controlDialog}
                user={user}
            >
            </SpotModal>
        
        </>
    );
}

export default Map