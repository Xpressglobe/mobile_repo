import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../common/icons';

export default class LoginScreen extends Component {

    send = () => {
        this.props.navigation.navigate("LoginScreen");
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient colors={['#fc0f84', '#020cab']}
                    start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={{ flex: 1 }}>
                    <ScrollView>

                        <View style={styles.forgotContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <View style={{ paddingVertical: 20, paddingLeft: 15 }}>
                                    <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.forgotHeadtxt}>Forgot Password</Text>
                        </View>

                        <View style={{ alignItems: 'center', paddingTop: 30 }}>
                            <Image style={styles.logo} source={require("./../assets/img/logo.png")} />
                        </View>

                        <View style={{ paddingVertical: 50, marginHorizontal: 20 }}>

                            <View style={styles.txtbox}>
                                <View style={styles.iconSty}>
                                    <Icon family="AntDesign" name="user" size={22} color="white" />
                                </View>
                                <TextInput
                                    style={styles.txtInputSty}
                                    placeholderTextColor="white"
                                    placeholder="Email"
                                />
                            </View>

                            <TouchableOpacity onPress={this.onPressForget}>
                                <Text style={styles.forgettxt}>Resend Email?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginHorizontal: 20, paddingVertical: 30, paddingTop: 50 }} onPress={this.send}>
                                <View style={styles.signContainer}>
                                    <Text style={styles.signupTxt}>Send</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </LinearGradient>
            </View >

        );
    }
}

const styles = StyleSheet.create({
    forgotContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    forgotHeadtxt: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'Poppins-Bold',
        marginHorizontal: 20
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: "center",
        borderRadius: 50
    },
    txtbox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 50,
        borderColor: 'white',
        overflow: 'hidden'
    },
    iconSty: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtInputSty: {
        flex: 3,
        color: 'white',
        fontFamily: 'Poppins-Light',
        paddingRight: 15,

    },
    container: {
        paddingHorizontal: 20,
    },

    headertxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: "600",
        paddingVertical: 20,
    },
    txtSignup: {
        color: 'white',
        textAlign: 'center',
    },
    forgettxt: {
        color: 'white',
        textAlign: 'right',
        marginVertical: 10,
        fontFamily: 'Poppins-Medium'
    },
    signContainer: {
        backgroundColor: 'white',
        paddingVertical: 10,
        borderRadius: 50
    },
    signupTxt: {
        fontSize: 17,
        textAlign: 'center',
        color: '#020cab',
        fontFamily: 'Poppins-Bold',
    }
})

