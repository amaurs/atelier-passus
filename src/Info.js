import React, { Component } from 'react';
import './Info.css';
import ImageGallery from 'react-image-gallery';
import assets from './assets.js';

class Info extends Component {
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
      this.imageGallery.slideToIndex(id);
    }

    handleOnSlide(index) {
      this.setState({image:index});
    }

    render() {
        let headers = this.props.info.info.headers.map(
             (h, index) => <h3 key={index}>{this.props.t(h)}</h3>);
        let paragraphs = this.props.info.info.paragraphs.map(
             (p, index) => <p key={index}>{this.props.t(p)}</p>);
        let images = [];
        this.props.info.info.images.forEach(function(image){images.push({original:assets[image]});});
        let imageThumbnails = this.props.info.info.images.map((p, index) => <button className={ "Info-thumb " + (index===this.state.image?"highlight":"")} key={index} onClick={()=>this.handleTumbnail(index)}>{index + 1}</button>);
        
        return  <div className="Info-container">
                   <div className="Info-image">
                        <ImageGallery ref={imageGallery => this.imageGallery = imageGallery} items={images} showThumbnails={false} showPlayButton={false} showBullets={false} showFullscreenButton={false} onSlide={this.handleOnSlide}/>
                   </div>
                   <div className="Info-text-container">
                        <div className="Info-text">
                          <h1>{this.props.t(this.props.info.info.title)}</h1>
                          {headers}
                          {paragraphs}
                          <div id="Info-shortcut">
                            {imageThumbnails}
                          </div>
                        </div>
                   </div>
                </div>;
    }

}

export default Info;