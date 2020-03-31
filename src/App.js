import React from 'react';
import Navbar from './components/navbar';
import Options from './components/options';
import Houses from './components/houses';
import HousesMap from './components/map';
import { Provider } from 'react-redux';
import store from './store';
import './styles/App.sass';

function App() {
  return (
    <Provider store={store}>
      <div className="container-fluid">
        <Navbar />
        <Options />
        <Houses />
        <HousesMap />
      </div>
    </Provider>
  );
}

export default App;
