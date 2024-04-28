import React from 'react';
import {Alert} from 'react-native'; // Assuming APP_CONSTANTS is imported elsewhere

export const CreateOneButtonAlert = (title: string, msg: string) =>
  Alert.alert(title, msg, [
    {
      text: 'OK',
    },
  ]);
