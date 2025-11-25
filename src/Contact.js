import React, { Component } from 'react';

export default class SimpleExample extends Component {
  render() {
    return (
        <div>
      <p>Atelier-Passus<br />{this.props.t("contact-paragraph2")}<br />{this.props.t("contact-paragraph3")}</p>
      </div>
    )
  }
}