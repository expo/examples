import { SignedIn, SignedOut, useUser, useAuth } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <SignedIn>
        <Text style={styles.title}>Welcome to Clerk!</Text>
        <Text style={styles.subtitle}>
          You are signed in as {user?.emailAddresses[0].emailAddress}
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => signOut()}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </SignedIn>

      <SignedOut>
        <Text style={styles.title}>Welcome to Clerk!</Text>
        <Text style={styles.subtitle}>Sign in to get started</Text>
        <Link href="/sign-in" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/sign-up" asChild>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </Link>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
});
