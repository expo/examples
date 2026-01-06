import { MobileAds, MaxAdContentRating } from 'react-native-google-mobile-ads';

export const initializeMobileAds = async () => {
  try {
    await MobileAds().initialize();
    
    // Configure ad content ratings
    await MobileAds().setRequestConfiguration({
      // Set your content rating
      maxAdContentRating: MaxAdContentRating.PG,
      // Specify if ads should be for children
      tagForChildDirectedTreatment: false,
      // Specify if ads should be for users under the age of consent
      tagForUnderAgeOfConsent: false,
      // Whether to request non-personalized ads
      testDeviceIdentifiers: ['EMULATOR'],
    });
    
    console.log('Mobile Ads initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Mobile Ads:', error);
  }
}; 