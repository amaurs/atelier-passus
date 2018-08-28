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
                 <Link to="/projects">
                   <Logo additional={"-hero"}
                         style={ {fill:"white"} }/>
                 </Link>
                 <video muted loop autoPlay >
                   <source src={assets.videos[index]} type="video/mp4" />
                   Your browser does not support the video tag.
                 </video>
                 <Link to="/projects">
                   <p>atelier /</p>
                 </Link>
               </section>
    }
}