import React, { Component } from 'react';
import '../CompStyles/App.css';
import Map from './Map'
import Weather from './Weather'
import PlacesWithStandaloneSearchBox from './PlacesWithStandaloneSearchBox'

class App extends Component {
  constructor(){
    super()
    this.state = {
      markers: [],
    }
  }

  onClickAddMarker = (e) => {
    const markers = [...this.state.markers, {lat: e.latLng.lat(), lng: e.latLng.lng(), id: Date.now()}]
    //console.log(newMarkers)
    this.setState({markers})
  }

  onClickDeleteMarker = (event, key) => {
    const markers = [...this.state.markers].filter(elem => elem.id !== key)
    console.log(markers, this.state.apiKey)
    this.setState({markers})
  }

  onSubmitAddMarker = (lat, lng) => {
    console.log("czesc", lat, lng)
  }
  render() {
    return (
      <div className='opakowanie'>
        <div className='line1'>
          <PlacesWithStandaloneSearchBox onSubmit={this.onSubmitAddMarker}/>
        </div>
          <div className='line2'>
            <Map
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDl4DVYLh4h_5WdJ46t9_g0zwAqw57TJUU&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `490px`, width: '1400px' }} />}
              mapElement={<div style={{ height: `100%` }} />}
              onClick={this.onClickAddMarker}
              markers={this.state.markers}
            />
          </div>
          <div className='weatherTiles'>
            {this.state.markers.map((elem, i) => {
                return (
                  <div className='tile' key={elem.id}>
                    <p style={{fontSize: '40px', cursor: 'pointer', position: 'absolute', left: '730px', top: '-35px'}}
                      onClick={(e) => this.onClickDeleteMarker(e, elem.id)}>
                      &times;
                    </p>
                    <Weather location={elem} apiKey={this.state.apiKey}/>
                  </div>
                )
              })
            }
          </div>
        </div>
    )
  }
}

export default App;
