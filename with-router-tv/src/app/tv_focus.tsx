import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { EventHandlingDemo } from '@/components/tv-event-demo';
import { TVFocusGuideView } from '@/components/tv-focus-guide';
import { Collapsible } from '@/components/ui/collapsible';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { useTheme } from '@/hooks/use-theme';

export default function FocusDemoScreen() {
  const styles = useFocusDemoScreenStyles();
  const theme = useTheme();
  const { spacing } = useScreenDimensions();
  const contentPlatformStyle = {
    paddingTop: spacing.six + spacing.four,
    paddingBottom: spacing.four,
  };

  return (
    <ThemedView
      style={[
        styles.contentContainer,
        contentPlatformStyle,
        { backgroundColor: theme.background },
      ]}
    >
      <TVFocusGuideView autoFocus style={styles.innerContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">TV event handling demo</ThemedText>
        </ThemedView>
        <ThemedText>
          Demo of focus handling and TV remote event handling in{' '}
          <ThemedText type="code">Pressable</ThemedText> and{' '}
          <ThemedText type="code">Touchable</ThemedText> components.
        </ThemedText>
        <Collapsible title="How it works" style={{ width: '100%' }}>
          <ThemedText>
            • On TV platforms, these components have &quot;onFocus()&quot; and
            &quot;onBlur()&quot; props, in addition to the usual
            &quot;onPress()&quot;. These can be used to modify the style of the
            component when it is navigated to or navigated away from by the TV
            focus engine.
          </ThemedText>
          <ThemedText>
            • On web, Pressable has the above handlers, and also has
            &quot;onHoverIn()&quot;, and &quot;onHoverOut()&quot; props.
          </ThemedText>
          <ThemedText>
            • In addition, the functional forms of the Pressable style prop and
            the Pressable content, which in React Native core take a
            &quot;pressed&quot; boolean parameter, can also take
            &quot;focused&quot; as a parameter on TV platforms, and
            &quot;hovered&quot; as a parameter on web.
          </ThemedText>
          <ThemedText>
            • As you use the arrow keys to navigate around the screen, the demo
            uses the above props to update lists of recent events.
          </ThemedText>
          <ThemedText>
            In RNTV 0.76 and above, `Pressable` and `Touchable` components
            receive &quot;focus&quot;, &quot;blur&quot;, &quot;pressIn&quot;,
            and &quot;pressOut&quot; events directly from native code, for
            improved performance when navigating around the screen.
          </ThemedText>
        </Collapsible>
      </TVFocusGuideView>
      <EventHandlingDemo />
    </ThemedView>
  );
}

const useFocusDemoScreenStyles = function () {
  const { width, spacing } = useScreenDimensions();
  const theme = useTheme();
  return StyleSheet.create({
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
      paddingHorizontal: spacing.four,
      paddingTop: spacing.three,
      width,
    },
    innerContainer: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      width: width * 0.8,
      gap: spacing.two,
    },
    titleContainer: {
      width: '100%',
      flexDirection: 'row',
      gap: spacing.two,
      justifyContent: 'center',
      marginBottom: spacing.three,
    },
    sectionsWrapper: {},
  });
};
