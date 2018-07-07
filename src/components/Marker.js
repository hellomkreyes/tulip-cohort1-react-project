import React, {Component} from 'react';

class Marker extends Component {
  componentDidUpdate () {
    // run when component updates
    this.renderMarkers(this.props);
  }
  componentDidMount () {
    // run when app mounts on page
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