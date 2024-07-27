import { Tabs } from "expo-router";
import { Title } from "react-native-paper";
import { Entypo } from '@expo/vector-icons';



const RootLayout=()=>{
    return(
        <Tabs>
<Tabs.Screen name="index" options={{headerShown:false,title:'Home', tabBarIcon:({color})=><Entypo name="home" size={24} color={color} />}}></Tabs.Screen>
<Tabs.Screen name="cart" options={{headerShown:false,title:'Cart', tabBarIcon:({color})=><Entypo name="shopping-cart" size={24} color={color} />}}></Tabs.Screen>
<Tabs.Screen name="profile" options={{headerShown:false,title:'Profile', tabBarIcon:({color})=><Entypo name="user" size={24} color={color} />}}></Tabs.Screen>

        </Tabs>
    )
}


export default RootLayout