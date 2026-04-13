import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

// import màn hình
import HomeScreen from "./screens/HomeScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#53B175",
          tabBarInactiveTintColor: "#999",
        tabBarStyle: {
  height: 70,
  paddingBottom: 10,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},

          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            if (route.name === "Shop") {
              iconName = focused ? "storefront" : "storefront-outline";
            } else if (route.name === "Explore") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Cart") {
              iconName = focused ? "cart" : "cart-outline";
            } else if (route.name === "Favourite") {
              iconName = focused ? "heart" : "heart-outline";
            } else if (route.name === "Account") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={22} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Shop" component={HomeScreen} />
        <Tab.Screen name="Explore" component={HomeScreen} />
        <Tab.Screen name="Cart" component={HomeScreen} />
        <Tab.Screen name="Favourite" component={HomeScreen} />
        <Tab.Screen name="Account" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}