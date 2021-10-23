import * as React from "react";
import { ActivityIndicator, Button, Image, StatusBar, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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

        {this._maybeRenderControls()}
        {this._maybeRenderUploadingIndicator()}
        {this._maybeRenderImage()}

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _maybeRenderUploadingIndicator = () => {
    if (this.state.uploading) {
      return <ActivityIndicator animating size="large" color="#0000ee" />;
    }
  };

  _maybeRenderControls = () => {
    if (!this.state.uploading) {
      return (
        <View>
          <View style={{ marginVertical: 8 }}>
            <Button
              onPress={this._pickImage}
              title="Pick an image from camera roll"
            />
          </View>
          <View style={{ marginVertical: 8 }}>
            <Button onPress={this._takePhoto} title="Take a photo" />
          </View>
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    if (this.state.image) {
      return (
        <View
          style={{
            marginTop: 30,
            width: 250,
            borderRadius: 3,
            elevation: 2,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
          }}
        >
          <View
            style={{
              borderTopRightRadius: 3,
              borderTopLeftRadius: 3,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: this.state.image }}
              style={{ width: 250, height: 250 }}
            />
          </View>

          <Image
            style={{ paddingVertical: 10, paddingHorizontal: 10 }}
            source={{ uri: this.state.image }}
          />
        </View>
      );
    }
  };

  _askPermission = async (failureMessage) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "denied") {
      alert(failureMessage);
    }
  };
  _askCameraPermission = async (failureMessage) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "denied") {
      alert(failureMessage);
    }
  };

  _takePhoto = async () => {
    await this._askCameraPermission(
      "We need the camera permission to take a picture..."
    );
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    await this._askPermission(
      "We need the camera-roll permission to read pictures from your phone..."
    );

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async (pickerResult) => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        console.log({ uploadResult });
        this.setState({ image: uploadResult.files.photo });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  let apiUrl = "https://httpbin.org/post";

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }
  let uriArray = uri.split(".");
  let fileType = uriArray[uriArray.length - 1];

  let formData = new FormData();
  formData.append("photo", {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: "POST",
    body: formData,
    mode: 'cors',
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  };

  return fetch(apiUrl, options);
}
