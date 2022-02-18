import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, Modal, TextInput, StatusBar } from 'react-native';
import Icon from '../common/icons';
import ThemeStyle from '../styles/Theme';
import Theme from '../styles/Theme';

export default class Giftcard extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
             <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.logContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headtxt}>Gift Card</Text>
                </View>
                <ScrollView>
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Image style={{ width: 300, height: 200 }} source={require('../assets/img/giftcard.jpg')} />
                    </View>
                    <View style={styles.transferbox}>
                        <Text style={styles.headertxt}>Terms Conditions:</Text>
                        <View style={{ paddingLeft: 20 }}>
                            <Text style={styles.pgpointTxt}>1. Proper or expected usage; definition of misuse</Text>
                            <Text style={styles.pgpointTxt}>2. Accountability for online actions, behavior, and conduct</Text>
                            <Text style={styles.pgpointTxt}>3. Privacy policy outlining the use of personal data</Text>
                            <Text style={styles.pgpointTxt}>4. Payment details such as membership or subscription fees, etc.</Text>
                            <Text style={styles.pgpointTxt}>5. User notification upon modification of terms, if offered</Text>
                        </View>
                    </View>
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    transferbox: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 15
    },
    logContainer: {
        padding: 15,
        backgroundColor: '#020cab',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headtxt: {
        color: '#FFF',
        fontSize: 17,
        marginHorizontal: 20,
        fontFamily: 'Poppins-Bold',
    },
    headertxt: {
        fontFamily: 'Poppins-Medium',
        color: '#000',
        padding: 10,
        fontSize: 20
    },
    pgpointTxt: {
        color: '#000',
        paddingVertical: 2,
        fontFamily: 'Poppins-Regular',
    },
});