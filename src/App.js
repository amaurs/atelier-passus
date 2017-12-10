import React, { Component } from 'react';
import Grid from './Grid.js';
import Header from './Header.js';
import logo from './logo.svg';
import image from './images/test.jpg';

import info from './info.js';
import './App.css';

let twoRow = info.info;

class App extends Component {

  render() {
    console.log(info)
    return (
      <div>
        <Header />
        <Grid grid={twoRow} />
      </div>
    );
  }
}

export default App;
