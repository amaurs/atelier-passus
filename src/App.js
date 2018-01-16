import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { translate } from 'react-i18next';
import Grid from './Grid.js';
import Header from './Header.js';
import RenderHelper from './RenderHelper.js';
import text from './text.js';
import './App.css';
import assets from './assets.js';

const infoArray = text.info;
const plainArray = text.plain;




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
    console.log(this.props.i18n);
    console.log(process.env.PUBLIC_URL);
    /**
    text.info.forEach(function(obj){
      console.log("\"" + obj.src + "-card\":\"" + obj.card + "\",");
      console.log("\"" + obj.src + "-title\":\"" + obj.info.title + "\",");
      obj.info.headers.forEach(function(header, index){
          console.log("\"" + obj.src + "-header" + "" + index + "\":\"" + header + "\",");
      });
      obj.info.paragraphs.forEach(function(paragraph, index){
          console.log("\"" + obj.src + "-paragraph" + "" + index + "\":\"" + paragraph + "\",");
      });
    });


    text.info.forEach(function(obj){
      console.log("{src:\"" + obj.src + "\",");
      console.log(" type:\"" + obj.type + "\",");
      console.log(" card:\"" + obj.src + "-card\",");
      console.log(" info:{title:\"" + obj.src + "-title\",");
      console.log("       headers:[");
      obj.info.headers.forEach(function(header, index){
          console.log("               \"" + obj.src + "-header" + index + "\",");
      });
      console.log("               ],");
      console.log("       paragraphs:[");
      obj.info.paragraphs.forEach(function(paragraph, index){
          console.log("               \"" + obj.src + "-paragraph" + index + "\",");
      });
      console.log("               ],");
      if(obj.info.images) {
        console.log("       images:[");
        obj.info.images.forEach(function(image, index){
          console.log("               \"" + image + "\",");
        });
        console.log("               ]}},");
      }
      if(obj.info.url) {
        console.log("       url:\""+obj.info.url+"\"}},");
      }
    });
    **/
    this.state = {
      image: 0,
      index:0,
      isLoggedIn: false,
      pos:0,
      language:this.props.i18n.language,
      scrolling: false,
    }
  }

  handleKeys(ev){
    console.log("The event was launched.");
  }

  componentDidMount() {
    window.addEventListener("keydown", this.add.bind(this));
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }
  
  componentWillUnmount() {
    window.removeEventListener("keydown", this.add.bind(this));
    window.removeEventListener("scroll", this.handleScroll.bind(this));
  }
  handleScroll(event) {
      if (window.scrollY === 0 && this.state.scrolling === true) {
          this.setState({scrolling: false});
      }
      else if (window.scrollY !== 0 && this.state.scrolling !== true) {
          this.setState({scrolling: true});
      }
      console.log(this.state.scrolling);
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
    console.log("this.props");
    console.log(this.props);
    const { t, i18n } = this.props;
    console.log(i18n.language);
    const changeLanguage = (lng) => {
      console.log("Language changed to " + lng);
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
        <div className="App-container" >
          <Switch >
            <PropsRoute exact path='/' component={Grid} grid={infoArray} changeLanguage={changeLanguage} t={t} language={this.state.language} scrolling={this.state.scrolling}/>
            <PropsRoute path='/boissy' component={RenderHelper} info={this.getObjectFromSrc("boissy")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/casa30' component={RenderHelper} info={this.getObjectFromSrc("casa30")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/castillo' component={RenderHelper} info={this.getObjectFromSrc("castillo")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/ciclos' component={RenderHelper} info={this.getObjectFromSrc("ciclos")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/colodion' component={RenderHelper} info={this.getObjectFromSrc("colodion")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/espita' component={RenderHelper} info={this.getObjectFromSrc("espita")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/herakles' component={RenderHelper} info={this.getObjectFromSrc("herakles")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/hualemnah' component={RenderHelper} info={this.getObjectFromSrc("hualemnah")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/instrucciones' component={RenderHelper} info={this.getObjectFromSrc("instrucciones")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/invisible' component={RenderHelper} info={this.getObjectFromSrc("invisible")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/kancaba' component={RenderHelper} info={this.getObjectFromSrc("kancaba")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/laredo' component={RenderHelper} info={this.getObjectFromSrc("laredo")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/liliane' component={RenderHelper} info={this.getObjectFromSrc("liliane")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/mata' component={RenderHelper} info={this.getObjectFromSrc("mata")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/mazatlan' component={RenderHelper} info={this.getObjectFromSrc("mazatlan")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/media' component={RenderHelper} info={this.getObjectFromSrc("media")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/mipiedra' component={RenderHelper} info={this.getObjectFromSrc("mipiedra")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/num5' component={RenderHelper} info={this.getObjectFromSrc("num5")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/onora' component={RenderHelper} info={this.getObjectFromSrc("onora")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/pdm' component={RenderHelper} info={this.getObjectFromSrc("pdm")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/paisajesonoro' component={RenderHelper} info={this.getObjectFromSrc("paisajesonoro")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/plan' component={RenderHelper} info={this.getObjectFromSrc("plan")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/senderos' component={RenderHelper} info={this.getObjectFromSrc("senderos")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>   
            <PropsRoute path='/sema' component={RenderHelper} info={this.getObjectFromSrc("sema")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/tension' component={RenderHelper} info={this.getObjectFromSrc("tension")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/xucu' component={RenderHelper} info={this.getObjectFromSrc("xucu")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/about' component={RenderHelper} info={this.getObjectFromPlainSrc("about")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute path='/contact' component={RenderHelper} info={this.getObjectFromPlainSrc("contact")} changeLanguage={changeLanguage} t={t} language={this.state.language}/>
            <PropsRoute component={RenderHelper} changeLanguage={changeLanguage} t={t} />
          </Switch>

          {easterEgg}
        
        </div>
    );
  }
}




export default translate('translations')(App);
