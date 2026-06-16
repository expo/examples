import { Asset } from 'expo-asset';
import { File } from 'expo-file-system';
import { widgetsDirectory } from 'expo-widgets';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import DeliveryActivity, { type DeliveryProps } from './widgets/DeliveryActivity';
import CounterWidget from './widgets/CounterWidget';

// Fake delivery stages the Live Activity steps through automatically. One stage
// advances every ADVANCE_MS: Preparing -> +5 min On the way -> +5 min Delivered.
const STAGES: DeliveryProps['status'][] = ['Preparing', 'On the way', 'Delivered'];
const ADVANCE_MS = 5 * 60 * 1000;
// The widget counts down to the arrival time and fills its progress bar across
// this window on its own. Derive it from ADVANCE_MS so the countdown always hits
// 0 exactly when the final stage lands — reaching "Delivered" takes one advance
// per transition (STAGES.length - 1).
const ETA_MS = ADVANCE_MS * (STAGES.length - 1);
// How long to leave the finished "Delivered" state on screen before dismissing.
const DELIVERED_LINGER_MS = 3 * 1000;

// Widgets run in a separate process, so any image the widget renders has to
// live in the shared app group container (`widgetsDirectory`) where the widget
// can read it.
async function ensureImageInSharedStorage(
  fileName: string,
  assetModule: number,
): Promise<string> {
  const file = new File(widgetsDirectory, fileName);
  if (!file.exists) {
    const asset = await Asset.fromModule(assetModule).downloadAsync();
    await new File(asset.localUri!).copy(file);
  }
  return file.uri;
}

export default function App() {
  const [count, setCount] = useState(0);
  const [imageUris, setImageUris] = useState<{ logoUri: string; gridUri: string }>();
  const [deliveryRunning, setDeliveryRunning] = useState(false);
  const activityRef = useRef<ReturnType<typeof DeliveryActivity.start> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    Promise.all([
      ensureImageInSharedStorage('logo.png', require('./assets/images/logo.png')),
      ensureImageInSharedStorage('background-grid.png', require('./assets/images/background-grid.png')),
    ]).then(([logoUri, gridUri]) => {
      setImageUris({ logoUri, gridUri });
      // Push an initial snapshot so the widget has content to render
      CounterWidget.updateSnapshot({ count: 0, logoUri, gridUri });
    });
  }, []);

  const increment = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    // Snapshot props replace the previous ones entirely, so the image URIs
    // must be included in every update. Skip the widget update until the
    // images are ready, otherwise this would blank them out.
    if (imageUris) {
      CounterWidget.updateSnapshot({ count: nextCount, ...imageUris });
    }
  };

  const propsForStage = (
    stage: number,
    startEpochMs: number,
    etaEpochMs: number,
  ): DeliveryProps => ({
    orderId: '1234',
    status: STAGES[stage],
    stage,
    startEpochMs,
    etaEpochMs,
    logoUri: imageUris?.logoUri,
  });

  const startDelivery = () => {
    if (!imageUris || deliveryRunning) return; // need the shared logo first
    try {
      // Fixed start/arrival times for the whole run: the widget counts the ETA
      // down and fills the progress bar across this window on its own.
      const startEpochMs = Date.now();
      const etaEpochMs = startEpochMs + ETA_MS;
      activityRef.current = DeliveryActivity.start(propsForStage(0, startEpochMs, etaEpochMs));
      setDeliveryRunning(true);
      let stage = 0;
      intervalRef.current = setInterval(() => {
        stage += 1;
        // Advance via update() — including the final 'Delivered' stage, since
        // end()'s content argument isn't reliably rendered on its own.
        activityRef.current?.update(propsForStage(stage, startEpochMs, etaEpochMs));
        if (stage >= STAGES.length - 1) {
          // 'Delivered' is now showing. Stop advancing and dismiss after a short
          // linger so the finished state stays on screen briefly.
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          setDeliveryRunning(false);
          setTimeout(() => {
            activityRef.current?.end('default');
            activityRef.current = null;
          }, DELIVERED_LINGER_MS);
        }
      }, ADVANCE_MS);
    } catch (e) {
      // Live Activities require iOS 16.2+ and the user to have them enabled.
      console.warn('Could not start Live Activity', e);
    }
  };

  // Cleanup on unmount: stop the timer and end any running activity.
  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      activityRef.current?.end('immediate');
    },
    [],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Widgets Example</Text>
      <Text style={styles.count}>Count: {count}</Text>
      <Button title="Increment and update widget" onPress={increment} />
      <Text style={styles.hint}>
        Add "Counter Widget" to your home screen, then tap the button to update it.
      </Text>
      <Button
        title={deliveryRunning ? 'Delivery in progress…' : 'Start delivery Live Activity'}
        onPress={startDelivery}
        disabled={deliveryRunning || !imageUris}
      />
      <Text style={styles.hint}>
        Starts a Live Activity that auto-advances through delivery stages on the Lock Screen and
        Dynamic Island, then dismisses itself.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  count: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  hint: {
    textAlign: 'center',
    color: '#666',
  },
});
