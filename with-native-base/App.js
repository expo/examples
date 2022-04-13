import { NativeBaseProvider, Box, Text } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <Box flex={1} alignSelf='center' justifyContent='center'>
        <Text fontSize='lg'>Expo with NativeBase</Text>
      </Box>
    </NativeBaseProvider>
  );
}
