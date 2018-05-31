import React, { Component } from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import '../CompStyles/Map.css'
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");


export default compose(
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 52.2328546, lng: 20.9207705 }}
    onClick={props.onClick}
  >
    {
      props.markers.map((elem, i) => <Marker key={elem.id} position={{ lat: elem.lat, lng: elem.lng }} /> )
    }
  </GoogleMap>
);



/*
  const Map = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      <Marker
        position={{ lat: -34.397, lng: 150.644 }}
      />
    </GoogleMap>
  ));


export default Map;
*/


  /*render() {
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{lat: -25.363882, lng: 131.044922}}
      >
      </GoogleMap>
    )
  }
}



export default withGoogleMap(Map);
*/


/*        {props.markers.map((marker, index) => (
          <Marker {...marker} />
        ))}
*/
