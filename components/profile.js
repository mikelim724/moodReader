import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Text } from 'native-base';

export class Profile extends React.Component {
  render() {
    console.log(this.props.profile);
    return this.props.profile.age === undefined ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile information has not been filled out</Text>
        <Button onPress={() => this.props.navigation.navigate('ProfileCamera')}>
          <Text>Fill in information</Text>
        </Button>
      </View>
    ) : (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Name: {this.props.user.name}</Text>
        <Text>Age: {this.props.profile.age}</Text>
        <Text>Gender: {this.props.profile.gender}</Text>
        <Text>Ethnicity: {this.props.profile.ethnicity}</Text>
      </View>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, null)(Profile);
