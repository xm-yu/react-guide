import React from 'react';
// React.createContext

const CountContext = React.createContext(null);
CountContext.displayName = 'MyCountContext';
const { Provider: CountProvider, Consumer: CountConsumer } = CountContext;

const ThemeContext = React.createContext({
  fontColor: '#666',
  bgColor: '#c3c',
});

ThemeContext.displayName = 'ThemeContext';

export default function ProviderDemo() {
  const [theme, setTheme] = React.useState({
    fontColor: '#666',
    bgColor: '#c3c',
  });
  const [count, setCount] = React.useState(0);

  console.log('provider render');
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <CountProvider value={count}>
          <div>
            <FatherCmp />
          </div>
          <div>
            <button onClick={setCount.bind(null, count + 1)}>
              click count:{count}
            </button>
          </div>
        </CountProvider>
      </ThemeContext.Provider>
    </>
  );
}

const FatherCmp = React.memo(() => {
  console.log('Father cmp render');
  return (
    <>
      <SonCmp />
      <ClsSonCmo />
      <Son2 />
    </>
  );
});

FatherCmp.displayName = 'FatherCmp';

const SonCmp = React.memo(() => {
  console.log('son cmp render');
  return (
    <ThemeContext.Consumer>
      {theme => (
        <div style={{ fontColor: theme.fontColor, background: theme.bgColor }}>
          <p>son</p>
          <CountConsumer>
            {context => {
              console.log(context);
              return <>render props from context box count:{context}</>;
            }}
          </CountConsumer>
        </div>
      )}
    </ThemeContext.Consumer>
  );
});

SonCmp.displayName = 'SonCmp';

class ClsSonCmo extends React.Component {
  state = {
    innerCount: 0,
  };
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(nextProps, nextState, nextContext);
    return true;
  }

  render() {
    console.log('cls son cmp render');
    console.log(this.context);
    return (
      <div>
        class ClsSonCmo extends React.Component CountContext Value :
        {this.context}
        <div>
          <button
            onClick={() =>
              this.setState({ innerCount: this.state.innerCount + 1 })
            }
          >
            change inner count :{this.state.innerCount}
          </button>
        </div>
      </div>
    );
  }
}

ClsSonCmo.contextType = CountContext;

const Son2 = React.memo(() => {
  console.log('son2 render');
  const count = React.useContext(CountContext);
  return <div>count:{count}</div>;
});
