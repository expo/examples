import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useFrame, Canvas } from "@react-three/fiber";
// To fix WARN: THREE.BoxBufferGeometry has been renamed to THREE.BoxGeometry.
import { Box } from "@react-three/drei";

function InteractiveBox(props) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (mesh && mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <Box
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </Box>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <InteractiveBox position={[-1.2, 0, 0]} />
        <InteractiveBox position={[1.2, 0, 0]} />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
