'use client';

import type { MuscleGroupId } from '@/types/anatomy';
import type React from 'react';
import { useRef, useState } from 'react';
import type * as THREE from 'three';

interface MuscleMeshProps {
  id: MuscleGroupId;
  name: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  geometryType?: 'box' | 'cylinder' | 'sphere' | 'capsule';
  geometryArgs?: number[];
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: MuscleGroupId) => void;
  onHover: (id: MuscleGroupId | null) => void;
}

export const MuscleMesh: React.FC<MuscleMeshProps> = ({
  id,
  name,
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  geometryType = 'box',
  geometryArgs = [0.4, 0.4, 0.4],
  isSelected,
  isHovered,
  onSelect,
  onHover,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [internalHover, setInternalHover] = useState(false);

  const activeHover = isHovered || internalHover;

  // Athletic color palette:
  // Default: Dark slate anatomy tone (#1e293b)
  // Hover: Electric cyan (#00f2fe)
  // Selected: Vibrant neon blue (#38bdf8) with glowing emissive
  const color = isSelected ? '#38bdf8' : activeHover ? '#00f2fe' : '#334155';
  const emissive = isSelected ? '#0284c7' : activeHover ? '#0891b2' : '#0f172a';
  const emissiveIntensity = isSelected ? 0.8 : activeHover ? 0.6 : 0.1;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: R3F Canvas 3D mesh element
    <mesh
      ref={meshRef}
      name={name}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setInternalHover(true);
        onHover(id);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setInternalHover(false);
        onHover(null);
        document.body.style.cursor = 'auto';
      }}
    >
      {geometryType === 'capsule' && (
        <capsuleGeometry args={geometryArgs as [number, number, number, number]} />
      )}
      {geometryType === 'cylinder' && (
        <cylinderGeometry args={geometryArgs as [number, number, number, number]} />
      )}
      {geometryType === 'sphere' && (
        <sphereGeometry args={geometryArgs as [number, number, number]} />
      )}
      {geometryType === 'box' && <boxGeometry args={geometryArgs as [number, number, number]} />}

      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        roughness={0.35}
        metalness={0.25}
        transparent={true}
        opacity={isSelected || activeHover ? 0.95 : 0.85}
      />
    </mesh>
  );
};
