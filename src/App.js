import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { translate } from 'react-i18next';
import Grid from './Grid.js';
import Hamburger from './Hamburger.js';
import Hero from './Hero.js';
import Language from './Language.js';
import Lost from './Lost.js';
import Menu from './Menu.js';
import RenderHelper from './RenderHelper.js';
import Us from './Us.js';
import Contact from './Contact.js';
import Studio from './Studio.js';
import text from './text.js';
import './App.css';
import assets from './assets.js';
import { HashLink as Link } from 'react-router-hash-link';
import Lines from './Lines.js';


const infoArray = text.info2.sort(function(a, b){ return b.year - a.year; });

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const HeroRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

const PropsRoute = ({ component, ...rest }) => {
  
  let conditionalLink = null;
  let conditionalHyphen = null;
  if(!rest.isGallery && !rest.isActive) {
    conditionalLink = <Link className="App-projects" 
                     to="/projects" >
                     <Lines />
                     {rest.t("projects")}
               </Link>

    conditionalHyphen = <span className="App-controls-separator">-</span>;
  }
  

  return (
    <div>
      <Menu {...rest} />
      <div className={"App-controls" + (rest.isActive?" solid-backgorund":"")}>
          <Hamburger {...rest} />
          <Language changeLanguage={rest.changeLanguage}/>
          {conditionalHyphen}
          {conditionalLink}
      </div>
      <Route {...rest} render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}/>
      
    </div>
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
    this.state = {
      image: 0,
      index: 0,
      isLoggedIn: false,
      pos: 0,
      language: this.props.i18n.language,
      isActive: false,
      width: 0,
      height: 0,
      scroll: 0,
    }
  }

  updateDimensions(){
    console.log("Updating dimensions.");
    let update_width  = window.innerWidth;
    let update_height = window.innerHeight;
    this.setState({ width: update_width, height: update_height });
  }

  handleKeys(event){
    console.log("The event was launched.");
  }

  handleMenu(){
    const isActive = this.state.isActive;
    this.setState({isActive: !isActive});
  }

  closeMenu() {
    this.setState({isActive: false});
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
    this.setState({scroll: window.scrollY});
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
      console.log("Change to " + lng);
      i18n.changeLanguage(lng);
    }
    const isLoggedIn = this.state.isLoggedIn;
    let easterEgg = null;

    if (isLoggedIn) {
      let pos = this.state.pos;
      easterEgg =  <EasterEgg image={"easterImage"} pos={pos}/>
    }
    return (
        <div className={"Body" + (this.state.active?" active":"")}>
          <div className={"Content"}>
            <Switch>
              <HeroRoute exact path='/index.html'
                         width={this.state.width}
                         height={this.state.heigh}
                         component={Hero} />
              <HeroRoute exact path='/'
                         width={this.state.width}
                         height={this.state.heigh}
                         component={Hero} />
              <PropsRoute exact path='/projects'
                          changeLanguage={changeLanguage}
                          width={this.state.width}
                          height={this.state.heigh}
                          component={Grid} 
                          grid={infoArray}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)}
                          closeMenu={this.closeMenu.bind(this)}
                          isGallery={true}
                          t={t} />
              <PropsRoute path='/arbolesDeVida' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("arbolesDeVida")} t={t} />
              <PropsRoute path='/arvant'
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)}
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper}
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("arvant")} t={t} />
              <PropsRoute path='/aube' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("aube")} t={t} />
              <PropsRoute path='/belaBartok' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("belaBartok")} t={t} />
              <PropsRoute path='/casaFemaria' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("casaFemaria")} t={t} />
              <PropsRoute path='/elCicloDeLaPiel' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("elCicloDeLaPiel")} t={t} />
              <PropsRoute path='/chaux'
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)}
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper}
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("chaux")}
                          t={t} />
              <PropsRoute path='/cinco'
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("cinco")} 
                          t={t} />
              <PropsRoute path='/colodionNum13' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("colodionNum13")} 
                          t={t} />
              <PropsRoute path='/elAlofonoDeLaVida' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("elAlofonoDeLaVida")} 
                          t={t} />
              <PropsRoute path='/herakles' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("herakles")} 
                          t={t} />
              <PropsRoute path='/instruccionesParaUnArquitecto' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("instruccionesParaUnArquitecto")} 
                          t={t} />
              <PropsRoute path='/invencibleInvisible' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("invencibleInvisible")} 
                          t={t} />
              <PropsRoute path='/laredo' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("laredo")} 
                          t={t} />
              <PropsRoute path='/liLiane' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("liLiane")} 
                          t={t} />
              <PropsRoute path='/mantonegro' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("mantonegro")} 
                          t={t} />
              <PropsRoute path='/mata' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("mata")} 
                          t={t} />
              <PropsRoute path='/mazatlan' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("mazatlan")} 
                          t={t} />
              <PropsRoute path='/miPiedraMiCamino' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("miPiedraMiCamino")} 
                          t={t} />
              <PropsRoute path='/onora' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("onora")} 
                          t={t} />
              <PropsRoute path='/pentHouse4' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("pentHouse4")} 
                          t={t} />
              <PropsRoute path='/planDeEscape' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("planDeEscape")} 
                          t={t} />
              <PropsRoute path='/rompehueso' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("rompehueso")} 
                          t={t} />
              <PropsRoute path='/sema' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("sema")} 
                          t={t} />
              <PropsRoute path='/sillaTirasavia' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("sillaTirasavia")} 
                          t={t} />

              <PropsRoute path='/canalDeNado' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("canalDeNado")} 
                          t={t} />

              <PropsRoute path='/contact' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("contact")} 
                          t={t} />
              <PropsRoute path='/us' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("us")} 
                          t={t} />
              <PropsRoute path='/us2' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={Us} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("us")} 
                          t={t} />
              <PropsRoute path='/studio' 
                          changeLanguage={changeLanguage}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)} 
                          width={this.state.width}
                          height={this.state.heigh}
                          component={RenderHelper} 
                          closeMenu={this.closeMenu.bind(this)}
                          project={this.getObjectFromSrc("studio")} 
                          t={t} />
            
              <PropsRoute path='*'
                          component={Lost} 
                          changeLanguage={changeLanguage}
                          width={this.state.width}
                          height={this.state.heigh}
                          isActive={this.state.isActive}
                          onClick={this.handleMenu.bind(this)}
                          closeMenu={this.closeMenu.bind(this)}
                          t={t} />
            </Switch>
          </div>
          {easterEgg}
          <div className={"App-cloud" + (this.state.isActive?" active":"")}
               onClick={()=>this.handleMenu()}> </div>
          <div className="guide"> </div>
        </div>
    );
  }
}

export default translate('translations')(App);
