// https://github.com/wcandillon/react-native-webgpu/blob/578ad989b4326724702b14245d5c82622849ee23/apps/example/src/ThreeJS/Fiber.tsx#L1C1-L141C3
import * as THREE from "three/webgpu";
import { View } from "react-native";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import { FiberCanvas } from "@/lib/fiber-canvas";
import useControls from "@/lib/orbit-controls";

const boxData = [
  { position: [-4, 0, -4], color: "red" },
  { position: [-2, 0, -4], color: "orange" },
  { position: [0, 0, -4], color: "yellow" },
  { position: [2, 0, -4], color: "green" },
  { position: [4, 0, -4], color: "blue" },
  { position: [-4, 0, -2], color: "indigo" },
  { position: [-2, 0, -2], color: "violet" },
  { position: [0, 0, -2], color: "pink" },
  { position: [2, 0, -2], color: "cyan" },
  { position: [4, 0, -2], color: "lime" },
];

const cylinderData = [
  { position: [-4, 0, 0], color: "brown" },
  { position: [-2, 0, 0], color: "gray" },
  { position: [0, 0, 0], color: "hotpink" },
  { position: [2, 0, 0], color: "white" },
  { position: [4, 0, 0], color: "gold" },
  { position: [-4, 0, 2], color: "silver" },
  { position: [-2, 0, 2], color: "maroon" },
  { position: [0, 0, 2], color: "olive" },
  { position: [2, 0, 2], color: "navy" },
  { position: [4, 0, 2], color: "teal" },
];

const sphereData = [
  { position: [-4, 0, 4], color: "coral" },
  { position: [-2, 0, 4], color: "crimson" },
  { position: [0, 0, 4], color: "darkblue" },
  { position: [2, 0, 4], color: "darkgreen" },
  { position: [4, 0, 4], color: "darkorange" },
  { position: [-4, 0, 6], color: "darkred" },
  { position: [-2, 0, 6], color: "goldenrod" },
  { position: [0, 0, 6], color: "lightseagreen" },
  { position: [2, 0, 6], color: "mediumorchid" },
  { position: [4, 0, 6], color: "royalblue" },
];

interface Props {
  position: number[];
  color: string;
}

function Box({ position, color }: Props) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_state, delta) => (ref.current.rotation.x += delta));
  return (
    <mesh
      position={new THREE.Vector3(position[0], position[1], position[2])}
      ref={ref}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Cylinder({ position, color }: Props) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_state, delta) => (ref.current.rotation.z += delta));
  return (
    <mesh
      position={new THREE.Vector3(position[0], position[1], position[2])}
      ref={ref}
    >
      <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Sphere({ position, color }: Props) {
  const ref = useRef<THREE.Mesh>(null!);
  return (
    <mesh
      position={new THREE.Vector3(position[0], position[1], position[2])}
      ref={ref}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

const Scene = () => {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 5, 5);
  }, [camera]);
  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      {boxData.map((box, index) => (
        <Box key={`box-${index}`} position={box.position} color={box.color} />
      ))}
      {cylinderData.map((cylinder, index) => (
        <Cylinder
          key={`cylinder-${index}`}
          position={cylinder.position}
          color={cylinder.color}
        />
      ))}
      {sphereData.map((sphere, index) => (
        <Sphere
          key={`sphere-${index}`}
          position={sphere.position}
          color={sphere.color}
        />
      ))}
    </>
  );
};

export const Fiber = () => {
  const [OrbitControls, events] = useControls();
  return (
    <View style={{ flex: 1 }} {...events}>
      <FiberCanvas style={{ flex: 1 }}>
        <OrbitControls />
        <Scene />
      </FiberCanvas>
    </View>
  );
};
export default Fiber;
