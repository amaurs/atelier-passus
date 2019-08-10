import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import './Contact.css';

type State = {
  lat: number,
  lng: number,
  zoom: number,
}

export default class SimpleExample extends Component<{}, State> {
  state = {
    lat: 19.429431,
    lng: -99.152032,
    zoom: 17,
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
        <div>
      <Map className="Contact-map" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
      <p>Atelier-Passus<br />{this.props.t("contact-paragraph2")}<br />{this.props.t("contact-paragraph3")}</p>
      </div>
    )
  }
}