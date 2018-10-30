/* global google */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

/* Map styling thanks to https://snazzymaps.com  */
const mapStyle = [
  {
    "featureType": "all",
    "elementType": "all",
    "stylers": [
      {
        "hue": "#008eff"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      {
        "saturation": "0"
      },
      {
        "lightness": "0"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "simplified"
      },
      {
        "saturation": "-60"
      },
      {
        "lightness": "-20"
      }
    ]
  }
]

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    options={{
      styles: mapStyle,
      scrollwheel: false,
      mapTypeControl: true,
      fullscreenControl: true,
      streetViewControl: true,
    }}

    defaultZoom={13}
    defaultCenter={{ lat: 25.790, lng: -80.139 }}

  >
    {props.markers &&
      props.markers.filter(marker => marker.isVisible).map((marker, idx, arr) => {
        const venueInfo = props.venues.find(venue=> venue.id === marker.id)
        return (
         <Marker
           key={idx}
           position={{ lat: marker.lat, lng: marker.lng }}
           onClick={() => props.handleMarkerClick(marker)}
           animation={arr.length === 1
 						? google.maps.Animation.BOUNCE
 						: google.maps.Animation.DROP}
           >

         {marker.isOpen && venueInfo.bestPhoto &&  (

           <InfoWindow>
             <React.Fragment>
               <p>{venueInfo.name}</p>
               <img
                 src={`${venueInfo.bestPhoto.prefix}200x200${
                   venueInfo.bestPhoto.suffix}`}
                   alt={venueInfo.name}/>
                   <p> {venueInfo.location['address']}</p>
                   <p><a href="tel:{venueInfo.contact.phone}"> {venueInfo.contact.phone}</a></p>
                       {venueInfo.rating && <p> Rating: {venueInfo.rating}</p>}
                       <p><a href="{venueInfo.url}">Website</a> </p>
               </React.Fragment>
             </InfoWindow>

         )}


         </Marker>

       )}
    )}

  </GoogleMap>
))

class Map extends Component {

  render() {
    return (
      <MyMapComponent
      {...this.props}
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCVhwQOB3UIeFXLXnZcZm6EwYjIY1g1Hg0"
      loadingElement={<div className="loadingElement" style={{ height: `100%` }} />}
      containerElement={<div id="containerElement" className="containerElement" style={{ height: `93vh` }} />}
      mapElement={<div className="mapElement" style={{ height: `100%` }} />}
    />

    );
  }
}

export default Map;
