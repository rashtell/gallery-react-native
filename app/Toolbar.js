// @flow

import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  TouchableNativeFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { metrics } from './MaterialValues';

class Toolbar extends React.Component {
  render() {
    const {icon, iconColor, style, renderRight, floating} = this.props;
    const toolbarStyle = floating ? styles.floatingToolbar : styles.toolbar;
    return (
      <View style={[toolbarStyle, style]}>
        <TouchableNativeFeedback>
          <View style={styles.iconContainer}>
            <Icon name={icon} color={iconColor} size={24} />
          </View>
        </TouchableNativeFeedback>
        <View style={styles.iconContainer}>
          {renderRight && renderRight()}
        </View>
      </View>
    )
  }
}

const commonToolbarStyle = {
  height: metrics.toolbarHeight,
  elevation: metrics.elevation.appBar,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: metrics.screenEdgeMarginHorizontal,
  paddingRight: metrics.screenEdgeMarginHorizontal,
};

const styles = StyleSheet.create({
  toolbar: {
    ...commonToolbarStyle,
    backgroundColor: '#651FFF',
  },
  floatingToolbar: {
    ...commonToolbarStyle,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  },
  iconContainer: {
    // backgroundColor:'green',
  }
});

export default Toolbar;
