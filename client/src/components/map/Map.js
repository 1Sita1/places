import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ height: '50px', width: '50px', backgroundColor: 'red' }}>{text}</div>;

function Map(){
    const defaultProps = {
      center: {
        lat: 54.56835602,
        lng: 21.19502627
      },
      zoom: 11
    };
  
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: "AIzaSyAw6mcd0lwML_h3PPeH0n_nt6bu_TNnfSE" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text=""
          />
        </GoogleMapReact>
      </div>
    );
}

export default Map