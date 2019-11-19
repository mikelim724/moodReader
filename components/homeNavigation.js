import {createBottomTabNavigator} from 'react-navigation-tabs'
import Home from './home'
import MoodCamera from './moodCamera'
import Profile from './profile'

export const HomeNavigation = createBottomTabNavigator({
  Home: {
    screen: Home,
  },
  MoodCamera: {
    screen: MoodCamera,
  },
  Profile: {
    screen: Profile,
  }
})