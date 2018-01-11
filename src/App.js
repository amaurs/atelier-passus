import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { translate, Trans } from 'react-i18next';
import Grid from './Grid.js';
import Header from './Header.js';
import RenderHelper from './RenderHelper.js';
import text from './text.js';
import './App.css';
import assets from './assets.js';

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

function EasterEgg(props){
  let easterStyle = {
    WebkitTransform: 'translateX(' + props.pos + 'px)',
    MozTransform: 'translateX(' +props.pos + 'px)'
  };


  console.log(props);
    return (
        <div className="EasterEgg" style={easterStyle}><img alt="" src={assets[props.image]}/></div>
    );
}

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      image: 0,
      index:0,
      isLoggedIn: false,
      pos:0,
    }
  }

  handleKeys(ev){
    console.log("The event was launched.");
  }


  getObjectFromSrc(src){
    let obj = null;
    infoArray.forEach(function(element){
        if(element.src === src) {
            obj = element;
        }
    });
    return obj;
  }

  tick(){
    let pos = this.state.pos;
    let container = document.body;
    console.log(container.offsetHeight);
    let width = container.offsetWidth;

    pos = pos + 3;
    this.setState({pos:pos});

    if(pos > width) {
      clearInterval(this.timerID);
      this.setState({isLoggedIn: false});
      this.setState({pos:0});
    }
    console.log(pos);
  }

  add(event){
    let codes = [38,38,40,40,37,39,37,39,65,66];
    let index = this.state.index;
    console.log(index);
    //console.log(event.keyCode);
    if(codes[index] === event.keyCode){
      index = index + 1;
      this.setState({index:index});
      if(!(index < codes.length)){
        console.log("Unlocked!");
        this.setState({index:0});
        this.setState({isLoggedIn: true});
        clearInterval(this.timerID);
        this.setState({pos:0});
        this.timerID = setInterval(
            () => this.tick(), 
            17
        );
      }
    }
    else {
      this.setState({index:0});
    }

  }

  



  render() {
    console.log("this.props");
    console.log(this.props);
    const { t, i18n } = this.props;
    const changeLanguage = (lng) => {
      console.log("Language changed to " + lng);
      i18n.changeLanguage(lng);
    }
    const isLoggedIn = this.state.isLoggedIn;
    let easterEgg = null;

    if (isLoggedIn) {
      let pos = this.state.pos;
      easterEgg =  <EasterEgg image={"easterImage"} pos={pos}/>
    }
    return (
        <div className="App-container" tabIndex="0" onKeyDown={(d) => this.add(d)}>
          <p>{t("hello")}</p>
          <Switch >
            <PropsRoute exact path='/' component={Grid} grid={infoArray} changeLanguage={changeLanguage}/>
            <PropsRoute path='/boissy' component={RenderHelper} info={this.getObjectFromSrc("boissy")} />
            <PropsRoute path='/casa30' component={RenderHelper} info={this.getObjectFromSrc("casa30")} />
            <PropsRoute path='/castillo' component={RenderHelper} info={this.getObjectFromSrc("castillo")} />
            <PropsRoute path='/ciclos' component={RenderHelper} info={this.getObjectFromSrc("ciclos")} />
            <PropsRoute path='/colodion' component={RenderHelper} info={this.getObjectFromSrc("colodion")} />
            <PropsRoute path='/espita' component={RenderHelper} info={this.getObjectFromSrc("espita")} />
            <PropsRoute path='/herakles' component={RenderHelper} info={this.getObjectFromSrc("herakles")} />
            <PropsRoute path='/hualemnah' component={RenderHelper} info={this.getObjectFromSrc("hualemnah")} />
            <PropsRoute path='/instrucciones' component={RenderHelper} info={this.getObjectFromSrc("instrucciones")} />
            <PropsRoute path='/invisible' component={RenderHelper} info={this.getObjectFromSrc("invisible")} />
            <PropsRoute path='/kancaba' component={RenderHelper} info={this.getObjectFromSrc("kancaba")} />
            <PropsRoute path='/laredo' component={RenderHelper} info={this.getObjectFromSrc("laredo")} />
            <PropsRoute path='/liliane' component={RenderHelper} info={this.getObjectFromSrc("liliane")} />
            <PropsRoute path='/mata' component={RenderHelper} info={this.getObjectFromSrc("mata")} />
            <PropsRoute path='/mazatlan' component={RenderHelper} info={this.getObjectFromSrc("mazatlan")} />
            <PropsRoute path='/media' component={RenderHelper} info={this.getObjectFromSrc("media")} />
            <PropsRoute path='/mipiedra' component={RenderHelper} info={this.getObjectFromSrc("mipiedra")} />
            <PropsRoute path='/num5' component={RenderHelper} info={this.getObjectFromSrc("num5")} />
            <PropsRoute path='/onora' component={RenderHelper} info={this.getObjectFromSrc("onora")} />
            <PropsRoute path='/pdm' component={RenderHelper} info={this.getObjectFromSrc("pdm")} />
            <PropsRoute path='/paisajesonoro' component={RenderHelper} info={this.getObjectFromSrc("paisajesonoro")} />
            <PropsRoute path='/plan' component={RenderHelper} info={this.getObjectFromSrc("plan")} />
            <PropsRoute path='/senderos' component={RenderHelper} info={this.getObjectFromSrc("senderos")} />   
            <PropsRoute path='/sema' component={RenderHelper} info={this.getObjectFromSrc("sema")} />
            <PropsRoute path='/tension' component={RenderHelper} info={this.getObjectFromSrc("tension")} />
            <PropsRoute path='/xucu' component={RenderHelper} info={this.getObjectFromSrc("xucu")} />
          </Switch>

          {easterEgg}
        
        </div>
    );
  }
}




export default translate('translations')(App);
