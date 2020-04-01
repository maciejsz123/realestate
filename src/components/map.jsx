import React, {Component} from 'react';
import { Map, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { Icon } from 'leaflet';
import { connect } from 'react-redux';
import { formatPrice } from './houseItem.jsx';

class HousesMap extends Component {

  render() {
    const position = [52.0694137, 19.4777549]
    const icon = new Icon({
      iconUrl: require('../imgs/greendot.png'),
      iconSize: [13, 13]
    })

    const markers = this.props.houses.map( (house, i) => (
      <Marker icon={icon} key={i} position={[house.latitude, house.longitude]}>
        <Tooltip>data</Tooltip>
      </Marker>
      )
    );

    const hoveredHouse = this.props.houses.filter( house => {
      return this.props.hoveredTooltip[0] ?
       house.latitude === this.props.hoveredTooltip[0][0] && house.longitude === this.props.hoveredTooltip[0][1] :
       false;
    })

    const markers2 = hoveredHouse.length > 0 ? (hoveredHouse.map( (item, i) => (
      <Marker icon={icon} key={i} position={[item.latitude, item.longitude]}>
        <Tooltip permanent>
          <div style={{display: 'flex'}}>
            <div>
              <img src={item.img} style={{width: '75px', height: '75px'}}/>
            </div>
            <div style={{display: 'flex', flexFlow: 'column', justifyContent: 'center'}}>
              <span>{formatPrice(item.price)} zł</span>
              <span>{item.surface} m<sup>2</sup></span>
            </div>
          </div>
        </Tooltip>
      </Marker>
      )
    )) : '';

    return(
      <Map center={position} zoom={6} style={{width: '100%', height: '100vh'}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a>"
        />
        {markers}
        {markers2}
      </Map>

    );
  }
}


const mapStateToProps = (state) => {
  return {
    houses: state.houses.houses,
    hoveredTooltip: state.houses.hoveredTooltip
  }
};

export default connect(mapStateToProps)(HousesMap);
