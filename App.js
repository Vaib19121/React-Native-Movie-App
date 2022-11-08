import { TailwindProvider } from "tailwindcss-react-native";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import {MovieDeatil, ListingScreen } from "./screens";
import { AuthProvider } from "./hooks/useAuth";
import TabNavigator from "./navigation/tabnavigator";
import Login from "./screens/Login/Login";
import Signup from "./screens/SignUp/Signup";

const Stack = createStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer theme={DarkTheme} className="bg-black flex-1">
        <AuthProvider>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen name="Listing" component={ListingScreen} />
            <Stack.Group>
              <Stack.Screen
                screenOptions={{
                  animation: "slide_from_right",
                }}
                name="MovieDeatil"
                component={MovieDeatil}
              />
            </Stack.Group>
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </TailwindProvider>
  );
}
