// @flow
import React, { Component } from 'react';
import {
  View,
  StatusBar,
} from 'react-native';

import {
  StackNavigator, Transition,
} from 'react-navigation';

import ProductGallery from './ProductGallery';
import ProductDetail from './ProductDetail';

import _ from 'lodash';
import { Easing } from 'react-native';

const { createTransition, initTransition, together, sequence, Transitions } = Transition;

const SharedImage = initTransition(Transitions.SharedElement, /image-.+/);
const CrossFadeScenes = initTransition(Transitions.CrossFade, /\$scene-.+/);
const ScaleFab = initTransition(Transitions.Scale, /fab-.+/);

const Pop = createTransition({
  createStyleMap(itemsOnFromRoute, itemsOnToRoute) {
    const pop = (outputRange) => (result, item) => {
      result[item.id] = { translateY: {outputRange, easing: Easing.bounce} }
      return result;
    }
    return {
      from: itemsOnFromRoute.reduce(pop([100, 0]), {}),
      to: itemsOnFromRoute.reduce(pop([0, 100]), {}),
    }
  }
});
const PopContent = initTransition(Pop, /pdcontent-.+/);

const Idle = initTransition(createTransition({}), /x/);

const transitions = [
  { 
    from: 'ProductGallery', to: 'ProductDetail', 
    // [ SharedImage(0.7), 0.5 => CrossFadeScenes(0.2))] => ScaleFab(0.3)
    transition: sequence(together(SharedImage(0.7), sequence(Idle(0.5), CrossFadeScenes(0.2))), ScaleFab(0.3)),
    config: { duration: 580 },
  },
  { 
    from: 'ProductDetail', to: 'ProductGallery', 
    transition: together(SharedImage(1), CrossFadeScenes(0.2), ScaleFab(0.3)), 
    config: { duration: 545 },
  },
];

const App = StackNavigator({
  ProductGallery: {
    screen: ProductGallery,
  },
  ProductDetail: {
    screen: ProductDetail.Screen,
  }
}, {
    transitions,
    headerMode: 'none',
  });

export default App;