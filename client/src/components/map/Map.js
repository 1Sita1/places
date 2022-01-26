import React from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api"
import mapStyles from "./MapStyles";

const libraries = [
    "places",
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


function Map(){

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAw6mcd0lwML_h3PPeH0n_nt6bu_TNnfSE",
        libraries: libraries
    })

    if (loadError) return "Error loading maps"
    if (!isLoaded) return "Loading maps"

    return (
        <GoogleMap 
            mapContainerStyle={mapContainerStyle} 
            zoom={8}
            center={center}
            options={options}
        ></GoogleMap>
    );
}

export default Map