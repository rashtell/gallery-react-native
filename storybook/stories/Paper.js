import React from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import { storiesOf } from '@kadira/react-native-storybook';
import {
  Button, Provider as PaperProvider, DefaultTheme,
  Colors, Drawer,
} from 'react-native-paper';

export default function addStories(label) {
  storiesOf(label || 'React Native Paper', module)
    .addDecorator(story => {
      const theme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: 'tomato',
        }
      }
      return (
        <PaperProvider theme={theme}>
          {story()}
        </PaperProvider>
      );
    })
    .add('Buttons', () => (
      <View style={styles.container}>
        <View style={styles.row}>
          <Button>Simple</Button>
          <Button primary>Primary</Button>
          <Button color={Colors.pink500}>Custom</Button>
        </View>
        <View style={styles.row}>
          <Button raised>Raised</Button>
          <Button raised primary>Primary</Button>
          <Button raised color={Colors.pink500}>Custom</Button>
        </View>
        <View style={styles.row}>
          <Button icon='add-a-photo'>Icon</Button>
          <Button
            raised
            primary
            icon='file-download'
            loading={true}
          >
            Loading
          </Button>
        </View>
        <View style={styles.row}>
          <Button disabled icon='my-location'>Disabled</Button>
          <Button
            disabled
            loading
            raised
          >
            Loading
          </Button>
        </View>
        <View style={styles.row}>
          <Button disabled raised icon='my-location' style={styles.fab} />
          <Button primary raised icon='my-location' style={styles.fab} />
        </View>
      </View>))
    .add('Drawer', () => {
      const content = (
        <Drawer.Section>
          <Drawer.Item><Text>Blah</Text></Drawer.Item>
        </Drawer.Section>
      );
      return (
        <Drawer content={content} locked={false}>
          <Text>Content</Text>
        </Drawer>
      );
    })
    ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
    padding: 4,
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
  }
});