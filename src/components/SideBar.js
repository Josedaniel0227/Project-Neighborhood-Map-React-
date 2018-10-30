import React, { Component } from 'react';
import VenuesList from './VenuesList';

class SideBar extends Component {
constructor() {
  super();
  this.state = {
    query:'',
    venues:[]
  }
}
// here it hides the list of venues as typed
changeFilterVenues = () => {
  if (this.state.query.trim()!== "") {
    const venues = this.props.venues.filter(venue =>
      venue.name.toLowerCase().includes(this.state.query.toLowerCase())
    );
    return venues;
  }
  return this.props.venues;
};


// this changes the state when typing in the filter box
filterVenues = e  => {
  this.setState({ query: e.target.value });
  const markers = this.props.venues.map( venue => {
    const filterInput = venue.name
    .toLowerCase()
    .includes(e.target.value.toLowerCase());
  const marker = this.props.markers.find(marker => marker.id === venue.id)
      if (filterInput) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
     this.props.updateSuperState({ markers })
};

  render() {
    return (
      <div id="SideBar"
        className="SideBar">
        <input
          type={"search"}
          id={"search"}
          placeholder={"Filter "}
          onChange={this.filterVenues}
          />
        <VenuesList
          {...this.props}
          venues={this.changeFilterVenues()}
          handleListelementsClick = {this.props.handleListelementsClick}/>
      </div>

    );
  }
}

export default SideBar;
