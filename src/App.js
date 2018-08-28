import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { translate } from 'react-i18next';
import Grid from './Grid.js';
import Header from './Header.js';
import Language from './Language.js';
import Logo from './Logo.js';
import Lost from './Lost.js';
import Menu from './Menu.js';
import RenderHelper from './RenderHelper.js';
import Us from './Us.js';
import text from './text.js';
import './App.css';
import assets from './assets.js';

const infoArray = text.info2;

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
        <div className={"Body" + (this.state.active?" active":"")}>
          <Menu t={t} 
                language={this.state.language} 
                changeLanguage={changeLanguage} 
                isActive={this.state.active} 
                handleMenu={this.handleMenu.bind(this)} 
                />
          <Header t={t} 
                  language={this.state.language} 
                  isActive={this.state.active} 
                  handleMenu={this.handleMenu.bind(this)}
                  />
          <div className={"Content"}>
            <Switch>
              <PropsRoute exact path='/' component={Grid} grid={infoArray} handleMenu={this.handleMenu.bind(this)} t={t} language={this.state.language} show={this.state.showGrid} height={this.state.height} />
              <PropsRoute path='/arbolesDeVida' component={RenderHelper} info={this.getObjectFromSrc("arbolesDeVida")} t={t} />
              <PropsRoute path='/aube' component={RenderHelper} info={this.getObjectFromSrc("aube")} t={t} />
              <PropsRoute path='/belaBartok' component={RenderHelper} info={this.getObjectFromSrc("belaBartok")} t={t} />
              <PropsRoute path='/casaFemaria' component={RenderHelper} info={this.getObjectFromSrc("casaFemaria")} t={t} />
              <PropsRoute path='/elCicloDeLaPiel' component={RenderHelper} info={this.getObjectFromSrc("elCicloDeLaPiel")} t={t} />
              <PropsRoute path='/cinco' component={RenderHelper} info={this.getObjectFromSrc("cinco")} t={t} />
              <PropsRoute path='/colodionNum13' component={RenderHelper} info={this.getObjectFromSrc("colodionNum13")} t={t} />
              <PropsRoute path='/elAlofonoDeLaVida' component={RenderHelper} info={this.getObjectFromSrc("elAlofonoDeLaVida")} t={t} />
              <PropsRoute path='/herakles' component={RenderHelper} info={this.getObjectFromSrc("herakles")} t={t} />
              <PropsRoute path='/instruccionesParaUnArquitecto' component={RenderHelper} info={this.getObjectFromSrc("instruccionesParaUnArquitecto")} t={t} />
              <PropsRoute path='/invencibleInvisible' component={RenderHelper} info={this.getObjectFromSrc("invencibleInvisible")} t={t} />
              <PropsRoute path='/laredo' component={RenderHelper} info={this.getObjectFromSrc("laredo")} t={t} />
              <PropsRoute path='/liLiane' component={RenderHelper} info={this.getObjectFromSrc("liLiane")} t={t} />
              <PropsRoute path='/mantonegro' component={RenderHelper} info={this.getObjectFromSrc("mantonegro")} t={t} />
              <PropsRoute path='/mazatlan' component={RenderHelper} info={this.getObjectFromSrc("mazatlan")} t={t} />
              <PropsRoute path='/miPiedraMiCamino' component={RenderHelper} info={this.getObjectFromSrc("miPiedraMiCamino")} t={t} />
              <PropsRoute path='/onora' component={RenderHelper} info={this.getObjectFromSrc("onora")} t={t} />
              <PropsRoute path='/pentHouse4' component={RenderHelper} info={this.getObjectFromSrc("pentHouse4")} t={t} />
              <PropsRoute path='/rompehueso' component={RenderHelper} info={this.getObjectFromSrc("rompehueso")} t={t} />
              <PropsRoute path='/sema' component={RenderHelper} info={this.getObjectFromSrc("sema")} t={t} />
              <PropsRoute path='/about' component={Us} t={t} />
              <PropsRoute component={Lost} t={t} />
            </Switch>
          </div>
          <Logo style={ {position: "fixed",
                         bottom: "25px", 
                         right: "25px",
                         width: "50px",
                         zIndex: "50"} }/>

          <Language changeLanguage={changeLanguage} />
          {easterEgg}
          <div className="guide"> </div>
        </div>
    );
  }
}




export default translate('translations')(App);
