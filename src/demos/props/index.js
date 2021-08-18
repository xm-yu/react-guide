import React from 'react';

function ChildrenComponent() {
  return <div>in this chapter,let's learn about react props </div>;
}

class PropsComponent extends React.Component {
  componentDidMount() {
    console.log(this.props, 'this.props');
  }
  render() {
    const { children, msg, renderName, say, Component } = this.props;
    const renderFunction = children[0];
    const renderComponent = children[1];
    return (
      <div>
        {renderName()}
        {msg}
        {renderComponent}
        {renderFunction()}
        <Component />
        <button
          onClick={() => {
            say();
          }}
        >
          set msg
        </button>
      </div>
    );
  }
}

export default class PropsIndexComponent extends React.Component {
  state = {
    msg: 'hello react',
  };

  node = null;
  say = () => {
    this.setState({
      msg: 'let us learn react',
    });
  };

  render() {
    return (
      <div>
        <PropsComponent
          msg={this.state.msg} // 1 props 作为 一个渲染数据源
          say={this.say} // 2 props 作为一个回调函数 callback
          Component={ChildrenComponent} // 3 props 作为一个组件
          renderName={() => <div>my name is xiaoman</div>} // 4 props作为渲染函数
        >
          {/*  5 render props */}
          {() => <div>hello world</div>}
          {/* 6 render component */}
          <ChildrenComponent />
        </PropsComponent>
      </div>
    );
  }
}
