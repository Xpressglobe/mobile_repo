import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, KeyboardAvoidingView, Dimensions } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from '../common/icons';
import Constant from "../components/Constant";



export default class VerificationScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      spinner: false,
      verification:'',
      email: '',
    }
} 

  onPressSignIn = () => {
    this.props.navigation.navigate("LoginScreen");
  }

  onPressVerification  = async() => { 

    if(this.state.email==""){
      Alert.alert("Please enter your email  address.");
      return false
    }

    if(this.state.verification.length!=4){
      Alert.alert("Please enter verification code sent to your mail.");
      return false
    }

    this.setState({ spinner: true });
    const { verification } = this.state;

    const url = new URL(
      Constant.URL+Constant.VERIFYCODE
  );
  
  const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
  };
  
  let body = {
      "email": this.state.email,
      "verification_code": this.state.verification
  };
  
   fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
  }).then(response => response.json())
  .then((result) => {
    console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
    console.log(result);
    if(result.message != "Email verified"){
      Alert.alert(result.message);
    }else{
      Alert.alert(result.message);
      this.props.navigation.navigate("RegisterScreen");
    }

this.setState({
  spinner: false
});
});



    // this.props.navigation.navigate("RegisterScreen");
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
              <TouchableOpacity  onPress={this.onPressSignIn}>
                <View style={{paddingVertical:20,paddingLeft:15}}>
                  <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                </View>
              </TouchableOpacity>
              <Text style={styles.logintxt}>Verify Email Address</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Image style={styles.logo} source={require("./../assets/img/logo.png")} />
            </View>

            <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 50 }}>

            
            <KeyboardAvoidingView style={{ alignItems: 'center' }}>
              <Text style={styles.verification}>Please verify your email, Enter the PIN sent to your email.</Text>

             
            </KeyboardAvoidingView>
            <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}></View>
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

            <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}></View>

            <View style={styles.txtbox}>
                <View style={styles.iconSty}>
                  <Icon family="AntDesign" name="safety-certificate" size={22} color="white" />
                </View>
                <TextInput
                  style={styles.txtInputSty}
                  placeholder="Verification Code"
                  keyboardType="phone-pad"
                  maxLength={4}
                  placeholderTextColor="white"
                  onChangeText={(verification)=>this.setState({verification})}
                  value={this.state.verification}
                />
              </View>
              
             
              <TouchableOpacity style={{ marginHorizontal: 0, paddingVertical: 20, marginTop: 0 }} onPress={this.onPressVerification}>
                <View style={styles.signContainer}>
                  <Text style={styles.signupTxt}> VERIFY </Text>
                 
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </View >
    );
  }
}


const {width} = Dimensions.get('window')
const inputWidth = Math.round(width / 6);
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
  verification: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center',
    // marginHorizontal: 20
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
    width: inputWidth,
    height: inputWidth,
    borderWidth: 2,
    borderColor: '#020cab',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signinTxt: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#020cab',
    fontSize: 25

  },

  signContainer: {
    backgroundColor: 'white',
    paddingVertical: 17,
    borderRadius: 50
  },
  signupTxt: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#020cab'
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
  
  
})

