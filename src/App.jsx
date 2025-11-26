import React, { Component } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Grid from './Grid.jsx';
import Hamburger from './Hamburger.jsx';
import Hero from './Hero.jsx';
import Language from './Language.jsx';
import Lost from './Lost.jsx';
import Menu from './Menu.jsx';
import RenderHelper from './RenderHelper.jsx';
import Us from './Us.jsx';
import text from './text.js';
import './App.css';
import assets from './assets.js';
import { HashLink as Link } from 'react-router-hash-link';
import Lines from './Lines.jsx';


const infoArray = [...text.info2].sort(function(a, b){
  const yearA = a.year || 0;
  const yearB = b.year || 0;
  return yearB - yearA;
});

const AppLayout = (props) => {
  const location = useLocation();
  const isGallery = location.pathname === '/projects';
  const { t, changeLanguage, isActive, onClick, closeMenu } = props;
  let conditionalLink = null;
  let conditionalHyphen = null;
  if(!isGallery && !isActive) {
    conditionalLink = <Link className="App-projects"
                     to="/projects" >
                     <Lines />
                     {t("projects")}
               </Link>

    conditionalHyphen = <span className="App-controls-separator">-</span>;
  }

  return (
    <div>
      <Menu {...props} />
      <div className={"App-controls" + (isActive?" solid-backgorund":"")}>
          <Hamburger {...props} />
          <Language changeLanguage={changeLanguage}/>
          {conditionalHyphen}
          {conditionalLink}
      </div>
      <Outlet />
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
      visited: [],
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

  visit(page){
    let visited = this.state.visited;
    if(!visited.includes(page)) {
        visited.push(page);
    }
    this.setState({visited: visited});
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
            <Routes>
              <Route exact path='/' element={<Hero {...this.props} {...this.state} />} />
              <Route exact path='/index.html' element={<Hero {...this.props} {...this.state} />} />

              <Route element={<AppLayout {...this.props} {...this.state} changeLanguage={changeLanguage} onClick={this.handleMenu.bind(this)} closeMenu={this.closeMenu.bind(this)} />}>
                <Route exact path='/projects' element={<Grid t={t} grid={infoArray} isGallery={true} visited={this.state.visited} closeMenu={this.closeMenu.bind(this)} />} />
                <Route path='/arbolesDeVida' element={<RenderHelper t={t} project={this.getObjectFromSrc("arbolesDeVida")} visit={this.visit.bind(this)} />} />
                <Route path='/arvant' element={<RenderHelper t={t} project={this.getObjectFromSrc("arvant")} visit={this.visit.bind(this)} />} />
                <Route path='/aube' element={<RenderHelper t={t} project={this.getObjectFromSrc("aube")} visit={this.visit.bind(this)} />} />
                <Route path='/belaBartok' element={<RenderHelper t={t} project={this.getObjectFromSrc("belaBartok")} visit={this.visit.bind(this)} />} />
                <Route path='/casaFemaria' element={<RenderHelper t={t} project={this.getObjectFromSrc("casaFemaria")} visit={this.visit.bind(this)} />} />
                <Route path='/elCicloDeLaPiel' element={<RenderHelper t={t} project={this.getObjectFromSrc("elCicloDeLaPiel")} visit={this.visit.bind(this)} />} />
                <Route path='/cinco' element={<RenderHelper t={t} project={this.getObjectFromSrc("cinco")} visit={this.visit.bind(this)} />} />
                <Route path='/colodionNum13' element={<RenderHelper t={t} project={this.getObjectFromSrc("colodionNum13")} visit={this.visit.bind(this)} />} />
                <Route path='/elAlofonoDeLaVida' element={<RenderHelper t={t} project={this.getObjectFromSrc("elAlofonoDeLaVida")} visit={this.visit.bind(this)} />} />
                <Route path='/herakles' element={<RenderHelper t={t} project={this.getObjectFromSrc("herakles")} visit={this.visit.bind(this)} />} />
                <Route path='/instruccionesParaUnArquitecto' element={<RenderHelper t={t} project={this.getObjectFromSrc("instruccionesParaUnArquitecto")} visit={this.visit.bind(this)} />} />
                <Route path='/invencibleInvisible' element={<RenderHelper t={t} project={this.getObjectFromSrc("invencibleInvisible")} visit={this.visit.bind(this)} />} />
                <Route path='/laredo' element={<RenderHelper t={t} project={this.getObjectFromSrc("laredo")} visit={this.visit.bind(this)} />} />
                <Route path='/liLiane' element={<RenderHelper t={t} project={this.getObjectFromSrc("liLiane")} visit={this.visit.bind(this)} />} />
                <Route path='/mantonegro' element={<RenderHelper t={t} project={this.getObjectFromSrc("mantonegro")} visit={this.visit.bind(this)} />} />
                <Route path='/mata' element={<RenderHelper t={t} project={this.getObjectFromSrc("mata")} visit={this.visit.bind(this)} />} />
                <Route path='/mazatlan' element={<RenderHelper t={t} project={this.getObjectFromSrc("mazatlan")} visit={this.visit.bind(this)} />} />
                <Route path='/onora' element={<RenderHelper t={t} project={this.getObjectFromSrc("onora")} visit={this.visit.bind(this)} />} />
                <Route path='/pentHouse4' element={<RenderHelper t={t} project={this.getObjectFromSrc("pentHouse4")} visit={this.visit.bind(this)} />} />
                <Route path='/planDeEscape' element={<RenderHelper t={t} project={this.getObjectFromSrc("planDeEscape")} visit={this.visit.bind(this)} />} />
                <Route path='/rompehueso' element={<RenderHelper t={t} project={this.getObjectFromSrc("rompehueso")} visit={this.visit.bind(this)} />} />
                <Route path='/sema' element={<RenderHelper t={t} project={this.getObjectFromSrc("sema")} visit={this.visit.bind(this)} />} />
                <Route path='/senderos' element={<RenderHelper t={t} project={this.getObjectFromSrc("senderos")} visit={this.visit.bind(this)} />} />
                <Route path='/sillaSavia' element={<RenderHelper t={t} project={this.getObjectFromSrc("sillaSavia")} visit={this.visit.bind(this)} />} />
                <Route path='/canalDeNado' element={<RenderHelper t={t} project={this.getObjectFromSrc("canalDeNado")} visit={this.visit.bind(this)} />} />
                <Route path='/contact' element={<RenderHelper t={t} project={this.getObjectFromSrc("contact")} visit={this.visit.bind(this)} />} />
                <Route path='/us' element={<RenderHelper t={t} project={this.getObjectFromSrc("us")} visit={this.visit.bind(this)} />} />
                <Route path='/us2' element={<Us t={t} />} />
                <Route path='/studio' element={<RenderHelper t={t} project={this.getObjectFromSrc("studio")} visit={this.visit.bind(this)} />} />
              </Route>

              <Route path='*' element={<Lost {...this.props} {...this.state} t={t} />} />
            </Routes>
          </div>
          {easterEgg}
          <div className={"App-cloud" + (this.state.isActive?" active":"")}
               onClick={()=>this.handleMenu()}> </div>
          <div className="guide"> </div>
        </div>
    );
  }
}

export default withTranslation('translations')(App);

