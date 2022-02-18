import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../common/icons';

export default class NoNetworkScreen extends Component {
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

         

            <View style={{ alignItems: 'center' }}>
              <Image style={styles.logo} source={require("./../assets/img/no_internet.png")} />
            </View>

            <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 30 }}>
           
              <TouchableOpacity style={{ marginHorizontal: 60 }} >
                <Text style={styles.txtSignin}>No internet connection, please check your connection and try again</Text>
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
  logo: {
    marginTop: 30,
    width: 300,
    height: 300,
    resizeMode: "center",
    borderRadius: 50,
  },
  txtSignin: {
    fontSize: 12,
    marginVertical: 10,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular'
  },
  
})

