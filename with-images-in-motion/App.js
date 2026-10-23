import { useState } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { createImagesInMotionWebViewHtml } from 'images-in-motion'

const images = [
  'https://picsum.photos/800/1200?random=1',
  'https://picsum.photos/1200/800?random=2',
  'https://picsum.photos/800/800?random=3',
  'https://picsum.photos/1000/700?random=4',
  'https://picsum.photos/800/1000?random=5',
  'https://picsum.photos/700/1100?random=6',
  'https://picsum.photos/800/1200?random=7',
  'https://picsum.photos/1200/800?random=8',
]

const iimOptions = { images, speedRange: [8, 18], angle: 12 }

export default function App() {
  const [viewport, setViewport] = useState({ width: 0, height: 0 })
  const html = viewport.width > 0 && viewport.height > 0
    ? createImagesInMotionWebViewHtml(iimOptions, undefined, {
        width: '20rem',
        height: '20rem',
        viewportWidth: viewport.width,
        viewportHeight: viewport.height,
      })
    : ''

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout
        setViewport((current) => (
          current.width === width && current.height === height ? current : { width, height }
        ))
      }}
    >
      {html ? (
        <WebView
          originWhitelist={['*']}
          source={{ html }}
          style={{ flex: 1, backgroundColor: 'transparent' }}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={false}
          contentInsetAdjustmentBehavior="never"
        />
      ) : null}
    </View>
  )
}
