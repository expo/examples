import React from 'react';
import { action } from '@storybook/addon-actions';
import Constants from 'expo-constants';
import { Text } from 'react-native';

export default {
  title: 'Constants',
};

export const constants = () => (
  <Text>{JSON.stringify(Constants, null, 2)}</Text>
);
