import { Platform } from 'react-native';

export function getApiUrl(path: string): string {
  if (Platform.OS === 'web') {
    return path;
  }
  // For native, use localhost with the correct port
  const baseUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8081';
  return `${baseUrl}${path}`;
}
