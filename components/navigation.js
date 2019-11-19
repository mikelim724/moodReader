import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Login from './login'
import LoginCamera from './loginCamera'
import Camera from './camera'
import {HomeNavigation} from './homeNavigation'
import ProfileCamera from './profileCamera'

const LoginNavigation = createSwitchNavigator({
  Login: {
    screen: Login,
  },
  LoginCamera: {
    screen: LoginCamera,
  },
  Home:{
    screen: HomeNavigation,
  },
  ProfileCamera:{
    screen: ProfileCamera,
  }
})

export default createAppContainer(LoginNavigation)