import React from 'react';
import { action } from '@storybook/addon-actions';
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
