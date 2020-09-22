import { ResponseType } from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const FB_APP_ID = "145668956753819";

export default function App() {
  const [user, setUser] = React.useState(null);
  // Request
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FB_APP_ID,
    // NOTICE: Please do not actually request the token on the client (see:
    // response_type=token in the authUrl), it is not secure. Request a code
    // instead, and use this flow:
    // https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/#confirm
    // The code here is simplified for the sake of demonstration. If you are
    // just prototyping then you don't need to concern yourself with this and
    // can copy this example, but be aware that this is not safe in production.
    responseType: ResponseType.Token,
  });

  if (request) {
    console.log(
      "You need to add this url to your authorized redirect urls on your Facebook app: " +
        request.redirectUri
    );
  }

  React.useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
      })();
    }
  }, [response]);

  const handlePressAsync = async () => {
    const result = await promptAsync();
    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
      return;
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <Profile user={user} />
      ) : (
        <Button
          disabled={!request}
          title="Open FB Auth"
          onPress={handlePressAsync}
        />
      )}
    </View>
  );
}

function Profile({ user }) {
  return (
    <View style={styles.profile}>
      <Image source={{ uri: user.picture.data.url }} style={styles.image} />
      <Text style={styles.name}>{user.name}</Text>
      <Text>ID: {user.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    alignItems: "center",
  },
  name: {
    fontSize: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
