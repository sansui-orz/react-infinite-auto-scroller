import React, { Component } from 'react';
import InfiniteScrollItem from './scrollItem';

export interface InfiniteScrollProps {
  id: string;
  root?: string;
  list: any[];
  renderItem: (data: any, index: number) => JSX.Element;
}

const map: Map<any, { height: number, loaded: boolean }> = new Map();

export function clearHeightCache() {
  map.clear();
}

const inClient = typeof window !== 'undefined';

export default class InfiniteScroller extends Component<InfiniteScrollProps, {
  list: any[];
  boxTop: number;
}> {
  state = {
    list: [],
    boxTop: 0,
  };

  private lock = false;

  private windowHeight = inClient ? window.innerHeight : 700;

  private ref = React.createRef<HTMLDivElement>();
  
  private timeoutKey: any = null;

  static getDerivedStateFromProps(props: InfiniteScrollProps, state) {
    const newList = props.list.map((item, index) => {
      const key = props.id ? item[props.id] : item;
      const mapItem = map.get(key);
      return { ...item, is_height: mapItem?.height, is_loaded: !!mapItem?.loaded, is_index: index };
    });
    return { ...state, list: newList };
  }

  componentDidMount() {
    this.updateBoxTop();
    if (inClient) {
      this.getScrollElement().addEventListener('scroll', this.onScroll, false);
    }
  }

  componentWillUnmount() {
    if (inClient) {
      this.getScrollElement().removeEventListener('scroll', this.onScroll, false);
    }
  }

  render() {
    const list2 = this.sortList(this.state.list);
    return (
      <div className="infinite-scroller" ref={this.ref}>
        {list2.map((item: any, index) => {
          const key = this.props.id ? item[this.props.id] : index;
          return (
            <InfiniteScrollItem
              key={key}
              index={item.is_index}
              is_height={item.is_height}
              is_loaded={item.is_loaded}
              reportHeight={this.reportHeight}
              renderItem={this.props.renderItem}
              item={item}
            ></InfiniteScrollItem>
          );
        })}
      </div>
    );
  }

  private sortList = (list) => {
    let top = this.state.boxTop;
    const minTop = -this.windowHeight;
    const maxTop = this.windowHeight * 2;
    const _list: any[] = [];
    list.forEach((item, index) => {
      if (item.is_height) {
        top += item.is_height;
        if (!item.is_loaded || (top > minTop && top < maxTop)) {
          _list.push(item);
        } else {
          const lastItem = _list[_list.length - 1];
          if (lastItem?.is_type === 'block') {
            lastItem.is_height += item.is_height;
            lastItem.maxIndex = index;
            lastItem.id = lastItem.minIndex + '/' + lastItem.maxIndex;
          } else {
            _list.push({
              is_type: 'block',
              is_height: item.is_height,
              maxIndex: index,
              minIndex: index,
              id: index + '/' + index,
            });
          }
        }
      } else {
        _list.push(item);
      }
    });
    return _list;
  }

  private reportHeight = (index: number, height: number, loaded: boolean) => {
    const list: any[] = this.state.list;
    list[index].is_height = height;
    list[index].is_loaded = loaded;
    const key = this.getMapKey(list[index]);
    // 只有当确定列表项高度不再变化了，才将高度缓存
    map.set(key, { height, loaded });
    this.setState({ list });
  }

  private getMapKey = (item) => {
    return this.props.id && item ? item[this.props.id] : item;
  }

  private onScroll = () => {
    if (this.lock) return;
    this.lock = true;
    this.updateBoxTop();
    if (this.timeoutKey) {
      clearTimeout(this.timeoutKey);
    }
    this.timeoutKey = setTimeout(() => {
      this.onScroll();
    }, 300);
  };

  private getScrollElement(): Element | Window {
    if (this.props.root) {
      const target = document.querySelector(this.props.root);
      if (target) {
        return target;
      }
    }
    return window;
  }

  private updateBoxTop() {
    const rect = this.ref?.current?.getBoundingClientRect();
    if (rect && (rect.top !== this.state.boxTop)) {
      this.setState({
        boxTop: rect.top,
      }, () => {
        this.lock = false;
      });
    } else {
      this.lock = false;
    }
  }
}