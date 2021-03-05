import React from 'react';
import { PixelRatio, StyleSheet, View } from 'react-native';
import { Canvas } from 'react-three-fiber';
import { PCFSoftShadowMap, sRGBEncoding } from 'three';

import { FaceModel } from './FaceModel';

export default function MaskView({
  tensorSize,
  face,
  isFlipped = false,
}) {
  const [size, setSize] = React.useState({
    width: 0,
    height: 0,
  });

  return (
    <View
      onLayout={({
        nativeEvent: {
          layout: { width, height },
        },
      }) => {
        if (size.width !== width && size.height !== height) {
          setSize({ width, height });
        }
      }}
      style={[styles.container, StyleSheet.absoluteFill]}
    >
      <Canvas
        orthographic
        camera={{
          zoom: PixelRatio.get(),
          left: -0.5 * size.width,
          right: 0.5 * size.width,
          top: 0.5 * size.height,
          bottom: -0.5 * size.height,
          near: -1000,
          far: 1000,
        }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = PCFSoftShadowMap;
          gl.outputEncoding = sRGBEncoding;
        }}
      >
        <MainSpotLight />
        <hemisphereLight args={[0xffffbb, 0x080820, 0.25]} />
        <ambientLight args={[0x404040, 0.25]} />
        <FaceModel
          width={tensorSize.width}
          height={tensorSize.height}
          face={face}
          isFlipped={isFlipped}
        />
      </Canvas>
    </View>
  );
}

function MainSpotLight() {
  const ref = React.useRef();

  React.useEffect(() => {
    if (ref.current) {
      ref.current.position.set(0.5, 0.5, 1);
      ref.current.position.multiplyScalar(400);

      ref.current.shadow.mapSize.width = 1024;
      ref.current.shadow.mapSize.height = 1024;

      ref.current.shadow.camera.near = 200;
      ref.current.shadow.camera.far = 800;

      ref.current.shadow.camera.fov = 40;

      ref.current.shadow.bias = -0.001125;
    }
  }, [ref]);
  return <spotLight ref={ref} args={[0xffffbb, 1]} castShadow />;
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    flex: 1,
  },
});
