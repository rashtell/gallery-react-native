import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { storiesOf } from '@kadira/react-native-storybook';
import { MKColor, MKButton, getTheme, setTheme } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { metrics } from '../../app/MaterialValues';

export default function addStories(label) {
  storiesOf(label || 'React Native Material Kit', module)
    .addDecorator(story => (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginLeft: 150 }}>
        {story()}
      </View>
    ))
    .add('FAB', () => {
      const Fab = MKButton.accentColoredFab().build();
      return (
        <Fab>
          <Icon name='done' size={metrics.fabIconSize} color='white' />
        </Fab>
      )
    })
    .add('Theming FAB', () => {
      setTheme({
        accentColor: MKColor.Blue,
      })
      const Fab = MKButton.accentColoredFab().build();
      return (
        <Fab>
          <Icon name='close' size={metrics.fabIconSize} color='white' />
        </Fab>
      )
    })
    ;
}