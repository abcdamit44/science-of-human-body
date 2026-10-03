import fs from 'fs';
import type * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

const buf = fs.readFileSync('public/models/anatomical_muscular_system.glb');
const arrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

const loader = new GLTFLoader();
loader.parse(arrayBuffer, '', (gltf) => {
  const meshNames: string[] = [];
  gltf.scene.traverse((c) => {
    if ((c as THREE.Mesh).isMesh) meshNames.push(c.name);
  });

  const muscleMeshMap: Record<
    string,
    { groupId: string; side: 'left' | 'right' | 'both'; label: string }
  > = {};

  const byGroup: Record<string, { left: string[]; right: string[]; both: string[] }> = {
    chest: { left: [], right: [], both: [] },
    shoulders: { left: [], right: [], both: [] },
    biceps: { left: [], right: [], both: [] },
    triceps: { left: [], right: [], both: [] },
    forearms: { left: [], right: [], both: [] },
    lats: { left: [], right: [], both: [] },
    upper_back: { left: [], right: [], both: [] },
    abs: { left: [], right: [], both: [] },
    obliques: { left: [], right: [], both: [] },
    glutes: { left: [], right: [], both: [] },
    quads: { left: [], right: [], both: [] },
    hamstrings: { left: [], right: [], both: [] },
    calves: { left: [], right: [], both: [] },
  };

  for (const name of meshNames) {
    const n = name.toLowerCase();

    let side: 'left' | 'right' | 'both' = 'both';
    if (
      n.endsWith('l') ||
      n.endsWith('_l') ||
      n.includes('musclel') ||
      n.includes('_left') ||
      n.includes('left_') ||
      n.includes('fascial')
    ) {
      side = 'left';
    } else if (
      n.endsWith('r') ||
      n.endsWith('_r') ||
      n.includes('muscler') ||
      n.includes('_right') ||
      n.includes('right_') ||
      n.includes('fasciar')
    ) {
      side = 'right';
    }

    let groupId: string | null = null;
    if (n.includes('pectoral')) groupId = 'chest';
    else if (n.includes('deltoid')) groupId = 'shoulders';
    else if (n.includes('biceps_brachii') || n.includes('brachialis')) groupId = 'biceps';
    else if (n.includes('triceps')) groupId = 'triceps';
    else if (
      n.includes('brachioradialis') ||
      n.includes('pronator') ||
      n.includes('supinator') ||
      n.includes('flexor_carpi') ||
      n.includes('extensor_carpi') ||
      n.includes('flexor_digitorum') ||
      n.includes('extensor_digitorum')
    )
      groupId = 'forearms';
    else if (n.includes('latissimus')) groupId = 'lats';
    else if (
      n.includes('trapezius') ||
      n.includes('rhomboid') ||
      n.includes('infraspinatus') ||
      n.includes('teres_') ||
      n.includes('supraspinatus') ||
      n.includes('levator_scapulae')
    )
      groupId = 'upper_back';
    else if (n.includes('oblique_muscle') || n.includes('abdominal_oblique')) groupId = 'obliques';
    else if (
      n.includes('rectus_abdominis') ||
      n.includes('transversus_abdominis') ||
      n.includes('pyramidalis')
    )
      groupId = 'abs';
    else if (
      n.includes('gluteus') ||
      n.includes('piriformis') ||
      n.includes('obturator') ||
      n.includes('gemellus')
    )
      groupId = 'glutes';
    else if (n.includes('rectus_femoris') || n.includes('vastus')) groupId = 'quads';
    else if (
      n.includes('biceps_femoris') ||
      n.includes('semitendinosus') ||
      n.includes('semimembranosus')
    )
      groupId = 'hamstrings';
    else if (
      n.includes('gastrocnemius') ||
      n.includes('soleus') ||
      n.includes('tibialis') ||
      n.includes('fibularis')
    )
      groupId = 'calves';

    // Format clean label
    const cleanName = name
      .replace(/[()]/g, '')
      .replace(/muscle[lr]$/i, '')
      .replace(/fascia[lr]$/i, '')
      .replace(/[lr]$/i, '')
      .replace(/_/g, ' ')
      .trim();

    const sideSuffix = side === 'left' ? ' (Left)' : side === 'right' ? ' (Right)' : '';
    const label = cleanName + sideSuffix;

    if (groupId && byGroup[groupId]) {
      byGroup[groupId][side].push(name);
      muscleMeshMap[name] = { groupId, side, label };
    }
  }

  const fileContent = `// Generated Muscle Mesh Mapping
import type { MuscleGroupId, MuscleSide } from '@/types/anatomy';

export interface MeshInfo {
  groupId: MuscleGroupId;
  side: MuscleSide;
  label: string;
}

export const MUSCLE_MESH_MAP: Record<string, MeshInfo> = ${JSON.stringify(muscleMeshMap, null, 2)};

export const GROUP_MESHES: Record<MuscleGroupId, { left: string[]; right: string[]; all: string[] }> = ${JSON.stringify(
    Object.fromEntries(
      Object.entries(byGroup).map(([k, v]) => [
        k,
        {
          left: v.left,
          right: v.right,
          all: [...v.left, ...v.right, ...v.both],
        },
      ]),
    ),
    null,
    2,
  )};
`;

  fs.writeFileSync('src/data/muscleMeshMap.ts', fileContent);
  console.log(
    'Successfully wrote src/data/muscleMeshMap.ts with',
    Object.keys(muscleMeshMap).length,
    'mapped meshes.',
  );
});
