import React from 'react';
import FrontPage from './components/frontPage';
import { Provider } from 'react-redux';
import store from './store';
import './styles/App.sass';

function App() {
  return (
    <Provider store={store}>
      <FrontPage />
    </Provider>
  );
}

export default App;
