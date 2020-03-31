import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import { Icon } from 'leaflet';
import { connect } from 'react-redux';

class HousesMap extends Component {
  render() {
    const position = [51.1078852, 17.0385376]
    const icon = new Icon({
      iconUrl: require('../imgs/greendot.png'),
      iconSize: [13, 13],
    })

    const markers = this.props.houses.map( (house, i) => (
      <Marker icon={icon} key={i} position={[house.latitude, house.longitude]}>
        <Tooltip>s</Tooltip>
      </Marker>
      )
    );

    return(
        <Map center={position} zoom={6} style={{width: '1000px', height: '1000px'}}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a>"
          />
          {markers}
        </Map>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    houses: state.houses.houses
  }
};

export default connect(mapStateToProps)(HousesMap);
