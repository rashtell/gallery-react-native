import React from 'react';

import {
  NativeModules,
  findNodeHandle,
} from 'react-native';

const {PeekPalette} = NativeModules;

class PaletteComp extends React.Component {
  static propTypes = {
    onPaletteReady: React.PropTypes.func.isRequired,
    region: React.PropTypes.string,
    children: React.PropTypes.element.isRequired,
  }
  render() {
    const child = React.Children.only(this.props.children);
    return React.cloneElement(child, {
      ref: v => {
        this._imageViewNativeHandle = findNodeHandle(v);
        typeof child.props.ref === 'function' && child.props.ref(v);
      },
      onLoad: async () => {
        const options = { region: this.props.region }
        try {
          const swatches = await PeekPalette.getSwatches(this._imageViewNativeHandle, options);
          this.props.onPaletteReady(swatches);
        } catch (e) {
          console.error(e);
          throw e;
        }
        typeof child.props.onLoad ==='function' && child.props.onLoad();
      }
    });
  }
}

export default PaletteComp;