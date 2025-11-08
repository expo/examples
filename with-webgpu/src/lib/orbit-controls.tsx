// https://github.com/wcandillon/react-native-webgpu/blob/578ad989b4326724702b14245d5c82622849ee23/apps/example/src/ThreeJS/components/OrbitControl.tsx#L1C1-L649C2
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-destructuring */

import type { Matrix4, OrthographicCamera, PerspectiveCamera } from "three/webgpu";
import { Quaternion, Spherical, Vector2, Vector3 } from "three/webgpu";
import type { GestureResponderEvent, LayoutChangeEvent } from "react-native";
import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";

const EPSILON = 0.000001;

const STATE = {
  NONE: 0,
  ROTATE: 1,
  DOLLY: 2,
};

const partialScope = {
  camera: undefined as PerspectiveCamera | OrthographicCamera | undefined,

  enabled: true,

  // We will override this later. A new vector ins't created here because it
  // could cause problems when there is more than one controls on the screen
  // (which could share the same `target` object, if we created it here).
  target: undefined as unknown as Vector3,

  minZoom: 0,
  maxZoom: Infinity,

  // How far you can orbit vertically, upper and lower limits.
  // Range is 0 to PI radians.
  minPolarAngle: 0,
  maxPolarAngle: Math.PI,

  // How far you can orbit horizontally, upper and lower limits.
  // If set, the interval [min, max] must be a sub-interval of
  // [-2 PI, 2 PI], with (max - min < 2 PI)
  minAzimuthAngle: -Infinity,
  maxAzimuthAngle: Infinity,

  // inertia
  dampingFactor: 0.05,

  enableZoom: true,
  zoomSpeed: 1.0,

  enableRotate: true,
  rotateSpeed: 1.0,

  enablePan: true,
  panSpeed: 1.0,

  ignoreQuickPress: false,
};

export function createControls() {
  let height = 0;

  const scope = {
    ...partialScope,
    target: new Vector3(),
    onChange: (_event: { target: typeof partialScope }) => {},
  };

  const internals = {
    moveStart: new Vector3(),
    rotateStart: new Vector2(),
    rotateEnd: new Vector2(),
    rotateDelta: new Vector2(),
    dollyStart: 0,
    dollyEnd: 0,
    panStart: new Vector2(),
    panEnd: new Vector2(),
    panDelta: new Vector2(),
    panOffset: new Vector3(),

    spherical: new Spherical(),
    sphericalDelta: new Spherical(),

    scale: 1,

    state: STATE.NONE,
  };

  const functions = {
    shouldClaimTouch(event: GestureResponderEvent) {
      // If there's 1 touch it may not be related to orbit controls,
      // therefore we delay "claiming" the touch, as on older devices this stops the
      // event propagation to prevent bubbling.
      // This option is disabled by default because on newer devices (I tested on
      // Android 8+ and iOS 15+) this behavior is (happily) inexistent (the
      // propagation only stops if the code explicitly tells it to do so).
      // See https://github.com/TiagoCavalcante/r3f-native-orbitcontrols/issues/27
      // Unfortunately, this feature may cause bugs in newer devices or browsers,
      // where the first presses (quick or long) aren't detected.
      // See https://github.com/TiagoCavalcante/r3f-native-orbitcontrols/issues/30
      // See https://github.com/TiagoCavalcante/r3f-native-orbitcontrols/issues/31
      // Therefore it is **not** recommended to enable it if you are targeting newer
      // devices.
      // There are other options to fix this behavior on older devices:
      //   1. Use the events `onTouchStart`, `onTouchMove`, `onTouchEnd`,
      //      `onTouchCancel` from @react-three/fiber's `Canvas`. I didn't choose this
      //      option because it seems to be slower than using the gesture responder
      //      system directly, and it would also make it harder to use these events
      //      in the `Canvas`.
      //   2. Add a transparent `Plane` that covers the whole screen and use its
      //      touch events, which are exposed by @react-three/fiber. I didn't choose
      //      this option because it would hurt performance and just seems to be too
      //      hacky.
      //   3. Use `View`'s `onTouchStart`, `onTouchMove`, etc. I think this would have
      //      the same behavior in older devices, but I still didn't test it. If you
      //      want me to test it, please just open an issue.
      // Note that using @react-three/fiber's
      // `useThree().gl.domElement.addEventListener` doesn't work, just look at the
      // code of the function:
      // https://github.com/pmndrs/react-three-fiber/blob/6c830bd793cfd15d980299f2582f8a70cc53e30c/packages/fiber/src/native/Canvas.tsx#L83-L84
      // Ideally, this should be fixed by implementing something like an
      // `addEventListener`-like in @react-three/fiber.
      // I have suggested this feature here:
      // https://github.com/pmndrs/react-three-fiber/issues/3173
      if (!scope.ignoreQuickPress) {
        return true;
      }

      if (event.nativeEvent.touches.length === 1) {
        const {
          locationX: x,
          locationY: y,
          timestamp: t,
        } = event.nativeEvent.touches[0];

        const dx = Math.abs(internals.moveStart.x - x);
        const dy = Math.abs(internals.moveStart.y - y);
        const dt = Math.pow(internals.moveStart.z - t, 2);

        if (
          !internals.moveStart.length() ||
          (dx * dt <= 1000 && dy * dt <= 1000)
        ) {
          internals.moveStart.set(x, y, t);
          return false;
        }

        internals.moveStart.set(0, 0, 0);
      }

      return true;
    },

    handleTouchStartRotate(event: GestureResponderEvent) {
      if (event.nativeEvent.touches.length === 1) {
        internals.rotateStart.set(
          event.nativeEvent.touches[0].locationX,
          event.nativeEvent.touches[0].locationY,
        );
      } else if (event.nativeEvent.touches.length === 2) {
        const x =
          0.5 *
          (event.nativeEvent.touches[0].locationX +
            event.nativeEvent.touches[1].locationX);
        const y =
          0.5 *
          (event.nativeEvent.touches[0].locationY +
            event.nativeEvent.touches[1].locationY);

        internals.rotateStart.set(x, y);
      }
    },

    handleTouchStartDolly(event: GestureResponderEvent) {
      // Ensures this isn't undefined.
      if (event.nativeEvent.touches.length === 2) {
        const dx =
          event.nativeEvent.touches[0].locationX -
          event.nativeEvent.touches[1].locationX;
        const dy =
          event.nativeEvent.touches[0].locationY -
          event.nativeEvent.touches[1].locationY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        internals.dollyStart = distance;
      }
    },

    handleTouchStartPan(event: GestureResponderEvent) {
      if (event.nativeEvent.touches.length === 1) {
        internals.panStart.set(
          event.nativeEvent.touches[0].locationX,
          event.nativeEvent.touches[0].locationY,
        );
      } else if (event.nativeEvent.touches.length === 2) {
        const x =
          0.5 *
          (event.nativeEvent.touches[0].locationX +
            event.nativeEvent.touches[1].locationX);
        const y =
          0.5 *
          (event.nativeEvent.touches[0].locationY +
            event.nativeEvent.touches[1].locationY);

        internals.panStart.set(x, y);
      }
    },

    handleTouchStartDollyPan(event: GestureResponderEvent) {
      if (scope.enableZoom) {
        this.handleTouchStartDolly(event);
      }
      if (scope.enablePan) {
        this.handleTouchStartPan(event);
      }
    },

    onTouchStart(event: GestureResponderEvent) {
      switch (event.nativeEvent.touches.length) {
        case STATE.ROTATE:
          if (!scope.enableRotate) {
            return;
          }
          this.handleTouchStartRotate(event);
          internals.state = STATE.ROTATE;

          break;

        case STATE.DOLLY:
          if (!scope.enableZoom && !scope.enablePan) {
            return;
          }
          this.handleTouchStartDollyPan(event);
          internals.state = STATE.DOLLY;

          break;

        default:
          internals.state = STATE.NONE;
      }
    },

    rotateLeft(angle: number) {
      internals.sphericalDelta.theta -= angle;
    },

    rotateUp(angle: number) {
      internals.sphericalDelta.phi -= angle;
    },

    handleTouchMoveRotate(event: GestureResponderEvent) {
      if (event.nativeEvent.touches.length === 1) {
        internals.rotateEnd.set(
          event.nativeEvent.locationX,
          event.nativeEvent.locationY,
        );
      } else if (event.nativeEvent.touches.length === 2) {
        const x =
          0.5 *
          (event.nativeEvent.touches[0].locationX +
            event.nativeEvent.touches[1].locationX);
        const y =
          0.5 *
          (event.nativeEvent.touches[0].locationY +
            event.nativeEvent.touches[1].locationY);
        internals.rotateEnd.set(x, y);
      }

      internals.rotateDelta
        .subVectors(internals.rotateEnd, internals.rotateStart)
        .multiplyScalar(scope.rotateSpeed);

      // Avoid division by 0.
      if (height) {
        // yes, height
        this.rotateLeft((2 * Math.PI * internals.rotateDelta.x) / height);
        this.rotateUp((2 * Math.PI * internals.rotateDelta.y) / height);
      }

      internals.rotateStart.copy(internals.rotateEnd);
    },

    dollyOut(dollyScale: number) {
      internals.scale /= dollyScale;
    },

    handleTouchMoveDolly(event: GestureResponderEvent) {
      // Ensures this isn't undefined.
      if (event.nativeEvent.touches.length === 2) {
        const dx =
          event.nativeEvent.touches[0].locationX -
          event.nativeEvent.touches[1].locationX;
        const dy =
          event.nativeEvent.touches[0].locationY -
          event.nativeEvent.touches[1].locationY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        internals.dollyEnd = distance;
        this.dollyOut(
          Math.pow(internals.dollyEnd / internals.dollyStart, scope.zoomSpeed),
        );
        internals.dollyStart = internals.dollyEnd;
      }
    },

    panLeft(distance: number, objectMatrix: Matrix4) {
      const v = new Vector3();

      v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
      v.multiplyScalar(-distance);

      internals.panOffset.add(v);
    },

    panUp(distance: number, objectMatrix: Matrix4) {
      const v = new Vector3();

      v.setFromMatrixColumn(objectMatrix, 1);
      v.multiplyScalar(distance);

      internals.panOffset.add(v);
    },

    pan(deltaX: number, deltaY: number) {
      if (!scope.camera) {
        return;
      }

      const { position } = scope.camera;

      let targetDistance = position.clone().sub(scope.target).length();

      const linearSquare =
        // interpolate between x and x²
        (x: number) => x + (1 - Math.exp(-x / 10000)) * (x * x - x + 1 / 4);

      const distanceScale = (scope.camera as PerspectiveCamera)
        .isPerspectiveCamera
        ? // half of the fov is center to top of screen
          (scope.camera as PerspectiveCamera).fov / 2
        : // scale the zoom speed by a factor of 300
          (1 / linearSquare(scope.camera.zoom)) * scope.zoomSpeed * 300;

      targetDistance *= Math.tan((distanceScale * Math.PI) / 180.0);

      // Avoid division by 0.
      if (height) {
        // we use only height here so aspect ratio does not distort speed
        this.panLeft(
          (2 * deltaX * targetDistance) / height,
          scope.camera.matrix,
        );
        this.panUp((2 * deltaY * targetDistance) / height, scope.camera.matrix);
      }
    },

    handleTouchMovePan(event: GestureResponderEvent) {
      if (event.nativeEvent.touches.length === 1) {
        internals.panEnd.set(
          event.nativeEvent.locationX,
          event.nativeEvent.locationY,
        );
      } else if (event.nativeEvent.touches.length === 2) {
        const x =
          0.5 *
          (event.nativeEvent.touches[0].locationX +
            event.nativeEvent.touches[1].locationX);
        const y =
          0.5 *
          (event.nativeEvent.touches[0].locationY +
            event.nativeEvent.touches[1].locationY);
        internals.panEnd.set(x, y);
      } else {
        return;
      }

      internals.panDelta
        .subVectors(internals.panEnd, internals.panStart)
        .multiplyScalar(scope.panSpeed);
      this.pan(internals.panDelta.x, internals.panDelta.y);
      internals.panStart.copy(internals.panEnd);
    },

    handleTouchMoveDollyPan(event: GestureResponderEvent) {
      if (scope.enableZoom) {
        this.handleTouchMoveDolly(event);
      }
      if (scope.enablePan) {
        this.handleTouchMovePan(event);
      }
    },

    onTouchMove(event: GestureResponderEvent) {
      switch (internals.state) {
        case STATE.ROTATE:
          if (!scope.enableRotate) {
            return;
          }
          this.handleTouchMoveRotate(event);
          update();
          break;

        case STATE.DOLLY:
          if (!scope.enableZoom && !scope.enablePan) {
            return;
          }
          this.handleTouchMoveDollyPan(event);
          update();
          break;

        default:
          internals.state = STATE.NONE;
      }
    },
  };

  const update = (() => {
    const offset = new Vector3();

    const lastPosition = new Vector3();
    const lastQuaternion = new Quaternion();

    const twoPI = 2 * Math.PI;

    return () => {
      if (!scope.camera) {
        return;
      }

      const { position } = scope.camera;

      // so camera.up is the orbit axis
      const quat = new Quaternion().setFromUnitVectors(
        scope.camera.up,
        new Vector3(0, 1, 0),
      );
      const quatInverse = quat.clone().invert();

      offset.copy(position).sub(scope.target);

      // rotate offset to "y-axis-is-up" space
      offset.applyQuaternion(quat);

      // angle from z-axis around y-axis
      internals.spherical.setFromVector3(offset);

      internals.spherical.theta +=
        internals.sphericalDelta.theta * scope.dampingFactor;
      internals.spherical.phi +=
        internals.sphericalDelta.phi * scope.dampingFactor;

      // restrict theta to be between desired limits

      let min = scope.minAzimuthAngle;
      let max = scope.maxAzimuthAngle;

      if (isFinite(min) && isFinite(max)) {
        if (min < -Math.PI) {
          min += twoPI;
        } else if (min > Math.PI) {
          min -= twoPI;
        }

        if (max < -Math.PI) {
          max += twoPI;
        } else if (max > Math.PI) {
          max -= twoPI;
        }

        if (min <= max) {
          internals.spherical.theta = Math.max(
            min,
            Math.min(max, internals.spherical.theta),
          );
        } else {
          internals.spherical.theta =
            internals.spherical.theta > (min + max) / 2
              ? Math.max(min, internals.spherical.theta)
              : Math.min(max, internals.spherical.theta);
        }
      }

      // restrict phi to be between desired limits
      internals.spherical.phi = Math.max(
        scope.minPolarAngle + EPSILON,
        Math.min(scope.maxPolarAngle - EPSILON, internals.spherical.phi),
      );

      if ((scope.camera as PerspectiveCamera).isPerspectiveCamera) {
        internals.spherical.radius *= internals.scale;
      } else {
        scope.camera.zoom = Math.max(
          Math.min(
            scope.camera.zoom / (internals.scale * scope.zoomSpeed),
            scope.maxZoom,
          ),
          scope.minZoom,
        );
        scope.camera.updateProjectionMatrix();
      }

      // restrict radius to be between desired limits
      internals.spherical.radius = Math.max(
        scope.minZoom,
        Math.min(scope.maxZoom, internals.spherical.radius),
      );

      // move target to panned location

      scope.target.addScaledVector(internals.panOffset, scope.dampingFactor);

      offset.setFromSpherical(internals.spherical);

      // rotate offset back to "camera-up-vector-is-up" space
      offset.applyQuaternion(quatInverse);

      position.copy(scope.target).add(offset);

      scope.camera.lookAt(scope.target);

      internals.sphericalDelta.theta *= 1 - scope.dampingFactor;
      internals.sphericalDelta.phi *= 1 - scope.dampingFactor;

      internals.panOffset.multiplyScalar(1 - scope.dampingFactor);

      internals.scale = 1;

      // update condition is:
      // min(camera displacement, camera rotation in radians)^2 > EPSILON
      // using small-angle approximation cos(x/2) = 1 - x^2 / 8
      if (
        lastPosition.distanceToSquared(scope.camera.position) > EPSILON ||
        8 * (1 - lastQuaternion.dot(scope.camera.quaternion)) > EPSILON
      ) {
        //invalidate()

        scope.onChange({ target: scope });

        lastPosition.copy(scope.camera.position);
        lastQuaternion.copy(scope.camera.quaternion);
      }
    };
  })();

  return {
    scope,

    functions: {
      ...functions,
      update,
    },

    events: {
      // Equivalent to componentDidMount.
      onLayout(event: LayoutChangeEvent) {
        height = event.nativeEvent.layout.height;
      },

      // See https://reactnative.dev/docs/gesture-responder-system
      onStartShouldSetResponder(event: GestureResponderEvent) {
        // On some devices this fires only for 2+ touches.
        if (!scope.enabled || !functions.shouldClaimTouch(event)) {
          return false;
        }

        functions.onTouchStart(event);

        return true;
      },

      onMoveShouldSetResponder(event: GestureResponderEvent) {
        // And on the same devices this fires only for 1 touch.
        if (!scope.enabled || !functions.shouldClaimTouch(event)) {
          return false;
        }

        functions.onTouchStart(event);

        return true;
      },

      onResponderMove(event: GestureResponderEvent) {
        if (internals.state !== event.nativeEvent.touches.length) {
          functions.onTouchStart(event);
        }

        functions.onTouchMove(event);
      },

      onResponderRelease() {
        internals.state = STATE.NONE;
      },
    },
  };
}

type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type OrbitControlsProps = Partial<
  Omit<ReturnType<typeof createControls>["scope"], "camera">
>;

export type OrbitControlsChangeEvent = Parameters<
  ReturnType<typeof createControls>["scope"]["onChange"]
>[0];

type OrbitControlsInternalProps = OrbitControlsProps & {
  controls: ReturnType<typeof createControls>;
};

function OrbitControls({ controls, ...props }: OrbitControlsInternalProps) {
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    if (
      (camera as PerspectiveCamera).isPerspectiveCamera ||
      (camera as OrthographicCamera).isOrthographicCamera
    ) {
      controls.scope.camera = camera as PerspectiveCamera | OrthographicCamera;
    } else {
      throw new Error(
        "The camera must be a PerspectiveCamera or OrthographicCamera to orbit controls work",
      );
    }
  }, [camera]);

  useEffect(() => {
    for (const prop in props) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (controls.scope[prop as keyof typeof controls.scope] as any) =
        props[prop as keyof typeof props];
    }
  }, [props]);

  useFrame(controls.functions.update, -1);

  return null as unknown as JSX.Element;
}

// eslint-disable-next-line import/no-default-export
export default function useControls() {
  const controls = useMemo(() => createControls(), []);

  return [
    (props: OrbitControlsProps) => (
      <OrbitControls controls={controls} {...props} />
    ),
    controls.events,
  ] as const;
}