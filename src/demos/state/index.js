import React from 'react';
import ReactDom from 'react-dom';

function FunctionComp() {
  const [count, setCount] = React.useState(0);
  const [msg, setMsg] = React.useState('hello ');

  const handleClick = React.useCallback(() => {
    // mock api
    setTimeout(() => {
      ReactDom.unstable_batchedUpdates(() => {
        setTimeout(() => {
          setCount(prevCount => prevCount + 1);
        }, 100);
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1);
        ReactDom.flushSync(() => {
          setCount(prevCount => prevCount + 1);
        });
        setCount(prevCount => prevCount + 1);
        setMsg('job');
      });
    });
  }, []);

  console.log('render', count, msg);
  return (
    <div>
      <button onClick={handleClick}>
        count={count},msg = {msg}
      </button>
    </div>
  );
}

class ClassDome extends React.PureComponent {
  state = {
    count: 0,
    number: 0,
    num1: 0,
    userInfo: {
      name: 'tom',
      age: 13,
    },
  };

  handleClick = () => {
    setTimeout(() => {
      ReactDom.unstable_batchedUpdates(() => {
        this.setState(prevState => {
          return {
            count: prevState.count + 1,
          };
        });
        this.setState(prevState => {
          return {
            count: prevState.count + 1,
          };
        });
        this.setState(prevState => {
          return {
            count: prevState.count + 1,
          };
        });
      });
    }, 1000);
    // this.incrementCount();
    // this.incrementCount();
    // this.incrementCount();
    // this.incrementCountBetter();
    // this.incrementCountBetter();
    // this.incrementCountBetter();
  };

  incrementCount = () => {
    console.log(this.state.count);
    this.setState({
      count: this.state.count + 1,
    });
  };

  incrementCountBetter = () => {
    this.setState(prevState => {
      return {
        count: prevState.count + 1,
      };
    });
  };

  handleNumberClick = () => {
    setTimeout(() => {
      this.setState({ number: 1 });
    });

    this.setState({
      number: 2,
    });

    ReactDom.flushSync(() => {
      this.setState({
        number: 3,
      });
    });
    this.setState({
      number: 4,
    });
  };

  handleChangeUser = () => {
    const user = this.state.userInfo;
    user.age = 88;
    this.setState(
      {
        userInfo: this.state.userInfo,
      },
      () => {
        console.log('change userInfo after call cb');
      }
    );
  };

  componentDidUpdate() {
    console.log('call componentDidUpdate');
  }

  render() {
    console.log('call render ', this.state.number);

    return (
      <div>
        <h3>class component demo</h3>
        <button onClick={this.handleClick}>{this.state.count}</button>
        <button onClick={this.handleNumberClick}>
          click number:{this.state.count}
        </button>

        <div>
          <p>
            name:{this.state.userInfo.name},age:{this.state.userInfo.age}
          </p>
          <button onClick={this.handleChangeUser}>change user</button>
        </div>
      </div>
    );
  }
}

const Demo = () => {
  return (
    <>
      <FunctionComp />
      <ClassDome />
    </>
  );
};
export default Demo;
