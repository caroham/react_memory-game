import React, { Component } from "react";

class Tile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div className="tile" style={{backgroundColor: this.props.revealed ? this.props.color : 'lightgray'}} onClick={() => this.props.handleClick(this.props.idx)}></div>
      );
  }
}

export default Tile;
