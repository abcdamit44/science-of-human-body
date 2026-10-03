import fs from 'fs';
import * as THREE from 'three';
import { FBXLoader, GLTFExporter } from 'three-stdlib';

async function convertOptimized() {
  console.log('Reading FBX...');
  const fbxPath =
    'C:/Users/abcda/.gemini/antigravity-ide/brain/4083f3bd-2aa0-4c24-ab27-92153b3d745a/scratch/MuscularSystem100.fbx';
  const buf = fs.readFileSync(fbxPath);
  const arrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

  console.log('Parsing FBX with FBXLoader...');
  const loader = new FBXLoader();
  const fbx = loader.parse(arrayBuffer, '');

  // PBR Materials
  const muscleMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#942929'),
    roughness: 0.42,
    metalness: 0.08,
    side: THREE.DoubleSide,
  });

  const tendonMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#e2e8f0'),
    roughness: 0.35,
    metalness: 0.12,
    side: THREE.DoubleSide,
  });

  // Filter out tiny micro-bursae and minor digital sheaths
  const isPrimaryAnatomy = (name: string) => {
    const n = name.toLowerCase();
    // Exclude minor bursae
    if (n.includes('bursa') && !n.includes('glute') && !n.includes('deltoid')) return false;
    // Exclude minor digital sheaths
    if (
      n.includes('tendon_sheath_of_flexor_hallucis') ||
      n.includes('tendon_sheath_of_extensor_hallucis')
    )
      return false;
    // Include all muscles
    if (n.includes('muscle') || n.includes('muscler') || n.includes('musclel')) return true;
    if (
      n.includes('pectoral') ||
      n.includes('deltoid') ||
      n.includes('biceps') ||
      n.includes('triceps')
    )
      return true;
    if (
      n.includes('latissimus') ||
      n.includes('trapezius') ||
      n.includes('rhomboid') ||
      n.includes('gluteus')
    )
      return true;
    if (
      n.includes('femoris') ||
      n.includes('vastus') ||
      n.includes('gastrocnemius') ||
      n.includes('soleus')
    )
      return true;
    if (n.includes('abdominis') || n.includes('oblique') || n.includes('brachioradialis'))
      return true;
    if (
      n.includes('fascia') &&
      (n.includes('pectoral') ||
        n.includes('deltoid') ||
        n.includes('thoracolumbar') ||
        n.includes('lata'))
    )
      return true;
    return false;
  };

  const group = new THREE.Group();
  group.name = 'MuscularSystem';

  let includedCount = 0;
  fbx.traverse((child: any) => {
    if (child.isMesh && isPrimaryAnatomy(child.name)) {
      includedCount++;
      const name = child.name.toLowerCase();
      if (name.includes('tendon') || name.includes('bursa') || name.includes('fascia')) {
        child.material = tendonMaterial.clone();
      } else {
        child.material = muscleMaterial.clone();
      }
      child.castShadow = true;
      child.receiveShadow = true;
      group.add(child.clone());
    }
  });

  console.log(`Included ${includedCount} primary skeletal anatomy meshes. Exporting to GLB...`);
  const exporter = new GLTFExporter();

  const glbBuffer = await new Promise<Buffer>((resolve, reject) => {
    exporter.parse(
      group,
      (result) => {
        if (result instanceof ArrayBuffer) {
          resolve(Buffer.from(result));
        } else {
          resolve(Buffer.from(JSON.stringify(result)));
        }
      },
      (error) => reject(error),
      { binary: true },
    );
  });

  const outPath =
    'w:/Amit/science-of-human-body/frontend/public/models/anatomical_muscular_system.glb';
  fs.writeFileSync(outPath, glbBuffer);
  console.log(
    `Successfully exported optimized ${outPath} (${(glbBuffer.length / (1024 * 1024)).toFixed(2)} MB)`,
  );
}

convertOptimized().catch((err) => {
  console.error('Optimized conversion failed:', err);
  process.exit(1);
});
