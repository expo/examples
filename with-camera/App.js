import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [lastPhotoURI, setLastPhotoURI] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS == "web") { 
        setHasPermission(true);
        return; 
      }
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (lastPhotoURI !== null) {
    return (
      <ImageBackground 
        source={{uri: lastPhotoURI}}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
          justifyContent: "center"
        }}>
        <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: 'flex-end',
              alignItems: 'center',
              justifyContent: "center",
              backgroundColor: "#666",
              marginBottom: 40, 
              marginLeft: 20,
            }}
            onPress={() => {
              setLastPhotoURI(null);
            }}>
            <Text style={{ fontSize: 30, padding: 10, color: 'white' }}>❌</Text>
          </TouchableOpacity>
      </ImageBackground>
    );
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  let cameraRef;
  return (
    <View style={{ flex: 1 }}>
      <Camera 
        style={{ flex: 1 }}
        type={type}
        ref={ref => {
          cameraRef = ref;
        }}
        >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: "center"
          }}>
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: 'flex-end',
              alignItems: 'center',
              justifyContent: "center",
              backgroundColor: "#666",
              marginBottom: 40, 
              marginLeft: 20,
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 30, padding: 10, color: 'white' }}>♻</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: 'flex-end',
              alignItems: 'center',
              justifyContent: "center",
              backgroundColor: "#666",
              marginBottom: 40, 
              marginLeft: 20,
            }}
            onPress={async () => {
              if (cameraRef) {
                console.log(cameraRef.onCameraReady)
                let photo = await cameraRef.takePictureAsync();
                setLastPhotoURI(photo.uri)
              }
            }}>
            <Text style={{ fontSize: 30, padding: 10, color: 'white' }}>📸</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}