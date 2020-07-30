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

## api

**emitReportHeight**： `(height: number, loaded: boolean) => void`

该方法将用props传入列表项组件内，height表示列表项的高度，loaded表示是否加载完毕。

加载完毕后需要主动调用该方法确定高度不再变化后才会被合并为空节点。

**注意当异步资源加载失败，也需要主动上报高度** 否则不会被合并为空节点，如果存在大量无法合并的节点将会导致列表变卡。

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

列表项需要主动上报并确认组件高度：

```jsx
export default class Item extends Component {
  ref = React.createRef();

  componentDidMount() {
    // 注意如果高度是由异步资源决定的，那应该在异步资源加载完成之后再上报高度，因为高度一旦上报，如果此时元素未在可视区域，该元素就会被合并为一个空节点
    if (!this.props.img) {
      this.reportHeight(true); // 注意即使这个组件是同步加载的也需要上报loaded为true才会合并进空节点
    }
  }

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
    this.reportHeight(true); // 这里高度变化后主动上报高度。
  };

  private reportHeight(loaded) {
    const height = this.ref.current?.getBoundingClientRect().height;
    this.props.emitReportHeight && this.props.emitReportHeight(height, loaded); // 这里高度变化后主动上报高度。
  }
}
```

### 注意事项

1. 请不要在组件挂载&卸载时处理特殊逻辑，比如打点等，因为优化列表后会反复移除插入组件。

2. 关注依赖异步元素决定高度的列表项，当加载失败时选择重试或者上报确认高度不再变化。
