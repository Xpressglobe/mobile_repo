import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../common/icons';

export default class RegisterScreen extends Component {
  onPressSignIn = () => {
    this.props.navigation.navigate("LoginScreen");
  }

  onPressSignUp = () => {
    this.props.navigation.navigate("TabNav");
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient colors={['#fc0f84', '#020cab']}
          start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={{ flex: 1 }}>
          <ScrollView>

            {/* <View style={styles.hederContainer}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <View style={{paddingVertical:20,paddingLeft:15}}>
                  <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                </View>
              </TouchableOpacity>
              <Text style={styles.logintxt}>Register</Text>
            </View> */}



            <View style={{ alignItems: 'center',  marginTop: 30 }}>
              <Image style={styles.logo} source={require("./../assets/img/logo.png")} />
            </View>

            <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 40 }}>

              <View style={styles.txtbox}>
                <View style={styles.iconSty}>
                  <Icon family="AntDesign" name="user" size={22} color="white" />
                </View>
                <TextInput
                  style={styles.txtInputSty}
                  placeholderTextColor="white"
                  placeholder="Username"
                />
              </View>
              <View style={styles.txtbox}>
                <View style={styles.iconSty}>
                  <Icon family="AntDesign" name="mail" size={22} color="white" />
                </View>
                <TextInput
                  style={styles.txtInputSty}
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor="white"
                />
              </View>
              <View style={styles.txtbox}>
                <View style={styles.iconSty}>
                  <Icon family="AntDesign" name="phone" size={22} color="white" />
                </View>
                <TextInput
                  style={styles.txtInputSty}
                  placeholder="Phone number"
                  keyboardType="phone-pad"
                  placeholderTextColor="white"
                />
              </View>
              <View style={styles.txtbox}>
                <View style={styles.iconSty}>
                  <Icon family="AntDesign" name="lock" size={22} color="white" />
                </View>
                <TextInput
                  style={styles.txtInputSty}
                  placeholder="Password"
                  placeholderTextColor="white"
                  secureTextEntry={true}
                />
              </View>
              <TouchableOpacity style={{ marginHorizontal: 0, paddingVertical: 10, marginTop: 20 }} onPress={this.onPressSignUp}>
                <View style={styles.signContainer}>
                  <Text style={styles.signinTxt}>SIGN UP</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginHorizontal: 60 }} onPress={this.onPressSignIn}>
                <Text style={styles.txtSignin}>Already have an Account? <Text style={[styles.signinTxt, { color: '#FFF' }]}>SignIn</Text></Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  hederContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logintxt: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginHorizontal: 20
  },
  logo: {
    marginTop: 30,
    width: 100,
    height: 100,
    resizeMode: "center",
    borderRadius: 50,
  },
  txtbox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    overflow: 'hidden',
    marginVertical: 5
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
  headertxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: "600",
    paddingVertical: 20,
  },
  txtSignin: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular'
  },
  forgettxt: {
    color: 'white',
    textAlign: 'right',
    marginVertical: 10
  },
  signContainer: {
    backgroundColor: 'white',
    paddingVertical: 17,
    borderRadius: 50
  },
  signinTxt: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#020cab'
  }
})

