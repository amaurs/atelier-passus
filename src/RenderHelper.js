import React, { Component } from 'react';
import './RenderHelper.css';
import assets from './assets.js';
import Card from './Card.js';
import Swipeable from 'react-swipeable';

const LEFT = -1;
const RIGHT = 1;

class RenderHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 0,
      vertical: false,
    }
    this.handleOnSlide = this.handleOnSlide.bind(this);

    this.props.visit(this.props.project.src)
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
  }
  
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  handleKeyDown(event) {
    switch(event.keyCode) {
      case 37:
        this.swiped(LEFT)
        break;
      case 39:
        this.swiped(RIGHT)
        break;
      default:
        break;
    }
  }

  handleOnSlide(index) {
    this.setState({image:index});
  }

  handleImageLoaded(event) {
    if(event.target.width < event.target.height) {
      this.setState({vertical: true})
    } else {
      this.setState({vertical: false})
    }
  }
  
  swiped(direction) {
    const type = this.props.project.type;
    if(type === "gallery") {
      const currentIndex = this.state.image + direction;
      const size = this.props.project.info.images.length;
      let finalIndex;
      if (currentIndex >= size) {
        finalIndex = 0;
      } else if (currentIndex < 0) {
        finalIndex = size - 1
      } else {
        finalIndex = currentIndex;
      }
      this.handleOnSlide(finalIndex);
    }
  }
  
  swipedUp(e, deltaY, isFlick) {
    console.log("You Swiped Up...", deltaY, isFlick)
  }

  render() {
      let content = null;
      let images = [];
      images = this.props.project.info.images;

      let drawHelper = (images.length > 1);
      console.log(images[this.state.image].type)
      let current = images[this.state.image];

      console.log(this.props)
      console.log(this.state.width);

      if(current.type === "video"){
        let width = 800;
        if(this.props.width < 1000) {
          width = this.props.width;
        }
        let height = width * 3 / 4;
        console.log("the width should be: " + width);
        content = <div className="RenderHelper-video">
                    <iframe src={"https://player.vimeo.com/video/" + current.src + "?muted=1&loop=1&autoplay=1"}
                            title={this.props.project.info.title}
                            width={width}
                            height={height}
                            frameBorder="0"
                            webkitallowfullscreen="true"
                            mozallowfullscreen="true"
                            allowFullScreen>
                    </iframe>
                  </div>
      } else if(current.type === "image"){
        content = <div className={"RenderHelper-content " + (this.state.vertical?"vertical":"")}>
                    <span onClick={()=> this.swiped(LEFT)} className="Navigate navleft"> </span>
                    <span onClick={()=> this.swiped(LEFT)} className="Navigate navright"> </span>
                    <button className={"RenderHelper-navigation RenderHelper-left " + (drawHelper?"":"hide")}
                            onClick={()=> this.swiped(LEFT)}><i className="arrow left"></i></button>
                    
                    <img className={"RenderHelper-image "} 
                       alt="" 
                       onLoad={(e)=>this.handleImageLoaded(e)} 
                       src={assets[current.src]} />
                    <button className={"RenderHelper-navigation RenderHelper-right " + (drawHelper?"":"hide")}
                            onClick={()=> this.swiped(RIGHT)}><i className="arrow right"></i></button>
                  </div>
      }

      return <Swipeable trackMouse
                        preventDefaultTouchmoveEvent
                        onSwipedLeft={()=> this.swiped(RIGHT)}
                        onSwipedRight={()=> this.swiped(LEFT)} 
                        className="RenderHelper">
               <div className={"RenderHelper-container "}>
                 <div className="RenderHelper-content-wrapper">
                    {content}
                 </div>
               </div>
               <Card headers={this.props.project.info.headers}
                     paragraphs={this.props.project.info.paragraphs}
                     footer={this.props.project.info.footer}
                     images={images}
                     handleOnSlide={this.handleOnSlide.bind(this)}
                     title={this.props.project.info.title}
                     index={this.state.image}
                     id={this.props.project.info.id}
                     t={this.props.t} />
             </Swipeable>;
  }
}

export default RenderHelper;