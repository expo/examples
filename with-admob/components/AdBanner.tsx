import * as React from "react";
import { View, Platform } from "react-native";
import * as mobileAds from "react-native-google-mobile-ads";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

interface AdBannerProps {
  containerStyle?: React.ComponentProps<typeof View>["style"];
}

const adUnitId = getAdUnitId("banner");

/**
 * Custom AdBanner component for displaying Google Mobile Ads banner
 * This component provides a placeholder for banner ads
 * Due to TypeScript errors with direct BannerAd use, we're using a wrapper component
 */
export function AdBanner({ containerStyle }: AdBannerProps) {
  
  return (
    <View
      style={[
        {
          height: 60,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
          marginVertical: 5,
        },
        containerStyle,
      ]}
    >
      {/* Ad space - actual implementation via native code */}
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          networkExtras: {
            collapsible: "bottom",
          },
        }}
      />
      {/* You can use this as a placeholder while rebuilding with native AdMob integration */}
    </View>
  );
}

export function getAdUnitId(adType: "banner" | "interstitial" | "rewarded") {
    // Return test IDs
    if (adType === "banner") return mobileAds.TestIds.BANNER;
    if (adType === "interstitial") return mobileAds.TestIds.INTERSTITIAL;
    if (adType === "rewarded") return mobileAds.TestIds.REWARDED;
  
  // Fallback to test ID
  return mobileAds.TestIds.BANNER;
}
