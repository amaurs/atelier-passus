import React, { Component } from 'react';
import './RenderHelper.css';
import assets from './assets.js';
//import ReactPlayer from 'react-player';
//import ImageGallery from 'react-image-gallery';
import Swipeable from 'react-swipeable';

const LEFT = -1;
const RIGHT = 1;

class RenderHelper extends Component {
    constructor(props) {
      super(props);
      this.state = {
          image: 0,
      }
      this.handleClick = this.handleClick.bind(this);
      this.handleTumbnail = this.handleTumbnail.bind(this);
      this.handleOnSlide = this.handleOnSlide.bind(this);
    }

    handleClick() {
      this.props.history.push('/')
    }

    handleTumbnail(id){
      this.setState({image:id});
      //this.imageGallery.slideToIndex(id);
    }

    handleOnSlide(index) {
      this.setState({image:index});
    }

    swiping(e, deltaX, deltaY, absX, absY, velocity) {
      console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
    }
  
    swipingLeft(e, absX) {
      //console.log("You're Swiping to the Left...", e, absX)
      let index = this.state.image;
      let size = this.props.info.info.images.length;
      let current = (index + 1) % size;
      this.setState({image: current});
    }

    swipingRight(e, absX) {
      //console.log("You're Swiping to the Left...", e, absX)
      let index = this.state.image;
      let size = this.props.info.info.images.length;
      let current = (index - 1) % size;
      this.setState({image: current});
    }
  
    swiped(direction) {
      const type = this.props.info.type;
      if(type === "gallery") {
        const currentIndex = this.state.image + direction;
        const size = this.props.info.info.images.length;
        let finalIndex;
        if (currentIndex >= size) {
          finalIndex = 0;
        } else if (currentIndex < 0) {
          finalIndex = size - 1
        } else {
          finalIndex = currentIndex;
        }
        this.setState({ image: finalIndex });
      }
    }
  
    swipedUp(e, deltaY, isFlick) {
      console.log("You Swiped Up...", deltaY, isFlick)
    }

    render() {
        const type = this.props.info.type;
        let headers = this.props.info.info.headers.map(
             (h, index) => <h2 key={index} className="RenderHelper-subtitle">{this.props.t(h)}</h2>);
        let paragraphs = this.props.info.info.paragraphs.map(
             (p, index) => <p key={index} className="RenderHelper-text">{this.props.t(p)}</p>);
        let content = null;
        let imageThumbnails = null;

        if(type === "video"){
          console.log();
          let current = this.props.info.info.videos[0];
          content = <video loop autoPlay muted>
                      <source src={assets[current]} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
        } else if(type === "gallery"){
          let images = [];
          this.props.info.info.images.forEach(function(image){images.push(
            {original:assets[image]}
            );});
          
          let current = this.props.info.info.images[this.state.image];
          content = <img alt="" src={assets[current]} />
          imageThumbnails = <div className="RenderHelper-shortcut">
                              {this.props.info.info.images.map((p, index) => 
                                <button className={ "RenderHelper-thumb " + (index===this.state.image?" highlight":"")} 
                                        key={index} 
                                        onClick={()=>this.handleTumbnail(index)}>{index + 1}
                                </button>)}
                            </div>
        }

        return <div className="RenderHelper">
                 <Swipeable
                      trackMouse
                      preventDefaultTouchmoveEvent
                      onSwipedLeft={()=> this.swiped(LEFT)}
                      onSwipedRight={()=> this.swiped(RIGHT)}
                      className="RenderHelper-container">
                   {content}
                 </Swipeable>
                 <div className="RenderHelper-aside">
                   <h1 className="RenderHelper-title">{this.props.t(this.props.info.info.title)}</h1>
                   {headers}
                   <div className="RenderHelper-description">
                   {paragraphs}
                   </div>
                   {imageThumbnails}
                 </div>
               </div>;
    }
}

export default RenderHelper;