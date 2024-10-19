import * as THREE from "three";

const bottomTexture = new THREE.TextureLoader().load("textures/dirt.png");
const topTexture = new THREE.TextureLoader().load("textures/grass_top.png");
const sideTexture = new THREE.TextureLoader().load("textures/grass_side.png");
bottomTexture.colorSpace = THREE.SRGBColorSpace;
topTexture.colorSpace = THREE.SRGBColorSpace;
sideTexture.colorSpace = THREE.SRGBColorSpace;

const materials = [
  new THREE.MeshStandardMaterial({ map: sideTexture }),
  new THREE.MeshStandardMaterial({ map: sideTexture }),
  new THREE.MeshStandardMaterial({ map: topTexture }),
  new THREE.MeshStandardMaterial({ map: bottomTexture }),
  new THREE.MeshStandardMaterial({ map: sideTexture }),
  new THREE.MeshStandardMaterial({ map: sideTexture }),
];

class Grass {
  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const mesh = new THREE.Mesh(geometry, materials);
    mesh.receiveShadow = true;

    return mesh;
  }
}

export default Grass;
