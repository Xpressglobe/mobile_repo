import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Theme from '../styles/Theme';
import Icon from '../common/icons';

export default class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
              <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.aboutContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon family="MaterialIcons" name="arrow-back" size={23} color="#FFF" />
                        </TouchableOpacity>
                        <Text style={styles.abouttxt}>About</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ margin: 5 }}>

                        <Text style={styles.headerTxt}>Terms Conditions:</Text>
                        <View style={{ paddingLeft: 20 }}>
                            <Text style={styles.pgpointTxt}>1. Proper or expected usage; definition of misuse</Text>
                            <Text style={styles.pgpointTxt}>2. Accountability for online actions, behavior, and conduct</Text>
                            <Text style={styles.pgpointTxt}>3. Privacy policy outlining the use of personal data</Text>
                            <Text style={styles.pgpointTxt}>4. Payment details such as membership or subscription fees, etc.</Text>
                            <Text style={styles.pgpointTxt}>5. User notification upon modification of terms, if offered</Text>
                        </View>


                        <Text style={styles.headerTxt}>Eligibility:</Text>
                        <View style={{ paddingLeft: 20 }}>
                            <Text style={styles.pgTxt}>Proper or expected usage definition of misuseProper or expected usage definition of misuse Proper or expected usage definition of misuse</Text>
                            <Text style={styles.pgpointTxt}>1. Accountability for online actions, behavior, and conduct</Text>
                            <Text style={styles.pgpointTxt}>2. Privacy policy outlining the use of personal data</Text>
                            <Text style={styles.pgpointTxt}>3. Payment details such as membership or subscription fees, etc.</Text>
                        </View>


                        <Text style={styles.headerTxt}>Registration:</Text>
                        <View style={{ paddingLeft: 20 }}>
                            <Text style={styles.pgTxt}>Payment details such as membership or subscription fees, etc. Accountability for online actions, behavior, and conduct Proper or expected usage definition of misuseProper or expected usage definition of misuse Proper or expected usage definition of misuse</Text>
                            <Text style={styles.pgTxt}>Membership Accountability for online actions, behavior, and conduct Proper or expected usage definition of misuse Proper or expected usage definition </Text>
                        </View>
                        <Text style={styles.headerTxt}>Privacy:</Text>
                        <View style={{ paddingLeft: 20 }}>
                            <Text style={styles.pgTxt}>Payment details such as membership or subscription fees, etc. Accountability for online actions, behavior, and conduct Proper or expected usage definition of misuseProper or expected usage definition of misuse Proper or expected usage definition of misuse</Text>
                            <Text style={styles.pgpointTxt}>1. Accountability for online actions, behavior, and conduct</Text>
                            <Text style={styles.pgpointTxt}>2. Privacy policy outlining the use of personal data</Text>
                            <Text style={styles.pgpointTxt}>3. Payment details such as membership or subscription fees, etc.</Text>
                            <Text style={styles.pgpointTxt}>4. Accountability for online actions, behavior, and conduct</Text>
                            <Text style={styles.pgpointTxt}>5. Privacy policy outlining the use of personal data</Text>
                            <Text style={styles.pgpointTxt}>6. Payment details such as membership or subscription fees, etc.</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    aboutContainer: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#020cab'
    },
    abouttxt: {
        color: '#FFF',
        fontSize: 17,
        fontFamily: 'Poppins-Bold',
        marginHorizontal: 20
    },
    headerTxt: {
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
    pgTxt: {
        color: '#000',
        paddingVertical: 2,
        fontFamily: 'Poppins-Light',
        fontSize: 14
    }
});