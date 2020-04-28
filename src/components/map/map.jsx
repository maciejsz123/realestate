import React, {Component} from 'react';
import { Map, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { Icon } from 'leaflet';
import { connect } from 'react-redux';
import { formatPrice } from '../houses/houseItem.jsx';
import { setVisibleArea, filterHouses } from '../../actions/optionsAction.js';
import './map.sass';

class HousesMap extends Component {

  componentDidMount() {
    if(this.refs.map.leafletElement.getBounds()._northEast.lat !== this.refs.map.leafletElement.getBounds()._southWest.lat &&
      this.refs.map.leafletElement.getBounds()._northEast.lng !== this.refs.map.leafletElement.getBounds()._southWest.lng) {
        this.props.setVisibleArea(this.refs.map.leafletElement.getBounds()._northEast, this.refs.map.leafletElement.getBounds()._southWest);
      }
  }

  async mapMove() {
    if(this.refs.map.leafletElement.getBounds()._northEast.lat !== this.refs.map.leafletElement.getBounds()._southWest.lat &&
      this.refs.map.leafletElement.getBounds()._northEast.lng !== this.refs.map.leafletElement.getBounds()._southWest.lng) {
        await this.props.setVisibleArea(this.refs.map.leafletElement.getBounds()._northEast, this.refs.map.leafletElement.getBounds()._southWest);
        await this.props.filterHouses(this.props);
      }
  }

  render() {
    const position = [52.0694137, 19.4777549]
    const icon = new Icon({
      iconUrl: require('../../imgs/greendot.png'),
      iconSize: [13, 13]
    })

    const markers = this.props.filteredHouses.map( (house, i) => (
      <Marker icon={icon} key={i} position={[house.latitude, house.longitude]}>
        <Tooltip>
          <div className='flex'>
            <div>
              <img alt={i} src={house.img} className='house-img-size'/>
            </div>
            <div className='flex flex-center'>
              <span>{formatPrice(house.price)} zł</span>
              <span>{house.surface} m<sup>2</sup></span>
            </div>
          </div>
        </Tooltip>
      </Marker>
      )
    );

    const hoveredHouse = this.props.filteredHouses.filter( house => {
      return this.props.hoveredTooltip[0] ?
       house.latitude === this.props.hoveredTooltip[0][0] && house.longitude === this.props.hoveredTooltip[0][1] :
       false;
    })

    const markers2 = hoveredHouse.length > 0 ? (hoveredHouse.map( (item, i) => (
      <Marker icon={icon} key={i} position={[item.latitude, item.longitude]}>
        <Tooltip permanent>
          <div className='flex'>
            <div>
              <img alt={i} src={item.img} className='house-img-size'/>
            </div>
            <div className='flex flex-center'>
              <span>{formatPrice(item.price)} zł</span>
              <span>{item.surface} m<sup>2</sup></span>
            </div>
          </div>
        </Tooltip>
      </Marker>
      )
    )) : '';

    return(
      <Map ref='map' onResize={this.mapMove.bind(this)} onZoomEnd={this.mapMove.bind(this)} onMoveEnd={this.mapMove.bind(this)} center={position} zoom={6} className='map-size'>
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
    hoveredTooltip: state.houses.hoveredTooltip,
    city: state.houses.city,
    priceFrom: state.houses.priceFrom,
    priceTo: state.houses.priceTo,
    surfaceFrom: state.houses.surfaceFrom,
    surfaceTo: state.houses.surfaceTo,
    beds: state.houses.beds,
    homeType: state.houses.homeType,
    actualPage: state.houses.actualPage,
    filteredHouses: state.houses.filteredHouses,
    northEast: state.houses.northEast,
    southWest: state.houses.southWest
  }
};

export default connect(mapStateToProps, { setVisibleArea, filterHouses })(HousesMap);
