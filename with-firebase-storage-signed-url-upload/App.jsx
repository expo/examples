import React from 'react';
import * as ImagePicker from "expo-image-picker";
import {getApps, initializeApp} from "firebase/app";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {getFunctions, httpsCallable} from "firebase/functions";
import {getAuth, signInAnonymously} from "firebase/auth";
import * as FileSystem from "expo-file-system";
import * as mime from 'react-native-mime-types';

import {
  ActivityIndicator,
  Button,
  Image,
  LogBox,
  Platform,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import uuid from "uuid";
import {MediaTypeOptions} from "expo-image-picker/src/ImagePicker.types";

const firebaseConfig = {
  // YOUR FIREBASE CONFIG
};

// Editing this file with fast refresh will reinitialize the app on every refresh, let's not do that
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
  };

  async componentDidMount() {
    await signInAnonymously(getAuth()).catch(error => {
      alert("signInAnonymously failed, enable Anonymous sign in in firebase console.")
    })

    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }


  render() {
    let {image} = this.state;

    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        {!!image && (
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: "center",
              marginHorizontal: 15,
            }}
          >
            Example: Upload ImagePicker result
          </Text>
        )}

        <Button
          onPress={this._pickImage}
          title="Pick from camera roll"
        />

        <Button onPress={this._takePhoto} title="Take a photo"/>

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default"/>
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large"/>
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let {image} = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}
      >
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: {width: 4, height: 4},
            shadowRadius: 5,
            overflow: "hidden",
          }}
        >
          <Image source={{uri: image}} style={{width: 250, height: 250}}/>
        </View>
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{paddingVertical: 10, paddingHorizontal: 10}}
        >
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: "Check out this photo",
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert("Copied image URL to clipboard");
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: MediaTypeOptions.All
    });

    console.log({pickerResult});

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async (pickerResult) => {
    try {
      this.setState({uploading: true});

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({image: uploadUrl});
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({uploading: false});
    }
  };
}

async function uploadImageAsync(uri) {
  const fileInfo = await FileSystem.getInfoAsync(uri);
  const storagePath = uuid.v4()

  // get upload url from cloud function
  const getResumableUploadUrl = httpsCallable(getFunctions(), "getResumableUploadUrl");
  const uploadUrl = await getResumableUploadUrl({
    storagePath,
    metadata: {
      contentType: mime.lookup(uri)
    }
  }).then(result => result.data.url)


  // uploading the file with signed url
  await FileSystem.uploadAsync(uploadUrl, uri, {
    headers: {
      httpMethod: "PUT",
      "Content-Length": String(fileInfo.size),
    },
    uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
  })
    .catch((err) => {
      console.error(err);
      alert("Unable to upload");
    });

  // get download url
  return getDownloadURL(ref(getStorage(), storagePath));
}
