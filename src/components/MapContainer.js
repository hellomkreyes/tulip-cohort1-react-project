import React, { Component } from 'react';
import GoogleApiComponent from '../api/GoogleApiComponent';
import Map from './Map';
import Marker from './Marker';

const { REACT_APP_MAP_API_KEY } = process.env;

class MapContainer extends Component {
  constructor () {
    super();
    this.state = {
      locations: [
        {
          lat: 43.643,
          lng: -79.3723
        },
        {
          lat: 43.643,
          lng: -79.3905
        }
      ]
    }
  }
  render () {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Map
          google={this.props.google}
          lat={this.props.lat}
          lng={this.props.lng}
          map={this.props.map}
        >
          {this.state.locations.map(location => (
            <Marker
              store={location}
              map={this.props.map} />
          ))}
        </Map>
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: `${REACT_APP_MAP_API_KEY}`
})(MapContainer);