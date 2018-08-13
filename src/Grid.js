import React, { Component } from 'react';
import './Grid.css';
import assets from './assets.js';

class Grid extends Component {

    handleClick(path) {
      this.props.history.push('/' + path)
    }
    render() {
        console.log(this.props);
        const items = this.props.grid.map((square, index) => 
                <Cell key={index} image={square.src} show={this.props.show} text={this.props.t(square.card)} onClick={()=>this.handleClick(square.src)}/>
                
            );

        return  <section>{items}</section>
    }
}

function Cell(props) {
    return (
        <div className={"cell column is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen is-one-fifth-fullhd" + (props.show?" is-showing":"")} onClick={()=>props.onClick()}>
          <figure className="image is-square">
            <img className="Grid-image" src={assets[props.image]}/>
          </figure>
          <div className="">
            <p>{props.text}</p>
          </div>
        </div>
    );
}

export default Grid;