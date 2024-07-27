import React from 'react';
import { Stack, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {QueryClientProvider} from '@tanstack/react-query'
import createQuery  from './Service/QueryClient'
import Context from './Service/context/context'





const Layout = () => {
  return (
  
 
<Context>
    <Stack>
      <Stack.Screen name='index' options={{headerShown:false,title:"welcome"}}></Stack.Screen>
 

    </Stack>
    </Context>

  );
};

export default Layout;
