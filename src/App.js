import { OriginalIndex, FilterElemDome } from './demos/jsx';
import ReactComponentDemo from './demos/component';
import StateDemo from './demos/state/index';
import './App.css';

function App() {
  return (
    <>
      <OriginalIndex />
      <FilterElemDome />
      <ReactComponentDemo />
      <h2>state</h2>
      <StateDemo />
    </>
  );
}

export default App;
