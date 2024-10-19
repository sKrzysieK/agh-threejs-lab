import * as THREE from "three";

const horizontalTexture = new THREE.TextureLoader().load("textures/log.png");
const sideTexture = new THREE.TextureLoader().load("textures/log_side.png");
sideTexture.colorSpace = THREE.SRGBColorSpace;
horizontalTexture.colorSpace = THREE.SRGBColorSpace;

const materials = [
  new THREE.MeshStandardMaterial({ map: sideTexture }),
  new THREE.MeshStandardMaterial({ map: sideTexture }),
  new THREE.MeshStandardMaterial({ map: horizontalTexture }),
  new THREE.MeshStandardMaterial({ map: horizontalTexture }),
  new THREE.MeshStandardMaterial({ map: sideTexture }),
  new THREE.MeshStandardMaterial({ map: sideTexture }),
];

class Log {
  constructor() {
    const geometry = new THREE.BoxGeometry();
    const mesh = new THREE.Mesh(geometry, materials);
    materials.forEach((material) => {
      material.roughness = 0.7;
      material.metalness = 0.1;
    });

    mesh.castShadow = true;
    return mesh;
  }
}

export default Log;
