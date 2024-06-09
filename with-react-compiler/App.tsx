import { useState } from "react";
import { Text } from "react-native";

function Expensive() {
  let i = 0;
  while (i < 1000000000) {
    i++;
  }

  return <Text>Rendered: {new Date().toLocaleTimeString()}</Text>;
}

export default function Page() {
  const [index, setIndex] = useState(0);

  return (
    <>
      <Text onPress={() => setIndex((i) => i + 1)}>Increment {index}</Text>
      <Expensive />
    </>
  );
}
