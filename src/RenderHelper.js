import React from 'react';
import Info from './Info.js';
import Video from './Video.js';
import Portfolio from './Portfolio.js';


function RenderHelper(props){
  const type = props.info.type;
  if(type === "gallery"){
    return <Info info={props.info} changeLanguage={props.changeLanguage} t={props.t} />
  } else if(type === "video"){
    return <Video info={props.info} changeLanguage={props.changeLanguage} t={props.t} />
  } else if(type === "portfolio"){
    return <Portfolio info={props.info} changeLanguage={props.changeLanguage} t={props.t} />
  }
}


export default RenderHelper;