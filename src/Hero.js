import React, { Component } from 'react';
import './Hero.css';
import Logo from './Logo.js';
import assets from './assets.js';
import { HashLink as Link } from 'react-router-hash-link';

const videos = [
                "288635294", 
                "288635258", 
                "288635232",
               ];

export default class Hero extends Component {

    render(){
        let length = videos.length;
        let index = Math.floor(Math.random() * length);
        return <section className="Hero">
                 <iframe src={"https://player.vimeo.com/video/" + videos[index] + "?background=1"}
                         width="100%" 
                         height="100%" 
                         frameborder="0" 
                         webkitAllowFullScreen 
                         mozAllowFullScreen 
                         AllowFullScreen>
                 </iframe>
                 <span style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "black",
                    opacity: "0.1"
                 }}></span>
                 <Link to="/projects">
                   <Logo additional={"-hero"}
                         style={ {fill:"white"} }/>
                 </Link>
                 <Link to="/projects">
                   <p>atelier /</p>
                 </Link>
               </section>
    }
}