import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default {
  title: 'LinearGradient',
};

export const linearGradient = () => (
  <LinearGradient
    style={{ flex: 1, height: 200 }}
    colors={['red', 'blue', 'yellow']}
  />
);

// On-Device Register
storiesOf('LinearGradient', module).add('Linear Gradient', linearGradient);
