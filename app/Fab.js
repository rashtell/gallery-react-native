import React from 'react';

import {
  View,
  PanResponder,
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

class Fab extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { pressed: false }
  }
  render() {
    const ripple = TouchableNativeFeedback.Ripple('#AAF', true);
    const elevation = this.state.pressed ? 13 : 6;
    return (
      <View style={[styles.fab, { elevation }, this.props.style]}>
        <TouchableNativeFeedback background={ripple} onPress={this.props.onPress}
          onPressIn={() => this.setState({ pressed: true })}
          onPressOut={() => this.setState({ pressed: false })} >
          <View style={styles.iconContainer}>
            <Icon name='add-shopping-cart' color='black' size={24} />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 6,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Fab;