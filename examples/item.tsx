import React, { Component } from 'react';

interface IProps {
  text: string;
  img?: string;
  /* 下面这两个方法由无限滚动高阶组件提供，注意使用时判断是否存在 */
  emitReportHeight?: Function; // 主动调用更新元素高度，应用场景（1. 当组件高度是异步内容决定的，2. 高度变化时主动更新父元素高度）
  deleteHandle: () => void;
}

class Item extends Component<IProps> {
  ref = React.createRef<HTMLDivElement>();

  render() {
    const { text, img } = this.props;
    return (
      <div className="item" ref={this.ref}>
        <div className="user">
          <img className="avatar" src={require('./imgs/3.png').default} />
          <div className="username">123</div>
          <div className="delete-btn" onClick={this.props.deleteHandle}>删除</div>
        </div>
        <p className="text">{text}</p>
        {img ? <img className="img" src={img} alt="" onLoad={this.imgLoad}/> : null}
        <div className="controls">
          <div className="action1">
            <img src={require('./imgs/1.png').default} />
            0
          </div>
          <div className="action2">
            <img src={require('./imgs/2.png').default} />
            0
          </div>
          <div className="action3">
            <img src={require('./imgs/4.png').default} />
            0
          </div>
        </div>
      </div>
    );
  }
  private imgLoad = (e) => {
    const height = this.ref.current?.getBoundingClientRect().height;
    this.props.emitReportHeight && this.props.emitReportHeight(height);
  };
}


export default Item;