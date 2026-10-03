'use client';

import { MUSCLES_DATA } from '@/data/muscles';
import type { MuscleGroupId, MuscleSide } from '@/types/anatomy';
import { ContactShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Eye, EyeOff, RotateCcw, Sparkles } from 'lucide-react';
import type React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { CameraControls, type CameraPreset } from './CameraControls';
import { HumanModel } from './HumanModel';

interface BodyCanvasProps {
  selectedMuscle: MuscleGroupId | null;
  selectedSide?: MuscleSide;
  selectedSubRegion?: string | null;
  selectedMeshName?: string | null;
  selectedMeshLabel?: string | null;
  hoveredMuscle: MuscleGroupId | null;
  isIsolated?: boolean;
  onToggleIsolate?: () => void;
  onChangeSide?: (side: MuscleSide) => void;
  onChangeSubRegion?: (subRegion: string | null) => void;
  onSelectMuscle: (
    id: MuscleGroupId,
    side: MuscleSide,
    subRegion?: string | null,
    meshName?: string,
    label?: string,
  ) => void;
  onHoverMuscle: (id: MuscleGroupId | null, meshName?: string | null) => void;
}

export const BodyCanvas: React.FC<BodyCanvasProps> = ({
  selectedMuscle,
  selectedSide = 'both',
  selectedSubRegion = null,
  selectedMeshName = null,
  selectedMeshLabel = null,
  hoveredMuscle,
  isIsolated = false,
  onToggleIsolate,
  onChangeSide,
  onChangeSubRegion,
  onSelectMuscle,
  onHoverMuscle,
}) => {
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('front');

  // Auto-pivot camera between anterior and posterior muscle views
  useEffect(() => {
    if (!selectedMuscle) return;
    const posteriorMuscles: MuscleGroupId[] = [
      'glutes',
      'hamstrings',
      'lats',
      'upper_back',
      'lower_back',
      'triceps',
      'calves',
    ];
    const anteriorMuscles: MuscleGroupId[] = ['chest', 'abs', 'quads', 'biceps'];
    if (posteriorMuscles.includes(selectedMuscle)) {
      setCameraPreset('back');
    } else if (anteriorMuscles.includes(selectedMuscle)) {
      setCameraPreset('front');
    }
  }, [selectedMuscle]);

  return (
    <div className="relative w-full h-[640px] lg:h-[750px] bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl">
      {/* Background Subtle Athletic Grid & Neon Aura */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Floating HUD: Controls, Presets & Isolation */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left Badge: Mode indicator */}
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800 shadow-lg flex items-center gap-2 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold text-white">Anatomical Muscular 3D Explorer</span>
          {isIsolated && (
            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider">
              Isolated Mode
            </span>
          )}
        </div>

        {/* Right HUD Controls: Camera Presets & Isolate Toggle */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Quick Camera Presets */}
          <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-800 shadow-lg">
            <button
              type="button"
              onClick={() => setCameraPreset('front')}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                cameraPreset === 'front'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Front
            </button>
            <button
              type="button"
              onClick={() => setCameraPreset('back')}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                cameraPreset === 'back'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setCameraPreset('upper')}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors hidden sm:block ${
                cameraPreset === 'upper'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Upper
            </button>
            <button
              type="button"
              onClick={() => setCameraPreset('lower')}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors hidden sm:block ${
                cameraPreset === 'lower'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Legs
            </button>
            <button
              type="button"
              onClick={() => setCameraPreset('reset')}
              title="Reset Camera Angle"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Isolate Toggle Button */}
          {onToggleIsolate && (
            <button
              type="button"
              onClick={onToggleIsolate}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-lg backdrop-blur-md ${
                isIsolated
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-cyan-500/30'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400'
              }`}
              title={isIsolated ? 'Show full body' : 'Isolate selected muscle only'}
            >
              {isIsolated ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {isIsolated ? 'Exit Isolate' : 'Isolate Muscle'}
            </button>
          )}
        </div>
      </div>

      {/* Main 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0.95, 2.9], fov: 40 }}
        className="cursor-grab active:cursor-grabbing w-full h-full"
      >
        <ambientLight intensity={1.8} color="#0f172a" />
        <directionalLight
          position={[2.5, 4.5, 3.5]}
          intensity={2.4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-3.5, 3.5, -3.0]} intensity={2.5} color="#38bdf8" />
        <directionalLight position={[0, 1.2, 3.0]} intensity={1.1} color="#00f2fe" />

        <Suspense fallback={null}>
          <HumanModel
            selectedMuscle={selectedMuscle}
            selectedSide={selectedSide}
            selectedSubRegion={selectedSubRegion}
            selectedMeshName={selectedMeshName}
            hoveredMuscle={hoveredMuscle}
            isIsolated={isIsolated}
            onSelectMuscle={onSelectMuscle}
            onHoverMuscle={onHoverMuscle}
          />
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.7}
            scale={3.5}
            blur={2.0}
            far={3.5}
            color="#020617"
          />
        </Suspense>

        <CameraControls preset={cameraPreset} />
      </Canvas>

      {/* Floating Active Muscle Indicator, Sub-Region & Bilateral Switcher (Bottom) */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Selected / Hovered Muscle Label */}
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs shadow-lg flex items-center gap-2">
          {hoveredMuscle ? (
            <>
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400">Hovering:</span>
              <span className="font-semibold text-cyan-300 capitalize">
                {hoveredMuscle.replace('_', ' ')}
              </span>
            </>
          ) : selectedMuscle ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400">Selected:</span>
              <span className="font-semibold text-cyan-300 capitalize">
                {selectedMeshLabel || `${selectedSide} ${selectedMuscle.replace('_', ' ')}`}
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              <span className="text-slate-400">Click any anatomical muscle to inspect</span>
            </>
          )}
        </div>

        {/* Head / Sub-Region Selector */}
        {selectedMuscle &&
          onChangeSubRegion &&
          (MUSCLES_DATA[selectedMuscle]?.subRegions?.length ?? 0) > 0 && (
            <div className="pointer-events-auto flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-800 shadow-lg text-xs overflow-x-auto max-w-[420px] scrollbar-none">
              <span className="text-[10px] text-slate-500 font-bold uppercase px-2 whitespace-nowrap">
                Head:
              </span>
              <button
                type="button"
                onClick={() => onChangeSubRegion(null)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${
                  !selectedSubRegion
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                All Heads
              </button>
              {MUSCLES_DATA[selectedMuscle].subRegions?.map((sr) => (
                <button
                  key={sr.id}
                  type="button"
                  onClick={() => onChangeSubRegion(sr.id)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedSubRegion === sr.id
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {sr.name}
                </button>
              ))}
            </div>
          )}

        {/* Bilateral Side Switcher (Left | Right | Whole) */}
        {selectedMuscle && onChangeSide && (
          <div className="pointer-events-auto flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-800 shadow-lg text-xs">
            <span className="text-[10px] text-slate-500 font-bold uppercase px-2">Side:</span>
            <button
              type="button"
              onClick={() => onChangeSide('left')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedSide === 'left'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Left
            </button>
            <button
              type="button"
              onClick={() => onChangeSide('right')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedSide === 'right'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Right
            </button>
            <button
              type="button"
              onClick={() => onChangeSide('both')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedSide === 'both'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Both
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
