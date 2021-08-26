// optimize
import React, { Component } from 'react';

export default class OptimizeRenderDemo extends Component {
  render() {
    return (
      <div>
        <Demo1 />
      </div>
    );
  }
}

const Demo1 = () => {
  const elem = React.useCallback(<div>div</div>, []);
  console.log(elem);
  return elem;
};
