import React, {Component} from 'react';

class Marker extends Component {
  constructor ({map, store}) {
    super();
    this.state = {
      position: {},
      map: {}
    }
  }
  componentDidUpdate () {
    // component updated
    this.renderMarkers(this.props);
  }
  renderMarkers ({map, google, store, mapCenter}) {
    let pos = store || mapCenter;
    store = new google.maps.LatLng(pos.lat, pos.lng);

    const arg = {
      map: map,
      position: store
    };

    this.marker = new google.maps.Marker(arg);
  }
  render () {
    return null;
  }
}

export default Marker;