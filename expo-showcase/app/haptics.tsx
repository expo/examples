import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';

const IMPACT_STYLES = [
  { style: Haptics.ImpactFeedbackStyle.Light, name: 'Light', description: 'Subtle tap feedback' },
  { style: Haptics.ImpactFeedbackStyle.Medium, name: 'Medium', description: 'Standard impact' },
  { style: Haptics.ImpactFeedbackStyle.Heavy, name: 'Heavy', description: 'Strong collision' },
  { style: Haptics.ImpactFeedbackStyle.Rigid, name: 'Rigid', description: 'Hard surface impact' },
  { style: Haptics.ImpactFeedbackStyle.Soft, name: 'Soft', description: 'Cushioned impact' },
] as const;

const NOTIFICATION_TYPES = [
  { type: Haptics.NotificationFeedbackType.Success, name: 'Success', emoji: '✅', color: '#30D158' },
  { type: Haptics.NotificationFeedbackType.Warning, name: 'Warning', emoji: '⚠️', color: '#FFD60A' },
  { type: Haptics.NotificationFeedbackType.Error, name: 'Error', emoji: '❌', color: '#FF453A' },
] as const;

export default function HapticsScreen() {
  const triggerImpact = useCallback((style: Haptics.ImpactFeedbackStyle) => {
    Haptics.impactAsync(style);
  }, []);

  const triggerNotification = useCallback((type: Haptics.NotificationFeedbackType) => {
    Haptics.notificationAsync(type);
  }, []);

  const triggerSelection = useCallback(() => {
    Haptics.selectionAsync();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Haptics</Text>
        <Text style={styles.subtitle}>Touch feedback patterns</Text>
      </View>

      <Section title="Impact Feedback" description="Simulates physical collisions">
        <View style={styles.impactGrid}>
          {IMPACT_STYLES.map((item) => (
            <Pressable
              key={item.name}
              style={({ pressed }) => [styles.impactButton, pressed && styles.pressed]}
              onPress={() => triggerImpact(item.style)}
            >
              <Text style={styles.impactName}>{item.name}</Text>
              <Text style={styles.impactDescription}>{item.description}</Text>
            </Pressable>
          ))}
        </View>
      </Section>

      <Section title="Notification Feedback" description="Task outcome indicators">
        <View style={styles.notificationRow}>
          {NOTIFICATION_TYPES.map((item) => (
            <Pressable
              key={item.name}
              style={({ pressed }) => [
                styles.notificationButton,
                { borderColor: item.color },
                pressed && styles.pressed,
              ]}
              onPress={() => triggerNotification(item.type)}
            >
              <Text style={styles.notificationEmoji}>{item.emoji}</Text>
              <Text style={[styles.notificationName, { color: item.color }]}>{item.name}</Text>
            </Pressable>
          ))}
        </View>
      </Section>

      <Section title="Selection Feedback" description="UI selection changes">
        <Pressable
          style={({ pressed }) => [styles.selectionButton, pressed && styles.pressed]}
          onPress={triggerSelection}
        >
          <Text style={styles.selectionIcon}>👆</Text>
          <View>
            <Text style={styles.selectionTitle}>Selection</Text>
            <Text style={styles.selectionSubtitle}>Tap for subtle selection feedback</Text>
          </View>
        </Pressable>
      </Section>

      <Section title="Pattern Demo" description="Combined haptic sequence">
        <Pressable
          style={({ pressed }) => [styles.patternButton, pressed && styles.pressed]}
          onPress={async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            await new Promise((r) => setTimeout(r, 100));
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            await new Promise((r) => setTimeout(r, 100));
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            await new Promise((r) => setTimeout(r, 200));
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }}
        >
          <Text style={styles.patternIcon}>🎵</Text>
          <View>
            <Text style={styles.patternTitle}>Play Pattern</Text>
            <Text style={styles.patternSubtitle}>Light → Medium → Heavy → Success</Text>
          </View>
        </Pressable>
      </Section>

      {Platform.OS === 'ios' && (
        <View style={styles.note}>
          <Text style={styles.noteText}>
            Haptics may be disabled if Low Power Mode is on or Taptic Engine is disabled in Settings.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{description}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
  header: {
    paddingTop: 44,
    paddingBottom: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 15,
    color: '#8E8E93',
    marginTop: 4,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 12,
  },
  impactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  impactButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
    minWidth: '30%',
    flex: 1,
  },
  impactName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  impactDescription: {
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 4,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  notificationRow: {
    flexDirection: 'row',
    gap: 12,
  },
  notificationButton: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 20,
    alignItems: 'center',
  },
  notificationEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  notificationName: {
    fontSize: 15,
    fontWeight: '600',
  },
  selectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  selectionIcon: {
    fontSize: 32,
  },
  selectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  selectionSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  patternButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  patternIcon: {
    fontSize: 32,
  },
  patternTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#007AFF',
  },
  patternSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  note: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
  },
  noteText: {
    fontSize: 13,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
