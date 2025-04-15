import {
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';
import { useThemeColor } from '@/hooks/useThemeColor';

const useTVEventHandler = Platform.isTV
  ? require('react-native').useTVEventHandler
  : (_: any) => {};

/**
 * Demo of event handling on TV and web.
 * On TV, the buttons will respond to focus, blur, and press events.
 * On web, the buttons will respond to focus, blur, press, and hover events.
 */
export function EventHandlingDemo() {
  const [remoteEventLog, setRemoteEventLog] = useState<string[]>([]);
  const [pressableEventLog, setPressableEventLog] = useState<string[]>([]);

  const logWithAppendedEntry = (log: string[], entry: string) => {
    const limit = 10;
    const newEventLog = log.slice(log.length === limit ? 1 : 0, limit);
    newEventLog.push(entry);
    return newEventLog;
  };

  const updatePressableLog = (entry: string) => {
    setPressableEventLog((log) => logWithAppendedEntry(log, entry));
  };

  useTVEventHandler((event: any) => {
    const { eventType, eventKeyAction } = event;
    if (eventType !== 'focus' && eventType !== 'blur') {
      setRemoteEventLog((log) =>
        logWithAppendedEntry(
          log,
          `type=${eventType}, action=${
            eventKeyAction !== undefined ? eventKeyAction : ''
          }`,
        ),
      );
    }
  });

  const styles = useDemoStyles();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.logContainer}>
        {Platform.isTV && (
          <View>
            <ThemedText type="defaultSemiBold">TV remote events</ThemedText>
            <ThemedText style={styles.logText}>
              {remoteEventLog.join('\n')}
            </ThemedText>
          </View>
        )}
        <View>
          <ThemedText type="defaultSemiBold">Native events</ThemedText>
          <ThemedText style={styles.logText}>
            {pressableEventLog.join('\n')}
          </ThemedText>
        </View>
      </ThemedView>
      <ThemedView>
        <PressableButton title="Pressable" log={updatePressableLog} />
        <TouchableOpacityButton
          title="TouchableOpacity"
          log={updatePressableLog}
        />
        <TouchableHighlightButton
          title="TouchableHighlight"
          log={updatePressableLog}
        />
        {Platform.OS === 'android' ? (
          <TouchableNativeFeedbackButton
            title="TouchableNativeFeedback"
            log={updatePressableLog}
          />
        ) : null}
      </ThemedView>
    </ThemedView>
  );
}

const PressableButton = (props: {
  title: string;
  log: (entry: string) => void;
}) => {
  const styles = useDemoStyles();

  return (
    <Pressable
      onFocus={() => props.log(`${props.title} onFocus`)}
      onBlur={() => props.log(`${props.title} onBlur`)}
      onHoverIn={() => props.log(`${props.title} onHoverIn`)}
      onHoverOut={() => props.log(`${props.title} onHoverOut`)}
      onPress={() => props.log(`${props.title} onPress`)}
      onPressIn={() => props.log(`${props.title} onPressIn`)}
      onPressOut={() => props.log(`${props.title} onPressOut`)}
      onLongPress={() => props.log(`${props.title} onLongPress`)}
      style={({ pressed, focused, hovered }) =>
        pressed || focused || hovered
          ? styles.pressableFocused
          : styles.pressable
      }
    >
      {({ focused, hovered, pressed }) => {
        return (
          <ThemedText style={styles.pressableText}>
            {pressed
              ? `${props.title} pressed`
              : focused
              ? `${props.title} focused`
              : hovered
              ? `${props.title} hovered`
              : props.title}
          </ThemedText>
        );
      }}
    </Pressable>
  );
};

const TouchableOpacityButton = (props: {
  title: string;
  log: (entry: string) => void;
}) => {
  const styles = useDemoStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.pressable}
      onFocus={() => props.log(`${props.title} onFocus`)}
      onBlur={() => props.log(`${props.title} onBlur`)}
      onPressIn={() => props.log(`${props.title} onPressIn`)}
      onPressOut={() => props.log(`${props.title} onPressOut`)}
      onLongPress={() => props.log(`${props.title} onLongPress`)}
    >
      <Text style={styles.pressableText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const TouchableHighlightButton = (props: {
  title: string;
  log: (entry: string) => void;
}) => {
  const styles = useDemoStyles();
  const underlayColor = useThemeColor({}, 'tint');

  return (
    <TouchableHighlight
      style={styles.pressable}
      underlayColor={underlayColor}
      onFocus={(event) => props.log(`${props.title} onFocus`)}
      onBlur={(event) => props.log(`${props.title} onBlur`)}
      onPressIn={() => props.log(`${props.title} onPressIn`)}
      onPressOut={() => props.log(`${props.title} onPressOut`)}
      onLongPress={() => props.log(`${props.title} onLongPress`)}
    >
      <Text style={styles.pressableText}>{props.title}</Text>
    </TouchableHighlight>
  );
};

const TouchableNativeFeedbackButton = (props: {
  title: string;
  log: (entry: string) => void;
}) => {
  const styles = useDemoStyles();

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackground()}
      onPress={() => props.log(`${props.title} onPress`)}
      onPressIn={() => props.log(`${props.title} onPressIn`)}
      onPressOut={() => props.log(`${props.title} onPressOut`)}
      onLongPress={() => props.log(`${props.title} onLongPress`)}
    >
      <View style={styles.pressable}>
        <Text style={styles.pressableText}>{props.title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const useDemoStyles = function () {
  const scale = useScale();
  const highlightColor = useThemeColor({}, 'link');
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    logContainer: {
      flexDirection: 'row',
      padding: 5 * scale,
      margin: 5 * scale,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    logText: {
      maxHeight: 300 * scale,
      width: Platform.isTV || Platform.OS === 'web' ? 300 * scale : 150 * scale,
      fontSize: 10 * scale,
      margin: 5 * scale,
      lineHeight: 12 * scale,
      alignSelf: 'flex-start',
      justifyContent: 'flex-start',
    },
    pressable: {
      borderColor: highlightColor,
      backgroundColor: textColor,
      borderWidth: 1,
      borderRadius: 5 * scale,
      margin: 5 * scale,
    },
    pressableFocused: {
      borderColor: highlightColor,
      backgroundColor: tintColor,
      borderWidth: 1,
      borderRadius: 5 * scale,
      margin: 5 * scale,
    },
    pressableText: {
      color: backgroundColor,
      fontSize: 15 * scale,
    },
  });
};
