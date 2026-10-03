import fs from 'fs';
import * as THREE from 'w:/Amit/science-of-human-body/frontend/node_modules/three';
import { FBXLoader, GLTFExporter } from 'w:/Amit/science-of-human-body/frontend/node_modules/three-stdlib';

async function run() {
  console.log('Loading FBX...');
  const fbxPath = 'C:/Users/abcda/.gemini/antigravity-ide/brain/4083f3bd-2aa0-4c24-ab27-92153b3d745a/scratch/MuscularSystem100.fbx';
  const buf = fs.readFileSync(fbxPath);
  const arrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

  const loader = new FBXLoader();
  const fbx = loader.parse(arrayBuffer, '');

  console.log('FBX parsed successfully. Traversing and filtering...');

  // Materials
  const muscleMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#942929'),
    roughness: 0.42,
    metalness: 0.08,
    side: THREE.DoubleSide,
  });

  const tendonMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#cbd5e1'),
    roughness: 0.35,
    metalness: 0.12,
    side: THREE.DoubleSide,
  });

  // Collect meshes to remove (fascias and bursae that block visual view)
  const toRemove: THREE.Object3D[] = [];
  let retainedCount = 0;

  fbx.traverse((child: any) => {
    if (child.isMesh) {
      const name = child.name.toLowerCase();
      // Exclude sheet fascias that cover muscles (especially pectoral, deltoid, abdominal fascia sheets)
      const isBlockingFascia = name.includes('fascia') || name.includes('aponeurosis') || name.includes('retinaculum');
      // Exclude bursae and digital sheaths (fluid sacs / sheaths around tendons)
      const isBursaOrSheath = name.includes('bursa') || name.includes('tendon_sheath');

      if (isBlockingFascia || isBursaOrSheath) {
        toRemove.push(child);
      } else {
        retainedCount++;
        const isTendon = name.includes('tendon') || name.includes('ligament');
        child.material = isTendon ? tendonMaterial.clone() : muscleMaterial.clone();
        child.castShadow = true;
        child.receiveShadow = true;
      }
    }
  });

  console.log(`Removing ${toRemove.length} blocking fascia/bursa meshes...`);
  for (const obj of toRemove) {
    obj.parent?.remove(obj);
  }
  console.log(`Retained ${retainedCount} authentic skeletal muscle meshes.`);

  // Update world matrix and calculate bounds
  fbx.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(fbx);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  console.log('Cleaned FBX Box Size (cm):', size);
  console.log('Cleaned FBX Box Center (cm):', center);

  // Now create a root container, scale by 0.01 (to meters) and center horizontally, with feet at y = 0
  const root = new THREE.Group();
  root.name = 'MuscularSystem';

  // Apply scale and offset to fbx
  fbx.scale.set(0.01, 0.01, 0.01);
  // Center x and z, place min.y at 0
  fbx.position.set(-center.x * 0.01, -box.min.y * 0.01, -center.z * 0.01);

  root.add(fbx);
  root.updateMatrixWorld(true);

  const finalBox = new THREE.Box3().setFromObject(root);
  const finalSize = new THREE.Vector3();
  finalBox.getSize(finalSize);
  console.log('Final Scene Box in Meters:');
  console.log('  Min:', finalBox.min);
  console.log('  Max:', finalBox.max);
  console.log('  Size:', finalSize);

  console.log('Exporting to GLB...');
  const exporter = new GLTFExporter();
  const glbBuffer = await new Promise<Buffer>((resolve, reject) => {
    exporter.parse(
      root,
      (gltf) => {
        resolve(Buffer.from(gltf as ArrayBuffer));
      },
      (error) => reject(error),
      { binary: true }
    );
  });

  const outPath = 'w:/Amit/science-of-human-body/frontend/public/models/anatomical_muscular_system.glb';
  fs.writeFileSync(outPath, glbBuffer);
  console.log(`Successfully saved ${outPath} (${(glbBuffer.length / (1024 * 1024)).toFixed(2)} MB)`);
}

run().catch(console.error);
