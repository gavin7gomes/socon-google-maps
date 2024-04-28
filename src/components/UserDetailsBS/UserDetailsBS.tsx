import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

interface User {
  id: number;
  name: string;
  pfp: string;
  location: {
    lat: number;
    long: number;
    city: string;
  };
}

interface UserData {
  user: User | null;
}

const UserDetailsBS = ({user}: UserData) => {
  if (!user) return;
  return (
    <View
      style={{
        height: 150,
        backgroundColor: 'white',
        width: '100%',
        paddingHorizontal: 20,
      }}>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: 120,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: 20,
          }}>
          <FastImage source={{uri: user.pfp}} style={{width: 60, height: 60}} />
          <Text style={styles.textStyle}>{user.name}</Text>
        </View>
        <View>
          <Text style={styles.textStyle}>City: {user.location.city}</Text>
          <Text style={styles.textStyle}>Latitude: {user.location.lat}</Text>
          <Text style={styles.textStyle}>Longitude: {user.location.long}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: 'black',
    fontSize: 14,
  },
});

export default UserDetailsBS;
