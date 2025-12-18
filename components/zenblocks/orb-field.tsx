import React, { useRef, useEffect, useState } from "react";
import {
  Clock,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  WebGLRendererParameters,
  SRGBColorSpace,
  MathUtils,
  Vector2,
  Vector3,
  Quaternion,
  MeshPhysicalMaterial,
  Color,
  Object3D,
  InstancedMesh,
  PMREMGenerator,
  AmbientLight,
  PointLight,
  ACESFilmicToneMapping,
  Raycaster,
  Plane,
  Matrix4,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Observer } from "gsap/Observer";
import { gsap } from "gsap";
import { motion, useInView, MotionProps } from "framer-motion";
import { JSX } from "react";

gsap.registerPlugin(Observer);

/* ==========================================================================
   COMPONENT: ORB FIELD (Formerly Ballpit)
   ========================================================================== */

export interface OrbFieldProps {
  className?: string;
  colors?: number[];
  count?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  followCursor?: boolean;
  ambientColor?: number;
  ambientIntensity?: number;
  lightIntensity?: number;
  minSize?: number;
  maxSize?: number;
  maxVelocity?: number;
  size0?: number; // Size of the lead orb
  materialParams?: {
    metalness?: number;
    roughness?: number;
    clearcoat?: number;
    clearcoatRoughness?: number;
    transmission?: number;
    ior?: number;
  };
}

interface OrbFieldConfig {
  canvas?: HTMLCanvasElement;
  id?: string;
  rendererOptions?: Partial<WebGLRendererParameters>;
  size?: "parent" | { width: number; height: number };
}

interface SizeData {
  width: number;
  height: number;
  wWidth: number;
  wHeight: number;
  ratio: number;
  pixelRatio: number;
}

interface PhysicsConfig {
  count: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  maxSize: number;
  minSize: number;
  size0: number;
  gravity: number;
  friction: number;
  wallBounce: number;
  maxVelocity: number;
  controlOrb0?: boolean;
  followCursor?: boolean;
  colors: number[];
  ambientColor: number;
  ambientIntensity: number;
  lightIntensity: number;
  materialParams: {
    metalness?: number;
    roughness?: number;
    clearcoat?: number;
    clearcoatRoughness?: number;
    transmission?: number;
    ior?: number;
  };
}

class OrbFieldScene {
  #config: OrbFieldConfig;
  #postprocessing: any;
  #resizeObserver?: ResizeObserver;
  #intersectionObserver?: IntersectionObserver;
  #resizeTimer?: number;
  #animationFrameId: number = 0;
  #clock: Clock = new Clock();
  #animationState = { elapsed: 0, delta: 0 };
  #isAnimating: boolean = false;
  #isVisible: boolean = false;

  canvas!: HTMLCanvasElement;
  camera!: PerspectiveCamera;
  cameraMinAspect?: number;
  cameraMaxAspect?: number;
  cameraFov!: number;
  maxPixelRatio?: number;
  minPixelRatio?: number;
  scene!: Scene;
  renderer!: WebGLRenderer;
  size: SizeData = {
    width: 0,
    height: 0,
    wWidth: 0,
    wHeight: 0,
    ratio: 0,
    pixelRatio: 0,
  };

  render: () => void = this.#render.bind(this);
  onBeforeRender: (state: { elapsed: number; delta: number }) => void =
    () => {};
  onAfterRender: (state: { elapsed: number; delta: number }) => void = () => {};
  onAfterResize: (size: SizeData) => void = () => {};
  isDisposed: boolean = false;

  constructor(config: OrbFieldConfig) {
    this.#config = { ...config };
    this.#initCamera();
    this.#initScene();
    this.#initRenderer();
    this.resize();
    this.#initObservers();
  }

  #initCamera() {
    this.camera = new PerspectiveCamera();
    this.cameraFov = this.camera.fov;
  }

  #initScene() {
    this.scene = new Scene();
  }

  #initRenderer() {
    if (this.#config.canvas) {
      this.canvas = this.#config.canvas;
    } else if (this.#config.id) {
      const elem = document.getElementById(this.#config.id);
      if (elem instanceof HTMLCanvasElement) {
        this.canvas = elem;
      } else {
        console.error("Three: Missing canvas or id parameter");
      }
    } else {
      console.error("Three: Missing canvas or id parameter");
    }
    this.canvas!.style.display = "block";

    // Ensure alpha is true for transparent background
    const rendererOptions: WebGLRendererParameters = {
      canvas: this.canvas,
      powerPreference: "high-performance",
      alpha: true,
      ...(this.#config.rendererOptions ?? {}),
    };

    this.renderer = new WebGLRenderer(rendererOptions);
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.setClearColor(0x000000, 0); // Explicitly set clear color to transparent
  }

  #initObservers() {
    if (!(this.#config.size instanceof Object)) {
      window.addEventListener("resize", this.#onResize.bind(this));
      if (this.#config.size === "parent" && this.canvas.parentNode) {
        this.#resizeObserver = new ResizeObserver(this.#onResize.bind(this));
        this.#resizeObserver.observe(this.canvas.parentNode as Element);
      }
    }
    this.#intersectionObserver = new IntersectionObserver(
      this.#onIntersection.bind(this),
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );
    this.#intersectionObserver.observe(this.canvas);
    document.addEventListener(
      "visibilitychange",
      this.#onVisibilityChange.bind(this)
    );
  }

  #onResize() {
    if (this.#resizeTimer) clearTimeout(this.#resizeTimer);
    this.#resizeTimer = window.setTimeout(this.resize.bind(this), 100);
  }

  resize() {
    let w: number, h: number;
    if (this.#config.size instanceof Object) {
      w = this.#config.size.width;
      h = this.#config.size.height;
    } else if (this.#config.size === "parent" && this.canvas.parentNode) {
      w = (this.canvas.parentNode as HTMLElement).offsetWidth;
      h = (this.canvas.parentNode as HTMLElement).offsetHeight;
    } else {
      w = window.innerWidth;
      h = window.innerHeight;
    }
    this.size.width = w;
    this.size.height = h;
    this.size.ratio = w / h;
    this.#updateCamera();
    this.#updateRenderer();
    this.onAfterResize(this.size);
  }

  #updateCamera() {
    this.camera.aspect = this.size.width / this.size.height;
    if (this.camera.isPerspectiveCamera && this.cameraFov) {
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {
        this.#adjustFov(this.cameraMinAspect);
      } else if (
        this.cameraMaxAspect &&
        this.camera.aspect > this.cameraMaxAspect
      ) {
        this.#adjustFov(this.cameraMaxAspect);
      } else {
        this.camera.fov = this.cameraFov;
      }
    }
    this.camera.updateProjectionMatrix();
    this.updateWorldSize();
  }

  #adjustFov(aspect: number) {
    const tanFov = Math.tan(MathUtils.degToRad(this.cameraFov / 2));
    const newTan = tanFov / (this.camera.aspect / aspect);
    this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(newTan));
  }

  updateWorldSize() {
    if (this.camera.isPerspectiveCamera) {
      const fovRad = (this.camera.fov * Math.PI) / 180;
      this.size.wHeight =
        2 * Math.tan(fovRad / 2) * this.camera.position.length();
      this.size.wWidth = this.size.wHeight * this.camera.aspect;
    } else if ((this.camera as any).isOrthographicCamera) {
      const cam = this.camera as any;
      this.size.wHeight = cam.top - cam.bottom;
      this.size.wWidth = cam.right - cam.left;
    }
  }

  #updateRenderer() {
    this.renderer.setSize(this.size.width, this.size.height);
    this.#postprocessing?.setSize(this.size.width, this.size.height);
    let pr = window.devicePixelRatio;
    if (this.maxPixelRatio && pr > this.maxPixelRatio) {
      pr = this.maxPixelRatio;
    } else if (this.minPixelRatio && pr < this.minPixelRatio) {
      pr = this.minPixelRatio;
    }
    this.renderer.setPixelRatio(pr);
    this.size.pixelRatio = pr;
  }

  get postprocessing() {
    return this.#postprocessing;
  }
  set postprocessing(value: any) {
    this.#postprocessing = value;
    this.render = value.render.bind(value);
  }

  #onIntersection(entries: IntersectionObserverEntry[]) {
    this.#isAnimating = entries[0].isIntersecting;
    this.#isAnimating ? this.#startAnimation() : this.#stopAnimation();
  }

  #onVisibilityChange() {
    if (this.#isAnimating) {
      document.hidden ? this.#stopAnimation() : this.#startAnimation();
    }
  }

  #startAnimation() {
    if (this.#isVisible) return;
    const animateFrame = () => {
      this.#animationFrameId = requestAnimationFrame(animateFrame);
      this.#animationState.delta = this.#clock.getDelta();
      this.#animationState.elapsed += this.#animationState.delta;
      this.onBeforeRender(this.#animationState);
      this.render();
      this.onAfterRender(this.#animationState);
    };
    this.#isVisible = true;
    this.#clock.start();
    animateFrame();
  }

  #stopAnimation() {
    if (this.#isVisible) {
      cancelAnimationFrame(this.#animationFrameId);
      this.#isVisible = false;
      this.#clock.stop();
    }
  }

  #render() {
    this.renderer.render(this.scene, this.camera);
  }

  clear() {
    this.scene.traverse((obj) => {
      if (
        (obj as any).isMesh &&
        typeof (obj as any).material === "object" &&
        (obj as any).material !== null
      ) {
        Object.keys((obj as any).material).forEach((key) => {
          const matProp = (obj as any).material[key];
          if (
            matProp &&
            typeof matProp === "object" &&
            typeof matProp.dispose === "function"
          ) {
            matProp.dispose();
          }
        });
        (obj as any).material.dispose();
        (obj as any).geometry.dispose();
      }
    });
    this.scene.clear();
  }

  dispose() {
    this.#onResizeCleanup();
    this.#stopAnimation();
    this.clear();
    this.#postprocessing?.dispose();
    this.renderer.dispose();
    this.isDisposed = true;
  }

  #onResizeCleanup() {
    window.removeEventListener("resize", this.#onResize.bind(this));
    this.#resizeObserver?.disconnect();
    this.#intersectionObserver?.disconnect();
    document.removeEventListener(
      "visibilitychange",
      this.#onVisibilityChange.bind(this)
    );
  }
}

class OrbFieldPhysics {
  config: PhysicsConfig;
  positionData: Float32Array;
  velocityData: Float32Array;
  sizeData: Float32Array;
  quaternionData: Float32Array;
  angularVelocityData: Float32Array;
  center: Vector3 = new Vector3();

  constructor(config: PhysicsConfig) {
    this.config = config;
    this.positionData = new Float32Array(3 * config.count).fill(0);
    this.velocityData = new Float32Array(3 * config.count).fill(0);
    this.sizeData = new Float32Array(config.count).fill(1);
    this.quaternionData = new Float32Array(4 * config.count).fill(0);
    this.angularVelocityData = new Float32Array(3 * config.count).fill(0);
    this.center = new Vector3();
    this.#initializePositions();
    this.setSizes();
  }

  #initializePositions() {
    const { config, positionData, quaternionData, angularVelocityData } = this;
    this.center.toArray(positionData, 0);

    // Init rotation for index 0
    const q0 = new Quaternion();
    q0.toArray(quaternionData, 0);

    for (let i = 1; i < config.count; i++) {
      const idx = 3 * i;
      const qIdx = 4 * i;

      // Position - Use wider spread for full screen start
      positionData[idx] = MathUtils.randFloatSpread(2.2 * config.maxX);
      positionData[idx + 1] = MathUtils.randFloatSpread(2.2 * config.maxY);
      positionData[idx + 2] = MathUtils.randFloatSpread(2.2 * config.maxZ);

      // Random Rotation
      const q = new Quaternion().setFromEuler(
        new Object3D().rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ) as any
      );
      q.toArray(quaternionData, qIdx);

      // Random Angular Velocity
      angularVelocityData[idx] = MathUtils.randFloatSpread(0.2);
      angularVelocityData[idx + 1] = MathUtils.randFloatSpread(0.2);
      angularVelocityData[idx + 2] = MathUtils.randFloatSpread(0.2);
    }
  }

  setSizes() {
    const { config, sizeData } = this;
    sizeData[0] = config.size0;
    for (let i = 1; i < config.count; i++) {
      sizeData[i] = MathUtils.randFloat(config.minSize, config.maxSize);
    }
  }

  update(deltaInfo: { delta: number }) {
    const {
      config,
      center,
      positionData,
      sizeData,
      velocityData,
      quaternionData,
      angularVelocityData,
    } = this;

    let startIdx = 0;
    if (config.controlOrb0) {
      startIdx = 1;
      const firstVec = new Vector3().fromArray(positionData, 0);
      firstVec.lerp(center, 0.1).toArray(positionData, 0);
      new Vector3(0, 0, 0).toArray(velocityData, 0);
      new Quaternion().toArray(quaternionData, 0);
      new Vector3(0, 0, 0).toArray(angularVelocityData, 0);
    }

    const damping = 0.98;

    for (let idx = startIdx; idx < config.count; idx++) {
      const base = 3 * idx;
      const qBase = 4 * idx;

      // Linear Movement
      const pos = new Vector3().fromArray(positionData, base);
      const vel = new Vector3().fromArray(velocityData, base);

      vel.y -= deltaInfo.delta * config.gravity * sizeData[idx];
      vel.multiplyScalar(config.friction);
      vel.clampLength(0, config.maxVelocity);
      pos.add(vel);

      pos.toArray(positionData, base);
      vel.toArray(velocityData, base);

      // Angular Movement
      const q = new Quaternion().fromArray(quaternionData, qBase);
      const angVel = new Vector3().fromArray(angularVelocityData, base);

      const rotStep = new Quaternion().setFromEuler(
        new Object3D().rotation.set(angVel.x, angVel.y, angVel.z) as any
      );
      q.multiply(rotStep);
      q.normalize();
      q.toArray(quaternionData, qBase);

      angVel.multiplyScalar(damping);
      angVel.toArray(angularVelocityData, base);
    }

    // Collisions
    for (let idx = startIdx; idx < config.count; idx++) {
      const base = 3 * idx;
      const pos = new Vector3().fromArray(positionData, base);
      const vel = new Vector3().fromArray(velocityData, base);
      const radius = sizeData[idx] * 0.75;

      for (let jdx = idx + 1; jdx < config.count; jdx++) {
        const otherBase = 3 * jdx;
        const otherPos = new Vector3().fromArray(positionData, otherBase);
        const otherVel = new Vector3().fromArray(velocityData, otherBase);
        const diff = new Vector3().copy(otherPos).sub(pos);
        const dist = diff.length();
        const sumRadius = radius + sizeData[jdx] * 0.75;

        if (dist < sumRadius) {
          const overlap = sumRadius - dist;
          const correction = diff.normalize().multiplyScalar(0.5 * overlap);
          const velCorrection = correction
            .clone()
            .multiplyScalar(Math.max(vel.length(), 1));

          pos.sub(correction);
          vel.sub(velCorrection);
          otherPos.add(correction);
          otherVel.add(
            correction.clone().multiplyScalar(Math.max(otherVel.length(), 1))
          );

          const impactStrength = vel.length() + otherVel.length();
          if (impactStrength > 0.1) {
            const tumble = Math.min(impactStrength * 0.05, 0.2);
            this.applyTorque(idx, tumble);
            this.applyTorque(jdx, tumble);
          }

          pos.toArray(positionData, base);
          vel.toArray(velocityData, base);
          otherPos.toArray(positionData, otherBase);
          otherVel.toArray(velocityData, otherBase);
        }
      }

      if (config.controlOrb0) {
        const diff = new Vector3()
          .copy(new Vector3().fromArray(positionData, 0))
          .sub(pos);
        const d = diff.length();
        const sumRadius0 = radius + sizeData[0] * 0.75;
        if (d < sumRadius0) {
          const correction = diff.normalize().multiplyScalar(sumRadius0 - d);
          const velCorrection = correction
            .clone()
            .multiplyScalar(Math.max(vel.length(), 2));
          pos.sub(correction);
          vel.sub(velCorrection);
          this.applyTorque(idx, 0.1);
        }
      }

      // Walls
      let collided = false;
      if (Math.abs(pos.x) + radius > config.maxX) {
        pos.x = Math.sign(pos.x) * (config.maxX - radius);
        vel.x = -vel.x * config.wallBounce;
        collided = true;
      }
      if (config.gravity === 0) {
        if (Math.abs(pos.y) + radius > config.maxY) {
          pos.y = Math.sign(pos.y) * (config.maxY - radius);
          vel.y = -vel.y * config.wallBounce;
          collided = true;
        }
      } else if (pos.y - radius < -config.maxY) {
        pos.y = -config.maxY + radius;
        vel.y = -vel.y * config.wallBounce;
        collided = true;
      }
      const maxBoundary = Math.max(config.maxZ, config.maxSize);
      if (Math.abs(pos.z) + radius > maxBoundary) {
        pos.z = Math.sign(pos.z) * (config.maxZ - radius);
        vel.z = -vel.z * config.wallBounce;
        collided = true;
      }

      if (collided) {
        this.applyTorque(idx, vel.length() * 0.02);
      }

      pos.toArray(positionData, base);
      vel.toArray(velocityData, base);
    }
  }

  applyTorque(idx: number, magnitude: number) {
    const base = 3 * idx;
    this.angularVelocityData[base] += MathUtils.randFloatSpread(magnitude);
    this.angularVelocityData[base + 1] += MathUtils.randFloatSpread(magnitude);
    this.angularVelocityData[base + 2] += MathUtils.randFloatSpread(magnitude);
  }
}

class OrbFieldMeshes extends InstancedMesh {
  config: PhysicsConfig;
  physics: OrbFieldPhysics;
  ambientLight: AmbientLight | undefined;
  light: PointLight | undefined;

  constructor(renderer: WebGLRenderer, params: Partial<PhysicsConfig> = {}) {
    const config = { ...DefaultOrbFieldConfig, ...params };
    const roomEnv = new RoomEnvironment();
    const pmrem = new PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(roomEnv).texture;

    // PREMIUM: RoundedBoxGeometry for bevels
    const geometry = new RoundedBoxGeometry(1, 1, 1, 2, 0.1);

    // PREMIUM: Standard Physical Material without custom shader hacking
    const material = new MeshPhysicalMaterial({
      envMap: envTexture,
      metalness: 0.5, // Increased for better reflection mapping
      roughness: 0.4, // Increased roughness for matte finish
      clearcoat: 0.8, // Reduced clearcoat
      clearcoatRoughness: 0.2,
      transmission: 0,
      flatShading: false,
      ...config.materialParams,
    });

    const rotation = (material as any).envMapRotation;
    if (rotation) {
      rotation.x = -Math.PI / 2;
    }
    super(geometry, material, config.count);
    this.config = config;
    this.physics = new OrbFieldPhysics(config);
    this.#setupLights();
    this.setColors(config.colors);
    (this as any).instanceMatrix.setUsage(35048); // Dynamic draw
  }

  #setupLights() {
    this.ambientLight = new AmbientLight(
      this.config.ambientColor,
      this.config.ambientIntensity
    );
    (this as any).add(this.ambientLight);
    // Tuned lighting
    this.light = new PointLight(
      this.config.colors[0],
      this.config.lightIntensity * 0.5
    );
    (this as any).add(this.light);
  }

  setColors(colors: number[]) {
    if (Array.isArray(colors) && colors.length > 1) {
      const colorUtils = (function (colorsArr: number[]) {
        let baseColors: number[] = colorsArr;
        let colorObjects: Color[] = [];
        baseColors.forEach((col) => {
          colorObjects.push(new Color(col));
        });
        return {
          setColors: (cols: number[]) => {
            baseColors = cols;
            colorObjects = [];
            baseColors.forEach((col) => {
              colorObjects.push(new Color(col));
            });
          },
          getColorAt: (ratio: number, out: Color = new Color()) => {
            const clamped = Math.max(0, Math.min(1, ratio));
            const scaled = clamped * (baseColors.length - 1);
            const idx = Math.floor(scaled);
            const start = colorObjects[idx];
            if (idx >= baseColors.length - 1) return start.clone();
            const alpha = scaled - idx;
            const end = colorObjects[idx + 1];
            out.r = start.r + alpha * (end.r - start.r);
            out.g = start.g + alpha * (end.g - start.g);
            out.b = start.b + alpha * (end.b - start.b);
            return out;
          },
        };
      })(colors);
      for (let idx = 0; idx < (this as any).count; idx++) {
        (this as any).setColorAt(
          idx,
          colorUtils.getColorAt(idx / (this as any).count)
        );
        if (idx === 0) {
          this.light!.color.copy(
            colorUtils.getColorAt(idx / (this as any).count)
          );
        }
      }

      if ((this as any).instanceColor) {
        (this as any).instanceColor.needsUpdate = true;
      }
    }
  }

  update(deltaInfo: { delta: number }) {
    this.physics.update(deltaInfo);
    for (let idx = 0; idx < (this as any).count; idx++) {
      // Compose Matrix manually from Pos, Rot, Scale
      const pos = new Vector3().fromArray(this.physics.positionData, 3 * idx);
      const rot = new Quaternion().fromArray(
        this.physics.quaternionData,
        4 * idx
      );
      const scale = new Vector3().setScalar(this.physics.sizeData[idx]);

      if (idx === 0 && this.config.followCursor === false) {
        scale.setScalar(0);
      }

      M.compose(pos, rot, scale);
      (this as any).setMatrixAt(idx, M);

      if (idx === 0) this.light!.position.copy(pos);
    }
    (this as any).instanceMatrix.needsUpdate = true;
  }
}

const DefaultOrbFieldConfig: PhysicsConfig = {
  count: 200,
  colors: [0, 0, 0],
  ambientColor: 0xffffff,
  ambientIntensity: 1,
  lightIntensity: 200,
  materialParams: {
    metalness: 0.5,
    roughness: 0.4,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
  },
  minSize: 0.5,
  maxSize: 1,
  size0: 1,
  gravity: 0.5,
  friction: 0.9975,
  wallBounce: 0.95,
  maxVelocity: 0.15,
  maxX: 5,
  maxY: 5,
  maxZ: 2,
  controlOrb0: false,
  followCursor: true,
};

const M = new Matrix4();

let globalPointerActive = false;
const pointerPosition = new Vector2();

interface PointerData {
  position: Vector2;
  nPosition: Vector2;
  hover: boolean;
  touching: boolean;
  onEnter: (data: PointerData) => void;
  onMove: (data: PointerData) => void;
  onClick: (data: PointerData) => void;
  onLeave: (data: PointerData) => void;
  dispose?: () => void;
}

const pointerMap = new Map<HTMLElement, PointerData>();

function createPointerData(
  options: Partial<PointerData> & { domElement: HTMLElement }
): PointerData {
  const defaultData: PointerData = {
    position: new Vector2(),
    nPosition: new Vector2(),
    hover: false,
    touching: false,
    onEnter: () => {},
    onMove: () => {},
    onClick: () => {},
    onLeave: () => {},
    ...options,
  };
  if (!pointerMap.has(options.domElement)) {
    pointerMap.set(options.domElement, defaultData);
    if (!globalPointerActive) {
      document.body.addEventListener(
        "pointermove",
        onPointerMove as EventListener
      );
      document.body.addEventListener(
        "pointerleave",
        onPointerLeave as EventListener
      );
      document.body.addEventListener("click", onPointerClick as EventListener);

      document.body.addEventListener(
        "touchstart",
        onTouchStart as EventListener,
        {
          passive: false,
        }
      );
      document.body.addEventListener(
        "touchmove",
        onTouchMove as EventListener,
        {
          passive: false,
        }
      );
      document.body.addEventListener("touchend", onTouchEnd as EventListener, {
        passive: false,
      });
      document.body.addEventListener(
        "touchcancel",
        onTouchEnd as EventListener,
        {
          passive: false,
        }
      );
      globalPointerActive = true;
    }
  }
  defaultData.dispose = () => {
    pointerMap.delete(options.domElement);
    if (pointerMap.size === 0) {
      document.body.removeEventListener(
        "pointermove",
        onPointerMove as EventListener
      );
      document.body.removeEventListener(
        "pointerleave",
        onPointerLeave as EventListener
      );
      document.body.removeEventListener(
        "click",
        onPointerClick as EventListener
      );

      document.body.removeEventListener(
        "touchstart",
        onTouchStart as EventListener
      );
      document.body.removeEventListener(
        "touchmove",
        onTouchMove as EventListener
      );
      document.body.removeEventListener(
        "touchend",
        onTouchEnd as EventListener
      );
      document.body.removeEventListener(
        "touchcancel",
        onTouchEnd as EventListener
      );
      globalPointerActive = false;
    }
  };
  return defaultData;
}

function onPointerMove(e: PointerEvent) {
  pointerPosition.set(e.clientX, e.clientY);
  processPointerInteraction();
}

function processPointerInteraction() {
  for (const [elem, data] of pointerMap) {
    const rect = elem.getBoundingClientRect();
    if (isInside(rect)) {
      updatePointerData(data, rect);
      if (!data.hover) {
        data.hover = true;
        data.onEnter(data);
      }
      data.onMove(data);
    } else if (data.hover && !data.touching) {
      data.hover = false;
      data.onLeave(data);
    }
  }
}

function onTouchStart(e: TouchEvent) {
  if (e.touches.length > 0) {
    e.preventDefault();
    pointerPosition.set(e.touches[0].clientX, e.touches[0].clientY);
    for (const [elem, data] of pointerMap) {
      const rect = elem.getBoundingClientRect();
      if (isInside(rect)) {
        data.touching = true;
        updatePointerData(data, rect);
        if (!data.hover) {
          data.hover = true;
          data.onEnter(data);
        }
        data.onMove(data);
      }
    }
  }
}

function onTouchMove(e: TouchEvent) {
  if (e.touches.length > 0) {
    e.preventDefault();
    pointerPosition.set(e.touches[0].clientX, e.touches[0].clientY);
    for (const [elem, data] of pointerMap) {
      const rect = elem.getBoundingClientRect();
      updatePointerData(data, rect);
      if (isInside(rect)) {
        if (!data.hover) {
          data.hover = true;
          data.touching = true;
          data.onEnter(data);
        }
        data.onMove(data);
      } else if (data.hover && data.touching) {
        data.onMove(data);
      }
    }
  }
}

function onTouchEnd() {
  for (const [, data] of pointerMap) {
    if (data.touching) {
      data.touching = false;
      if (data.hover) {
        data.hover = false;
        data.onLeave(data);
      }
    }
  }
}

function onPointerClick(e: PointerEvent) {
  pointerPosition.set(e.clientX, e.clientY);
  for (const [elem, data] of pointerMap) {
    const rect = elem.getBoundingClientRect();
    updatePointerData(data, rect);
    if (isInside(rect)) data.onClick(data);
  }
}

function onPointerLeave() {
  for (const data of pointerMap.values()) {
    if (data.hover) {
      data.hover = false;
      data.onLeave(data);
    }
  }
}

function updatePointerData(data: PointerData, rect: DOMRect) {
  data.position.set(
    pointerPosition.x - rect.left,
    pointerPosition.y - rect.top
  );
  data.nPosition.set(
    (data.position.x / rect.width) * 2 - 1,
    (-data.position.y / rect.height) * 2 + 1
  );
}

function isInside(rect: DOMRect) {
  return (
    pointerPosition.x >= rect.left &&
    pointerPosition.x <= rect.left + rect.width &&
    pointerPosition.y >= rect.top &&
    pointerPosition.y <= rect.top + rect.height
  );
}

interface CreateOrbFieldReturn {
  three: OrbFieldScene;
  orbs: OrbFieldMeshes;
  setCount: (count: number) => void;
  updateConfig: (params: any) => void;
  togglePause: () => void;
  dispose: () => void;
}

function createOrbField(
  canvas: HTMLCanvasElement,
  config: Partial<OrbFieldConfig & PhysicsConfig> = {}
): CreateOrbFieldReturn {
  const threeInstance = new OrbFieldScene({
    canvas,
    size: "parent",
    rendererOptions: { antialias: true, alpha: true },
  });
  let orbs: OrbFieldMeshes;
  threeInstance.renderer.toneMapping = ACESFilmicToneMapping;
  threeInstance.camera.position.set(0, 0, 20);
  threeInstance.camera.lookAt(0, 0, 0);
  threeInstance.cameraMaxAspect = 1.5;
  threeInstance.resize();

  const initialConfig = {
    ...config,
    maxX: threeInstance.size.wWidth / 2,
    maxY: threeInstance.size.wHeight / 2,
  };

  initialize(initialConfig);

  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);
  const intersectionPoint = new Vector3();
  let isPaused = false;

  canvas.style.touchAction = "none";
  canvas.style.userSelect = "none";
  (canvas.style as any).webkitUserSelect = "none";

  const pointerData = createPointerData({
    domElement: canvas,
    onMove() {
      raycaster.setFromCamera(pointerData.nPosition, threeInstance.camera);
      threeInstance.camera.getWorldDirection(plane.normal);
      raycaster.ray.intersectPlane(plane, intersectionPoint);
      if (orbs) {
        orbs.physics.center.copy(intersectionPoint);
        orbs.config.controlOrb0 = true;
      }
    },
    onLeave() {
      if (orbs) {
        orbs.config.controlOrb0 = false;
      }
    },
  });
  function initialize(cfg: any) {
    if (orbs) {
      threeInstance.clear();
      threeInstance.scene.remove(orbs);
    }
    orbs = new OrbFieldMeshes(threeInstance.renderer, cfg);
    threeInstance.scene.add(orbs);
  }
  threeInstance.onBeforeRender = (deltaInfo) => {
    if (!isPaused && orbs) orbs.update(deltaInfo);
  };
  threeInstance.onAfterResize = (size) => {
    if (orbs) {
      orbs.config.maxX = size.wWidth / 2;
      orbs.config.maxY = size.wHeight / 2;
    }
  };
  return {
    three: threeInstance,
    get orbs() {
      return orbs;
    },
    setCount(count: number) {
      initialize({ ...orbs.config, count });
    },
    updateConfig(params: Partial<PhysicsConfig>) {
      if (orbs && params.colors) {
        orbs.setColors(params.colors);
      }
    },
    togglePause() {
      isPaused = !isPaused;
    },
    dispose() {
      pointerData.dispose?.();
      threeInstance.dispose();
    },
  };
}

export const OrbField: React.FC<OrbFieldProps> = ({
  className = "",
  followCursor = true,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsInstanceRef = useRef<CreateOrbFieldReturn | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    orbsInstanceRef.current = createOrbField(canvas, {
      followCursor,
      ...props,
    });

    return () => {
      if (orbsInstanceRef.current) {
        orbsInstanceRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (orbsInstanceRef.current && props.colors) {
      orbsInstanceRef.current.updateConfig({ colors: props.colors });
    }
  }, [props.colors]);

  return (
    <canvas
      className={`${className} w-full h-full`}
      style={{ display: "block", background: "transparent" }}
      ref={canvasRef}
    />
  );
};
