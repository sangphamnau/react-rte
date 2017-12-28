'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconButton = require('./IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _InputPopover = require('./InputPopover');

var _InputPopover2 = _interopRequireDefault(_InputPopover);

var _classAutobind = require('class-autobind');

var _classAutobind2 = _interopRequireDefault(_classAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoverIconButton = function (_Component) {
  (0, _inherits3.default)(PopoverIconButton, _Component);

  function PopoverIconButton() {
    (0, _classCallCheck3.default)(this, PopoverIconButton);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PopoverIconButton.__proto__ || (0, _getPrototypeOf2.default)(PopoverIconButton)).apply(this, arguments));

    _this.togglePopover = function () {
      if (_this.imageInput) {
        _this.imageInput.click();
      }
      _this.props.onTogglePopover();
    };

    _this.refInput = function (input) {
      _this.imageInput = input;
    };

    _this.onChange = function (e) {
      var files = e.target.files;

      var reader = new FileReader();

      reader.onload = function (readerEvent) {
        var dataUrl = readerEvent.target.result;
        _this.props.onSubmit(dataUrl, files[0]);
      };
      reader.readAsDataURL(files[0]);
    };

    (0, _classAutobind2.default)(_this);
    return _this;
  }

  (0, _createClass3.default)(PopoverIconButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onTogglePopover = _props.onTogglePopover,
          showPopover = _props.showPopover,
          id = _props.id,
          props = (0, _objectWithoutProperties3.default)(_props, ['onTogglePopover', 'showPopover', 'id']); // eslint-disable-line no-unused-vars

      return (
        // <IconButton {...props} onClick={onTogglePopover}>
        _react2.default.createElement(
          _IconButton2.default,
          (0, _extends3.default)({ htmlFor: this.props.id }, props, { onClick: this.togglePopover }),
          this._renderPopover()
        )
      );
    }
  }, {
    key: '_renderPopover',
    value: function _renderPopover() {
      if (this.props.iconName === 'image') {
        return _react2.default.createElement('input', {
          type: 'file',
          id: this.props.id, ref: this.refInput,
          onChange: this.onChange,
          style: {
            visibility: 'hidden',
            opacity: 0,
            position: 'absolute',
            zIndex: -1
          }
        });
      } else if (!this.props.showPopover) {
        return null;
      } else {
        return _react2.default.createElement(_InputPopover2.default, {
          onSubmit: this._onSubmit,
          onCancel: this._hidePopover
        });
      }
    }
  }, {
    key: '_onSubmit',
    value: function _onSubmit() {
      var _props2;

      (_props2 = this.props).onSubmit.apply(_props2, arguments);
    }
  }, {
    key: '_hidePopover',
    value: function _hidePopover() {
      if (this.props.showPopover) {
        var _props3;

        (_props3 = this.props).onTogglePopover.apply(_props3, arguments);
      }
    }
  }]);
  return PopoverIconButton;
}(_react.Component);

PopoverIconButton.defaultProps = {
  id: 'upload-file'
};
exports.default = PopoverIconButton;