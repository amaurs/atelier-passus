import React from 'react';
import './Grid.css';
import assets from './assets.js';
import Logo from './Logo.jsx';
import { Link, useNavigate } from 'react-router-dom';

function Grid(props) {
    const navigate = useNavigate();

    function handleClick(path) {
      navigate('/' + path);
      props.closeMenu();
    }

    const items = props.grid.map((square, index) => 
            <Cell key={index} 
                  image={square.src}
                  text={props.t(square.card)} 
                  onClick={()=>handleClick(square.src)}
                  isVisited={props.visited.includes(square.src)}/>
            
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

function Cell(props) {
    return (
        <div className={"Grid-cell" + (props.isVisited? " cross": "")} onClick={()=>props.onClick()}>
          <img alt={props.text} 
              src={assets[props.image]}/>
          <span className="Grid-mask"></span>
          <p dangerouslySetInnerHTML={{__html:props.text}} />
        </div>
    );
}

export default Grid;