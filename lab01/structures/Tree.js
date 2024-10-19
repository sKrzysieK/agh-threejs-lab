import * as THREE from "three";
import Log from "../blocks/Log";
import Leaves from "../blocks/Leaves";

const generateLeavesPosition = (treePosition, height) => {
  const positions = [];
  for (let i = 0; i < 4; i++) {
    let layerWidth;
    if (i < 2) layerWidth = 1;
    else layerWidth = 2;

    for (let z = -layerWidth; z <= layerWidth; z++) {
      for (let x = -layerWidth; x <= layerWidth; x++) {
        if (Math.abs(x) === Math.abs(z) && Math.abs(x) === layerWidth) continue;
        if ((Math.abs(x) === Math.abs(z)) === 0 && i !== 0) continue;
        let xPosition = treePosition.x + x;
        let zPosition = treePosition.z + z;
        let yPosition = treePosition.y + height - i;

        positions.push(new THREE.Vector3(xPosition, yPosition, zPosition));
      }
    }
  }
  return positions;
};

class Tree {
  obj;
  #height;
  #rotationSpeed;
  constructor(height) {
    this.#height = height > 3 ? height : 3;
    this.obj = new THREE.Object3D();
    this.createLog();
    this.createLeaves();

    this.obj.animate = this.animate.bind(this);
    this.#rotationSpeed = Math.PI / 100;
    // this.obj.receiveShadow = true;
    this.obj.castShadow = true;
    return this.obj;
  }
  createLog() {
    for (let y = 0; y < this.#height - 1; y++) {
      const log = new Log();
      log.position.set(
        this.obj.position.x,
        this.obj.position.y + y,
        this.obj.position.z
      );
      this.obj.add(log);
    }
  }
  createLeaves() {
    const leavesPosition = generateLeavesPosition(
      this.obj.position,
      this.#height
    );
    for (let position of leavesPosition) {
      const leaves = new Leaves();
      leaves.position.set(position.x, position.y, position.z);
      this.obj.add(leaves);
    }
  }
  animate() {
    // this.obj.rotateY(this.#rotationSpeed);
  }
}

export default Tree;
