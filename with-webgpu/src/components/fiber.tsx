import * as THREE from "three/webgpu";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { FiberCanvas } from "@/lib/fiber-canvas";

function Cube() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta * 0.7;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#60a5fa" />
    </mesh>
  );
}

export default function Fiber() {
  return (
    <FiberCanvas style={{ flex: 1 }}>
      <color attach="background" args={["#111827"]} />
      <ambientLight intensity={Math.PI / 2} />
      <directionalLight position={[3, 4, 5]} intensity={Math.PI} />
      <Cube />
    </FiberCanvas>
  );
}
