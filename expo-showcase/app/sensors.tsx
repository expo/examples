import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { Accelerometer, Gyroscope, Barometer, DeviceMotion, Magnetometer } from 'expo-sensors';
import * as Haptics from 'expo-haptics';

type SensorData = { x: number; y: number; z: number };
type BarometerData = { pressure: number; relativeAltitude?: number };
type MagnetometerData = { x: number; y: number; z: number };

const UPDATE_INTERVAL = 100;

export default function SensorsScreen() {
  const [accel, setAccel] = useState<SensorData>({ x: 0, y: 0, z: 0 });
  const [gyro, setGyro] = useState<SensorData>({ x: 0, y: 0, z: 0 });
  const [baro, setBaro] = useState<BarometerData>({ pressure: 0 });
  const [mag, setMag] = useState<MagnetometerData>({ x: 0, y: 0, z: 0 });
  const [activeSensors, setActiveSensors] = useState<Set<string>>(new Set());

  const toggleSensor = useCallback((sensor: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveSensors((prev) => {
      const next = new Set(prev);
      if (next.has(sensor)) {
        next.delete(sensor);
      } else {
        next.add(sensor);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const subs: { remove: () => void }[] = [];

    if (activeSensors.has('accelerometer')) {
      Accelerometer.setUpdateInterval(UPDATE_INTERVAL);
      subs.push(Accelerometer.addListener(setAccel));
    }
    if (activeSensors.has('gyroscope')) {
      Gyroscope.setUpdateInterval(UPDATE_INTERVAL);
      subs.push(Gyroscope.addListener(setGyro));
    }
    if (activeSensors.has('barometer')) {
      Barometer.setUpdateInterval(UPDATE_INTERVAL);
      subs.push(Barometer.addListener(setBaro));
    }
    if (activeSensors.has('magnetometer')) {
      Magnetometer.setUpdateInterval(UPDATE_INTERVAL);
      subs.push(Magnetometer.addListener(setMag));
    }

    return () => subs.forEach((s) => s.remove());
  }, [activeSensors]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Sensors</Text>
        <Text style={styles.subtitle}>Real-time device sensor data</Text>
      </View>

      <SensorCard
        name="Accelerometer"
        icon="📱"
        description="Measures device acceleration in G-force"
        active={activeSensors.has('accelerometer')}
        onToggle={() => toggleSensor('accelerometer')}
      >
        <SensorValue label="X" value={accel.x} unit="G" color="#FF453A" />
        <SensorValue label="Y" value={accel.y} unit="G" color="#30D158" />
        <SensorValue label="Z" value={accel.z} unit="G" color="#0A84FF" />
      </SensorCard>

      <SensorCard
        name="Gyroscope"
        icon="🔄"
        description="Measures rotation rate in rad/s"
        active={activeSensors.has('gyroscope')}
        onToggle={() => toggleSensor('gyroscope')}
      >
        <SensorValue label="X" value={gyro.x} unit="rad/s" color="#FF453A" />
        <SensorValue label="Y" value={gyro.y} unit="rad/s" color="#30D158" />
        <SensorValue label="Z" value={gyro.z} unit="rad/s" color="#0A84FF" />
      </SensorCard>

      <SensorCard
        name="Magnetometer"
        icon="🧭"
        description="Measures magnetic field in microtesla"
        active={activeSensors.has('magnetometer')}
        onToggle={() => toggleSensor('magnetometer')}
      >
        <SensorValue label="X" value={mag.x} unit="μT" color="#FF453A" />
        <SensorValue label="Y" value={mag.y} unit="μT" color="#30D158" />
        <SensorValue label="Z" value={mag.z} unit="μT" color="#0A84FF" />
      </SensorCard>

      {Platform.OS !== 'web' && (
        <SensorCard
          name="Barometer"
          icon="🌡️"
          description="Measures atmospheric pressure"
          active={activeSensors.has('barometer')}
          onToggle={() => toggleSensor('barometer')}
        >
          <SensorValue label="Pressure" value={baro.pressure} unit="hPa" color="#BF5AF2" />
          {baro.relativeAltitude !== undefined && (
            <SensorValue label="Altitude" value={baro.relativeAltitude} unit="m" color="#FFD60A" />
          )}
        </SensorCard>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tap cards to toggle sensors. Active sensors consume battery.
        </Text>
      </View>
    </ScrollView>
  );
}

function SensorCard({
  name,
  icon,
  description,
  active,
  onToggle,
  children,
}: {
  name: string;
  icon: string;
  description: string;
  active: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <Pressable style={[styles.card, active && styles.cardActive]} onPress={onToggle}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
        <View style={[styles.indicator, active && styles.indicatorActive]} />
      </View>
      {active && <View style={styles.cardContent}>{children}</View>}
    </Pressable>
  );
}

function SensorValue({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  return (
    <View style={styles.valueRow}>
      <Text style={[styles.valueLabel, { color }]}>{label}</Text>
      <Text style={styles.valueNumber}>{value.toFixed(3)}</Text>
      <Text style={styles.valueUnit}>{unit}</Text>
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
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardActive: {
    backgroundColor: '#2C2C2E',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardDescription: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3A3A3C',
  },
  indicatorActive: {
    backgroundColor: '#30D158',
  },
  cardContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#38383A',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  valueLabel: {
    width: 60,
    fontSize: 15,
    fontWeight: '600',
  },
  valueNumber: {
    flex: 1,
    fontSize: 17,
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
    color: '#FFFFFF',
  },
  valueUnit: {
    fontSize: 13,
    color: '#8E8E93',
  },
  footer: {
    marginTop: 8,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
