import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button, Text } from 'native-base';

export class Home extends React.Component {
  render() {
    console.log(this.props.user);
    console.log('mood reader', this.props.mood);
    return this.props.mood === '' ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello {this.props.user.name}!</Text>
        <Text>Hope you are having a swell day!</Text>
        <Button onPress={() => this.props.navigation.navigate('MoodCamera')}>
          <Text>Check your Mood</Text>
        </Button>
      </View>
    ) : this.props.mood === 'Happy' ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Woooo! Seems like you are doing well today!</Text>
        <Image
          style={{ width: 250, height: 250, marginTop: 10, marginBottom: 10 }}
          source={{
            uri:
              'https://www.meme-arsenal.com/memes/20eebae78ecaa88b62bf9e5d2362f3cb.jpg',
          }}
        />
      </View>
    ) : (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 25, textAlign: 'center' }}>
          Cheer up bud! Here's something to brighten your day.
        </Text>
        <Image
          style={{ width: 250, height: 250, marginBottom: 10, marginTop: 10 }}
          source={{
            uri:
              'https://i.pinimg.com/originals/31/07/fb/3107fb463ad91bd107f3ae12c4b0e304.jpg',
          }}
        />
        <Text>
          {' '}
          "It does not matter how slowly you go as long as you do not stop"{' '}
        </Text>
        <Text>-Confucius</Text>
      </View>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user,
    mood: state.mood,
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    setUser: user => dispatch(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
