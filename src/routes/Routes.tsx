import React from 'react';
import Map from '../screens/Map';
import {createStackNavigator} from '@react-navigation/stack';

const Routes = function () {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={'Maps'}
      screenOptions={{
        headerShown: true,
        gestureEnabled: false,
      }}>
      <Stack.Screen name={'Maps'} component={Map} />
    </Stack.Navigator>
  );
};

export default Routes;
