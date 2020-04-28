import React, { Component } from 'react';
import Options from '../options/options';
import Houses from '../houses/houses';
import HousesMap from '../map/map';
import './frontPage.sass'
import mapIcon from '../../imgs/map-icon.png';
import listIcon from '../../imgs/list-icon.png';

class FrontPage extends Component {
  constructor() {
    super();
    this.state = {
      selectedView: 'map'
    }
  }

  changeView() {
    let newView = this.state.selectedView === 'map' ? 'house' : 'map';
    this.setState({
      selectedView: newView
    });
  }

  render() {
    return (
      <div className='container-fluid reset-padding'>
        <Options />
        <div id='divided-view'>
          <HousesMap />
          <Houses />
        </div>
        <div id='full-view'>
          {this.state.selectedView === 'map' ? <img src={listIcon} alt='Go to list' onClick={this.changeView.bind(this)} /> : <img src={mapIcon} alt='Go to map' onClick={this.changeView.bind(this)}/>}
          {this.state.selectedView === 'map' ? <HousesMap/> : <Houses />}
        </div>
      </div>
    );
  }
}

export default FrontPage;
