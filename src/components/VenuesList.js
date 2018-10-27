import React, { Component } from 'react';
import ListElements from './ListElements';

class VenuesList extends Component {
  render() {
    return (
      <ol className="VenuesList">
        {this.props.venues && this.props.venues.map((venue,idx) =>( <ListElements key={idx} {...venue}
            handleListelementsClick = {this.props.handleListelementsClick}/>
      ))}
    </ol>
  );
}
}

export default VenuesList;
