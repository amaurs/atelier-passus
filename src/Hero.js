import React, { Component } from 'react';
import './Hero.css';
import logo from './logo.svg';

export default class Header extends Component {

    render(){
        return <section className="Hero">
                 <img src={logo} className="App-logo" alt="Atelier Passus" />
               </section>
    }
}