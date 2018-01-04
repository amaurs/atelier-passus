import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Grid from './Grid.js';
import Header from './Header.js';
import Info from './Info.js';
import text from './text.js';
import './App.css';

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
          <Switch>
            <PropsRoute exact path='/' component={Grid} grid={infoArray} onClick={this.handleClick}/>
            <PropsRoute path='/boissy' component={Info} info={this.getObjectFromSrc("boissy")} />
            <PropsRoute path='/casa30' component={Info} info={this.getObjectFromSrc("casa30")} />
            <PropsRoute path='/castillo' component={Info} info={this.getObjectFromSrc("castillo")} />
            <PropsRoute path='/colodion' component={Info} info={this.getObjectFromSrc("colodion")} />
            <PropsRoute path='/espita' component={Info} info={this.getObjectFromSrc("espita")} />
            <PropsRoute path='/herakles' component={Info} info={this.getObjectFromSrc("herakles")} />
            <PropsRoute path='/hualemnah' component={Info} info={this.getObjectFromSrc("hualemnah")} />
            <PropsRoute path='/instrucciones' component={Info} info={this.getObjectFromSrc("instrucciones")} />
          </Switch>
        </div>
    );
  }
}

export default App;
