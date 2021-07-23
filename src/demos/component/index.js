import React, { Component } from 'react';

const jsxElem = <div>jsx elem</div>;

export class StateDemo extends Component {
  state = {
    count: 0,
  };
  handleClick = () => {
    this.setState(
      {
        count: this.state.count + 1,
      },
      () => {
        // console.log(this.state.count);
        console.log(document.getElementById('count').innerText);
      }
    );
  };
  render() {
    console.log(jsxElem);
    return (
      <div onClick={this.handleClick} id="count">
        {this.state.count}
        {jsxElem}
      </div>
    );
  }
}
