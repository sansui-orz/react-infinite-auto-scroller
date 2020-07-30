"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearHeightCache = clearHeightCache;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _scrollItem = _interopRequireDefault(require("./scrollItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var map = new Map();

function clearHeightCache() {
  map.clear();
}

var inClient = typeof window !== 'undefined';

var InfiniteScroller = /*#__PURE__*/function (_Component) {
  _inherits(InfiniteScroller, _Component);

  var _super = _createSuper(InfiniteScroller);

  function InfiniteScroller() {
    var _temp, _this;

    _classCallCheck(this, InfiniteScroller);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _super.call.apply(_super, [this].concat(args)), _this.state = {
      list: [],
      boxTop: 0
    }, _this.lock = false, _this.windowHeight = inClient ? window.innerHeight : 700, _this.ref = /*#__PURE__*/_react["default"].createRef(), _this.timeoutKey = null, _this.sortList = function (list) {
      var top = _this.state.boxTop;
      var minTop = -_this.windowHeight;
      var maxTop = _this.windowHeight * 2;
      var _list = [];
      list.forEach(function (item, index) {
        if (item.is_height) {
          top += item.is_height;

          if (!item.is_loaded || top > minTop && top < maxTop) {
            _list.push(item);
          } else {
            var lastItem = _list[_list.length - 1];

            if ((lastItem === null || lastItem === void 0 ? void 0 : lastItem.is_type) === 'block') {
              lastItem.is_height += item.is_height;
              lastItem.maxIndex = index;
              lastItem.id = lastItem.minIndex + '/' + lastItem.maxIndex;
            } else {
              _list.push({
                is_type: 'block',
                is_height: item.is_height,
                maxIndex: index,
                minIndex: index,
                id: index + '/' + index
              });
            }
          }
        } else {
          _list.push(item);
        }
      });
      return _list;
    }, _this.reportHeight = function (index, height, loaded) {
      var list = _this.state.list;
      list[index].is_height = height;
      list[index].is_loaded = loaded;

      var key = _this.getMapKey(list[index]); // 只有当确定列表项高度不再变化了，才将高度缓存


      map.set(key, {
        height: height,
        loaded: loaded
      });

      _this.setState({
        list: list
      });
    }, _this.getMapKey = function (item) {
      return _this.props.id && item ? item[_this.props.id] : item;
    }, _this.onScroll = function () {
      if (_this.lock) return;
      _this.lock = true;

      _this.updateBoxTop();

      if (_this.timeoutKey) {
        clearTimeout(_this.timeoutKey);
      }

      _this.timeoutKey = setTimeout(function () {
        _this.onScroll();
      }, 300);
    }, _temp));
  }

  _createClass(InfiniteScroller, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateBoxTop();

      if (inClient) {
        this.getScrollElement().addEventListener('scroll', this.onScroll, false);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (inClient) {
        this.getScrollElement().removeEventListener('scroll', this.onScroll, false);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var list2 = this.sortList(this.state.list);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "infinite-scroller",
        ref: this.ref
      }, list2.map(function (item, index) {
        var key = _this2.props.id ? item[_this2.props.id] : index;
        return /*#__PURE__*/_react["default"].createElement(_scrollItem["default"], {
          key: key,
          index: item.is_index,
          is_height: item.is_height,
          is_loaded: item.is_loaded,
          reportHeight: _this2.reportHeight,
          renderItem: _this2.props.renderItem,
          item: item
        });
      }));
    }
  }, {
    key: "getScrollElement",
    value: function getScrollElement() {
      if (this.props.root) {
        var target = document.querySelector(this.props.root);

        if (target) {
          return target;
        }
      }

      return window;
    }
  }, {
    key: "updateBoxTop",
    value: function updateBoxTop() {
      var _this$ref,
          _this$ref$current,
          _this3 = this;

      var rect = (_this$ref = this.ref) === null || _this$ref === void 0 ? void 0 : (_this$ref$current = _this$ref.current) === null || _this$ref$current === void 0 ? void 0 : _this$ref$current.getBoundingClientRect();

      if (rect && rect.top !== this.state.boxTop) {
        this.setState({
          boxTop: rect.top
        }, function () {
          _this3.lock = false;
        });
      } else {
        this.lock = false;
      }
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var newList = props.list.map(function (item, index) {
        var key = props.id ? item[props.id] : item;
        var mapItem = map.get(key);
        return _objectSpread(_objectSpread({}, item), {}, {
          is_height: mapItem === null || mapItem === void 0 ? void 0 : mapItem.height,
          is_loaded: !!(mapItem === null || mapItem === void 0 ? void 0 : mapItem.loaded),
          is_index: index
        });
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        list: newList
      });
    }
  }]);

  return InfiniteScroller;
}(_react.Component);

exports["default"] = InfiniteScroller;