import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import modelDataUrl from "../assets/images/spt-115-public.glb";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll("[data-spt-viewer]").forEach((root) => {
  const canvas = root.querySelector("canvas");
  const status = root.querySelector("[data-viewer-status]");
  const modelSource = modelDataUrl;

  if (!canvas || !modelSource || !window.WebGLRenderingContext) {
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
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

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
  modelRoot.rotation.set(-0.08, -0.34, 0.02);
  scene.add(modelRoot);

  scene.add(new THREE.AmbientLight(0xffffff, 0.34));

  const hemisphere = new THREE.HemisphereLight(0xd8f5ff, 0x111725, 1.55);
  scene.add(hemisphere);

  const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
  keyLight.position.set(4, 6, 7);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x40c8e8, 1.6);
  fillLight.position.set(-5, 1.5, 4);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffd47a, 1.4);
  rimLight.position.set(2, 3, -6);
  scene.add(rimLight);

  const grid = new THREE.GridHelper(7, 14, 0x40c8e8, 0x1e2748);
  grid.position.y = -1.42;
  grid.material.opacity = 0.22;
  grid.material.transparent = true;
  scene.add(grid);

  const loader = new GLTFLoader();
  loader.load(
    modelSource,
    (gltf) => {
      const model = gltf.scene;
      const sourceBox = new THREE.Box3().setFromObject(model);
      const center = sourceBox.getCenter(new THREE.Vector3());
      const size = sourceBox.getSize(new THREE.Vector3());
      const scale = 4.75 / Math.max(size.x, size.y, size.z);

      model.scale.setScalar(scale);
      model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

      model.traverse((node) => {
        if (!node.isMesh) return;
        node.geometry.computeVertexNormals();
        node.material = new THREE.MeshStandardMaterial({
          color: 0x050607,
          metalness: 0.34,
          roughness: 0.46,
          envMapIntensity: 0.9,
        });
      });

      const compactView = root.clientWidth < 680;

      modelRoot.add(model);
      camera.position.set(
        compactView ? 5.8 : 4.6,
        compactView ? 2.8 : 2.4,
        compactView ? 8.2 : 6.25
      );
      controls.minDistance = compactView ? 4.4 : 3.2;
      controls.maxDistance = compactView ? 10.2 : 8.4;
      controls.target.set(0, 0, 0);
      controls.update();
      controls.saveState();
      root.classList.add("is-loaded");
      if (status) status.textContent = "";
    },
    undefined,
    () => {
      if (status) status.textContent = "3D model unavailable";
      root.classList.add("is-error");
    }
  );

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
