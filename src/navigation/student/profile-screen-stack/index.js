import { createStackNavigator } from "@react-navigation/stack"
import ProfileScreen from "../../../screens/student/profile"
import CourseDetailScreen from "../../../screens/student/course-detail"
import VideoPage from "../../../screens/student/video-page"
import EditProfile from "../../../screens/student/edit-profile"

const Stack = createStackNavigator()

export default function ProfileScreenStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Profile'>
      <Stack.Screen name='Profile' component={ProfileScreen}/>
      <Stack.Screen name='CourseDetail' component={CourseDetailScreen} options={{ tabBarStyle: { display: 'none' } }}/>
      <Stack.Screen name='VideoPage' component={VideoPage} options={{ tabBarStyle: { display: 'none' } }}/>
      <Stack.Screen name='EditProfile' component={EditProfile}/>
    </Stack.Navigator>
  )
}