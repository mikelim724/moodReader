import React from 'react'
import {View, Image} from 'react-native'
import { Button, Text } from 'native-base';


export default class Login extends React.Component {
  render() {
    return(
      <View style={{flex:1, alignItems:"center", justifyContent:'center'}}>
        <Button primary={true} onPress={()=>this.props.navigation.navigate('LoginCamera')}>
          <Text>Login</Text>
        </Button>
      </View>
    )
  }
}