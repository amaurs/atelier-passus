
import React, { Component } from 'react';
import './Portfolio.css';

class Portfolio extends Component {
    render() {
        let headers = this.props.info.info.headers.map((h, index) => <h3 key={index}>{h}</h3>);
        let paragraphs = this.props.info.info.paragraphs.map((p, index) => <p key={index}>{p}</p>);
        
        const iframe = '<iframe src="https://e.issuu.com/issuu-reader3-embed-files/1448/iframe-embed.html?identifier=26qpn9wmxd0z&amp;hostUrl=http%3A%2F%2Fwww.atelier-passus.com%2Fsema.html&amp;hostReferrer=http%3A%2F%2Fwww.atelier-passus.com%2Fproyectos.html&amp;embedType=script#0/35802022" style="border:none;width:100%;height:100%;" title="issuu.com" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen="" msallowfullscree=""></iframe>';

        return  (
                <div className="Portfolio-container">
                   <div className="Portfolio-player-containter">
                      <div className="Portfolio-wrapper">
                        <Iframe iframe={iframe} />
                      </div>
                   </div>
                   <div className="Portfolio-text-container">
                        <div className="Portfolio-text">
                          <h1>{this.props.info.info.title}</h1>
                          {headers}
                          {paragraphs}
                        </div>
                   </div>
                </div>
                );
    }
}

class Iframe extends Component {

  render() { 
    console.log(this.props.iframe);
    return (
        <div>
            <div dangerouslySetInnerHTML={ {__html: this.props.iframe} } />
        </div>
    );
  }
}


export default Portfolio;