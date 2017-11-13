import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { Constants } from 'expo';
import { StackNavigator } from 'react-navigation';

import MenuScreen from './screens/menu';
import CalendarsScreen from './screens/calendars';
import AgendaScreen from './screens/agenda';
import CalendarsListScreen from './screens/calendarsList';

const NavigationStack = StackNavigator(
  {
    menu: {
      screen: MenuScreen,
      navigationOptions: {
        title: 'WixCal',
      },
    },
    calendars: {
      screen: CalendarsScreen,
      navigationOptions: {
        title: 'Calendars',
      },
    },
    calendarsList: {
      screen: CalendarsListScreen,
      navigationOptions: {
        title: 'Calendars List',
      },
    },
    agenda: {
      screen: AgendaScreen,
      navigationOptions: {
        title: 'Agenda',
      },
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#00adf5',
      },
      headerTintColor: '#ffffff',
    },
  }
);

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
            backgroundColor: '#00adf5',
          }}
        />
        <NavigationStack />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}
