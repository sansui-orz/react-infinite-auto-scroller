import React, { Component } from 'react';

export default class InfiniteScrollItem extends Component<{
  is_height?: number;
  is_loaded: boolean;
  index: number;
  reportHeight: (index: number, height: number, loaded: boolean) => void;
  renderItem: (data: any, index: number) => JSX.Element;
  item: any;
}> {
  private ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const { is_loaded, is_type, is_height } = this.props.item;
    // 如果没有高度，则做一下兜底
    if (is_type !== 'block' && !is_loaded && !is_height) {
      const height = this.ref.current?.getBoundingClientRect().height;
      height && this.changeHeight(height, false);
    }
  }

  render() {
    const item = this.props.item;
    if (item.is_type === 'block') {
      return (
        <div
          style={{ height: this.props.is_height }}
          data-min-index={item.minIndex}
          data-max-index={item.maxIndex}
          ref={this.ref}
        ></div>
      );
    }
    return (
      <div
        className="infinite-scroll-item"
        style={{ height: this.props.is_height || 'auto' }}
        data-index={this.props.index}
        ref={this.ref}
      >
        {this.props.renderItem({ ...this.props.item, emitReportHeight: this.changeHeight }, this.props.index)}
      </div>
    );
  }

  private changeHeight = (height: number, loaded: boolean) => {
      if (height && height !== this.props.is_height) {
        this.props.reportHeight(this.props.index, height, !!loaded);
      }
  }
}
