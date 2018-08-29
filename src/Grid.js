import React, { Component } from 'react';
import './Grid.css';
import assets from './assets.js';

class Grid extends Component {

    handleClick(path) {
      this.props.history.push('/' + path);
      this.props.closeMenu();
    }
    render() {
        const items = this.props.grid.map((square, index) => 
                <Cell key={index} 
                      image={square.src} 
                      show={this.props.show} 
                      text={this.props.t(square.card)} 
                      onClick={()=>this.handleClick(square.src)}/>
                
            );


        return <div>
                 <section id="projects" className="Grid-container">
                   <div className="Grid">
                     {items}
                   </div>
                 </section>
               </div>
                
    }
}

function Cell(props) {
    return (
        <div className="Grid-cell" onClick={()=>props.onClick()}>
          <img alt="" 
              src={assets[props.image]}/>
          <span className="Grid-mask"></span>
          <p dangerouslySetInnerHTML={{__html:props.text}} />
        </div>
    );
}

export default Grid;