import React from 'react';
import {
  addDecorator,
  configure,
  getStorybookUI
} from '@storybook/react-native';
import { View } from 'react-native';

// Since require.context doesn't exist in metro bundler world, we have to
// manually import files ending in *.stories.js
const getStories = () => require('../stories');

// Lazy margin at top for notches etc
addDecorator(StoryFn => (
  <View style={{ marginTop: 40, marginHorizontal: 10 }}>
    <StoryFn />
  </View>
));

configure(() => {
  getStories();
}, module);

export const OnDeviceStorybookUI = getStorybookUI();
