import React from 'react';
import { Stack, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


const Layout = () => {
  return (
    // <Tabs
    //   screenOptions={({ route }) => ({
    //     tabBarIcon: ({ focused }) => {
    //       const icons = {
    //         index: ['home-outline', 'home'],
    //         Login: ['log-in-outline', 'log-in'],
    //         Register: ['person-add-outline', 'person-add'],
    //       };

    //       const iconName = focused ? icons[route.name][1] : icons[route.name][0];
    //       const size = focused ? 25 : 20;
    //       const color = focused ? 'gold' : 'grey';

    //       return <Ionicons name={iconName} size={size} color={color} />;
    //     },
    //     tabBarStyle: {
    //       position: 'absolute',
    //       bottom: '3%',
    //       left: '5%',
    //       width: '90%',
    //       padding: 10,
    //       height: '10%',
    //       borderRadius: 30,
    //       overflow: 'hidden',
    //       backgroundColor: '#ffffff',
    //     },
    //     tabBarLabelStyle: {
    //       fontSize: 15,
    //       color: 'grey',
    //       marginBottom: '10%',
    //     },
    //     headerStyle: {
    //       backgroundColor: 'gold',
    //     },
    //     headerTitleAlign: 'center',
    //   })}
    // >
      
    //   <Tabs.Screen name="index" options={{ title: '', }} />
    //   <Tabs.Screen name="Login" options={{ title: 'Login' }} />
    //   <Tabs.Screen name="Register" options={{ title: 'Register' }} />
    // </Tabs>

    <Stack>
      <Stack.Screen name='index' options={{headerShown:false,title:"welcome"}}></Stack.Screen>
       {/* <Stack.Screen name='Login' options={{headerShown:true,title:"welcome"}}></Stack.Screen>  */}
       {/* <Stack.Screen name='Register' options={{headerShown:true,title:"welcome"}}></Stack.Screen>  */}

    </Stack>
  );
};

export default Layout;
