import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../common/icons';
import Theme from '../styles/Theme';
import AsyncStorage from '@react-native-community/async-storage';

export default class UserprofileEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    async componentDidMount() {

        this.setState({ first_name: await AsyncStorage.getItem('@first_name') ,
        last_name: await AsyncStorage.getItem('@last_name'),
        email: await AsyncStorage.getItem('@email'),
        phone: await AsyncStorage.getItem('@phone'),
     });
       

}
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                <ScrollView>
                    <LinearGradient colors={['#fc0f84', '#020cab']}
                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.BGsty}>
                        <View style={styles.userinfoContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                            </TouchableOpacity>
                            <Text style={styles.userinfotxt}>Profile</Text>
                        </View>
                        <View style={styles.imgContainer}>
                            <View style={styles.imgUser}>
                                <Image style={styles.imgwidhei} source={require("../assets/img/profile.jpg")} />
                            </View>
                        </View>
                    </LinearGradient>

                    <View style={{ flex: 1, margin: 30 }}>
                        <View style={{ paddingVertical: 15 }}>
                            <Text style={styles.txtsty}>Full Name</Text>
                            <TextInput
                                style={styles.inputtxtsty}
                               
                                value={this.state.first_name +""+ this.state.last_name}
                            />
                        </View>
                        <View style={{ paddingVertical: 15 }}>
                            <Text style={styles.txtsty}>EMail</Text>
                            <TextInput
                                style={styles.inputtxtsty}
                                keyboardType="email-address"
                                value={this.state.email}
                            />
                        </View>
                        <View style={{ paddingVertical: 15 }}>
                            <Text style={styles.txtsty}>Phone Number</Text>
                            <TextInput
                                style={styles.inputtxtsty}
                                keyboardType="number-pad"
                                maxLength={14}
                                value={this.state.phone}
                            ></TextInput>
                        </View>
                       
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
    userinfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20
    },
    userinfotxt: {
        fontFamily: 'Poppins-Bold',
        color: 'white',
        fontSize: 18,
        marginHorizontal: 20
    },
});