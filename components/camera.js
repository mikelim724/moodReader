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

// export default class CameraView extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       identifiedAs: '',
//       loading: false,
//       hasCameraPermission: null,
//       type: Camera.Constants.Type.back,
//     };
//   }

//   async componentDidMount() {
//     const {status} = await Permissions.askAsync(Permissions.CAMERA)
//     this.setState({hasCameraPermission: status === 'granted'});
//   }

//   // takepicture = async function() {
//   //   //Pause camera view
//   //   this.camera.pausePreview();
//   //   //Indicate to user that a picture is being taken
//   //   this.setState({loading: true});
//   //   //Get picture data in base 64
//   //   const data = await this.camera.takePictureAsync({base64: true});
//   // };

//   displayAnswer = function() {
//     Alert.alert('you clicked me', '', { cancelable: false });
//   };

//   render() {
//     if (this.hasCameraPermission === null) {
//       return <View />;
//     } else if (this.hasCameraPermission === false) {
//       return <Text>No access to camera</Text>;
//     } else {
//       // <RNCamera
//       //   ref={ref => {
//       //     this.camera = ref;
//       //   }}
//       //   style={styles.preview}
//       // >
//       //   <ActivityIndicator
//       //     size="large"
//       //     style={styles.loadingIndicator}
//       //     color="#fff"
//       //     animating={this.state.loading}
//       //   />
//       //   <CaptureButton
//       //     buttonDisabled={this.state.loading}
//       //     onClick={this.displayAnswer}
//       //   />
//       // </RNCamera>;
//       return(
//       <View style={{ flex: 1 }}>
//           <Camera style={{ flex: 1 }} type={this.state.type}>
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: 'transparent',
//                 flexDirection: 'row',
//               }}>
//               <TouchableOpacity
//                 style={{
//                   flex: 0.1,
//                   alignSelf: 'flex-end',
//                   alignItems: 'center',
//                 }}
//                 onPress={() => {
//                   this.setState({
//                     type:
//                       this.state.type === Camera.Constants.Type.back
//                         ? Camera.Constants.Type.front
//                         : Camera.Constants.Type.back,
//                   });
//                 }}>
//                 <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
//               </TouchableOpacity>
//             </View>
//           </Camera>
//         </View>
//       )
//     }
//   }
// }

export default class CameraExample extends React.Component {
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
    const app = new Clarifai.App({apiKey: '317c443b65d542de9d5d0005dd9ef1a3'})
    const response = await app.models.predict(Clarifai.DEMOGRAPHICS_MODEL, {base64: data.base64})
    console.log(response.outputs[0].data.regions[0].data.face)
    const age = response.outputs[0].data.regions[0].data.face.age_appearance.concepts[0].name
    const gender = response.outputs[0].data.regions[0].data.face.gender_appearance.concepts[0].name
    const ethnicity = response.outputs[0].data.regions[0].data.face.multicultural_appearance.concepts[0].name
    console.log(age, gender, ethnicity)
    Alert.alert(`Are you a ${age} year old ${ethnicity} ${gender==='feminine'? 'female': 'male'}?`)
    // const response = await app.models.predict('kpop star', {base64: data.base64})
    // const response2 = await app.models.predict('Mood', {base64: data.base64})
    // console.log(response, response2)
    console.log('done loading')
    this.setState({loading: false})
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
