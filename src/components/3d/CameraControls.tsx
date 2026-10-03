'use client';

import { OrbitControls } from '@react-three/drei';
import type React from 'react';
import { useEffect, useRef } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export type CameraPreset = 'front' | 'back' | 'upper' | 'lower' | 'reset';

interface CameraControlsProps {
  preset: CameraPreset;
  onPresetApplied?: () => void;
}

export const CameraControls: React.FC<CameraControlsProps> = ({ preset, onPresetApplied }) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    const camera = controls.object;

    switch (preset) {
      case 'front':
        camera.position.set(0, 0.95, 2.9);
        controls.target.set(0, 0.92, 0);
        break;
      case 'back':
        camera.position.set(0, 0.95, -2.9);
        controls.target.set(0, 0.92, 0);
        break;
      case 'upper':
        camera.position.set(0, 1.3, 1.9);
        controls.target.set(0, 1.25, 0);
        break;
      case 'lower':
        camera.position.set(0, 0.5, 2.0);
        controls.target.set(0, 0.45, 0);
        break;
      default:
        camera.position.set(0, 0.95, 2.9);
        controls.target.set(0, 0.92, 0);
        break;
    }
    controls.update();
    onPresetApplied?.();
  }, [preset, onPresetApplied]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      minDistance={1.2}
      maxDistance={5.5}
      minPolarAngle={0.1}
      maxPolarAngle={Math.PI - 0.1}
      dampingFactor={0.08}
      enableDamping={true}
      target={[0, 0.92, 0]}
    />
  );
};
