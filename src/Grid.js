import React, { Component } from 'react';
import './Grid.css';
import assets from './assets.js';
import ScrollableAnchor from 'react-scrollable-anchor';
import Hero from './Hero.js';

class Grid extends Component {

    handleClick(path) {
      this.props.history.push('/' + path)
    }
    render() {
        console.log(this.props);
        const items = this.props.grid.map((square, index) => 
                <Cell key={index} 
                      image={square.src} 
                      show={this.props.show} 
                      text={this.props.t(square.card)} 
                      onClick={()=>this.handleClick(square.src)}/>
                
            );


        return <div>
                  <ScrollableAnchor id={'hero'}>
                    <Hero />
                  </ScrollableAnchor>
                  <ScrollableAnchor id={'projects'}>
                    <section className="Grid">{items}</section>
                  </ScrollableAnchor>
               </div>
                
    }
}

function Cell(props) {
    return (
        <div className="Grid-cell" onClick={()=>props.onClick()}>
          <img alt="" 
               className="Grid-responsive-image" 
              src={assets[props.image]}/>
          <p>{props.text}</p>
        </div>
    );
}

export default Grid;