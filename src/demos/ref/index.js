import React from 'react';

export default function Index() {
  return (
    <>
      <h3>React Ref</h3>
      <ClassComRefDemo />

      <FunctionCmpRefDemo />
      <DisposeRefOne />
      <DisposeRefTwo />
      <DisposeRefObj />
      <HocForwardRefCmp />
      <Grandpa />

      <RefInformFather />
      <FatherOne />
      <RefCbExample />
    </>
  );
}

// Ref对象的创建
class ClassComRefDemo extends React.Component {
  currentDom = React.createRef();
  componentDidMount() {
    console.log(this.currentDom);
  }

  render = () => <div ref={this.currentDom}>ref对象模式获取元素或组件</div>;
}

function FunctionCmpRefDemo() {
  const currentDom = React.useRef();
  // useEffect是异步的
  React.useEffect(() => {
    console.log(currentDom);
  }, []);

  return <div ref={currentDom}>函数组件ref对象模式获取元素或组件</div>;
}

// Recat 对标签的ref属性的处理

//
/**
 * @title 1 ref 是字符串
 * todo ref使用字符串的方式会有有些问题 react未来的版本可能会删除这种方式
 * todo https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs
 */
class DisposeRefOne extends React.Component {
  componentDidMount() {
    console.log(this.refs);
  }

  render = () => (
    <div>
      <div ref="div">ref get dom </div>
      <Child ref="childCmp" />
    </div>
  );
}

class Child extends React.Component {
  render = () => <div>Child context</div>;
}

/**
 * @title ref 绑定函数 回访方式的的ref
 *
 *
 */
class DisposeRefTwo extends React.Component {
  currentDom = null;
  currentComponentInstance = null;
  componentDidMount() {
    console.log(this.currentDom);
    console.log(this.currentComponentInstance);
  }

  render = () => (
    <div>
      <div ref={node => (this.currentDom = node)}>ref属性绑定的是一个函数</div>
      <Child ref={instance => (this.currentComponentInstance = instance)} />
    </div>
  );
}

/**
 * @title ref传递的是一个ref对象
 * ref对象 初始化
 * ```js
 * {
 * current:undefined
 *
 * }
 * ```
 */
class DisposeRefObj extends React.Component {
  domRef = React.createRef();
  cmpInstanceRef = React.createRef();

  componentDidMount() {
    console.log(this.domRef);
    console.log(this.cmpInstanceRef);
  }

  render = () => (
    <div>
      <div ref={this.domRef}>ref is object</div>
      <Child ref={this.cmpInstanceRef} />
    </div>
  );
}

// 上面三种方式是通过ref 获取组件实例和dom，react还提供了其他获取dom和实例的方式（扩展）

// ref 高阶用法
// 通过 React.forwardRef api 转发 ref

/**
 * @title 跨层获取
 *
 */

// son cmp
function Son(props) {
  const { grandpaRef } = props;

  return (
    <>
      <div>i am son</div>
      <div ref={grandpaRef}>通过ref 跨层级获取的dom</div>
    </>
  );
}

// father组件
class Father extends React.Component {
  render() {
    return <Son grandpaRef={this.props.grandpaRef} />;
  }
}

// 使用React.forwordRef 转发ref
// React.forward 可以把ref变成可以传递 ，
// 如果没有通过React.forward转发 react 会自动在底层将ref 绑定组件实例
const NewFather = React.forwardRef((props, ref) => (
  <Father grandpaRef={ref} {...props} />
));

class Grandpa extends React.Component {
  targetNode = null;
  componentDidMount() {
    console.log(this.targetNode);
  }

  render = () => (
    <div>
      <NewFather ref={node => (this.targetNode = node)} />
    </div>
  );
}

// 高阶组件转发 ref 之前面试遇到过这个问题 没有回答上来 o(╥﹏╥)o
/**
 * @title 高阶HOC组件传递ref的问题？
 * @desc 如果通过高阶组件包裹一个原始组件 如果没有处理ref ref 就会绑定在返回出去的新组件上，
 * 而不是我们想要绑定的元原始组件
 */

const HOC = CMP => {
  class WrapCmp extends React.Component {
    // to do something
    render() {
      const { forwardRef, ...otherProps } = this.props;
      return <CMP ref={forwardRef} {...otherProps} />;
    }
  }

  return React.forwardRef((props, ref) => (
    <WrapCmp forwardRef={ref} {...props} />
  ));
};

class TestCmp extends React.Component {
  render = () => <div>target cmp</div>;
}

const HOCTestCmp = HOC(TestCmp);

class HocForwardRefCmp extends React.Component {
  forwardRef = React.createRef();

  componentDidMount() {
    console.log(this.forwardRef, 'hoc forwardRef');
  }

  render = () => <HOCTestCmp ref={this.forwardRef} />;
}

// ref 实现组件之间的通信

// 通过ref直接标记类组件实例 实现父组件触发子组件更新 例：antd 操作form组件的resetFields setFields

class RefInformSon extends React.PureComponent {
  state = {
    fatherMsg: '',
    sonMsg: '',
  };

  fatherSay = msg => this.setState({ fatherMsg: msg });
  render() {
    return (
      <>
        <h4>son</h4>
        <p>父组件说：{this.state.fatherMsg}</p>
        <div>
          <input
            type="text"
            value={this.state.sonMsg}
            onChange={e =>
              this.setState({
                sonMsg: e.target.value,
              })
            }
          />
          <button onClick={() => this.props.toFather(this.state.sonMsg)}>
            发送
          </button>
        </div>
      </>
    );
  }
}

function RefInformFather() {
  const sonInstanceRef = React.useRef();
  const [sonMsg, setSonMsg] = React.useState('');
  const [fatherMsg, setFatherMsg] = React.useState('');
  return (
    <>
      <h4>father</h4>
      <p>子组件说：{sonMsg}</p>
      <div>
        <input
          type="text"
          value={fatherMsg}
          onChange={e => setFatherMsg(e.target.value)}
        />
        <button onClick={() => sonInstanceRef.current.fatherSay(fatherMsg)}>
          发送
        </button>
      </div>
      <div>
        <RefInformSon ref={sonInstanceRef} toFather={setSonMsg} />
      </div>
    </>
  );
}

// React.forwardRef + useImperativeHandle 实现函数组件使用Ref通信
// forwardRef 转发ref userImperativeHandle 在函数组件暴露一个自定义的实例给父组件 (其实函数组件是没有实例的)

const SonOne = React.forwardRef((props, ref) => {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef();

  // 通过useImperativeHandle暴露函数内部的方法
  React.useImperativeHandle(
    ref,
    () => ({
      onFocus() {
        inputRef.current.focus();
      },
      onChangeValue(value) {
        setValue(value);
      },
    }),

    []
  );

  return <input type="text" value={value} ref={inputRef} />;
});

const FatherOne = () => {
  const sonRef = React.useRef();

  const handleClick = React.useCallback(() => {
    if (sonRef) {
      const { onFocus, onChangeValue } = sonRef.current;
      onFocus();
      onChangeValue('hahahaha ');
    }
  }, []);

  return (
    <>
      <SonOne ref={sonRef} />
      <button onClick={handleClick}>change input value</button>
    </>
  );
};

// test ref cb

class RefCbExample extends React.Component {
  state = {
    count: 0,
  };
  dom1 = null;
  dom2 = null;
  componentDidUpdate() {
    console.log(this.dom1);
    console.log(this.dom2);
    console.log('didUpdate');
  }

  refCb = node => {
    console.log('function log', node);
    this.dom2 = node;
  };
  render() {
    console.log('render log');

    return (
      <div>
        <button
          onClick={() =>
            this.setState({
              count: this.state.count + 1,
            })
          }
        >
          rerender
        </button>
        <p
          a={this.state.count}
          // 使用内联函数 每次render ref的值发生变化 函数被重新执行
          ref={node => {
            console.log('arrow function log', node);
            this.dom1 = node;
          }}
        >
          dom1,click count:{this.state.count}
        </p>
        <p a={this.state.count} ref={this.refCb}>
          dom2,click count:{this.state.count}
        </p>

        <ExampleDemo />
      </div>
    );
  }
}

class ExampleDemo extends React.Component {
  state = { num: 0 };
  node = null;

  refcb = node => {
    this.node = node;
    console.log('此时的参数是什么：', this.node);
  };
  render() {
    return (
      <div>
        <div ref={this.refcb}>ref元素节点_{this.state.num}</div>
        <button onClick={() => this.setState({ num: this.state.num + 1 })}>
          点击{this.state.num}
        </button>
        <TestUseBind />
      </div>
    );
  }
}

function TestUseBind() {
  const [list] = React.useState([
    { id: 1, name: 'test' },
    { id: 2, name: 'test2' },
  ]);

  const handleClick = React.useCallback(data => {
    console.log(data.name);
  }, []);

  return (
    <ul>
      {list.map(item => (
        <li key={item.id} onClick={handleClick.bind(null, item)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}
