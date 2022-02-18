import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions, Switch, Alert, TouchableHighlight, StatusBar } from 'react-native';
import ThemeStyle from '../styles/Theme';
import Icon from '../common/icons';
import { CreditCardInput } from 'react-native-credit-card-input';
import { NavigationActions } from 'react-navigation';

const { width, height } = Dimensions.get('window');

export default class CreditCardScene extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onPressSubmitButton = () => {
    Alert.alert("Payment Processing.......");
  }

  render() {
    return (
      <View style={[ThemeStyle.bgcolor, { backgroundColor: '#fff' }]}>
        <StatusBar backgroundColor="#020cab" barStyle="light-content" />
        <View style={styles.logContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.logintxt}>Card Payment</Text>
        </View>
        <ScrollView style={{ marginTop: 50 }}>
          < CreditCardInput
            autoFocus
            requiresName
            requiresCVC
            labelStyle={styles.label}
            inputStyle={styles.input}
            validColor={"#000"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}
          />
        </ScrollView>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.onPressSubmitButton()}>
            <View style={styles.submit}>
              <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: "#000",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "#000",
  },
  submit: {
    height: 50,
    width: width - 30,
    backgroundColor: '#020cab',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    margin: 10
  },
  logContainer: {
    padding: 15,
    backgroundColor: '#020cab',
    flexDirection: 'row',
    alignItems: 'center'
  },
  logintxt: {
    color: '#FFf',
    fontSize: 17,
    fontWeight: '600',
    marginHorizontal: 20
  },
});
