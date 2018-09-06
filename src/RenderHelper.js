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
      console.log('it is vertical');
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
      const type = this.props.project.type;
      let content = null;
      let images = [];

      if(type === "video"){
        console.log();
        let current = this.props.project.info.videos[0];
        content = <video loop autoPlay muted playsinline>
                    <source src={assets[current]} type="video/mp4" />
                      Your browser does not support the video tag.
                  </video>
      } else if(type === "gallery"){
        
        images = this.props.project.info.images;
        let current = images[this.state.image];
        console.log(current);
        content = <img className={this.state.vertical?"float-right":""} alt="" onLoad={(e)=>this.handleImageLoaded(e)} src={assets[current]} />
        console.log(content);
      }

      return <div className="RenderHelper">
               <Swipeable trackMouse
                          preventDefaultTouchmoveEvent
                          onSwipedLeft={()=> this.swiped(LEFT)}
                          onSwipedRight={()=> this.swiped(RIGHT)}
                          className="RenderHelper-container">
                 {content}
               </Swipeable>
               <Card headers={this.props.project.info.headers}
                     paragraphs={this.props.project.info.paragraphs}
                     images={images}
                     handleOnSlide={this.handleOnSlide.bind(this)}
                     title={this.props.project.info.title}
                     index={this.state.image}
                     t={this.props.t} />
             </div>;
  }
}

export default RenderHelper;