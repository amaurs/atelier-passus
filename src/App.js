import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Grid from './Grid.js';
import Header from './Header.js';
import Info from './info.js';
import text from './text.js';
import './App.css';

const infoArray = text.info;

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
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
    }
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




  render() {
    return (
        <div>
          <Header />
          <Switch>
            <PropsRoute exact path='/' component={Grid} grid={infoArray} onClick={this.handleClick}/>
            <PropsRoute path='/boissy' component={Info} info={this.getObjectFromSrc("boissy")} />
            <PropsRoute path='/casa30' component={Info} info={this.getObjectFromSrc("casa30")} />
          </Switch>
        </div>
    );
  }
}

export default App;
