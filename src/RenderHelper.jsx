import React, { useState, useEffect } from 'react';
import './RenderHelper.css';
import assets from './assets.js';
import Card from './Card.jsx';
import { useSwipeable } from 'react-swipeable';

const LEFT = -1;
const RIGHT = 1;

const RenderHelper = (props) => {
  const [image, setImage] = useState(0);
  const [vertical, setVertical] = useState(false);

  useEffect(() => {
    props.visit(props.project.src);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    switch(event.keyCode) {
      case 37:
        swiped(LEFT)
        break;
      case 39:
        swiped(RIGHT)
        break;
      default:
        break;
    }
  }

  const handleOnSlide = (index) => {
    setImage(index);
  }

  const handleImageLoaded = (event) => {
    if(event.target.width < event.target.height) {
      setVertical(true);
    } else {
      setVertical(false);
    }
  }
  
  const swiped = (direction) => {
    const type = props.project.type;
    if(type === "gallery") {
      const currentIndex = image + direction;
      const size = props.project.info.images.length;
      let finalIndex;
      if (currentIndex >= size) {
        finalIndex = size - 1;
      } else if (currentIndex < 0) {
        finalIndex = 0;
      } else {
        finalIndex = currentIndex;
      }
      handleOnSlide(finalIndex);
    }
  }
  
  const handlers = useSwipeable({
    onSwipedLeft: () => swiped(RIGHT),
    onSwipedRight: () => swiped(LEFT),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  let content = null;
  let images = [];
  images = props.project.info.images;

  let drawHelper = (images.length > 1);
  let current = images[image];

  if(current.type === "video"){
    let width = 800;
    if(props.width < 1000) {
      width = props.width;
    }
    let height = width * 3 / 4;
    content = <div className="RenderHelper-video">
                <iframe src={"https://player.vimeo.com/video/" + current.src + "?muted=1&loop=1&autoplay=1"}
                        title={props.project.info.title}
                        width={width}
                        height={height}
                        frameBorder="0"
                        webkitallowfullscreen="true"
                        mozallowfullscreen="true"
                        allowFullScreen>
                </iframe>
              </div>
  } else if(current.type === "image"){
    content = <div className={"RenderHelper-content " + (vertical?"vertical":"")}>
                <span onClick={()=> swiped(LEFT)} className={"Navigate navleft" + (image>0?" decorationleft":"")}> </span>
                <span onClick={()=> swiped(RIGHT)} className={"Navigate navright" + (image<props.project.info.images.length-1?" decorationright":"")}> </span>
                <button className={"RenderHelper-navigation RenderHelper-left " + (drawHelper?"":"hide")}
                        aria-label="Previous image"
                        onClick={()=> swiped(LEFT)}><i className="arrow left"></i></button>
                
                <img className={"RenderHelper-image "} 
                   alt={props.project.info.title} 
                   onLoad={(e)=>handleImageLoaded(e)} 
                   src={assets[current.src]} />
                <button className={"RenderHelper-navigation RenderHelper-right " + (drawHelper?"":"hide")}
                        aria-label="Next image"
                        onClick={()=> swiped(RIGHT)}><i className="arrow right"></i></button>
              </div>
  }

  return <div {...handlers} className="RenderHelper">
           <div className={"RenderHelper-container "}>
             <div className="RenderHelper-content-wrapper">
                {content}
             </div>
           </div>
           <Card headers={props.project.info.headers}
                 paragraphs={props.project.info.paragraphs}
                 footer={props.project.info.footer}
                 images={images}
                 handleOnSlide={handleOnSlide}
                 title={props.project.info.title}
                 index={image}
                 id={props.project.info.id}
                 t={props.t} />
         </div>;
}

export default RenderHelper;