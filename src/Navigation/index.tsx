import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "./ROUTES";
import ProfileEdit from "../Screen/ProfileEdit";
import Profile from "../Screen/Profile";
import FriendList from "../Screen/FriendList";

const Stack = createNativeStackNavigator()

function RootNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{
				headerStyle: {
					backgroundColor: '#fff',
				}
			}}>
				<Stack.Screen
					name={ROUTES.PROFILE}
					component={Profile}
				/>
				<Stack.Screen name={ROUTES.PROFILE_EDIT} component={ProfileEdit} />
				<Stack.Screen name={ROUTES.FRIEND_LIST} component={FriendList} options={{title: "Friends"}} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default RootNavigator