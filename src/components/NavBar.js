import React, { Component } from 'react';

class NavBar extends Component {
    handleButtonClick = () => {
      let SideBar = document.getElementById("SideBar");
      let map = document.getElementById("containerElement");
      if (SideBar.className !== "hidden") {
        SideBar.className = "hidden";
        map.className = "expandMap";
      } else {
        SideBar.className = "SideBar";
        map.className = "containerElement";
      }
    };
    render() {
      return (
        <nav id="nav">
          <div id="navbar">
            <button id="filterButton" onClick={this.handleButtonClick}>
              Filter
            </button>
          </div>
          <h1 id="navbarHeader">Miami Beach</h1>
        </nav>
      );
    }
  }

  export default NavBar;
