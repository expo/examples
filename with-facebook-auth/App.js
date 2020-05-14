import * as AuthSession from "expo-auth-session";
import * as React from "react";
import { Button, Image, Platform, StyleSheet, Text, View } from "react-native";

const FB_APP_ID = "672636582940821";

// Endpoint
const discovery = {
  authorizationEndpoint: "https://www.facebook.com/v6.0/dialog/oauth",
  tokenEndpoint: "https://graph.facebook.com/v6.0/oauth/access_token",
};

const useProxy = Platform.select({ web: false, default: true });

export default function App() {
  const [user, setUser] = React.useState(null);

  const redirectUri = AuthSession.makeRedirectUri({
    useProxy,
    // For usage in bare and standalone
    // Use your FBID here. The path MUST be `authorize`.
    native: `fb${FB_APP_ID}://authorize`,
  });

  // Request
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: FB_APP_ID,
      scopes: ["public_profile", "user_likes"],
      // For usage in managed apps using the proxy
      redirectUri: AuthSession.makeRedirectUri({
        // For usage in bare and standalone
        // Use your FBID here. The path MUST be `authorize`.
        native: `fb${FB_APP_ID}://authorize`,
      }),
      extraParams: {
        // Use `popup` on web for a better experience
        display: Platform.select({ web: "popup" }),
        // Optionally you can use this to rerequest declined permissions
        auth_type: "rerequest",
      },
      // NOTICE: Please do not actually request the token on the client (see:
      // response_type=token in the authUrl), it is not secure. Request a code
      // instead, and use this flow:
      // https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/#confirm
      // The code here is simplified for the sake of demonstration. If you are
      // just prototyping then you don't need to concern yourself with this and
      // can copy this example, but be aware that this is not safe in production.
      responseType: AuthSession.ResponseType.Token,
    },
    discovery
  );

  // You need to add this url to your authorized redirect urls on your Facebook app
  console.log({
    redirectUri,
  });

  const _handlePressAsync = async () => {
    const result = await promptAsync({ useProxy });

    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
      return;
    }

    let accessToken = result.params.access_token;
    let userInfoResponse = await fetch(
      `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,picture.type(large)`
    );
    const userInfo = await userInfoResponse.json();
    setUser(userInfo);
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.profile}>
          <Image source={{ uri: user.picture.data.url }} style={styles.image} />
          <Text style={styles.name}>{user.name}</Text>
          <Text>ID: {user.id}</Text>
        </View>
      ) : (
        <Button
          disabled={!request}
          title="Open FB Auth"
          onPress={_handlePressAsync}
        />
      )}
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
