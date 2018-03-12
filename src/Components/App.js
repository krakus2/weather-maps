import React, { Component } from 'react';
import '../CompStyles/App.css';
import Map from './Map'

class App extends Component {
  constructor(){
    super()
    this.state = {
      markers: [],
    }
  }

  onClickAddMarker = (e) => {
    const markers = [...this.state.markers, {lat: e.latLng.lat(), lng: e.latLng.lng()}]
    //console.log(newMarkers)
    this.setState({markers})
  }

  onClickDeleteMarker = (key) => {
    const markers = [...this.state.markers]
    markers.splice(key, 1)
    this.setState({markers})
  }

  render() {
    return (
      <div className='opakowanie'>
        <div className='line1'>
          cokolwiek
        </div>
          <div className='line2'>
            <Map
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDl4DVYLh4h_5WdJ46t9_g0zwAqw57TJUU&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `500px`, width: '1000px' }} />}
              mapElement={<div style={{ height: `100%` }} />}
              onClick={this.onClickAddMarker}
              markers={this.state.markers}
            />
          </div>
          <div className='weatherTiles'>
            {this.state.markers.map((elem, i) => <p key={i} onClick={() => this.onClickDeleteMarker(i)} style={{marginLeft: '10px'}}>No elo{i+1}&times;</p>)}
          </div>
        </div>
    )
  }
}

export default App;
