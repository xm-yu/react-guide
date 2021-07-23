import React from 'react';
const toLearn = ['react', 'vue', 'webpack', 'nodejs'];

const TextComponent = props => <div> hello , i am function {props.name} </div>;

const fiberElem = React.createElement(TextComponent, {
  name: 'crateElement inject name',
});

const ulBox = React.createElement(
  'ul',
  { style: { color: 'red' } },
  React.createElement(
    'li',
    null,
    React.createElement('span', { style: { color: 'green' } }, '1'),
    '-',
    'li'
  ),
  React.createElement(
    'li',
    null,
    React.createElement('span', { style: { color: 'green' } }, '2'),
    '-',
    'li'
  )
);

class Index extends React.Component {
  status = false; /* 状态 */
  renderFoot = () => <div> i am foot</div>;

  render() {
    /* 以下都是常用的jsx元素节 */
    return (
      <div style={{ marginTop: '100px' }}>
        {/* element 元素类型 */}
        <div>hello,world</div>
        {/* fragment 类型 */}
        <React.Fragment>
          <div> 👽👽 </div>
        </React.Fragment>
        {/* text 文本类型 */}
        my name is alien
        {/* 数组节点类型 */}
        {toLearn.map(item => (
          <div key={item}>let us learn {item} </div>
        ))}
        {/* 组件类型 */}
        <TextComponent name="yzc" />
        {/* 三元运算 */}
        {this.status ? <TextComponent name="yxm" /> : <div>三元运算</div>}
        {/* 函数执行 */}
        {this.renderFoot()}
        {fiberElem}
        {ulBox}
        <button onClick={() => console.log(this.render())}>
          打印render后的内容
        </button>
      </div>
    );
  }
}

export const OriginalIndex = Index;

export class FilterElemDome extends React.Component {
  status = false;
  renderFoot = () => <div>i am foot</div>;
  controlRender = () => {
    const reactElement = (
      <div style={{ marginTop: '100px' }} className="container">
        {/* element 元素类型 */}
        <div>hello,world</div>
        {/* fragment 类型 */}
        <React.Fragment>
          <div> 👽👽 </div>
        </React.Fragment>
        {/* text 文本类型 */}
        my name is alien
        {/* 数组节点类型 */}
        {toLearn.map(item => (
          <div key={item}>let us learn {item} </div>
        ))}
        {/* 组件类型 */}
        <TextComponent />
        {/* 三元运算 */}
        {this.status ? <TextComponent /> : <div>三元运算</div>}
        {/* 函数执行 */}
        {this.renderFoot()}
        <button onClick={() => console.log(this.render())}>
          打印render后的内容
        </button>
      </div>
    );

    console.log(reactElement);
    const { children } = reactElement.props;
    console.log(reactElement.props.children);

    // React.Children.forEach = React.Children.toArray + Array.prototype.forEach
    React.Children.forEach(reactElement.props.children, e => {
      console.log(e);
    });
    // 将数组打平
    const flatChildren = React.Children.toArray(children);
    // console.log(flatChildren);
    const newChildren = [];
    React.Children.forEach(flatChildren, item => {
      if (React.isValidElement(item)) newChildren.push(item);
    });

    const lastChildren = React.createElement(
      'div',
      { className: 'last-div' },
      'say goodbye'
    );
    newChildren.push(lastChildren);
    // console.log(newChildren);

    const newReactElem = React.cloneElement(
      reactElement,
      { className: 'add-class', style: { fontSize: '20px' } }, //cloneElement 函数传递的props 会和 reactElement原始的element 浅合并
      ...newChildren
    );
    return newReactElem;
  };
  render() {
    const newReactElem = this.controlRender();
    return newReactElem;
  }
}
