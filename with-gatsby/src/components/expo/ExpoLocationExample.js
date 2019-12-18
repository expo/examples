import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'

import Example from '../example'
import JSONView from '../JSONView'

export default function ExpoLocationExample() {
  const [item, setItem] = useState(null)

  return (
    <Example title="expo-location" style={{ justifyContent: 'space-around' }}>
      <Button
        title="Get Location"
        onPress={async () => {
          try {
            setItem(await Location.getCurrentPositionAsync())
          } catch ({ message }) {
            alert('Something went wrong: ' + message)
          }
        }}
      />
      {item && <JSONView json={item} />}
    </Example>
  )
}
