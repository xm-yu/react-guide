import React from 'react';

// react组件是什么 组件和常规的函数和类有什么本质区别
// 组件的本质就是类和函数，但是常规的类和普通函数不同的是 组件承载了渲染视图UI和
// 更新视图UI的setState、useState 等方法。react 在底层逻辑上会像正常实例化类和正常执行函数那样处理函数

let globalName = 'logan';
class Index extends React.Component {
  static getDerivedStateFromProps() {
    console.log('index get derived state from props');

    return null;
  }
  state = { massage: 'hello world' };

  sayHello = () => this.setState({ massage: 'hello my name is highway ln' });
  forceUpdateGlobalName = () => {
    globalName = 'jack';
    /**
     * forceUpdate 将导致组件调用 render() 方法，这个操作会跳过 shouldComponentUpdate方法
     * 但是其他子组件会触发正常的生命周期方法
     * 开发中要尽量 避免使用 forceUpdate 方法 尽量在render() 使用 props 和 state
     */
    this.forceUpdate();
  };

  shouldComponentUpdate() {
    console.log('index shouldComponentUpdate ');
    return true;
  }

  componentDidUpdate() {
    console.log('index componentDidUpdate');
  }

  // log = () => {
  //   console.log('log', this);
  // };
  render() {
    return (
      <>
        <div onClick={this.sayHello}>{this.state.massage}</div>
        <div>
          <p>{globalName}</p>
          <button onClick={this.forceUpdateGlobalName}>forceUpdateName</button>
          <button onClick={this.log}>log</button>
        </div>
      </>
    );
  }
}

Index.prototype.log = function () {
  console.log('prototype log', Index);
};

const FunctionComponent = () => {
  const [msg, setMsg] = React.useState('hello');
  return <div onClick={() => setMsg('hello highway lin')}>{msg}</div>;
};

export default function ReactComponentDemo() {
  return (
    <>
      <Index />
      <FunctionComponent />
    </>
  );
}
