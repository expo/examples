import { TabConfigurationContext } from "@/utils/tabConfigurationContext";
import { useTheme } from "@react-navigation/native";
import {
  Badge,
  Icon,
  Label,
  NativeTabs,
} from "expo-router/unstable-native-tabs";
import { use, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Platform,
} from "react-native";
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Index() {
  const { colors } = useTheme();
  const safeInsets = useSafeAreaInsets();
  const [isBadgeEnabled, setIsBadgeEnabled] = useState(true);
  const [isLabelVisible, setIsLabelVisible] = useState(true);
  const [isScrollToTopEnabled, setIsScrollToTopEnabled] = useState(true);
  const {
    isMinimizeOnScrollEnabled,
    setIsMinimizeOnScrollEnabled,
    isIndicatorEnabled,
    setIsIndicatorEnabled,
    isTransparentOnScrollEdgeEnabled,
    setIsTransparentOnScrollEdgeEnabled,
  } = use(TabConfigurationContext);
  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: Platform.select({
              android: safeInsets.top,
              default: undefined,
            }),
          },
        ]}
      >
        <SwitchWithLabel
          label="Badge"
          value={isBadgeEnabled}
          onValueChange={setIsBadgeEnabled}
        />
        <SwitchWithLabel
          label="Label"
          value={isLabelVisible}
          onValueChange={setIsLabelVisible}
        />
        <SwitchWithLabel
          label="Minimize on scroll (iOS)"
          value={isMinimizeOnScrollEnabled}
          onValueChange={setIsMinimizeOnScrollEnabled}
        />
        <SwitchWithLabel
          label="Scroll to top (iOS)"
          value={isScrollToTopEnabled}
          onValueChange={setIsScrollToTopEnabled}
        />
        <SwitchWithLabel
          label="Transparent on scroll edge (iOS 18)"
          value={isTransparentOnScrollEdgeEnabled}
          onValueChange={setIsTransparentOnScrollEdgeEnabled}
        />
        <SwitchWithLabel
          label="Active indicator (Android)"
          value={isIndicatorEnabled}
          onValueChange={setIsIndicatorEnabled}
        />
        <View style={styles.largeContent}>
          <Text style={[styles.largeText, { color: colors.text }]}>Scroll</Text>
          <Text style={[styles.largeText, { color: colors.text }]}>down</Text>
          <Text style={[styles.largeText, { color: colors.text }]}>\/</Text>
          <Text style={[styles.largeText, { color: colors.text }]}>This</Text>
          <Text style={[styles.largeText, { color: colors.text }]}>
            content
          </Text>
          <Text style={[styles.largeText, { color: colors.text }]}>is</Text>
          <Text style={[styles.largeText, { color: colors.text }]}>here</Text>
          <Text style={[styles.largeText, { color: colors.text }]}>to</Text>
          <Text style={[styles.largeText, { color: colors.text }]}>test</Text>
          <Text style={[styles.largeText, { color: colors.text }]}>
            scrolling
          </Text>
          <Text style={[styles.largeText, { color: colors.text }]}>It</Text>
          <Text style={[styles.largeText, { color: colors.text }]}>needs</Text>
          <Text style={[styles.largeText, { color: colors.text }]}>to</Text>
          <Text style={[styles.largeText, { color: colors.text }]}>be</Text>
          <Text style={[styles.largeText, { color: colors.text }]}>long,</Text>
          <Text style={[styles.largeText, { color: colors.text }]}>to</Text>
          <Text style={[styles.largeText, { color: colors.text }]}>enable</Text>
          <Text style={[styles.largeText, { color: colors.text }]}>
            minimize
          </Text>
          <Text style={[styles.largeText, { color: colors.text }]}>
            behavior
          </Text>
        </View>
      </ScrollView>
      <NativeTabs.Trigger disableScrollToTop={!isScrollToTopEnabled}>
        <Badge hidden={!isBadgeEnabled}>3</Badge>
        <Label hidden={!isLabelVisible}>Explore</Label>
      </NativeTabs.Trigger>
    </>
  );
}

const SwitchWithLabel = ({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: colors.text, fontSize: 16 }}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: colors.border,
          true: colors.primary,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  largeContent: {
    marginTop: 96,
    gap: 48,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  largeText: {
    fontSize: 48,
  },
});
