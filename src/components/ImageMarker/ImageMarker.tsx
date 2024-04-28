import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Marker} from 'react-native-maps';

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

interface MarkerProps {
  user: User;
  onPress: () => void;
  userInView: boolean;
}

const ImageMarker = ({user, onPress, userInView = false}: MarkerProps) => {
  return (
    <Marker
      key={user.id}
      coordinate={{
        latitude: user.location.lat,
        longitude: user.location.long,
      }}
      title={user.name}
      description={user.location.city}
      onPress={onPress}>
      <FastImage
        source={{uri: user.pfp}}
        style={{
          ...styles.markerImg,
          borderWidth: userInView ? 2 : 0,
        }}
      />
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerImg: {
    width: 40,
    height: 40,
    borderColor: 'red',
    borderRadius: 20,
  },
});

export default ImageMarker;
