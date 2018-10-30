import React, { Component } from 'react';
import './App.css';
import SideBar from './components/SideBar.js';
import Map from './components/Map';
import SquareAPI from "./SquareAPI/Index.js"
import NavBar from "./components/NavBar.js";


class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center:[],
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  closeAllMarkers = () => {
   const markers = this.state.markers.map(marker => {
     marker.isOpen = false;
     return marker;
   });
   this.setState({ markers: Object.assign(this.state.markers, markers) });
 };

 handleMarkerClick = marker => {
   this.closeAllMarkers();
   marker.isOpen = true;
   this.setState({ markers: Object.assign(this.state.markers, marker) });
   const venue =this.state.venues.find(venue => venue.id === marker.id);

   SquareAPI.getVenueDetails(marker.id).then(res => {
       const newVenue = Object.assign(venue, res.response.venue);
       this.setState({ venues: Object.assign(this.state.venues, newVenue) })
       console.log(newVenue);
     });
 };

 handleListelementsClick = venue =>{
   const marker = this.state.markers.find(marker => marker.id === venue.id)
   this.handleMarkerClick(marker)
 }


  componentDidMount() {
    SquareAPI.search({
      query: "hotel",
      near: "Miami Beach",
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id:venue.id
        };
      });
      this.setState({ venues,center, markers})

    });
  }

  render() {
    return (

      <div className="App">
        <NavBar />
        <SideBar {...this.state}handleListelementsClick = {this.handleListelementsClick}/>
        <Map {...this.state} handleMarkerClick={this.handleMarkerClick}/>
      </div>

    );
  }
}

export default App;
