import React, { Component } from 'react';
import './Card.css';

export default class Card extends Component {
  render() {
    let headers = this.props.headers.map(
         (h, index) => <h2 key={index} 
                           className="Card-subtitle">{this.props.t(h)}</h2>);
    let paragraphs = this.props.paragraphs.map(
         (p, index) => <p key={index} 
                          className="Card-text">{this.props.t(p)}</p>);



    let footer = null;

    if(this.props.footer != undefined) {
        footer = this.props.footer.map(
         (p, index) => <p key={index} 
                          className="Card-text">{this.props.t(p)}</p>);
    }


    

    let shortcut = null;

    if(this.props.images.length > 1) {
      shortcut = <Shortcut images={this.props.images}
                           index={this.props.index}
                           handleOnSlide={this.props.handleOnSlide}/>
    }

    let conditionalContent = null;

    if(this.props.id == "Us") {
        conditionalContent = <div className="Card-colabs">
                              <h2>{this.props.t("usFooter1")}</h2>
                              <p>{this.props.t("usFooter2")}</p>
                              <p>{this.props.t("usFooter3")}</p>
                              <p>{this.props.t("usFooter4")}</p>
                              <h2>{this.props.t("usFooter5")}</h2>
                              <p>{this.props.t("usFooter6")}</p>
                              <p>{this.props.t("usFooter7")}</p>
                              <p>{this.props.t("usFooter8")}</p>
                              <h2>{this.props.t("usFooter9")}</h2>
                              <p>{this.props.t("usFooter10")}</p>
                      </div>
    }else if(this.props.id == "Contact") {
        conditionalContent = <div className="Card-contact">
                              <p>{this.props.t("contactParagraph1")}</p>
                              <p>{this.props.t("contactParagraph2")}</p>
                              <p>{this.props.t("contactParagraph3")}</p>
                              <p>{this.props.t("contactParagraph4")}</p>
                              <p>{this.props.t("contactParagraph5")}</p>
                              <p>{this.props.t("contactParagraph6")}</p>
                             </div>
    }
    else {
        conditionalContent = <div className="Card-description">
                               {paragraphs}
                             </div>
    }

    let title = null;

    if(this.props.title) {
        title = <h1 className="Card-title">{this.props.t(this.props.title)}</h1>
    }
    
    return (
        <div className="Card">
          {shortcut}
          {title}
          {headers}
          {conditionalContent}
          <div className="Card-footer">
          {footer}
          </div>
        </div>
      )
  }
}

function Shortcut(props) {
  return (
      <div className="Shortcut">
        {props.images.map((image, index) => 
        <button className={ "Shortcut-thumb " + (index===props.index?" highlight":"")} 
                key={index} 
                onClick={()=>props.handleOnSlide(index)}><span>{index + 1}</span>
        </button>)}
      </div>
    )
}