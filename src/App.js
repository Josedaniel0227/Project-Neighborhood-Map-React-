import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  componentDidMount() {
    this.renderMap()
  }

  renderMap = () => {
    // Connects the initMap() function to the global window context,
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCVhwQOB3UIeFXLXnZcZm6EwYjIY1g1Hg0&callback=initMap')
  }


  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }


  render() {
    return (
      <main>
         <div id="map"></div>
      </main>
    );
  }
}


function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    ref.parentNode.insertBefore(script, ref);
}

export default App;
