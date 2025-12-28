import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  Image,
  useWindowDimensions,
} from 'react-native';
import * as Haptics from 'expo-haptics';

// Conditionally import GlassView for iOS 26+
let GlassView: React.ComponentType<any> | null = null;
let isLiquidGlassAvailable: (() => boolean) | null = null;

if (Platform.OS === 'ios') {
  try {
    const glassModule = require('expo-glass-effect');
    GlassView = glassModule.GlassView;
    isLiquidGlassAvailable = glassModule.isLiquidGlassAvailable;
  } catch {
    // Module not available
  }
}

const GRADIENT_COLORS = [
  ['#FF6B6B', '#4ECDC4'],
  ['#667EEA', '#764BA2'],
  ['#F093FB', '#F5576C'],
  ['#4FACFE', '#00F2FE'],
  ['#43E97B', '#38F9D7'],
];

export default function GlassScreen() {
  const { width } = useWindowDimensions();
  const [colorIndex, setColorIndex] = useState(0);
  const [glassStyle, setGlassStyle] = useState<'regular' | 'clear'>('regular');

  const canUseLiquidGlass = Platform.OS === 'ios' && isLiquidGlassAvailable?.();

  const cycleColors = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setColorIndex((i) => (i + 1) % GRADIENT_COLORS.length);
  }, []);

  const toggleGlassStyle = useCallback(() => {
    Haptics.selectionAsync();
    setGlassStyle((s) => (s === 'regular' ? 'clear' : 'regular'));
  }, []);

  const [startColor, endColor] = GRADIENT_COLORS[colorIndex];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Glass Effects</Text>
        <Text style={styles.subtitle}>
          {canUseLiquidGlass ? 'iOS 26+ Liquid Glass' : 'Blur effects demo'}
        </Text>
      </View>

      <View style={styles.demoContainer}>
        <View style={[styles.gradientBackground, { backgroundColor: startColor }]}>
          <View style={[styles.gradientOverlay, { backgroundColor: endColor }]} />
          <View style={styles.circlePattern}>
            {[...Array(6)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.circle,
                  {
                    width: 60 + i * 40,
                    height: 60 + i * 40,
                    borderRadius: 30 + i * 20,
                    opacity: 0.15 + i * 0.05,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {canUseLiquidGlass && GlassView ? (
          <GlassView
            style={styles.glassCard}
            glassEffectStyle={glassStyle}
          >
            <Text style={styles.glassTitle}>Liquid Glass</Text>
            <Text style={styles.glassText}>
              Native iOS UIVisualEffectView with real-time blur
            </Text>
          </GlassView>
        ) : (
          <View style={styles.fallbackCard}>
            <Text style={styles.glassTitle}>Glass Effect</Text>
            <Text style={styles.glassText}>
              {Platform.OS === 'ios'
                ? 'Requires iOS 26+ for Liquid Glass'
                : 'Liquid Glass is iOS-only'}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <Pressable
          style={({ pressed }) => [styles.controlButton, pressed && styles.pressed]}
          onPress={cycleColors}
        >
          <Text style={styles.controlIcon}>🎨</Text>
          <Text style={styles.controlText}>Change Colors</Text>
        </Pressable>

        {canUseLiquidGlass && (
          <Pressable
            style={({ pressed }) => [styles.controlButton, pressed && styles.pressed]}
            onPress={toggleGlassStyle}
          >
            <Text style={styles.controlIcon}>{glassStyle === 'regular' ? '🌫️' : '💎'}</Text>
            <Text style={styles.controlText}>
              {glassStyle === 'regular' ? 'Regular' : 'Clear'} Style
            </Text>
          </Pressable>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>About Liquid Glass</Text>
        <InfoRow
          icon="📱"
          title="iOS 26+ Only"
          description="Native UIVisualEffectView blur effect"
        />
        <InfoRow
          icon="⚡"
          title="GPU Accelerated"
          description="Hardware-optimized for 60fps scrolling"
        />
        <InfoRow
          icon="🎨"
          title="Dynamic Colors"
          description="Adapts to content behind the glass"
        />
        <InfoRow
          icon="♿"
          title="Accessibility"
          description="Respects Reduce Transparency setting"
        />
      </View>

      <View style={styles.codeBlock}>
        <Text style={styles.codeTitle}>Usage</Text>
        <Text style={styles.code}>
          {`import { GlassView } from 'expo-glass-effect';

<GlassView glassEffectStyle="regular">
  <Text>Content here</Text>
</GlassView>`}
        </Text>
      </View>
    </ScrollView>
  );
}

function InfoRow({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <View style={styles.infoContent}>
        <Text style={styles.infoRowTitle}>{title}</Text>
        <Text style={styles.infoRowDescription}>{description}</Text>
      </View>
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
    paddingBottom: 16,
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
  demoContainer: {
    height: 280,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientOverlay: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8,
  },
  circlePattern: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
  },
  glassCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
    borderRadius: 16,
  },
  fallbackCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
  },
  glassTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  glassText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  controlIcon: {
    fontSize: 20,
  },
  controlText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoSection: {
    marginTop: 32,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    gap: 12,
  },
  infoIcon: {
    fontSize: 24,
  },
  infoContent: {
    flex: 1,
  },
  infoRowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoRowDescription: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  codeBlock: {
    marginTop: 24,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
  },
  codeTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  code: {
    fontSize: 13,
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
    color: '#FFFFFF',
    lineHeight: 20,
  },
});
