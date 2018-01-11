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
          <Switch >
            <PropsRoute exact path='/' component={Grid} grid={infoArray} changeLanguage={changeLanguage} t={t} />
            <PropsRoute path='/boissy' component={RenderHelper} info={this.getObjectFromSrc("boissy")} t={t} />
            <PropsRoute path='/casa30' component={RenderHelper} info={this.getObjectFromSrc("casa30")} t={t} />
            <PropsRoute path='/castillo' component={RenderHelper} info={this.getObjectFromSrc("castillo")} t={t} />
            <PropsRoute path='/ciclos' component={RenderHelper} info={this.getObjectFromSrc("ciclos")} t={t} />
            <PropsRoute path='/colodion' component={RenderHelper} info={this.getObjectFromSrc("colodion")} t={t} />
            <PropsRoute path='/espita' component={RenderHelper} info={this.getObjectFromSrc("espita")} t={t} />
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
          </Switch>

          {easterEgg}
        
        </div>
    );
  }
}




export default translate('translations')(App);
