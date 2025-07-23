import EvilIcons from "@expo/vector-icons/EvilIcons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// In development, leaving this empty will use the local API
// To test against your deployed API on device, replace this with your production URL, e.g  "https://your-subdomain.expo.app";
const API_URL = "";

export default function ImagePickerExample() {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const uploadImage = async () => {
    if (!image?.mimeType) {
      Alert.alert("Image mime type could not be determined");
      return;
    }

    setIsUploading(true);

    const response = await fetch(API_URL + "/api/signed-url", {
      method: "POST",
      body: JSON.stringify({ contentType: image.mimeType }),
    });

    const { url } = await response.json();

    // Convert image to blob for direct upload
    const imageResponse = await fetch(image.uri);
    const imageBlob = await imageResponse.blob();

    const uploadResponse = await fetch(url, {
      method: "PUT",
      body: imageBlob,
    });

    setIsUploading(false);
    if (!uploadResponse.ok) {
      const responseBody = await uploadResponse.text();
      console.error(`S3 Upload failed: ${responseBody}`);
      alert("Upload failed ❌");
    } else {
      alert("Upload successful ✅");
    }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image.uri }} style={styles.image} />}
      <Pressable
        style={[styles.buttonBase, styles.secondaryButton]}
        onPress={pickImage}
      >
        {image ? (
          <>
            <EvilIcons name="redo" size={24} color="black" />
            <Text style={[styles.buttonTextBase, styles.secondaryButtonText]}>
              Change
            </Text>
          </>
        ) : (
          <Text style={[styles.buttonTextBase, styles.secondaryButtonText]}>
            Pick an image
          </Text>
        )}
      </Pressable>
      {image && (
        <Pressable
          style={[styles.buttonBase, styles.button]}
          onPress={uploadImage}
          disabled={isUploading}
        >
          {isUploading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={[styles.buttonTextBase, styles.buttonText]}>
              Upload image
            </Text>
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
  },
  buttonTextBase: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonBase: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    gap: 5,
  },
  button: {
    backgroundColor: "black",
  },
  secondaryButton: {
    backgroundColor: "transparent",
  },
  secondaryButtonText: {
    color: "black",
  },
});
