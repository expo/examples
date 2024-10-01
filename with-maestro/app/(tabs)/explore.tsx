import { StyleSheet, Text, SafeAreaView } from 'react-native';

import { Collapsible } from '@/components/Collapsible';

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Collapsible title="File-based routing">
        <Text>This app has two screens</Text>
      </Collapsible>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    width: '80%',
    height: '80%',
    marginTop: '20%',
    marginLeft: '10%',
  },
  title: {
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
