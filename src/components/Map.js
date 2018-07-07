import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Map extends Component {
  constructor ({lat, lng}) {
    super();
    this.state = {
      zoom: 12,
      location: {
        lat: lat,
        lng: lng
      }
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }
  componentDidMount () {
    this.loadMap();
  }
  loadMap () {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const zoom = this.state.zoom;
      const {lat, lng} = this.state.location;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })

      this.map = new maps.Map(node, mapConfig);
    }
  }
  renderChildren () {
    const {children} = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.location
      });
    });
  }
  render () {
    const style = {
      width: '80vw',
      height: '40vw',
      background: 'lightblue'
    }

    return (
      <div ref='map' style={style}>
        Loading map...
        {this.renderChildren()}
      </div>
    )
  }
}

export default Map;