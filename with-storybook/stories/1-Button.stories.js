import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from 'react-native';

export default {
  title: 'Button',
};

export const text = () => (
  <Button title="Hello Button" onPress={action('clicked')} />
);
