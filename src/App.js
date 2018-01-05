import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Grid from './Grid.js';
import Header from './Header.js';
import Info from './Info.js';
import text from './text.js';
import './App.css';

import keydown, { ALL_KEYS } from 'react-keydown';



const infoArray = text.info;

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    <div>
        {React.createElement(Header, finalProps)}
        {React.createElement(component, finalProps)}
    </div>
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}


class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      image: 0,
      index:0,
    }
  }

  handleKeys(ev){
    console.log("The event was launched.");
  }


  getObjectFromSrc(src){
    let obj = null;
    infoArray.forEach(function(element){
        if(element.src === src) {
            obj = element
        }
    });
    return obj;
  }


  add(event){
    let codes = [38,38,40,40,37,39,37,39,65,66];
    let index = this.state.index;
    console.log(index);
    //console.log(event.keyCode);
    if(codes[index] === event.keyCode){
      index = index + 1;
      this.setState({index:index});
      if(!(index < codes.lenght)){
        console.log("Unlocked!");
      }
    }
    else {
      this.setState({index:0});
    }

  }

  render() {
    return (
        <div tabIndex="0" onKeyDown={(d) => this.add(d)}>
          <Switch >
            <PropsRoute exact path='/' component={Grid} grid={infoArray} />
            <PropsRoute path='/boissy' component={Info} info={this.getObjectFromSrc("boissy")} />
            <PropsRoute path='/casa30' component={Info} info={this.getObjectFromSrc("casa30")} />
            <PropsRoute path='/castillo' component={Info} info={this.getObjectFromSrc("castillo")} />
            <PropsRoute path='/colodion' component={Info} info={this.getObjectFromSrc("colodion")} />
            <PropsRoute path='/espita' component={Info} info={this.getObjectFromSrc("espita")} />
            <PropsRoute path='/herakles' component={Info} info={this.getObjectFromSrc("herakles")} />
            <PropsRoute path='/hualemnah' component={Info} info={this.getObjectFromSrc("hualemnah")} />
            <PropsRoute path='/instrucciones' component={Info} info={this.getObjectFromSrc("instrucciones")} />
            <PropsRoute path='/invisible' component={Info} info={this.getObjectFromSrc("invisible")} />
            <PropsRoute path='/kancaba' component={Info} info={this.getObjectFromSrc("kancaba")} />
            <PropsRoute path='/laredo' component={Info} info={this.getObjectFromSrc("laredo")} />
            <PropsRoute path='/liliane' component={Info} info={this.getObjectFromSrc("liliane")} />
            <PropsRoute path='/ciclos' component={Info} info={this.getObjectFromSrc("ciclos")} />
            <PropsRoute path='/mata' component={Info} info={this.getObjectFromSrc("mata")} />
            <PropsRoute path='/mazatlan' component={Info} info={this.getObjectFromSrc("mazatlan")} />
            <PropsRoute path='/media' component={Info} info={this.getObjectFromSrc("media")} />
            <PropsRoute path='/mipiedra' component={Info} info={this.getObjectFromSrc("mipiedra")} />
            <PropsRoute path='/num5' component={Info} info={this.getObjectFromSrc("num5")} />
            <PropsRoute path='/onora' component={Info} info={this.getObjectFromSrc("onora")} />
            <PropsRoute path='/paisajesonoro' component={Info} info={this.getObjectFromSrc("paisajesonoro")} />
            <PropsRoute path='/tension' component={Info} info={this.getObjectFromSrc("tension")} />
            <PropsRoute path='/xucu' component={Info} info={this.getObjectFromSrc("xucu")} />
          </Switch>
        </div>
    );
  }
}

export default App;
