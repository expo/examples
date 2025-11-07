import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert('Error', err.errors?.[0]?.message || 'Sign up failed');
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
        Alert.alert('Error', 'Verification failed. Please try again.');
      }
    } catch (err: any) {
      Alert.alert('Error', err.errors?.[0]?.message || 'Verification failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>

      {!pendingVerification ? (
        <>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email"
            onChangeText={setEmailAddress}
          />

          <TextInput
            style={styles.input}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text>Already have an account?</Text>
            <Link href="/sign-in">
              <Text style={styles.link}> Sign in</Text>
            </Link>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>
            We sent a verification code to your email
          </Text>

          <TextInput
            style={styles.input}
            value={code}
            placeholder="Verification code"
            onChangeText={setCode}
          />

          <TouchableOpacity style={styles.button} onPress={onPressVerify}>
            <Text style={styles.buttonText}>Verify Email</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  link: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
