import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import model115Url from "../assets/images/spt-115-public.glb";
import model150Url from "../assets/images/spt-150-public.stl";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const modelConfigs = {
  115: {
    type: "gltf",
    source: model115Url,
    rotation: [0, 0, Math.PI / 2],
    scale: 4.35,
    camera: { desktop: [4.4, 2.45, 6.8], compact: [5.6, 3.1, 8.4] },
  },
  150: {
    type: "stl",
    source: model150Url,
    rotation: [0, 0, 0],
    scale: 4.75,
    camera: { desktop: [4.8, 2.6, 7.1], compact: [6.1, 3.25, 8.8] },
  },
};

const unitMaterial = new THREE.MeshStandardMaterial({
  color: 0x010203,
  metalness: 0.08,
  roughness: 0.52,
  envMapIntensity: 0.58,
  emissive: 0x000000,
  emissiveIntensity: 0,
});

const normalizeModel = (model, config) => {
  model.rotation.set(...config.rotation);
  model.updateMatrixWorld(true);

  const sourceBox = new THREE.Box3().setFromObject(model);
  const center = sourceBox.getCenter(new THREE.Vector3());
  const size = sourceBox.getSize(new THREE.Vector3());
  const scale = config.scale / Math.max(size.x, size.y, size.z);

  model.scale.setScalar(scale);
  model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
};

const applyMaterial = (model) => {
  model.traverse((node) => {
    if (!node.isMesh) return;
    node.geometry.computeVertexNormals();
    node.material = unitMaterial.clone();
  });
};

document.querySelectorAll("[data-spt-viewer]").forEach((root) => {
  const canvas = root.querySelector("canvas");
  const status = root.querySelector("[data-viewer-status]");
  const config = modelConfigs[root.dataset.sptViewer] || modelConfigs[115];

  if (!canvas || !config.source || !window.WebGLRenderingContext) {
    if (status) status.textContent = "3D view unavailable";
    root.classList.add("is-error");
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  let renderer;

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
  } catch {
    if (status) status.textContent = "3D view unavailable";
    root.classList.add("is-error");
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.5;

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.48;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.075;
  controls.enablePan = false;
  controls.autoRotate = !reduceMotion;
  controls.autoRotateSpeed = 0.85;
  controls.minDistance = 3.2;
  controls.maxDistance = 8.4;
  controls.rotateSpeed = 0.72;
  controls.zoomSpeed = 0.65;

  const modelRoot = new THREE.Group();
  modelRoot.rotation.set(0.03, -0.42, 0);
  scene.add(modelRoot);
  scene.add(camera);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));

  const hemisphere = new THREE.HemisphereLight(0xf4fbff, 0x151b24, 1.85);
  scene.add(hemisphere);

  const keyLight = new THREE.DirectionalLight(0xffffff, 8.4);
  keyLight.position.set(5.5, 7.5, 8.2);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xa7e9ff, 1.35);
  fillLight.position.set(-5.5, 3.2, 5.4);
  scene.add(fillLight);

  const frontLight = new THREE.DirectionalLight(0xffffff, 3.7);
  frontLight.position.set(0, 2.4, 7.2);
  scene.add(frontLight);

  const rimLight = new THREE.DirectionalLight(0xffd98c, 4.2);
  rimLight.position.set(2.4, 4.2, -6.2);
  scene.add(rimLight);

  const topLight = new THREE.DirectionalLight(0xffffff, 2.3);
  topLight.position.set(-1.2, 8.4, 1.8);
  scene.add(topLight);

  const cameraLight = new THREE.PointLight(0xffffff, 0.72, 12, 1.35);
  camera.add(cameraLight);

  const grid = new THREE.GridHelper(7, 14, 0x40c8e8, 0x1e2748);
  grid.position.y = -1.42;
  grid.material.opacity = 0.22;
  grid.material.transparent = true;
  scene.add(grid);

  const finishLoad = (model) => {
    normalizeModel(model, config);
    applyMaterial(model);

    const compactView = root.clientWidth < 680;
    const cameraPosition = compactView ? config.camera.compact : config.camera.desktop;

    modelRoot.add(model);
    camera.position.set(...cameraPosition);
    controls.minDistance = compactView ? 4.4 : 3.2;
    controls.maxDistance = compactView ? 10.4 : 8.8;
    controls.target.set(0, 0, 0);
    controls.update();
    controls.saveState();
    root.classList.add("is-loaded");
    if (status) status.textContent = "";
  };

  const handleLoadError = () => {
    if (status) status.textContent = "3D model unavailable";
    root.classList.add("is-error");
  };

  if (config.type === "stl") {
    new STLLoader().load(
      config.source,
      (geometry) => {
        const model = new THREE.Group();
        model.add(new THREE.Mesh(geometry, unitMaterial.clone()));
        finishLoad(model);
      },
      undefined,
      handleLoadError
    );
  } else {
    new GLTFLoader().load(
      config.source,
      (gltf) => finishLoad(gltf.scene),
      undefined,
      handleLoadError
    );
  }

  const resize = () => {
    const width = Math.max(1, root.clientWidth);
    const height = Math.max(1, root.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  new ResizeObserver(resize).observe(root);
  resize();

  root.querySelectorAll("[data-viewer-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.viewerAction;

      if (action === "toggle-spin") {
        controls.autoRotate = !controls.autoRotate;
        button.setAttribute("aria-pressed", String(controls.autoRotate));
      }

      if (action === "reset") {
        controls.reset();
        controls.autoRotate = !reduceMotion;
        const spinButton = root.querySelector("[data-viewer-action='toggle-spin']");
        if (spinButton) spinButton.setAttribute("aria-pressed", String(controls.autoRotate));
      }

      if (action === "zoom-in" || action === "zoom-out") {
        const multiplier = action === "zoom-in" ? 0.86 : 1.16;
        camera.position.multiplyScalar(multiplier);
        camera.position.clampLength(controls.minDistance, controls.maxDistance);
        controls.update();
      }
    });
  });

  if (reduceMotion) {
    const spinButton = root.querySelector("[data-viewer-action='toggle-spin']");
    if (spinButton) spinButton.setAttribute("aria-pressed", "false");
  }

  const render = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
});
