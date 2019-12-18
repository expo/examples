import * as Battery from 'expo-battery'
import * as React from 'react'
import { ScrollView, Text } from 'react-native'

import Example from '../example'

export default function ExpoBatteryExample() {
  if (!Battery.isSupported) {
    return <Text>Battery API is not supported on this device</Text>
  }
  return (
    <Example title="expo-battery">
      <BatteryExample />
    </Example>
  )
}

function BatteryExample() {
  const [batteryLevel, setBatteryLevel] = React.useState(-1)
  const [batteryState, setBatteryState] = React.useState(
    Battery.BatteryState.UNKNOWN
  )
  const [lowPowerMode, setLowPowerMode] = React.useState(false)

  async function getInitialBatteryStateAsync() {
    const [batteryLevel, batteryState, lowPowerMode] = await Promise.all([
      Battery.getBatteryLevelAsync(),
      Battery.getBatteryStateAsync(),
      Battery.isLowPowerModeEnabledAsync(),
    ])

    setBatteryLevel(batteryLevel)
    setBatteryState(batteryState)
    setLowPowerMode(lowPowerMode)
  }

  React.useEffect(() => {
    getInitialBatteryStateAsync()

    const batteryLevelListener = Battery.addBatteryLevelListener(
      ({ batteryLevel }) => setBatteryLevel(batteryLevel)
    )
    const batteryStateListener = Battery.addBatteryStateListener(
      ({ batteryState }) => setBatteryState(batteryState)
    )
    const lowPowerModeListener = Battery.addLowPowerModeListener(
      ({ lowPowerMode }) => setLowPowerMode(lowPowerMode)
    )
    return () => {
      batteryLevelListener && batteryLevelListener.remove()
      batteryStateListener && batteryStateListener.remove()
      lowPowerModeListener && lowPowerModeListener.remove()
    }
  }, [])

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text>
        {JSON.stringify(
          {
            batteryLevel,
            batteryState: getBatteryStateString(batteryState),
            lowPowerMode,
          },
          null,
          2
        )}
      </Text>
    </ScrollView>
  )
}

function getBatteryStateString(batteryState) {
  switch (batteryState) {
    case Battery.BatteryState.UNPLUGGED:
      return 'UNPLUGGED'
    case Battery.BatteryState.CHARGING:
      return 'CHARGING'
    case Battery.BatteryState.FULL:
      return 'FULL'
    case Battery.BatteryState.UNKNOWN:
    default:
      return 'UNKNOWN'
  }
}
