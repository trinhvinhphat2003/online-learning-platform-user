import React, { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import LoginScreen from './screens/common/login'
import StudentTabs from './navigation/student/student-tab'
import { createStackNavigator } from '@react-navigation/stack'
import CourseDetailScreen from './screens/student/course-detail'
import VideoPage from './screens/student/video-page'
import EditProfile from './screens/student/edit-profile'
import FeedbackScreen from './screens/student/feedback'
import TutorDetailScreen from './screens/student/tutor-detail'
import SignupScreen from './screens/common/signup'

const Stack = createStackNavigator()

export default function Index() {
    const { isLogin } = useContext(AuthContext)
    return (
        <>
            {isLogin === false ?
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
                    <Stack.Screen name='Login' component={LoginScreen} />
                    <Stack.Screen name='Signup' component={SignupScreen} />
                </Stack.Navigator> :
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
                    <Stack.Screen name='Home' component={StudentTabs} />
                    <Stack.Screen name='CourseDetail' component={CourseDetailScreen} />
                    <Stack.Screen name='VideoPage' component={VideoPage} />
                    <Stack.Screen name='EditProfile' component={EditProfile} />
                    <Stack.Screen name='FeedBack' component={FeedbackScreen} />
                    <Stack.Screen name='TutorDetail' component={TutorDetailScreen} />
                </Stack.Navigator>

            }
        </>
    )
}
