import { Camera } from 'expo-camera'
import React, { useEffect, useState } from 'react'

import Example from '../example'

export default function ExpoCameraExample() {
  return (
    <Example title="expo-camera">
      <Camera
        style={[{ alignItems: 'center', borderRadius: 5, minHeight: 300 }]}
      />
    </Example>
  )
}
