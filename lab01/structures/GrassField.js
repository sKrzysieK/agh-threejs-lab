import * as THREE from "three";
import Grass from "../blocks/Grass";

class GrassField {
  constructor(size) {
    const obj = new THREE.Object3D();
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        const grass = new Grass();
        grass.position.set(-size / 2 + x + 0.5, 0, -size / 2 + z + 0.5);
        obj.add(grass);
      }
    }

    return obj;
  }
}

export default GrassField;
