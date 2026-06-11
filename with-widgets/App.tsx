import { Asset } from 'expo-asset';
import { File } from 'expo-file-system';
import { widgetsDirectory } from 'expo-widgets';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import MyWidget from './widgets/MyWidget';

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

  useEffect(() => {
    Promise.all([
      ensureImageInSharedStorage('logo.png', require('./assets/images/logo.png')),
      ensureImageInSharedStorage('background-grid.png', require('./assets/images/background-grid.png')),
    ]).then(([logoUri, gridUri]) => {
      setImageUris({ logoUri, gridUri });
      // Push an initial snapshot so the widget has content to render
      MyWidget.updateSnapshot({ count: 0, logoUri, gridUri });
    });
  }, []);

  const increment = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    // Snapshot props replace the previous ones entirely, so the image URIs
    // must be included in every update. Skip the widget update until the
    // images are ready, otherwise this would blank them out.
    if (imageUris) {
      MyWidget.updateSnapshot({ count: nextCount, ...imageUris });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Widgets Example</Text>
      <Text style={styles.count}>Count: {count}</Text>
      <Button title="Increment and update widget" onPress={increment} />
      <Text style={styles.hint}>
        Add "My Widget" to your home screen, then tap the button to update it.
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
