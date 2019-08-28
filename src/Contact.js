import React, { Component } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'

import L from 'leaflet';

import marker from './images2/map-marker.svg';


import './Contact.css';
const myIcon = L.icon({
                    iconUrl: marker,
                    iconSize: [64,64],
                    iconAnchor: [32, 64],
                    popupAnchor: null,
                    shadowUrl: null,
                    shadowSize: null,
                    shadowAnchor: null
                });



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
        <Marker icon={myIcon    } position={position}>

        </Marker>
      </Map>
      <p>Atelier-Passus<br />{this.props.t("contact-paragraph2")}<br />{this.props.t("contact-paragraph3")}</p>
      </div>
    )
  }
}