import React, { Component } from 'react';
import './Grid.css';
import assets from './assets.js';
import Logo from './Logo.js';
import { Link } from 'react-router-dom';

class Grid extends Component {

    handleClick(path) {
      this.props.history.push('/' + path);
      this.props.closeMenu();
    }
    render() {
        const items = this.props.grid.map((square, index) => 
                <Cell key={index} 
                      image={square.src}
                      text={this.props.t(square.card)} 
                      onClick={()=>this.handleClick(square.src)}/>
                
            );


        return <div>
                 <section id="projects" className="Grid-container">
                   <div className="Grid">
                     {items}
                   </div>
                 </section>
                 <Link to="/">
                   <Logo style={ {position: "fixed",
                                  bottom: "25px", 
                                  right: "25px",
                                  width: "50px",
                                  zIndex: "4"} }/>
                 </Link>
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