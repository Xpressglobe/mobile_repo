import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../common/icons';

export default class StartScreen extends Component {
  onPressSignIn = () => {
    this.props.navigation.navigate("LoginScreen");
  }

  onPressSignUp = () => {
    this.props.navigation.navigate("RegisterScreen");
  }



  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient colors={['#fc0f84', '#020cab']}
          start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={{ flex: 1 }}>
          <ScrollView>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',paddingVertical:30 }}>
              <Image style={styles.logo} source={require("./../assets/img/logo.png")} />
            </View>

            <Text></Text>

            <View style={{ marginTop: 250 }}>
              <TouchableOpacity style={{ marginHorizontal: 40, marginVertical: 15 }} onPress={this.onPressSignIn}>
                <View style={styles.signContainer}>
                  <Text style={styles.signupTxt}>SIGN IN</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginHorizontal: 40, marginVertical: 15 }} >
                <View style={styles.signContainer}>
                  <Text style={styles.signupTxt}>SIGN UP</Text>
                </View>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </LinearGradient>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    resizeMode: "center",
    borderRadius: 50
  },
  signContainer: {
    backgroundColor: 'white',
    borderRadius: 10
  },
  signupTxt: {
    paddingVertical: 10,
    textAlign: 'center',
    fontWeight: '600',
    color: '#020cab'
  }
})

