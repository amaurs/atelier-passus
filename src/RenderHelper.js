import React from 'react';
import Info from './Info.js';
import Video from './Video.js';
import Portfolio from './Portfolio.js';
import Plain from './Plain.js';


function RenderHelper(props){
  if(props.info){
    const type = props.info.type
    if(type === "gallery"){
      return <Info info={props.info} changeLanguage={props.changeLanguage} t={props.t} />
    } else if(type === "video"){
      return <Video info={props.info} changeLanguage={props.changeLanguage} t={props.t} />
    } else if(type === "portfolio"){
      return <Portfolio info={props.info} changeLanguage={props.changeLanguage} t={props.t} />
    } else if(type === "plain"){
      return <Plain info={props.info} changeLanguage={props.changeLanguage} t={props.t} />
    }
  } else {
    return <div><p>{props.t("four-oh-four")}</p></div>
  }

}


export default RenderHelper;