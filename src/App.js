import React, { Component } from 'react';
import Grid from './Grid.js';
import Header from './Header.js';
import Info from './Info.js';
import logo from './logo.svg';
import image from './images/test.jpg';

import text from './text.js';
import './App.css';

const infoArray = text.info;

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      selected: null,
      image: 10,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleTumbnail = this.handleTumbnail.bind(this);
  }

  handleClick(who){
    this.setState({selected:who});
  }

  handleTumbnail(id){
    this.setState({image:id});
  }

  getObjectFromSrc(src){
    let obj = null;
    infoArray.forEach(function(element){
        console.log(element.src);
        console.log();
        if(element.src === src) {
            obj = element
        }
    });
    return obj;
  }

  render() {
    let content = null;
    if (this.state.selected) {
        content = <Info info={this.getObjectFromSrc(this.state.selected)} image={this.state.image} onClick={this.handleTumbnail}/>;
    } else {
        content = <Grid grid={infoArray} onClick={this.handleClick}/>;
    }

    return (

      <div>
        <Header />
        {content}
      </div>
    );
  }
}

export default App;
