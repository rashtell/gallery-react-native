import React from 'react';
import {
  View,
  Text,
  PanResponder,
  Animated,
} from 'react-native';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this._offset = new Animated.ValueXY();
    this.state = { pressed: false, translateX0: 0, translateY0: 0 };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderStart: () => this.setState({ pressed: true }),
      onPanResponderRelease: (e, gestureState) => {        
        this.setState({ 
          pressed: false, 
          translateX0: this._offset.x.__getValue(),
          translateY0: this._offset.y.__getValue(),
        });
      },
      onPanResponderMove: (e, gestureState) => {
        this._offset.x.setValue(this.state.translateX0 + gestureState.dx);
        this._offset.y.setValue(this.state.translateY0 + gestureState.dy);
      }
    });
  }
  render() {
    const { elevation, style, children, extraText } = this.props;
    const animatedStyle = {
      transform: this._offset.getTranslateTransform(),
    };
    const backgroundColor = this.state.pressed ? 'yellow' : 'white';
    return (
      <Animated.View style={[{ backgroundColor, elevation, margin: 16, padding: 32 }, style, animatedStyle]}
        {...this._panResponder.panHandlers}>
        <Text>Elevation = {elevation} {extraText}</Text>
        {children}
      </Animated.View>
    );
  }
}

export default Card;