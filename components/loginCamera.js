import React from 'react';
import {
  Dimensions,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import CaptureButton from './captureButton';
import ToolBar from './toolBar';
import Clarifai from 'clarifai';
import {connect} from 'react-redux'
import {setUser} from './redux/user'

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export  class LoginCamera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      captures: [],
      capturing: null,
      // setting flash to be turned off by default
      flashMode: Camera.Constants.FlashMode.off,
      // start the back camera by default
      cameraType: Camera.Constants.Type.back,
      loading: false,
    };
    this.setFlashMode = this.setFlashMode.bind(this);
    this.setCameraType = this.setCameraType.bind(this);
    this.handleShortCapture = this.handleShortCapture.bind(this);
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  setFlashMode(flashMode) {
    this.setState({
      flashMode,
    });
  }
  setCameraType(cameraType) {
    this.setState({
      cameraType,
    });
  }
  handleCaptureIn() {
    this.setState({capturing: true})
  }
  handleCaptureOut() {
    if(this.state.capturing) {Camera.stopRecording()}
  }
  handle() {
    Alert.alert('you clicked me','', {cancelable: false})
  }
  handleShortCapture = async () => {
    this.setState({loading: true})
    const data = await this.camera.takePictureAsync({base64: true});
    this.setState({capturing: false, captures: [data, ...this.state.captures]})
    this.camera.pausePreview()
    const app = new Clarifai.App({apiKey: '317c443b65d542de9d5d0005dd9ef1a3'})
    const response = await app.models.predict('kpop star', {base64: data.base64})
    // console.log(response.outputs[0].data.concepts[0].name)
    this.props.setUser({name:response.outputs[0].data.concepts[0].name})
    this.setState({loading: false})
    this.camera.resumePreview()
    this.props.navigation.navigate('Home')
  }
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={styles.preview} type={this.state.cameraType} flashMode={this.state.flashMode} ref={camera => this.camera = camera}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <ActivityIndicator
                size="large"
                style={styles.loadingIndicator}
                color="#fff"
                animating={this.state.loading}
              />
              <ToolBar
                capturing={this.state.capturing}
                flashMode={this.state.flashMode}
                setFlashMode={this.setFlashMode}
                cameraType={this.state.cameraType}
                setCameraType={this.setCameraType}
                handleShortCapture={this.handleShortCapture}
                loading={this.state.loading}
              />
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    setUser: (user) => dispatch(setUser(user))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginCamera)