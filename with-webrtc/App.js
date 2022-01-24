import { useState } from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { mediaDevices, RTCView } from 'react-native-webrtc';

function App() {
  const [stream, setStream] = useState(null);

  const start = async () => {
    console.log('start');
    if (!stream) {
      let s;
      try {
        s = await mediaDevices.getUserMedia({ video: true });
        setStream(s);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const stop = () => {
    console.log('stop');
    if (stream) {
      stream.release();
      setStream(null);
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <StatusBar barStyle="dark-content" />
      {
        stream &&
        <RTCView
          streamURL={stream.toURL()}
          style={{ flex: 1 }} />
      }
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0
        }}>
        <Button
          title="Start"
          onPress={start} />
        <Button
          title="Stop"
          onPress={stop} />
      </View>
    </SafeAreaView>
  );
};

export default App;