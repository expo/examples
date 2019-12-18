import * as Permissions from 'expo-permissions'
import React, { useEffect, useState } from 'react'
import { Button, ScrollView, Text, View } from 'react-native'

import Example from '../example'

const permissions = [
  ['CAMERA', Permissions.CAMERA],
  ['AUDIO_RECORDING', Permissions.AUDIO_RECORDING],
  ['LOCATION', Permissions.LOCATION],
  ['USER_FACING_NOTIFICATIONS', Permissions.USER_FACING_NOTIFICATIONS],
  ['NOTIFICATIONS', Permissions.NOTIFICATIONS],
  ['CONTACTS', Permissions.CONTACTS],
  ['SYSTEM_BRIGHTNESS', Permissions.SYSTEM_BRIGHTNESS],
  ['CAMERA_ROLL', Permissions.CAMERA_ROLL],
  ['CALENDAR', Permissions.CALENDAR],
  ['REMINDERS', Permissions.REMINDERS],
]

export default function PermissionsExample() {
  return (
    <Example title="expo-permissions">
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'stretch', flex: 1 }}
      >
        {permissions.map(([permissionName, permissionType]) => (
          <View
            key={`${permissionName}-${permissionType}`}
            style={{ marginBottom: 12 }}
          >
            <Text style={{ marginBottom: 8 }}>{permissionName}</Text>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-around',
              }}
            >
              <Button
                style={{ marginVertical: 4 }}
                key={`Button-${permissionName}-${permissionType}`}
                onPress={async () => {
                  alert((await Permissions.getAsync(permissionType)).status)
                }}
                title={`Get Status`}
              />
              <Button
                style={{ marginVertical: 4 }}
                key={permissionType}
                onPress={async () => {
                  alert((await Permissions.askAsync(permissionType)).status)
                }}
                title={`Request`}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </Example>
  )
}
