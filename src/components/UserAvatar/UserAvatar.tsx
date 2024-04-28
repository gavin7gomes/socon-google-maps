import React from 'react';
import {TouchableOpacity} from 'react-native';
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

interface MarkerProps {
  user: User;
  onPress: () => void;
  width?: number;
  height?: number;
}

const UserAvatar = ({user, onPress, width = 40, height = 40}: MarkerProps) => {
  return (
    <TouchableOpacity key={user.id} onPress={onPress}>
      <FastImage
        source={{uri: user.pfp}}
        style={{width: width, height: height}}
      />
    </TouchableOpacity>
  );
};

export default UserAvatar;
