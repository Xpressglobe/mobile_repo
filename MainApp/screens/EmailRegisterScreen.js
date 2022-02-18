import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from '../common/icons';
import Constant from "../components/Constant";

export default class EmailRegisterScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      spinner: false,
      email:''
    }
} 

  onPressSignIn = () => {
    this.props.navigation.navigate("LoginScreen");
  }

  onPressVerification = async() => {

    if(this.state.email==0){
      Alert.alert("Please enter your Email Address.");
      return false
    }

    this.setState({ spinner: true });
    const { email } = this.state;
    const url = new URL(
      Constant.URL+Constant.SENDCODE
  );
  
  const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
  };
  
  let body = {
      "email": this.state.email
  };
  
   fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
  }).then(response => response.json())
  .then((result) => {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    console.log(result);
this.props.navigation.navigate("VerificationScreen");
this.setState({
  spinner: false
});
});


   
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
         <Spinner
          visible={this.state.spinner}
          overlayColor={'rgba(0, 0, 0, 0.5)'}
        />
        <LinearGradient colors={['#fc0f84', '#020cab']}
          start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={{ flex: 1 }}>
          <ScrollView>

            <View style={styles.hederContainer}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <View style={{paddingVertical:20,paddingLeft:15}}>
                  <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                </View>
              </TouchableOpacity>
              <Text style={styles.logintxt}>Register</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Image style={styles.logo} source={require("./../assets/img/logo.png")} />
            </View>

            <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 50 }}>

            
              <View style={styles.txtbox}>
                <View style={styles.iconSty}>
                  <Icon family="AntDesign" name="mail" size={22} color="white" />
                </View>
                <TextInput
                  style={styles.txtInputSty}
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor="white"
                  onChangeText={(email)=>this.setState({email})}
                  value={this.state.email}
                />
              </View>
             
              <TouchableOpacity style={{ marginHorizontal: 5, paddingVertical: 20, marginTop: 10 }} onPress={this.onPressVerification}>
                <View style={styles.signContainer}>
                  <Text style={styles.signinTxt}>SEND VERIFICATION CODE</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginHorizontal: 60 }} onPress={this.onPressSignIn}>
                <Text style={styles.txtSignin}>Already have an Account? <Text style={[styles.signinTxt, { color: '#FFF' }]}>Sign In</Text></Text>
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
    marginVertical: 10,
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

