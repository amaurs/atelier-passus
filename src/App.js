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
    return (
        <div>
          <Header />
          <Switch>
            <PropsRoute exact path='/' component={Grid} grid={infoArray} onClick={this.handleClick}/>
            <PropsRoute path='/boissy' component={Info} info={this.getObjectFromSrc("boissy")} image={this.state.image} onClick={this.handleTumbnail}/>
          </Switch>
        </div>
    );
  }
}

export default App;
