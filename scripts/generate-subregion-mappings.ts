import fs from 'fs';
import path from 'path';

const filePath = path.resolve(__dirname, '../src/data/muscleMeshMap.ts');

function getSubRegion(name: string, groupId: string): string {
  const n = name.toLowerCase();

  if (groupId === 'chest') {
    if (n.includes('clavicular')) return 'upper';
    if (n.includes('sternocostal')) return 'middle';
    if (n.includes('abdominal_part')) return 'lower';
    if (n.includes('pectoralis_minor')) return 'inner_deep';
    return 'middle';
  }

  if (groupId === 'shoulders') {
    if (n.includes('clavicular')) return 'front';
    if (n.includes('acromial')) return 'side';
    if (n.includes('scapular_spinal')) return 'rear';
    return 'side';
  }

  if (groupId === 'triceps') {
    if (n.includes('long_head')) return 'long';
    if (n.includes('lateral_head')) return 'lateral';
    if (n.includes('medial_head')) return 'medial';
    return 'long';
  }

  if (groupId === 'biceps') {
    if (n.includes('long_head')) return 'long';
    if (n.includes('short_head')) return 'short';
    if (n.includes('brachialis') || n.includes('coracobrachialis')) return 'brachialis';
    return 'long';
  }

  if (groupId === 'upper_back') {
    if (n.includes('descending_part_of_trapezius')) return 'upper_traps';
    if (n.includes('transverse_part_of_trapezius') || n.includes('rhomboid')) return 'mid_traps_rhomboids';
    if (n.includes('ascending_part_of_trapezius')) return 'lower_traps';
    return 'rotator_cuff';
  }

  if (groupId === 'lats') {
    return 'lats_all';
  }

  if (groupId === 'lower_back') {
    if (n.includes('iliocostalis') || n.includes('longissimus') || n.includes('spinalis')) return 'erector_spinae';
    if (n.includes('thoracolumbar_fascia')) return 'thoracolumbar_fascia';
    return 'deep_stabilizers';
  }

  if (groupId === 'abs') {
    if (n.includes('pyramidalis')) return 'lower_abs';
    if (n.includes('rectus_abdominis')) return 'upper_abs';
    if (n.includes('oblique')) return 'obliques_core';
    return 'transverse_core';
  }

  if (groupId === 'obliques') {
    if (n.includes('external')) return 'external_oblique';
    return 'internal_oblique';
  }

  if (groupId === 'glutes') {
    if (n.includes('gluteus_maximus')) return 'maximus';
    if (n.includes('gluteus_medius')) return 'medius';
    return 'minimus_rotators';
  }

  if (groupId === 'quads') {
    if (n.includes('rectus_femoris')) return 'rectus_femoris';
    if (n.includes('vastus_medialis')) return 'vastus_medialis';
    if (n.includes('vastus_lateralis')) return 'vastus_lateralis';
    return 'vastus_intermedius';
  }

  if (groupId === 'hamstrings') {
    if (n.includes('biceps_femoris')) return 'lateral_hamstrings';
    return 'medial_hamstrings';
  }

  if (groupId === 'calves') {
    if (n.includes('gastrocnemius')) return 'gastrocnemius';
    if (n.includes('soleus') || n.includes('tibialis_posterior')) return 'soleus';
    return 'tibialis_peroneals';
  }

  if (groupId === 'forearms') {
    if (n.includes('brachioradialis')) return 'brachioradialis';
    if (n.includes('flexor')) return 'flexors';
    if (n.includes('extensor')) return 'extensors';
    return 'pronator_supinator';
  }

  return 'main';
}

const current = require('../src/data/muscleMeshMap.ts');
const originalMap = current.MUSCLE_MESH_MAP;
const originalGroupMeshes = current.GROUP_MESHES;

const newMeshMap: Record<string, any> = {};
const groupSubregionMeshes: Record<string, Record<string, { left: string[]; right: string[]; all: string[] }>> = {};

for (const [meshName, info] of Object.entries(originalMap) as [string, any][]) {
  const subRegion = getSubRegion(meshName, info.groupId);
  newMeshMap[meshName] = {
    ...info,
    subRegion,
  };

  if (!groupSubregionMeshes[info.groupId]) {
    groupSubregionMeshes[info.groupId] = {};
  }
  if (!groupSubregionMeshes[info.groupId][subRegion]) {
    groupSubregionMeshes[info.groupId][subRegion] = { left: [], right: [], all: [] };
  }

  const side = info.side;
  if (side === 'left') {
    groupSubregionMeshes[info.groupId][subRegion].left.push(meshName);
  } else if (side === 'right') {
    groupSubregionMeshes[info.groupId][subRegion].right.push(meshName);
  } else {
    groupSubregionMeshes[info.groupId][subRegion].left.push(meshName);
    groupSubregionMeshes[info.groupId][subRegion].right.push(meshName);
  }
  groupSubregionMeshes[info.groupId][subRegion].all.push(meshName);
}

const output = `// Generated Muscle Mesh Mapping with Anatomical Sub-Regions
import type { MuscleGroupId, MuscleSide } from '@/types/anatomy';

export interface MeshInfo {
  groupId: MuscleGroupId;
  side: MuscleSide;
  label: string;
  subRegion?: string;
}

export const MUSCLE_MESH_MAP: Record<string, MeshInfo> = ${JSON.stringify(newMeshMap, null, 2)};

export const GROUP_MESHES: Record<MuscleGroupId, { left: string[]; right: string[]; all: string[] }> = ${JSON.stringify(originalGroupMeshes, null, 2)};

export const GROUP_SUBREGION_MESHES: Record<
  MuscleGroupId,
  Record<string, { left: string[]; right: string[]; all: string[] }>
> = ${JSON.stringify(groupSubregionMeshes, null, 2)};
`;

fs.writeFileSync(filePath, output, 'utf8');
console.log('Successfully updated muscleMeshMap.ts with sub-region mappings!');
