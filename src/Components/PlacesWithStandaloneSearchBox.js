import React, { Component } from 'react'
const { compose, withProps, lifecycle } = require("recompose");
const {withScriptjs} = require("react-google-maps");
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

export default compose(
  withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDl4DVYLh4h_5WdJ46t9_g0zwAqw57TJUU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const [lat, lng] = [places[0].geometry.location.lat(), places[0].geometry.location.lng()]
          this.setState({
            places,
            location: {lat, lng},
          });
        },
      })
    },
  }),
  withScriptjs
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Type city"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `400px`,
          height: `38px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          marginTop: '10px'
        }}
      />
    </StandaloneSearchBox>
    <ol>
      {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
        <li key={place_id} style={{display: 'none'}} className='pomoc'>
          {formatted_address}
          {" at "}
          ({location.lat()}, {location.lng()})
        </li>
      )}
    </ol>
  </div>
);
