# props

props 是 react 组件通信的重要手段，负责将多个组件串联起来。
react render 的过程，就是调用 react.createElement 形成新的 React.element 对象的过程，新的 element 上就会有新的 props 属性，这个新的 props 属性就是重新渲染试图的关键

## props 可以是什么？

> 在父组件绑定在子组件标签的属性或者方法，最终会变成 props 传递给他们，对于一些特殊的属性 ref 货值 key React 最终会在底层去额外的处理

- props 作为一个子组件渲染的数据源
- props 作为一个通知父组件的回调函数
- props 作为一个单纯的组件传递
- props 作为渲染函数 render props
- render props
- render component 插槽组件

## props 在 react 各种场景中充当的角色

### 在 react 组件层级 props 充当的角色？

- 父组件传递数据给组件消费
- 子组件通过 props 中的 callback,来给父组件传递信息
- 将视图容器作为 props 进行渲染 （render props）

### 在 react 更新机制中充当的角色？

React 重新 render 视图，无法之间检测出数据更新波及的范围（父组件更新，子组件也全部更新），props 可以作为组件是否更新的重要准则，变化即更新，于是有了 Pure Component，memo(在 shouldComponentUpdate 浅比较 props 和 state 是否变化)等性能方案

### 从 react 插槽层面 props 充当的角色

React 可以把组件闭合标签里的插槽，转化成 children 属性

## 监听 props 变化

### class 组件

- componentWillReceiveProps (即将废除 不推荐使用 可能会不受 React 控制多次执行)
- getDerivedStateFormProps

### function 组件

- React.useEffect

`React.cloneElement(element,[config],[children])`,config 会和原来组件的上的 props 浅合并
