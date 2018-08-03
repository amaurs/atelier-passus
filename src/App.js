import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { translate } from 'react-i18next';
import Grid from './Grid.js';
import Hero from './Hero.js';
import Menu from './Menu.js';
import Hamburger from './Hamburger.js';
import RenderHelper from './RenderHelper.js';
import text from './text.js';
import logo from './logo.svg';
import './App.css';
import assets from './assets.js';
import ReactPlayer from 'react-player';

const infoArray = text.info;
const plainArray = text.plain;

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    <div>
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
  return (
      <div className="EasterEgg" style={easterStyle}><img alt="" src={assets[props.image]}/></div>
  );
}

class App extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.i18n);
    this.state = {
      image: 0,
      index: 0,
      isLoggedIn: false,
      pos: 0,
      language: this.props.i18n.language,
      showGrid: false,
      active: false,
      width: 0,
      height: 0,
    }
  }

  updateDimensions(){
    let update_width  = window.innerWidth;
    let update_height = window.innerHeight;
    this.setState({ width: update_width, height: update_height });
    console.log("width: " + this.state.width);
    console.log("height: " + this.state.height);
  }

  handleKeys(event){
    console.log("The event was launched.");
  }

  handleMenu(){
    console.log("The button was pressed.");
    console.log(this.state.active);
    const isActive = this.state.active;
    this.setState({active: !isActive});
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    window.addEventListener("keydown", this.add.bind(this));
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    window.removeEventListener("keydown", this.add.bind(this));
    window.removeEventListener("scroll", this.handleScroll.bind(this));
  }
  handleScroll(event) {
    if(this.state.height < window.scrollY){
      this.setState({showGrid: true});
    } else {
      this.setState({showGrid: false});
    }
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

  getObjectFromPlainSrc(src){
    let obj = null;
    plainArray.forEach(function(element){
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
    const { t, i18n } = this.props;
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
      this.setState({language:lng});
    }
    const isLoggedIn = this.state.isLoggedIn;
    let easterEgg = null;

    if (isLoggedIn) {
      let pos = this.state.pos;
      easterEgg =  <EasterEgg image={"easterImage"} pos={pos}/>
    }
    return (
        <div >
          <Menu t={t} language={this.state.language} changeLanguage={changeLanguage} active={this.state.active} handleMenu={this.handleMenu.bind(this)} />
          <Hamburger onClick={e => this.handleMenu()} isActive={this.state.active}/>
          <div>
            <Switch>
              <PropsRoute exact path='/' component={Hero} t={t} language={this.state.language} height={this.state.height} />
              <PropsRoute path='/projects' component={Grid} grid={infoArray} t={t} language={this.state.language} show={this.state.showGrid} height={this.state.height} />
              <PropsRoute path='/boissy' component={RenderHelper} info={this.getObjectFromSrc("boissy")} t={t} />
              <PropsRoute path='/casa30' component={RenderHelper} info={this.getObjectFromSrc("casa30")} t={t} />
              <PropsRoute path='/castillo' component={RenderHelper} info={this.getObjectFromSrc("castillo")} t={t} />
              <PropsRoute path='/ciclos' component={RenderHelper} info={this.getObjectFromSrc("ciclos")} t={t} />
              <PropsRoute path='/colodion' component={RenderHelper} info={this.getObjectFromSrc("colodion")} t={t} />
              <PropsRoute path='/espita' component={RenderHelper} info={this.getObjectFromSrc("espita")} t={t} />
              <PropsRoute path='/femaria' component={RenderHelper} info={this.getObjectFromSrc("femaria")} t={t} />
              <PropsRoute path='/herakles' component={RenderHelper} info={this.getObjectFromSrc("herakles")} t={t} />
              <PropsRoute path='/hualemnah' component={RenderHelper} info={this.getObjectFromSrc("hualemnah")} t={t} />
              <PropsRoute path='/instrucciones' component={RenderHelper} info={this.getObjectFromSrc("instrucciones")} t={t} />
              <PropsRoute path='/invisible' component={RenderHelper} info={this.getObjectFromSrc("invisible")} t={t} />
              <PropsRoute path='/kancaba' component={RenderHelper} info={this.getObjectFromSrc("kancaba")} t={t} />
              <PropsRoute path='/laredo' component={RenderHelper} info={this.getObjectFromSrc("laredo")} t={t} />
              <PropsRoute path='/liliane' component={RenderHelper} info={this.getObjectFromSrc("liliane")} t={t} />
              <PropsRoute path='/mata' component={RenderHelper} info={this.getObjectFromSrc("mata")} t={t} />
              <PropsRoute path='/mazatlan' component={RenderHelper} info={this.getObjectFromSrc("mazatlan")} t={t} />
              <PropsRoute path='/media' component={RenderHelper} info={this.getObjectFromSrc("media")} t={t} />
              <PropsRoute path='/mipiedra' component={RenderHelper} info={this.getObjectFromSrc("mipiedra")} t={t} />
              <PropsRoute path='/num5' component={RenderHelper} info={this.getObjectFromSrc("num5")} t={t} />
              <PropsRoute path='/onora' component={RenderHelper} info={this.getObjectFromSrc("onora")} t={t} />
              <PropsRoute path='/pdm' component={RenderHelper} info={this.getObjectFromSrc("pdm")} t={t} />
              <PropsRoute path='/paisajesonoro' component={RenderHelper} info={this.getObjectFromSrc("paisajesonoro")} t={t} />
              <PropsRoute path='/plan' component={RenderHelper} info={this.getObjectFromSrc("plan")} t={t} />
              <PropsRoute path='/senderos' component={RenderHelper} info={this.getObjectFromSrc("senderos")} t={t} />
              <PropsRoute path='/sema' component={RenderHelper} info={this.getObjectFromSrc("sema")} t={t} />
              <PropsRoute path='/tension' component={RenderHelper} info={this.getObjectFromSrc("tension")} t={t} />
              <PropsRoute path='/xucu' component={RenderHelper} info={this.getObjectFromSrc("xucu")} t={t} />
              <PropsRoute path='/about' component={RenderHelper} info={this.getObjectFromPlainSrc("about")} t={t} />
              <PropsRoute path='/contact' component={RenderHelper} info={this.getObjectFromPlainSrc("contact")} t={t} />
              <PropsRoute component={RenderHelper} info={this.getObjectFromPlainSrc("four-oh-four")} t={t} />

            </Switch>
          </div>
          <footer className="hero-foot">
            <div className="container">
              <div className="tabs is-centered">
                <p>
                  <strong>Atelier-Passus</strong><br/> Tokio 84-5, Juarez, Mexico, 06600.
                </p>
              </div>
            </div>
          </footer>
          {easterEgg}
        </div>
    );
  }
}




export default translate('translations')(App);
