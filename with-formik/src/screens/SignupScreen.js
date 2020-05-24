import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as firebase from 'firebase';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters ')
});

const ErrorMessage = ({ errorValue }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
);

export default function SignupScreen({ navigation }) {
  async function onSignupHandler(values, actions) {
    const { email, password } = values;

    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (response.user) {
        navigation.navigate('Home');
      }
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          onSignupHandler(values, actions);
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          values,
          errors,
          touched,
          handleSubmit,
          handleBlur
        }) => (
          <>
            <TextInput
              style={styles.input}
              numberOfLines={1}
              value={values.email}
              placeholder="Enter email"
              onChangeText={handleChange('email')}
              autoCapitalize="none"
              onBlur={handleBlur('email')}
            />
            <ErrorMessage errorValue={touched.email && errors.email} />
            <TextInput
              style={styles.input}
              numberOfLines={1}
              value={values.password}
              placeholder="Enter password"
              onChangeText={handleChange('password')}
              autoCapitalize="none"
              onBlur={handleBlur('password')}
              secureTextEntry={true}
            />
            <ErrorMessage errorValue={touched.email && errors.password} />
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
            <ErrorMessage errorValue={errors.general} />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    color: 'red'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40
  },
  input: {
    marginVertical: 10,
    width: Dimensions.get('window').width - 100,

    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  buttonContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: Dimensions.get('window').width - 200,
    height: 44,
    borderRadius: 5,
    backgroundColor: '#343434'
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff'
  }
});
