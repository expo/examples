import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
} from "./redux/slices/counterSlice";

const CounterComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.value);

  const handleIncrement = () => {
    dispatch(incrementByAmount(Number(inputValue) || 0));
  };

  const handleDecrement = () => {
    dispatch(decrementByAmount(Number(inputValue) || 0));
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: "600", marginVertical: 10 }}>
        Expo with Redux State Management
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "600", marginVertical: 10 }}>
        Counter: {counter}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(increment())}
        >
          <Text style={styles.buttonText}>Increment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(decrement())}
        >
          <Text style={styles.buttonText}>Decrement</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 20, fontWeight: "600", marginVertical: 15 }}>
        Increment or Decrement with Custom Values
      </Text>

      <TextInput
        style={styles.inputText}
        placeholder="Enter Value"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={setInputValue}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <Text style={styles.buttonText}>Increment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDecrement}>
          <Text style={styles.buttonText}>Decrement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    maxWidth: 200,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  inputText: {
    height: 40,
    width: 300,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
});

export default CounterComponent;
