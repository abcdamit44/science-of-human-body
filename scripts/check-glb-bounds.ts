import fs from 'fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

const buf = fs.readFileSync('public/models/anatomical_muscular_system.glb');
const arrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

const loader = new GLTFLoader();
loader.parse(
  arrayBuffer,
  '',
  (gltf) => {
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    console.log('GLB Bounding Box:');
    console.log('  Min:', box.min);
    console.log('  Max:', box.max);
    console.log('  Size:', size);
    console.log('  Center:', center);
    console.log('  Total scene children:', gltf.scene.children.length);
  },
  (err) => console.error(err),
);
