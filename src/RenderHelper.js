import React, { Component } from 'react';
import './RenderHelper.css';
import assets from './assets.js';
import ReactPlayer from 'react-player';
import ImageGallery from 'react-image-gallery';


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
      this.imageGallery.slideToIndex(id);
    }

    handleOnSlide(index) {
      this.setState({image:index});
    }

    render() {
        const type = this.props.info.type;
        let headers = this.props.info.info.headers.map(
             (h, index) => <h2 key={index} className="subtitle is-4">{this.props.t(h)}</h2>);
        let paragraphs = this.props.info.info.paragraphs.map(
             (p, index) => <p key={index} className="content">{this.props.t(p)}</p>);
        let content = null;
        let imageThumbnails = null;

        if(type === "video"){
          let style = {
            'paddingTop': this.props.info.info.aspect + "%"
          }
          content = <div className="Video-player-container" style={style}>
                       <ReactPlayer className="Video-player"
                                 url={this.props.info.info.url}
                                 playing
                                 muted
                                 loop 
                                 /></div>
        } else if(type === "gallery"){
          let images = [];
          this.props.info.info.images.forEach(function(image){images.push({original:assets[image]});});
          content = <ImageGallery ref={imageGallery => this.imageGallery = imageGallery} items={images} showThumbnails={false} showPlayButton={false} showBullets={false} showFullscreenButton={false} onSlide={this.handleOnSlide}/>
          imageThumbnails = <div id="RenderHelper-shortcut">
                              {this.props.info.info.images.map((p, index) => <button className={ "RenderHelper-thumb " + (index===this.state.image?"highlight":"")} key={index} onClick={()=>this.handleTumbnail(index)}>{index + 1}</button>)}
                            </div>
        } else if(type === "portfolio"){
          const iframe = '<iframe src="https://e.issuu.com/issuu-reader3-embed-files/1448/iframe-embed.html?identifier=26qpn9wmxd0z&amp;hostUrl=http%3A%2F%2Fwww.atelier-passus.com%2Fsema.html&amp;hostReferrer=http%3A%2F%2Fwww.atelier-passus.com%2Fproyectos.html&amp;embedType=script#0/35802022" style="border:none;width:100%;height:100%;" title="issuu.com" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen="" msallowfullscree=""></iframe>';
          content = <div className="Iframe-wrapper" 
                         dangerouslySetInnerHTML={ {__html: iframe} } />
        } 

        return <div>
                 <div className="RenderHelper-container">
                   {content}
                 </div>
                 <div>
                   <h1>{this.props.t(this.props.info.info.title)}</h1>
                   {headers}
                   {paragraphs}
                   {imageThumbnails}
                 </div>
               </div>;
    }
}

export default RenderHelper;