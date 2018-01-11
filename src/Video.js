import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import './Video.css';

class Video extends Component {
    render() {
        console.log(this.props);
        let headers = this.props.info.info.headers.map(
          (h, index) => <h3 key={index}>{this.props.t(h)}</h3>);
        let paragraphs = this.props.info.info.paragraphs.map(
          (p, index) => <p key={index}>{this.props.t(p)}</p>);
        
        let style = {
          'paddingTop': this.props.info.info.aspect + "%"
        }

        return  <div className="Video-container">
                   <div className="Video-player-containter">
                      <div className="Video-wrapper" style={style}>
                        <ReactPlayer 
                          className="Video-player"
                          width='100%'
                          height='100%'
                          url={this.props.info.info.url}
                          playing
                          muted
                          loop/>
                      </div>
                   </div>
                   <div className="Video-text-container">
                        <div className="Video-text">
                          <h1>{this.props.t(this.props.info.info.title)}</h1>
                          {headers}
                          {paragraphs}
                        </div>
                   </div>
                </div>
    }

}

export default Video;