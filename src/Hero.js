import React, { Component } from 'react';
import './Hero.css';
import Logo from './Logo.js';
import assets from './assets.js';
import { HashLink as Link } from 'react-router-hash-link';

export default class Hero extends Component {


    render(){
        let length = assets.videos.length;
        let index = Math.floor(Math.random() * length);
        return <section className="Hero">
                 <video muted loop autoPlay >
                   <source src={assets.videos[index]} type="video/mp4" />
                   Your browser does not support the video tag.
                 </video>
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