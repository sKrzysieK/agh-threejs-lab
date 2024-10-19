import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
import GrassField from "./structures/GrassField";
import Tree from "./structures/Tree";

class World {
  #worldSize;
  #scene;
  #camera;
  #renderer;
  #controls;
  #stats;
  #light;
  #phi;
  #radius;
  constructor(worldSize) {
    this.#worldSize = worldSize;
    this.#scene = new THREE.Scene();

    this.#phi = 0;
    this.#radius = 40;

    this.#camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.#renderer = new THREE.WebGLRenderer({ alpha: true });
    this.#renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.#renderer.domElement);

    this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement);
    this.#camera.position.set(10, 10, 10);
    this.#camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.#controls.update();

    // light
    this.#renderer.shadowMap.enabled = true;
    this.#renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.#light = new THREE.PointLight(0xffff00, 5000, 100);
    this.#light.position.y = 30;
    this.#light.position.z = this.#radius * Math.cos(this.#phi);
    this.#light.position.x = this.#radius * Math.sin(this.#phi);
    this.#light.castShadow = true;

    const shadowMapSize = 5048;

    this.#light.shadow.mapSize.width = shadowMapSize; // default
    this.#light.shadow.mapSize.height = shadowMapSize; // default
    this.#light.shadow.camera.near = 0.5; // default
    this.#light.shadow.camera.far = 500; // default
    this.#scene.add(new THREE.AmbientLight("white", 0.4));

    this.#scene.add(this.#light);

    // stats
    this.#stats = new Stats();
    this.#stats.showPanel(0);
    document.body.appendChild(this.#stats.dom);

    // axes
    const axesHelper = new THREE.AxesHelper(5);
    this.#scene.add(axesHelper);

    this.createMap();
    this.#renderer.setAnimationLoop(this.animate.bind(this));
  }
  animate() {
    this.#stats.begin();

    this.#controls.update();

    this.#scene.children.forEach((child) => {
      if (child.animate) child?.animate();
    });
    this.#phi += 0.0001 * Math.PI;
    this.#light.position.z = this.#radius * Math.cos(this.#phi);
    this.#light.position.x = this.#radius * Math.sin(this.#phi);

    this.#stats.end();
    this.#renderer.render(this.#scene, this.#camera);
  }
  createMap() {
    this.createGrassField();
    this.createTree();
  }
  createGrassField() {
    const grassField = new GrassField(this.#worldSize);
    this.#scene.add(grassField);
  }
  createTree() {
    const treeHeight = 6;
    const tree = new Tree(treeHeight);
    tree.position.set(0, 1, 0);
    this.#scene.add(tree);
  }
}

new World(10);
