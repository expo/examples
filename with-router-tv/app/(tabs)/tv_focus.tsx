import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { EventHandlingDemo } from '@/components/EventHandlingDemo';
import { useScale } from '@/hooks/useScale';

export default function FocusDemoScreen() {
  const styles = useFocusDemoScreenStyles();
  const scale = useScale();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons
          size={310 * scale}
          name="tv-outline"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">TV event handling demo</ThemedText>
      </ThemedView>
      <ThemedText>
        Demo of focus handling and TV remote event handling in{' '}
        <ThemedText type="defaultSemiBold">Pressable</ThemedText> and{' '}
        <ThemedText type="defaultSemiBold">Touchable</ThemedText> components.
      </ThemedText>
      <Collapsible title="How it works">
        <ThemedText>
          • On TV platforms, these components have "onFocus()" and "onBlur()"
          props, in addition to the usual "onPress()". These can be used to
          modify the style of the component when it is navigated to or navigated
          away from by the TV focus engine.
        </ThemedText>
        <ThemedText>
          • On web, Pressable has the above handlers, and also has
          "onHoverIn()", and "onHoverOut()" props.
        </ThemedText>
        <ThemedText>
          • In addition, the functional forms of the Pressable style prop and
          the Pressable content, which in React Native core take a "pressed"
          boolean parameter, can also take "focused" as a parameter on TV
          platforms, and "hovered" as a parameter on web.
        </ThemedText>
        <ThemedText>
          • As you use the arrow keys to navigate around the screen, the demo
          uses the above props to update lists of recent events.
        </ThemedText>
        <ThemedText>
          In RNTV 0.76 and above, `Pressable` and `Touchable` components receive
          "focus", "blur", "pressIn", and "pressOut" events directly from native
          code, for improved performance when navigating around the screen.
        </ThemedText>
      </Collapsible>
      <EventHandlingDemo />
    </ParallaxScrollView>
  );
}

const useFocusDemoScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    headerImage: {
      color: '#808080',
      bottom: -45 * scale,
      left: 0,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8 * scale,
    },
  });
};
