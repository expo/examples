import React, { Component } from 'react';
import { CalendarList } from 'react-native-calendars';

export default class CalendarsList extends Component {
  render() {
    return (
      <CalendarList
        current="2012-05-16"
        futureScrollRange={24}
        pastScrollRange={24}
      />
    );
  }
}
