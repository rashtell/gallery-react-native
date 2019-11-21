import React from 'react';
import { Text, View, ScrollView, PixelRatio, Animated, Easing, Image } from 'react-native';
import { storiesOf, action, linkTo } from '@kadira/react-native-storybook';

import ProductGallery from '../../app/ProductGallery';
import ProductDetail from '../../app/ProductDetail';

import Data from '../../app/Data';

import Fab from '../../app/Fab';
import AndroidNavigationBar from '../../AndroidNavigationBar';
import Spinner from 'react-native-spinkit';
import _ from 'lodash';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { metrics } from '../../app/MaterialValues';

import addMaterialKitStories from './MaterialKit';
import addPaperStories from './Paper';
import addMaterialUiStories from './MaterialUi';

storiesOf('Hello Storybook', module)
  .add('Hello', () => <Text>Hello Storybook</Text>);

storiesOf('Gallery', module)
  .add('with products', () => <ProductGallery />);

storiesOf('Detail', module)
  .add('Light image', () => (
    <ProductDetail.Comp product={{
      ...Data.oneProduct(),
      image: require('../../app/images/img1.jpg'),
    }} />
  ));

storiesOf('Fab', module)
  .add('Center', () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Fab onPress={() => console.log('Fab pressed!')}/>
    </View>
  ))
  ;

storiesOf('AndroidNavigationBar', module)
  .add('Red translucent', () => <AndroidNavigationBar backgroundColor="#ff0000" translucent={true} />)
  .add('Blue translucent', () => <AndroidNavigationBar backgroundColor="#0000ff" translucent={true} />)
  .add('Blue', () => <AndroidNavigationBar backgroundColor="#0000ff" />)
  .add('Red', () => <AndroidNavigationBar backgroundColor="#ff0000" />)
  ;

const ParentChildElevation = (props) => (
  <View>
    <Card elevation={5} style={{ position: 'absolute', left: 0, right: 0 }} />
    <Card elevation={6} style={{ position: 'absolute', left: 120, right: 20, top: 10, height: 60 }} />
    <Card elevation={3} style={{ position: 'absolute', left: 20, right: 100, top: 30, height: 80 }} />
    <Card elevation={4} style={{ position: 'absolute', left: 150, top: 90 }}>
      <Card elevation={7} />
    </Card>
    <ScrollView style={{ elevation: 5 }}>
      <View style={{ marginTop: 150 }} />
      {
        Array(20).fill(0).map((_, index) => (
          <Card elevation={index} />
        ))
      }
    </ScrollView>
  </View>
);


storiesOf('Measurement tests', module)
  .add('Font Scale', () => (
    <ScrollView>
      <Text style={{ fontSize: 20 }}>20sp</Text>
      <Text style={{ fontSize: 40 }}>40sp</Text>
      <Text style={{ fontSize: 80 }}>80sp</Text>
      <Text style={{ fontSize: 7 * PixelRatio.getFontScale() }}>fontSize: 7 * FontScale</Text>
      <Text style={{ fontSize: 80 / PixelRatio.getFontScale() }}>fontSize: 80 / FontScale</Text>
    </ScrollView>
  ))
  .add('Sizes', () => (
    <View>
      <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
      <View style={{ width: 200, height: 200, backgroundColor: 'yellow' }} />
    </View>
  ));

storiesOf('ArcMotion', module)
  .add('Arc: ⤷', () => (
    <ArcMotionTest from={{ x: 0, y: 0 }} to={{ x: 350, y: 350 }} />
  ))
  .add('Arc: ↖︎', () => (
    <ArcMotionTest from={{ x: 350, y: 350 }} to={{ x: 0, y: 0 }} />
  ))
  .add('Arc: ⤶', () => (
    <ArcMotionTest from={{ x: 350, y: 0 }} to={{ x: 0, y: 350 }} />
  ))
  .add('Arc: ⤴︎', () => (
    <ArcMotionTest from={{ x: 0, y: 350 }} to={{ x: 350, y: 0 }} />
  ))
  .add('Arc: ⤷ deltaX < deltaY', () => (
    <ArcMotionTest from={{ x: 0, y: 0 }} to={{ x: 350, y: 600 }} />
  ))
  .add('Arc: ↖︎ deltaX < deltaY', () => (
    <ArcMotionTest from={{ x: 350, y: 600 }} to={{ x: 0, y: 0 }} />
  ))
  .add('Arc: ⤶ deltaX < deltaY', () => (
    <ArcMotionTest from={{ x: 350, y: 0 }} to={{ x: 0, y: 600 }} />
  ))
  .add('Arc: ⤴︎ deltaX < deltaY', () => (
    <ArcMotionTest from={{ x: 0, y: 600 }} to={{ x: 350, y: 0 }} />
  ))
  .add('Arc: ⤷ deltaX > deltaY', () => (
    <ArcMotionTest from={{ x: 0, y: 0 }} to={{ x: 350, y: 150 }} />
  ))
  .add('Arc: ↖︎ deltaX > deltaY', () => (
    <ArcMotionTest from={{ x: 350, y: 150 }} to={{ x: 0, y: 0 }} />
  ))
  .add('Arc: ⤶ deltaX > deltaY', () => (
    <ArcMotionTest from={{ x: 350, y: 0 }} to={{ x: 0, y: 150 }} />
  ))
  .add('Arc: ⤴︎ deltaX > deltaY', () => (
    <ArcMotionTest from={{ x: 0, y: 150 }} to={{ x: 350, y: 0 }} />
  ))
  .add('straighline, up -> down', () => (
    <ArcMotionTest from={{ x: 150, y: 0 }} to={{ x: 150, y: 600 }} />
  ))
  .add('straighline, left -> right', () => (
    <ArcMotionTest from={{ x: 0, y: 200 }} to={{ x: 300, y: 200 }} />
  ))
  ;

storiesOf('SpinKit', module)
  .add('All spinners', () => {
    const types = ['RotatingPane', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots',
      'ThreeBounce', 'Circle', '9CubeGrid', 'FadingCircleAlt', 'FoldingCube'];
    const typeRows = _.chunk(types, 2);
    const style = {
      margin: 10,
    }
    const renderRow = (types) => types.map(type => (
      <View style={{ flex: 1, flexDirection: 'row', margin: 8, justifyContent: 'center', alignItems: 'center' }} key={type}>
        <Text>{type}: </Text>
        <Spinner style={style}
          isVisible={true}
          size={40}
          type={type}
          color='#ff6f00' />
      </View>
    ));
    return (
      <ScrollView>
        {typeRows.map(typesInRow => (
          <View style={{ flexDirection: 'row' }}>
            {renderRow(typesInRow)}
          </View>
        ))}
      </ScrollView>
    );
  })


addMaterialKitStories('Material Kit')

addMaterialUiStories('Material UI');

addPaperStories('React Native Paper');

// The same idea as AnimatedValue.interpolate()
const interpolate = (inputRange, outputRange) => (v) => {
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const [inputMin, inputMax] = inputRange;
  const effectiveV = clamp(v, inputMin, inputMax);
  const [outputMin, outputMax] = outputRange;
  return outputMin + (effectiveV - inputMin) * (outputMax - outputMin) / (inputMax - inputMin);
};

function getArcEasingY(from, to) {
  let p1 = { x: 0, y: 0.5 };
  let p2 = { x: 0.5, y: 1 };
  if ((from.x > to.x && from.y > to.y) || (from.x < to.x && from.y > to.y)) {
    const swapXy = ({ x, y }) => ({ x: y, y: x });
    p1 = swapXy(p1);
    p2 = swapXy(p2);
  }
  return Easing.bezier(p1.x, p1.y, p2.x, p2.y);
}

class ArcMotionTest extends React.Component {
  constructor(props) {
    super(props);
    this.progress = new Animated.Value(0);
    this.state = {
      points: [],
      animating: false,
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !nextState.animating;
  }

  componentDidMount() {
    this.setState({ animating: true });
    Animated.timing(this.progress, {
      duration: 1000,
      toValue: 1,
      // easing: Easing.linear,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    }).start(() => this.setState({ animating: false }));
  }
  getAnimatedStyle() {
    const inputRange = [0, 1];
    const { props: { from, to } } = this;

    const translateX = this.progress.interpolate({
      inputRange,
      outputRange: [from.x, to.x],
    });
    const translateY = this.progress.interpolate({
      inputRange,
      outputRange: [from.y, to.y],
      easing: getArcEasingY(from, to),
    });

    this.progress.addListener(() => {
      const x = translateX.__getAnimatedValue();
      const y = translateY.__getAnimatedValue();
      this.setState(prevState => ({
        points: [...prevState.points, { x, y }],
        animating: true,
      }))
    })
    return { transform: [{ translateX }, { translateY }] };
  }
  render() {
    const style = {
      position: 'absolute',
      left: this.props.x,
      top: this.props.y,
      width: 50,
      height: 50,
      right: null,
      bottom: null,
      backgroundColor: '#FF0000AA',
    };
    const animatedStyle = this.getAnimatedStyle();
    return (
      <View>
        <Path points={this.state.points} />
        <Animated.View style={[style, animatedStyle]} />
      </View>
    );
  }
}

const Path = ({ points }) => (
  <View>
    {points.map((p, idx) => {
      const opacity = idx / (points.length - 1) + 0.1;
      const backgroundColor = 'blue';
      return (
        <View key={idx}
          style={{ ...pointStyle, opacity, backgroundColor, transform: [{ translateX: p.x }, { translateY: p.y }] }} />
      );
    })}
  </View>
);

const pointStyle = {
  width: 5,
  height: 5,
  borderRadius: 5,
  position: 'absolute',
}
