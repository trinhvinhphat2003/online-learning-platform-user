import { createStackNavigator } from "@react-navigation/stack"
import ProfileScreen from "../../../screens/student/profile"
import CourseDetailScreen from "../../../screens/student/course-detail"
import VideoPage from "../../../screens/student/video-page"
import CourseScreen from "../../../screens/student/course"

const Stack = createStackNavigator()

export default function CourseScreenStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Course'>
      <Stack.Screen name='Course' component={CourseScreen}/>
      <Stack.Screen name='CourseDetail' component={CourseDetailScreen} options={{ tabBarStyle: { display: 'none' } }}/>
      <Stack.Screen name='VideoPage' component={VideoPage} options={{ tabBarStyle: { display: 'none' } }}/>
    </Stack.Navigator>
  )
}