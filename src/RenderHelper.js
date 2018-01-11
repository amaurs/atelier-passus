import React from 'react';
import Info from './Info.js';
import Video from './Video.js';
import Portfolio from './Portfolio.js';


function RenderHelper(props){
  const type = props.info.type;
  console.log(type);
  if(type === "gallery"){
    console.log("Info");
    return <Info info={props.info} t={props.t} />
  } else if(type === "video"){
    console.log("Video");
    return <Video info={props.info}  t={props.t} />
  } else if(type === "portfolio"){
    console.log("portfolio");
    return <Portfolio info={props.info} t={props.t} />
  }
}


export default RenderHelper;