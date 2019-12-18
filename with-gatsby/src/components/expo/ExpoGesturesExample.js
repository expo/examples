import React, { Component } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

import Example from '../example'

const USE_NATIVE_DRIVER = false

const START_X = 0
const START_Y = 0

class Tracking extends Component {
  constructor(props) {
    super(props)

    this.state = { width: 0, height: 0 }

    const tension = 0.8
    const friction = 3

    this._dragX = new Animated.Value(START_X)
    this._transX = new Animated.Value(START_X)
    this._follow1x = new Animated.Value(START_X)
    this._follow2x = new Animated.Value(START_X)
    Animated.spring(this._transX, {
      toValue: this._dragX,
      tension,
      friction,
    }).start()
    Animated.spring(this._follow1x, {
      toValue: this._transX,
      tension,
      friction,
    }).start()
    Animated.spring(this._follow2x, {
      toValue: this._follow1x,
      tension,
      friction,
    }).start()

    this._dragY = new Animated.Value(START_Y)
    this._transY = new Animated.Value(START_Y)
    this._follow1y = new Animated.Value(START_Y)
    this._follow2y = new Animated.Value(START_Y)
    Animated.spring(this._transY, {
      toValue: this._dragY,
      tension,
      friction,
    }).start()
    Animated.spring(this._follow1y, {
      toValue: this._transY,
      tension,
      friction,
    }).start()
    Animated.spring(this._follow2y, {
      toValue: this._follow1y,
      tension,
      friction,
    }).start()

    this._onGestureEvent = Animated.event(
      [
        {
          nativeEvent: { translationX: this._dragX, translationY: this._dragY },
        },
      ],
      { useNativeDriver: USE_NATIVE_DRIVER }
    )

    this._lastOffset = { x: START_X, y: START_Y }
  }
  _onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { height, width } = this.state

      const posX = this._lastOffset.x + event.nativeEvent.translationX
      const posY = this._lastOffset.y + event.nativeEvent.translationY

      const distFromTop = posY
      const distFromBottom = height - posY - BOX_SIZE
      const distFromLeft = posX
      const distFromRight = width - posX - BOX_SIZE

      this._lastOffset = { x: posX, y: posY }

      this._dragX.flattenOffset()
      this._dragY.flattenOffset()

      const minDist = Math.min(
        distFromTop,
        distFromBottom,
        distFromLeft,
        distFromRight
      )
      if (distFromTop === minDist) {
        this._dragY.setValue(-BOX_SIZE / 4)
        this._lastOffset.y = -BOX_SIZE / 4
      } else if (distFromBottom === minDist) {
        this._dragY.setValue(height - BOX_SIZE / 2)
        this._lastOffset.y = height - BOX_SIZE / 2
      } else if (distFromLeft === minDist) {
        this._dragX.setValue(-BOX_SIZE / 2)
        this._lastOffset.x = -BOX_SIZE / 2
      } else if (distFromRight === minDist) {
        this._dragX.setValue(width - BOX_SIZE / 2)
        this._lastOffset.x = width - BOX_SIZE / 2
      }

      this._dragX.extractOffset()
      this._dragY.extractOffset()
    }
  }
  _onLayout = ({ nativeEvent }) => {
    const { width, height } = nativeEvent.layout
    this.setState({ width, height })
  }
  render() {
    return (
      <View style={{ flex: 1, minHeight: 300 }} onLayout={this._onLayout}>
        <Animated.Image
          style={[
            styles.box,
            { marginLeft: 10, marginTop: 10 },
            {
              transform: [
                { translateX: this._follow2x },
                { translateY: this._follow2y },
              ],
            },
          ]}
          source={{
            uri: 'https://avatars0.githubusercontent.com/u/379606?v=4&s=460',
          }}
        />
        <Animated.Image
          style={[
            styles.box,
            { marginLeft: 5, marginTop: 5 },
            {
              transform: [
                { translateX: this._follow1x },
                { translateY: this._follow1y },
              ],
            },
          ]}
          source={{
            uri: 'https://avatars3.githubusercontent.com/u/726445?v=4&s=460',
          }}
        />

        <PanGestureHandler
          minDist={10}
          onGestureEvent={this._onGestureEvent}
          onHandlerStateChange={this._onHandlerStateChange}
        >
          <Animated.Image
            style={[
              styles.box,
              {
                transform: [
                  { translateX: this._transX },
                  { translateY: this._transY },
                ],
              },
            ]}
            source={{
              uri: 'https://avatars3.githubusercontent.com/u/9664363?s=460&v=4',
            }}
          />
        </PanGestureHandler>
      </View>
    )
  }
}

export default function ExpoGesturesExample() {
  return (
    <Example title="react-native-gesture-handler">
      <Tracking />
    </Example>
  )
}

const BOX_SIZE = 80

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    position: 'absolute',
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderColor: '#F5FCFF',
    backgroundColor: 'plum',
    borderRadius: BOX_SIZE / 2,
  },
})
