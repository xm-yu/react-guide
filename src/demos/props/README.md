# props
props 是react组件通信的重要手段，负责将多个组件串联起来。
react render的过程，就是调用react.createElement形成新的React.element对象的过程，新的element上就会有新的props属性，这个新的props属性就是重新渲染试图的关键



## props可以是什么？
> 在父组件绑定在子组件标签的属性或者方法，最终会变成props传递给他们，对于一些特殊的属性 ref 货值key React 最终会在底层去额外的处理

- props作为一个子组件渲染的数据源
- props作为一个通知父组件的回调函数
- props作为一个单纯的组件传递
- props作为渲染函数  render props
- render props 
- render component 插槽组件


## props在react 各种场景中充当的角色
### 在react组件层级props充当的角色？
- 父组件传递数据给组件消费
- 子组件通过props中的callback,来给父组件传递信息
- 将视图容器作为props 进行渲染 （render props）
### 在react更新机制中充当的角色？
React重新render视图，无法之间检测出数据更新波及的范围（父组件更新，子组件也全部更新），props可以作为组件是否更新的重要准则，变化即更新，于是有了Pure Component，memo(在shouldComponentUpdate 浅比较props和state是否变化)等性能方案
### 从react插槽层面props充当的角色
React 可以把组件闭合标签里的插槽，转化成children属性

## 监听 props变化
### class组件
- componentWillReceiveProps (即将废除 不推荐使用 可能会不受React控制多次执行) 
- getDerivedStateFormProps 

### function组件
- React.useEffect