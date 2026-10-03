import fs from 'fs';
import * as THREE from 'three';
import { FBXLoader } from 'three-stdlib';

const fbxPath =
  'C:/Users/abcda/.gemini/antigravity-ide/brain/4083f3bd-2aa0-4c24-ab27-92153b3d745a/scratch/MuscularSystem100.fbx';
const buf = fs.readFileSync(fbxPath);
const arrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

const loader = new FBXLoader();
const fbx = loader.parse(arrayBuffer, '');

const allMeshes: { name: string; vertexCount: number }[] = [];
fbx.traverse((child: any) => {
  if (child.isMesh) {
    const vCount = child.geometry?.attributes?.position?.count || 0;
    allMeshes.push({ name: child.name, vertexCount: vCount });
  }
});

console.log('Total meshes in FBX:', allMeshes.length);
fs.writeFileSync(
  'C:/Users/abcda/.gemini/antigravity-ide/brain/4083f3bd-2aa0-4c24-ab27-92153b3d745a/scratch/all-mesh-names.json',
  JSON.stringify(allMeshes, null, 2),
);
console.log('Saved all-mesh-names.json');
