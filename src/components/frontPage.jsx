import React, { Component } from 'react';
import Options from './options';
import Houses from './houses';
import HousesMap from './map';
import '../styles/App.sass'

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
      <div className='container-fluid'>
        <Options />
        <div id='dividedView'>
          <HousesMap />
          <Houses />
        </div>
        <div id='fullView'>
          {this.state.selectedView === 'map' ? <HousesMap /> : <Houses />}
          <button type='button' onClick={this.changeView.bind(this)}>change view</button>
        </div>
      </div>
    );
  }
}

export default FrontPage;
