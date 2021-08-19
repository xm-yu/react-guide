// import { OriginalIndex, FilterElemDome } from './demos/jsx';
// import ReactComponentDemo from './demos/component';
// state
import StateDemo from './demos/state/index';
import './App.css';
import Demo from './demos/props/demo';
import RefIndex from './demos/ref/index';

function App() {
  return (
    <>
      {/* <OriginalIndex />
      <FilterElemDome />
      <ReactComponentDemo /> */}
      <h2>state</h2>
      <StateDemo />
      <Demo />
      <RefIndex />
    </>
  );
}

export default App;
