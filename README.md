# react-infinite-auto-scroller

react长列表自动优化组件

👉 [demo](https://github.com/sansui-orz/react-infinite-auto-scroller/examples)

👉 [react-infinite-auto-scroller](https://github.com/sansui-orz/react-infinite-auto-scroller)

## 参数

| 名称 | 类型 | 必填 | 备注 |
| -- | -- | -- | -- |
| id | string | 是 | 作为列表项的key，必填且保证唯一，否则无法渲染虚拟列表 |
| renderItem | (item: any, index: number) => Element | 是 | 渲染每个列表项的函数 |
| list | any[] | 是 | 列表数据 |
| root | 类名或id | 否 | 将scroll事件监听绑定到指定节点，默认为window |

用法:

`npm install react-infinite-auto-scroller`

```jsx
import InfiniteScrollItem, { clearHeightCache } from './scrollItem';
// ...
  componentWillUnmount() {
    clearHeightCache(); // 当列表卸载时，主动清除列表高度缓存。如果没有清除，下次加载此列表时可以直接使用该高度缓存，跳过获取高度逻辑。
  }

  render() {
    return (
      <InfiniteScroll
        id={'id'}
        list={this.state.list}
        renderItem={(item, index) => { // 注意：item与list中的项不是同一个值，而是通过浅拷贝之后的列表项
          // 注意item中添加了emitReportHeight事件，如需要主动改变父节点高度，请在改变的组件内手动调用
          return (
            <Item {...item} />
          );
        }}/>
    );
  }
// ...
```

注意此处list中的列表项必须包含属性名为id的列表唯一值，不建议使用索引，因为当从头部插入或者删除中间某一项时会导致节点高度匹配数据错误。

在列表项的组件中，默认会在`componentDidMount`中进行一次高度获取，如之后高度有变动（如img加载)，需要主动上报变化后的高度。

例如：

```jsx
export default class Item extends Component {
  ref = React.createRef();

  render() {
    const { text, img } = this.props;
    return (
      <div className="item" ref={this.ref}>
        <p className="text">{text}</p>
        {img ? <img className="img" src={img} alt="" onLoad={this.imgLoad}/> : null}
      </div>
    );
  }

  private imgLoad = (e) => {
    const height = this.ref.current?.getBoundingClientRect().height;
    this.props.emitReportHeight && this.props.emitReportHeight(height); // 这里高度变化后主动上报高度。
  };
}
```

`emitReportHeight`方法会被传递给Item的props。

默认在组件didMount时会触发一次`emitReportHeight`记录节点高度， ***注意高度变化时需要主动调用，并将变化够的高度当作参数传入***。
