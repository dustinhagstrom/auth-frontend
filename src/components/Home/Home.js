import React, { Component } from "react"; //bring in react/component.

export class Home extends Component {
  //make a home component
  render() {
    return (
      <div style={{ textAlign: "center", marginTop: "15%", fontSize: 75 }}>
        Welcome to Coolest APP
      </div>
    );
  }
}

export default Home; //export for use in other files
