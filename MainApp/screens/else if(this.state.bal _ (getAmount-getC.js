else if(this.state.bal < (getAmount-getCharges ) * getRate ){
          
    Alert.alert("Insufficient Credit ");
}

<View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 15 }}>
                    <Text >Rate</Text>
                        <TextInputMask style={{ paddingLeft: 10, fontSize: 16 }}
                            type={'money'}
                            placeholder="Enter Rate"
                            options={{
                                precision: 4,
                                separator: '.',
                                delimiter: ',',
                                unit: '',
                                suffixUnit: ''
                            }}
                            value={this.state.rate}
                            onChangeText={text => {
                            this.setState({
                                rate: text
                            })
                            }}
                            ref={(ref) => this.rateV = ref}
                        />
                    </View>