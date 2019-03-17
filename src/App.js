import React, { Component } from 'react';
import './App.css';
import Routes from './Routes/Routes';
import { Provider } from 'react-redux';
import Store from './Store';
import EditProfile from './Screens/EditProfile/EditProfile';

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Routes />
        {/* <EditProfile /> */}
      </Provider>
    );
  }
}

export default App;
