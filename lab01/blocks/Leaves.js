import * as THREE from "three";

const texture = new THREE.TextureLoader().load("textures/leaves.png");
texture.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.MeshStandardMaterial({ map: texture });

class Leaves {
  constructor() {
    const geometry = new THREE.BoxGeometry();
    const mesh = new THREE.Mesh(geometry, material);
    material.roughness = 1;

    mesh.castShadow = true;

    return mesh;
  }
}

export default Leaves;
