/* @flow */

import React, {Component} from 'react';
import IconButton from './IconButton';
import InputPopover from './InputPopover';
import autobind from 'class-autobind';

type Props = {
  id: PropTypes.string,
  iconName: string;
  showPopover: boolean,
  onTogglePopover: Function,
  onSubmit: Function;
};

export default class PopoverIconButton extends Component {
  props: Props;

  static defaultProps = {
    id: 'upload-file',
  }

  constructor() {
    super(...arguments);
    autobind(this);
  }

  togglePopover = () => {
    if (this.imageInput) {
      this.imageInput.click();
    }
    this.props.onTogglePopover();
  }

  refInput = (input) => {
    this.imageInput = input;
  }

  onChange = (e) => {
    const { files } = e.target;
    const currentTarget = e.currentTarget;
    if (files[0].type.includes('image')) {
      const reader = new FileReader();
  
      reader.onload = (readerEvent) => {
        const dataUrl = readerEvent.target.result;
        this.props.onSubmit(dataUrl, files[0]);
        currentTarget.value = '';
      };
      reader.readAsDataURL(files[0]);
    }
  }

  render() {
    let {onTogglePopover, showPopover, id, ...props} = this.props; // eslint-disable-line no-unused-vars
    return (
      // <IconButton {...props} onClick={onTogglePopover}>
      <IconButton htmlFor={this.props.id} {...props} onClick={this.togglePopover}>
        {this._renderPopover()}
      </IconButton>
    );
  }

  _renderPopover() {
    if (this.props.iconName === 'image') {
      return (
        <input
          type="file"
          id={this.props.id} ref={this.refInput}
          onChange={this.onChange}
          style={{
            visibility: 'hidden',
            opacity: 0,
            position: 'absolute',
            zIndex: -1,
          }}
        />
      );
    } else if (!this.props.showPopover) {
      return null;
    } else {
      return (
        <InputPopover
          onSubmit={this._onSubmit}
          onCancel={this._hidePopover}
        />
      );
    }
  }

  _onSubmit() {
    this.props.onSubmit(...arguments);
  }

  _hidePopover() {
    if (this.props.showPopover) {
      this.props.onTogglePopover(...arguments);
    }
  }
}
