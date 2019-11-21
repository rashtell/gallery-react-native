import React from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import { storiesOf } from '@kadira/react-native-storybook';
import {
  COLOR, ThemeProvider, Button, ActionButton,
  Dialog, DialogDefaultActions, Drawer, Toolbar
} from 'react-native-material-ui';
import { metrics } from '../../app/MaterialValues';

export default function addStories(label) {
  storiesOf(label || 'react-native-material-ui', module)
    .add('Fab', () => {
      const theme = {
        palette: {
          accentColor: COLOR.amber800,
        }
      }
      return (
        <ThemeProvider uiTheme={theme}>
          <ActionButton icon='done' style={{ container: { margin: 10}}} />
        </ThemeProvider>
      )
    })
    .add('Toolbar', () => (
      <ThemeProvider uiTheme={{ toolbar: {} }} >
        <View>
          <Toolbar
            leftElement="menu"
            centerElement="Searchable"
            searchable={{
              autoFocus: true,
              placeholder: 'Search',
            }}
          />
          <Toolbar
            leftElement="close"
            centerElement="Multiple actions"
            searchable={{
              autoFocus: true,
              placeholder: 'Search',
            }}
            rightElement={['share', 'add-shopping-cart']}
            style={{ container: { marginTop: 24 } }}
          />
          <Toolbar
            leftElement="close"
            centerElement="With menu"
            searchable={{
              autoFocus: true,
              placeholder: 'Search',
            }}
            rightElement={{
              menu: {
                labels: ['Settings', 'About']
              }
            }}
            style={{ container: { marginTop: 24 } }}
          />
          <Toolbar
            leftElement="close"
            centerElement="With actions"
            searchable={{
              autoFocus: true,
              placeholder: 'Search',
            }}
            rightElement={{
              actions: ['share', 'add-shopping-cart']
            }}
            style={{ container: { marginTop: 24 } }}
          />
          <Toolbar
            leftElement="close"
            centerElement="Reverse order"
            searchable={{
              autoFocus: true,
              placeholder: 'Search',
            }}
            rightElement={['share', 'add-shopping-cart']}
            style={{ container: { marginTop: 24 }, rightElementContainer: { flexDirection: 'row-reverse' } }}
          />
        </View>
      </ThemeProvider>
    ))
    ;
}