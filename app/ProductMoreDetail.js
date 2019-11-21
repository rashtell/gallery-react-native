// @flow
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Image,
    StyleSheet,
    Animated,
    Dimensions,
    Text,
    Easing,
    TouchableNativeFeedback,
} from 'react-native';

import SharedView from './SharedView';
import Toolbar from './Toolbar';

const { width: windowWidth } = Dimensions.get("window");

const ProductMoreDetail = (props) => {
    const { product: {url, title, description, image} } = props.navigation.state.params;
    return (
        <View>
            <Toolbar navigation={props.navigation} />
            <ScrollView>
                <View>
                    <View style={styles.container}>
                        <SharedView name={`title-${url}`} containerRouteName='ProductMoreDetail'>
                            <Text style={[styles.text, styles.title]}>{title}</Text>
                        </SharedView>
                        <SharedView name={`image-${url}`} containerRouteName='ProductMoreDetail'>
                            <Image source={image} style={styles.image} />
                        </SharedView>
                    </View>
                    <Text style={[styles.text]}>{description}</Text>
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    image: {
        width: 160,
        height: 160,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    text: {
        margin: 15,
    },
    container: {
        flexDirection: 'row',
    }
})

export default ProductMoreDetail;