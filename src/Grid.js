import React, { Component } from 'react';
import './Grid.css';
import assets from './assets.js';

class Grid extends Component {

    render() {
        const items = this.props.grid.map((row, index) => 
                <Row key={index} row={row} />
                
            );

        return  <div className="grid">{items}</div>
    }

}

function Row(props) {
        console.log(props);
        return (
            <div>{props.row.map((square, index) => <Cell key={index} image={square.src} text={square.text} />)}</div>
        );
}

function Cell(props) {
    return (
        <div className="Cell"><img className="hover" src={assets[props.image]}/><p className="text">{props.text}</p></div>
    );
}

export default Grid;