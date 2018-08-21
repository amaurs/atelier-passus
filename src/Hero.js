import React, { Component } from 'react';
import './Hero.css';
import video from './video/cycle.mp4';

export default class Hero extends Component {

    render(){
        return <section className="Hero">
                 <video loop autoPlay muted>
                   <source src={video} type="video/mp4" />
                   Your browser does not support the video tag.
                 </video>
               </section>
    }
}