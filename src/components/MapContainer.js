import React, { Component } from 'react';
import GoogleApiComponent from '../api/GoogleApiComponent';
import Map from './Map';
import Marker from './Marker';

const { REACT_APP_MAP_API_KEY } = process.env;

class MapContainer extends Component {
  constructor () {
    super();
    this.state = {
      locations: []
    }
  }
  generateKey () {
    // https://gist.github.com/gordonbrander/2230317
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  componentDidUpdate () {
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
          {this.props.stores.map(location => (
            <Marker
              key={this.generateKey()}
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