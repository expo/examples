// @generated: @expo/next-adapter@2.1.0
import { StyleSheet, Text, View } from 'react-native'

export default function App(props) {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.text}>
        Expo for Web & Next.js
      </Text>

      <Text style={styles.link} accessibilityRole="link" href={`/test`}>
        Test
      </Text>
      <Text style={styles.link} accessibilityRole="link" href={`/alternate`}>
        Another
      </Text>

      <View style={styles.textContainer}>
        <Text accessibilityRole="header" aria-level="2" style={styles.text}>
          <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  link: {
    color: 'blue',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    alignItems: 'center',
    fontSize: 24,
    marginBottom: 24,
  },
})