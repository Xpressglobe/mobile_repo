import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../common/icons';
import Theme from '../styles/Theme';

export default class AccountEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                <ScrollView>
                    <LinearGradient colors={['#fc0f84', '#020cab']}
                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.BGsty}>
                        <View style={styles.userinfoContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                < Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                            </TouchableOpacity>
                            <Text style={styles.userinfotxt}>Account Details</Text>
                        </View>
                        <View style={styles.imgContainer}>
                            <View style={styles.imgUser}>
                                <Image style={styles.imgwidhei} source={require("../assets/img/profile.jpg")} />
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={{ flex: 1, marginHorizontal: 30, marginVertical: 15 }}>
                        <View style={{ paddingVertical: 10 }}>
                            <Text style={styles.txtsty}>IFSC code</Text>
                            <TextInput
                                style={styles.inputtxtsty}
                                keyboardType="name-phone-pad"
                            />
                        </View>
                        <View style={{ paddingVertical: 10 }}>
                            <Text style={styles.txtsty}>Account Number</Text>
                            <TextInput
                                style={styles.inputtxtsty}
                                keyboardType="number-pad"
                            />
                        </View>
                        <View style={{ paddingVertical: 10 }}>
                            <Text style={styles.txtsty}>Name</Text>
                            <TextInput
                                style={styles.inputtxtsty}
                                keyboardType="name-phone-pad"
                            />
                        </View>
                        <View style={{ paddingVertical: 10 }}>
                            <Text style={styles.txtsty}>Phone Number</Text>
                            <TextInput
                                style={styles.inputtxtsty}
                                keyboardType="number-pad"
                                maxLength={14}
                            >+91 </TextInput>
                        </View>
                        <TouchableOpacity style={{ marginHorizontal: 20, paddingVertical: 30 }}>
                            <View style={styles.changeContainer}>
                                <Text style={styles.changeTxt}>ADD</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View >
        );
    }
}


const styles = StyleSheet.create({
    BGsty: {
        borderBottomRightRadius: 150,
        borderBottomLeftRadius: 150,
    },
    userinfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20
    },
    userinfotxt: {
        fontFamily: 'Poppins-Bold',
        color: 'white',
        fontSize: 18,
        marginHorizontal: 20,
    },
    imgContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgwidhei: {
        width: 95,
        height: 95,
        resizeMode: "contain"
    },
    imgUser: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        borderColor: '#FFF',
        borderWidth: 3,
        overflow: "hidden",
    },
    inputtxtsty: {
        borderBottomWidth: 1,
        paddingLeft: 15,
        fontFamily: 'Poppins-ExtraLight'
    },
    txtsty: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: '#000',
    },
    changeContainer: {
        backgroundColor: '#020cab',
        padding: 10,
        borderRadius: 50
    },
    changeTxt: {
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        color: 'white'
    },
});