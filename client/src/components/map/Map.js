import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api"
import mapStyles from "./MapStyles";
import getMarkers from "../../fakeAPI/getMarkers";
import "./Map.css"
import InfoBar from "../InfoBar/InfoBar";

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
const defaultZoom = 4

const rarityColors = {
    "gold": "rgb(177, 192, 47)",
    "silver": "rgb(179, 185, 163)",
    "bronze": "rgb(184, 120, 36)"
}


function Map(){

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAw6mcd0lwML_h3PPeH0n_nt6bu_TNnfSE",
        libraries: libraries
    })

    const [markers, setMarkers] = useState([])
    const [selected, setSelected] = useState(null)
    const [controlDialog, setControlDialog] = useState(null)
    const [zoom, setZoom] = useState(defaultZoom)

    const onMapClick = useCallback(event => {
        setSelected(null)
    }, [])

    const mapRightClick = useCallback(event => {
        setControlDialog({lat: event.latLng.lat(), lng: event.latLng.lng()})
    }, [])

    const onZoomChanged = useCallback(function() {
        setZoom(this.zoom)
    }, [])

    useEffect(() => {
        getMarkers().then(result => setMarkers(result))
    })

    const mapRef = useRef()
    const onMapLoad = useCallback(map => {
        mapRef.current = map
    }, [])

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
            {markers.map(marker => <Marker 
                key={marker.time} 
                position={{lat: marker.lat, lng: marker.lng}}
                icon={{
                    url: "markers/" + marker.rarity + "Marker.svg",
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 20),
                }}
                onClick={() => setSelected(marker)}
            />)}

            {controlDialog ? 
                (<div className="controlDialog">
                    <ul>
                        <li>Add place</li>
                        <li>Add place</li>
                        <li>Add place</li>
                    </ul>
                </div>)
            : null}
        </GoogleMap>

        {selected !== null ? (
            <InfoBar
                header={selected.rarity}
                img={selected.img}
                rating={selected.rating}
                created={selected.created}
                onCloseClick={() => setSelected(null)}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis lorem vel faucibus sagittis. Aenean condimentum vel velit ac porta. Maecenas malesuada erat nec tellus mollis volutpat. Praesent convallis a nibh in finibus. Maecenas ex nibh, rutrum vitae sagittis at, feugiat eget sem. Vivamus nec maximus eros. Mauris vel molestie nisl. Integer vitae odio viverra, sollicitudin tortor id, semper eros. Aenean pulvinar sit amet ex a faucibus. Nulla aliquet vestibulum enim. Curabitur vel dignissim nisl, in convallis nulla.
                <br></br>
                <br></br>
                Etiam vestibulum ullamcorper nisl. Nam sit amet nisi rutrum, pulvinar ipsum ut, sagittis eros. Donec hendrerit libero nec sollicitudin dictum. Praesent tellus risus, ultrices vitae euismod et, dictum non quam. Donec pretium arcu ut magna rhoncus elementum. Aliquam eget eros sed leo pellentesque rhoncus vel eget est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec laoreet cursus aliquet. Curabitur non tellus sed velit maximus tincidunt. Phasellus ac dolor vulputate, tincidunt elit id, lacinia augue.
                <br></br>
                <br></br>
                Praesent pulvinar, metus at maximus condimentum, lacus massa facilisis mauris, non laoreet risus velit et quam. Morbi aliquam euismod urna ut pharetra. Quisque ac dui maximus, lacinia libero et, imperdiet nibh. Donec efficitur orci neque, ut sagittis velit sagittis sed. Morbi ut pharetra dui, eu pellentesque sapien. Fusce a turpis ac sem dictum porta. Vestibulum consequat justo ut odio hendrerit, id mattis erat sagittis. Nam quam purus, tristique nec tincidunt a, aliquam mattis odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra tellus vel justo sagittis, ut condimentum nunc efficitur. Suspendisse vitae nisl neque. Praesent commodo fermentum luctus. Pellentesque a neque quis purus lacinia ullamcorper non ut mi. Nunc purus massa, sodales non aliquet sed, tempor interdum lacus. Duis quis ante vehicula, sodales lorem sit amet, ullamcorper tortor.    
            </InfoBar>) 
        : null}
        
        </>
    );
}

export default Map