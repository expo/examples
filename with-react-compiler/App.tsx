import { useState } from "react";
import { Button, SafeAreaView, Text } from "react-native";

function Expensive() {
  return <Text>Rendered: {new Date().toLocaleTimeString()}</Text>;
}

export default function Page() {
  const [index, setIndex] = useState(0);

  return (
    <SafeAreaView>
      <Button
        onPress={() => setIndex((i) => i + 1)}
        title={`Increment ${index}`}
      />
      <Expensive />
    </SafeAreaView>
  );
}
