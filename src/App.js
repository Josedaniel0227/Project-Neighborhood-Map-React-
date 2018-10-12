import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {

  state = {
    places: []
  }

  componentDidMount() {
    this.getVenues()
  }

  renderMap = () => {
    // Connects the initMap() function to the global window context,
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCVhwQOB3UIeFXLXnZcZm6EwYjIY1g1Hg0&callback=initMap')
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "XEQCMYPEO1DXENH4KWDPLDH4UQD23OB5AEVQ5PBUT1XGQC1U",
      client_secret: "DYFNRAVZZLOT3MYJNZ21H5JL135STKXOWBPXI2UBOFNHSXFU",
      query: "food",
      near: "Miami Beach",
      v:"20182507"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          places: response.data.response.groups[0].items
        },   this.renderMap())
      })
      .catch(error => {
        console.log(error);
      })
  }

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 25.790, lng: -80.139},
      zoom: 14
    })

    // Creates infowindow
    var infowindow = new window.google.maps.InfoWindow()

    this.state.places.map(newVenue => {

      // InfoWindow content
      var contentString = `<p>${newVenue.venue.name}</p>`+`${newVenue.venue.location.address}`

      // Marker
      var marker = new window.google.maps.Marker({
        position: {
          lat: newVenue.venue.location.lat,
          lng: newVenue.venue.location.lng
        },
        map: map,
        title: newVenue.venue.name
      })
      // Event listener for infowindow
      marker.addListener('click', function() {
        infowindow.setContent(contentString)
        infowindow.open(map, marker);
      })
  })
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
