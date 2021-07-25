import React from 'react';
import ReactDom from 'react-dom';

export default function FunctionComp() {
  const [count, setCount] = React.useState(0);
  const [msg, setMsg] = React.useState('hello ');

  const handleClick = () => {
    setTimeout(() => {
      let nextCount = count + 1;
      ReactDom.unstable_batchedUpdates(() => {
        setCount(nextCount);
        setCount(nextCount + 1);
        setCount(nextCount + 2);
        setMsg('text');
      });
    }, 1000);
  };

  console.log('render');
  return (
    <div>
      <button onClick={handleClick}>
        count={count},msg = {msg}
      </button>
    </div>
  );
}
