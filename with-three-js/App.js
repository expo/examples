import Expo from 'expo';
import ExpoTHREE from 'expo-three';
import React from 'react';
import * as THREE from 'three';
import { StyleSheet, Text, View } from 'react-native';

console.disableYellowBox = true;

let animationStack = [];
let animationKeys = {};

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

const createCubeMesh = async ({ scene, gl }) => {
  const geometry = new THREE.BoxGeometry(40, 40, 70);
  const material = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.7,
    map: await ExpoTHREE.createTextureAsync({
      asset: Expo.Asset.fromModule(require('./assets/ice.jpg')),
    }),
  });

  const cube = new THREE.Mesh(geometry, material);
  cube.position.y = getRandomArbitrary(-60, 60);

  scene.add(cube);
  return cube;
};

export default class App extends React.Component {
  render() {
    return <Expo.GLView style={{ flex: 1 }} onContextCreate={this._handleContextCreate} />;
  }

  _handleContextCreate = async gl => {
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#ECECEC');

    // Camera
    const camera = new THREE.PerspectiveCamera(
      70,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.y = 0;
    camera.position.z = 150;
    camera.position.x = 150;

    const renderer = ExpoTHREE.createRenderer({ gl, antialias: true });
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const cube = await createCubeMesh({ scene, gl });
    animationStack.push({
      id: cube.id,
      iterations: 0,
      mesh: cube,
      rotationZ: 0.01,
      rotationX: getRandomArbitrary(-0.01, 0.01),
    });

    let totalIterations = 0;

    const render = async () => {
      requestAnimationFrame(render);
      totalIterations += 1;

      if (totalIterations > 70) {
        const cube = await createCubeMesh({ scene, gl });

        animationStack.push({
          id: cube.id,
          iterations: 0,
          mesh: cube,
          rotationZ: 0.01,
          rotationX: getRandomArbitrary(-0.01, 0.01),
        });

        totalIterations = 0;
      }

      animationStack.forEach(entity => {
        if (entity) {
          entity.iterations += 1;
          entity.mesh.position.x += 1;
          entity.mesh.rotation.z += entity.rotationZ;
          entity.mesh.rotation.x += entity.rotationX;
        }

        if (entity.iterations > gl.drawingBufferWidth) {
          animationKeys[entity.id] = true;
          scene.remove(entity.mesh);
        }
      });

      animationStack = animationStack.filter(entity => {
        return !animationKeys[entity.id];
      });

      animationKeys = {};

      renderer.render(scene, camera);

      gl.endFrameEXP();
    };

    render();
  };
}
