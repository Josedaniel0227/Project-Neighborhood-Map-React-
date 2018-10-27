import React, { Component } from 'react';


class ListElements extends Component {


  render() {
    return<li
      className="ListElements"
      onClick={()=> this.props.handleListelementsClick(this.props)}>

      <img
      src={this.props.categories[0].icon.prefix+"30"+this.props.categories[0].icon.suffix}
          alt={this.props.categories[0].name}/>
          {this.props.name}
    </li>;
  }
}

export default ListElements;
