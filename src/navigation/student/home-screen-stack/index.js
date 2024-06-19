import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View } from 'react-native'
import HomeScreen from '../../../screens/student/home'
import CourseDetailScreen from '../../../screens/student/course-detail'
import MoreCoinScreen from '../../../screens/student/more-coin'
import VideoPage from '../../../screens/student/video-page'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

const Stack = createStackNavigator()

export default function HomeScreenStack({ navigation, route }) {

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    if (routeName === 'CourseDetail' || routeName === 'VideoPage') {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
      <Stack.Screen name='Home' component={HomeScreen}/>
      <Stack.Screen name='CourseDetail' component={CourseDetailScreen}/>
      <Stack.Screen name='VideoPage' component={VideoPage}/>
      <Stack.Screen name='MoreCoin' component={MoreCoinScreen}/>
    </Stack.Navigator>
  )
}
