import React, { Component } from 'react';
import './Hero.css';
import Logo from './Logo.js';
import video from './video/cycle.mp4';

export default class Hero extends Component {

    render(){
        return <section className="Hero">
                 <Logo style={ {fill:"white"} }/>
                 <video muted loop autoPlay >
                   <source src={video} type="video/mp4" />
                   Your browser does not support the video tag.
                 </video>
                 <p>atelier /</p>
               </section>
    }
}