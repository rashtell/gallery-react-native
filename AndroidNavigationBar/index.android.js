// @flow

import React from 'react';

import {
  NativeModules,
  processColor,
} from 'react-native';

const { AndroidNavigationBar } = NativeModules;

type NavBarOptions = {
  translucent: boolean,
  backgroundColor: string,
}

const navBarOptionStack = [];

class AndroidNavigationBarComp extends React.Component {
  componentDidMount() {
    const navBarOptions = {
      translucent: this.props.translucent || false,
      backgroundColor: this.props.backgroundColor || 'black',
    };
    this._setNavBarOptions(navBarOptions);
    navBarOptionStack.push(navBarOptions);
  }

  componentWillUnmount() {
    navBarOptionStack.pop();
    const prevNavBarOptions = navBarOptionStack[navBarOptionStack.length - 1] || { translucent: false, backgroundColor: 'black'};
    this._setNavBarOptions(prevNavBarOptions);
  }
  
  _setNavBarOptions(navBarOptions: NavBarOptions) {
    AndroidNavigationBar.setTranslucent(navBarOptions.translucent);
    AndroidNavigationBar.setBackgroundColor(processColor(navBarOptions.backgroundColor));
  }
    
  render() {
    return null;
  }
}

export default AndroidNavigationBarComp;