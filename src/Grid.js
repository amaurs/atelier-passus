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
                <Cell key={index} image={square.src} text={square.text} onClick={()=>this.handleClick(square.src)}/>
                
            );

        return  <div className="Grid">{items}</div>
    }

}

function Cell(props) {
    return (
        <div className="Cell" onClick={()=>props.onClick()}><img alt="" className="hover" src={assets[props.image]}/><div className="text"><p>{props.text}</p></div></div>
    );
}

export default Grid;