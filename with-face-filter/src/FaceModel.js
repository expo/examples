import { TextureLoader } from 'expo-three';
import React from 'react';
import { PixelRatio } from 'react-native';
import { extend, useFrame } from 'react-three-fiber';
import { DoubleSide } from 'three';

import { FaceGeometry } from 'three-tfjs-face-geometry';

extend({ FaceGeometry });

export function FaceModel({ isFlipped, face, width, height }) {
  return (
    <mesh>
      <CustomFaceGeometry
        attach="geometry"
        face={face}
        isFlipped={isFlipped}
        width={width}
        height={height}
      />
      <FaceColorTexture attach="material" />
    </mesh>
  );
}

function CustomFaceGeometry({
  width,
  height,
  isFlipped,
  useVideoTexture,
  face,
  ...props
}) {
  const ref = React.useRef(null);

  useFrame(() => {
    if (face.current && ref.current) {
      // Update face mesh geometry with new data.
      ref.current.update(face.current, isFlipped);
    }
  });

  return (
    <React.Fragment>
      <faceGeometry
        ref={ref}
        {...props}
        args={[{ useVideoTexture }]}
        w={width}
        h={height}
      />
      <ClownNose faceGeometry={ref} />
    </React.Fragment>
  );
}

function FaceColorTexture({ ...props }) {
  const colorTexture = React.useMemo(
    () => new TextureLoader().load(require("../assets/mesh_map.jpg")),
    []
  );
  const aoTexture = React.useMemo(
    () => new TextureLoader().load(require("../assets/ao.jpg")),
    []
  );
  const alphaTexture = React.useMemo(
    () => new TextureLoader().load(require("../assets/mask.png")),
    []
  );

  return (
    <meshStandardMaterial
      color={0xff00ff}
      roughness={0.8}
      opacity={0.9}
      metalness={0.1}
      alphaMap={alphaTexture}
      aoMap={aoTexture}
      map={colorTexture}
      roughnessMap={colorTexture}
      transparent={true}
      side={DoubleSide}
      {...props}
    />
  );
}

function ClownNose({ faceGeometry }) {
    const ref = React.useRef();
  
    useFrame(() => {
      if (ref.current && faceGeometry.current) {
        // Modify nose position and orientation.
        const track = faceGeometry.current.track(5, 45, 275);
        ref.current.position.copy(track.position);
        ref.current.rotation.setFromRotationMatrix(track.rotation);
      }
    });
  
    React.useEffect(() => {
      if (ref.current) {
        ref.current.scale.setScalar(20 / PixelRatio.get());
      }
    }, [ref]);
  
    return (
      <mesh ref={ref} receiveShadow castShadow>
        <meshStandardMaterial
          attach="material"
          color={0xff2010}
          roughness={0.4}
          metalness={0.1}
          transparent
        />
        <icosahedronGeometry attach="geometry" args={[1, 3]} />
      </mesh>
    );
  }
  