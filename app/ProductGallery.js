// @flow
import React, { Component } from 'react';
import {
  ListView,
  Image,
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native';
import _ from 'lodash';

import { Transition } from 'react-navigation';
import Touchable from './Touchable';
import Data from './Data';
import { metrics, fonts } from './MaterialValues';
import LinearGradient from 'react-native-linear-gradient';
import AndroidNavigationBar from '../AndroidNavigationBar';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const colCount = 3;

const { width: windowWidth } = Dimensions.get("window");
const margin = 0;//metrics.baselineGrid;
const productWidth = (windowWidth - margin * (colCount - 1)) / colCount;

const products = Data.getProducts();
const productRows = _.chunk(products, colCount);

class ProductGallery extends Component {
  render() {
    return (
      <View>
        <StatusBar translucent={true} backgroundColor="#00000066" />
        <ListView
          dataSource={ds.cloneWithRows(productRows)}
          renderRow={this.renderRow.bind(this)}
        />
        <AndroidNavigationBar translucent={true} />
      </View>
    );
  }
  renderRow(products) {
    return (
      <View style={styles.row}>
        {products.map(this.renderCell.bind(this))}
      </View>
    )
  }
  renderCell(product) {
    const onProductPressed = product => this.props.navigation.navigate('ProductDetail', { product });
    return (
      <Touchable onPress={() => onProductPressed(product)} key={product.url}>
        <View style={styles.cell}>
          <Transition.Image id={`image-${product.url}`} source={product.image} style={styles.image} />
          <LinearGradient colors={['#00000000', '#00000044', '#00000088']} style={[styles.priceContainer]}>
            <Text style={styles.priceText}>${product.price}</Text>
          </LinearGradient>
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  cell: {
    marginRight: margin,
    marginBottom: margin,
  },
  image: {
    width: productWidth,
    height: productWidth,
  },
  priceContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  priceText: {
    color: 'white',
    margin: metrics.baselineGrid,
    ...fonts.sizes.title,
    ...fonts.families.sansSerifLight,
  }
})

export default ProductGallery;