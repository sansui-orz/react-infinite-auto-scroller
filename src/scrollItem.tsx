import React, { Component } from 'react';

export default class InfiniteScrollItem extends Component<{
  is_height?: number;
  index: number;
  reportHeight: (index: number, height: number) => void;
  renderItem: (data: any, index: number) => JSX.Element;
  item: any;
}> {
  private ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.props.item.type !== 'block') {
      this.changeHeight();
    }
  }

  render() {
    const item = this.props.item;
    if (item.type === 'block') {
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

  private changeHeight = (height?: number) => {
      if (height && height !== this.props.is_height) {
        this.props.reportHeight(this.props.index, height);
      } else {
        const target = this.ref?.current;
        const rect = target?.getBoundingClientRect();
        if (target && rect && (this.props.is_height !== rect?.height || height)) {
          this.props.reportHeight(this.props.index, rect.height);
        }
      }
  }

}
