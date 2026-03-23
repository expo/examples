import { GlassView } from 'expo-glass-effect';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function AlertRoute() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 8 }}>
      <Stack.Screen.Title>{""}</Stack.Screen.Title>

      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Menu icon="ellipsis">
          <Stack.Toolbar.MenuAction icon="bell.badge">
            New notifications
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.MenuAction icon="checkmark.circle">
            Mark all as read
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.MenuAction icon="gear">
            Notification settings
          </Stack.Toolbar.MenuAction>
        </Stack.Toolbar.Menu>
        <Stack.Toolbar.Spacer />
      </Stack.Toolbar>

      <Text
        style={{
          fontSize: 36,
          color: "#333",
          fontWeight: "bold",
          fontFamily: "ui-rounded",
        }}
      >
        Alert
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: "#333",
          fontFamily: "ui-rounded",
        }}
      >
        This is additional information in the prompt.
      </Text>
      <View style={{ flex: 1 }} />

      <GlassView
        isInteractive
        tintColor={"#000"}
        style={{
          padding: 12,
          borderRadius: 12,
          borderCurve: "continuous",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#fff",
          }}
        >
          Dismiss
        </Text>
      </GlassView>
    </View>
  );
}
