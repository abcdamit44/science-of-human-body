import { GROUP_MESHES, GROUP_SUBREGION_MESHES, MUSCLE_MESH_MAP } from '@/data/muscleMeshMap';
import type { MuscleGroupId, MuscleSide } from '@/types/anatomy';
import { useGLTF } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';

interface HumanModelProps {
  selectedMuscle: MuscleGroupId | null;
  selectedSide?: MuscleSide;
  selectedSubRegion?: string | null;
  selectedMeshName?: string | null;
  hoveredMuscle: MuscleGroupId | null;
  isIsolated?: boolean;
  onSelectMuscle: (
    groupId: MuscleGroupId,
    side: MuscleSide,
    subRegion?: string | null,
    meshName?: string,
    label?: string,
  ) => void;
  onHoverMuscle: (groupId: MuscleGroupId | null, meshName?: string | null) => void;
}

const MODEL_PATH = '/models/anatomical_muscular_system.glb';

export const HumanModel: React.FC<HumanModelProps> = ({
  selectedMuscle,
  selectedSide = 'both',
  selectedSubRegion = null,
  selectedMeshName = null,
  hoveredMuscle,
  isIsolated = false,
  onSelectMuscle,
  onHoverMuscle,
}) => {
  const gltf = useGLTF(MODEL_PATH) as GLTF;
  const [internalHoverMesh, setInternalHoverMesh] = useState<string | null>(null);

  // Pre-instantiate reusable standard anatomical materials
  const materials = useMemo(() => {
    const muscleDefault = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#942929'),
      roughness: 0.44,
      metalness: 0.08,
      side: THREE.DoubleSide,
    });

    const tendonDefault = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#cbd5e1'),
      roughness: 0.35,
      metalness: 0.12,
      side: THREE.DoubleSide,
    });

    const selectedMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#38bdf8'),
      emissive: new THREE.Color('#0284c7'),
      emissiveIntensity: 1.8,
      roughness: 0.2,
      metalness: 0.35,
      side: THREE.DoubleSide,
    });

    const hoveredMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#00f2fe'),
      emissive: new THREE.Color('#0891b2'),
      emissiveIntensity: 1.25,
      roughness: 0.25,
      metalness: 0.3,
      side: THREE.DoubleSide,
    });

    const ghostMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0f172a'),
      transparent: true,
      opacity: 0.04,
      roughness: 0.95,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    return {
      muscleDefault,
      tendonDefault,
      selectedMaterial,
      hoveredMaterial,
      ghostMaterial,
    };
  }, []);

  // Compute active highlight set based on selectedMuscle, selectedSide, selectedSubRegion, or specific mesh
  const activeSelectedMeshes = useMemo(() => {
    const set = new Set<string>();
    if (!selectedMuscle || !GROUP_MESHES[selectedMuscle]) return set;

    if (selectedSubRegion && GROUP_SUBREGION_MESHES[selectedMuscle]?.[selectedSubRegion]) {
      const sub = GROUP_SUBREGION_MESHES[selectedMuscle][selectedSubRegion];
      if (selectedSide === 'left') {
        for (const m of sub.left) set.add(m);
      } else if (selectedSide === 'right') {
        for (const m of sub.right) set.add(m);
      } else {
        for (const m of sub.all) set.add(m);
      }
    } else {
      const group = GROUP_MESHES[selectedMuscle];
      if (selectedSide === 'left') {
        for (const m of group.left) set.add(m);
      } else if (selectedSide === 'right') {
        for (const m of group.right) set.add(m);
      } else {
        // 'both'
        for (const m of group.all) set.add(m);
      }
    }

    if (selectedMeshName) {
      set.add(selectedMeshName);
    }
    return set;
  }, [selectedMuscle, selectedSide, selectedSubRegion, selectedMeshName]);

  // Clone scene for safe local material mutations
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  // Dynamically apply materials to the meshes inside scene
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const meshName = mesh.name;
        const isSelected = activeSelectedMeshes.has(meshName);
        const isHovered =
          internalHoverMesh === meshName ||
          (hoveredMuscle && MUSCLE_MESH_MAP[meshName]?.groupId === hoveredMuscle);

        if (isSelected) {
          mesh.material = materials.selectedMaterial;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        } else if (isHovered) {
          mesh.material = materials.hoveredMaterial;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        } else if (isIsolated && selectedMuscle) {
          mesh.material = materials.ghostMaterial;
          mesh.castShadow = false;
          mesh.receiveShadow = false;
        } else {
          const lower = meshName.toLowerCase();
          const isTendon =
            lower.includes('tendon') ||
            lower.includes('ligament') ||
            lower.includes('bursa') ||
            lower.includes('sheath');
          mesh.material = isTendon ? materials.tendonDefault : materials.muscleDefault;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      }
    });
  }, [
    scene,
    activeSelectedMeshes,
    internalHoverMesh,
    hoveredMuscle,
    isIsolated,
    selectedMuscle,
    materials,
  ]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: R3F Canvas 3D interactive primitive
    <primitive
      object={scene}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        const clickedMesh = e.object as THREE.Mesh;
        if (!clickedMesh) return;
        const meshName = clickedMesh.name;
        const info = MUSCLE_MESH_MAP[meshName];
        if (info) {
          onSelectMuscle(info.groupId, info.side, info.subRegion || null, meshName, info.label);
        }
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        const mesh = e.object as THREE.Mesh;
        if (!mesh) return;
        const meshName = mesh.name;
        setInternalHoverMesh(meshName);
        const info = MUSCLE_MESH_MAP[meshName];
        if (info) {
          onHoverMuscle(info.groupId, meshName);
        } else {
          onHoverMuscle(null, meshName);
        }
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setInternalHoverMesh(null);
        onHoverMuscle(null, null);
        document.body.style.cursor = 'auto';
      }}
    />
  );
};

useGLTF.preload(MODEL_PATH);
