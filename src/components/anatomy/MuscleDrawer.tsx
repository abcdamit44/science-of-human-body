'use client';

import { EXERCISES_DATA } from '@/data/exercises';
import { MUSCLES_DATA } from '@/data/muscles';
import type { MuscleGroupId, MuscleSide, VideoLecture } from '@/types/anatomy';
import {
  Activity,
  Dumbbell,
  Eye,
  EyeOff,
  Filter,
  Layers,
  Play,
  Sparkles,
  Video,
  X,
} from 'lucide-react';
import type React from 'react';
import { useMemo, useState } from 'react';
import { ExerciseCard } from './ExerciseCard';
import { VideoModal } from './VideoModal';

interface MuscleDrawerProps {
  muscleId: MuscleGroupId | null;
  selectedSide?: MuscleSide;
  selectedSubRegion?: string | null;
  selectedMeshLabel?: string | null;
  isIsolated?: boolean;
  onToggleIsolate?: () => void;
  onChangeSide?: (side: MuscleSide) => void;
  onChangeSubRegion?: (subRegion: string | null) => void;
  onClose: () => void;
}

type EquipmentFilter = 'all' | 'barbell' | 'dumbbell' | 'cable' | 'machine' | 'bodyweight';

export const MuscleDrawer: React.FC<MuscleDrawerProps> = ({
  muscleId,
  selectedSide = 'both',
  selectedSubRegion = null,
  selectedMeshLabel = null,
  isIsolated = false,
  onToggleIsolate,
  onChangeSide,
  onChangeSubRegion,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'exercises' | 'biomechanics' | 'videos'>('exercises');
  const [activeVideo, setActiveVideo] = useState<VideoLecture | null>(null);
  const [equipmentFilter, setEquipmentFilter] = useState<EquipmentFilter>('all');

  if (!muscleId) return null;

  const muscle = MUSCLES_DATA[muscleId];
  if (!muscle) return null;

  // Active sub-region data
  const activeSubRegionInfo = useMemo(() => {
    if (!selectedSubRegion || !muscle.subRegions) return null;
    return muscle.subRegions.find((sr) => sr.id === selectedSubRegion) || null;
  }, [selectedSubRegion, muscle.subRegions]);

  const allExercises = useMemo(() => {
    return muscle.keyExercises.map((exId) => EXERCISES_DATA[exId]).filter(Boolean);
  }, [muscle.keyExercises]);

  const subRegionFilteredExercises = useMemo(() => {
    if (!selectedSubRegion) return allExercises;
    return allExercises.filter((ex) => ex.targetSubRegions?.includes(selectedSubRegion));
  }, [allExercises, selectedSubRegion]);

  const availableEquipments = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const ex of subRegionFilteredExercises) {
      counts[ex.equipment] = (counts[ex.equipment] || 0) + 1;
    }
    return counts;
  }, [subRegionFilteredExercises]);

  const filteredExercises = useMemo(() => {
    if (equipmentFilter === 'all') return subRegionFilteredExercises;
    return subRegionFilteredExercises.filter((ex) => ex.equipment === equipmentFilter);
  }, [subRegionFilteredExercises, equipmentFilter]);

  const handleWatchVideo = (youtubeId: string, title: string) => {
    setActiveVideo({
      id: youtubeId,
      youtubeId,
      title,
      creator: 'Expert Breakdown',
      channelName: 'Curated Fitness Science',
      duration: '10:00',
      focusTopic: 'Technique Breakdown',
      summary: 'Comprehensive execution and anatomy guide.',
    });
  };

  const sideLabel =
    selectedSide === 'left' ? 'Left' : selectedSide === 'right' ? 'Right' : 'Both Sides';

  return (
    <>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col h-full overflow-hidden">
        {/* Drawer Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                {muscle.category.replace('_', ' ')}
              </span>
              <span className="text-xs text-slate-400">View: {muscle.viewSide}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
                {sideLabel}
              </span>
              {activeSubRegionInfo && (
                <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/20">
                  {activeSubRegionInfo.name}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-black text-white mt-1.5">{muscle.name}</h2>
            {selectedMeshLabel && (
              <p className="text-xs font-semibold text-cyan-400 mt-0.5">{selectedMeshLabel}</p>
            )}
            <p className="text-xs italic text-slate-400 mt-0.5">{muscle.scientificName}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            title="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PRIMARY: Anatomical Heads & Sub-Regions Selector Bar */}
        {muscle.subRegions && muscle.subRegions.length > 0 && (
          <div className="pt-3.5 pb-3 border-b border-slate-800/80">
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Anatomical Heads / Regions:
              </span>
              {selectedSubRegion && (
                <button
                  type="button"
                  onClick={() => onChangeSubRegion?.(null)}
                  className="text-[10px] text-cyan-400 hover:underline font-semibold"
                >
                  Show All ({allExercises.length})
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => onChangeSubRegion?.(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  !selectedSubRegion
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-md shadow-cyan-500/20'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-850'
                }`}
              >
                All Parts ({allExercises.length})
              </button>

              {muscle.subRegions.map((sr) => {
                const count = allExercises.filter((ex) =>
                  ex.targetSubRegions?.includes(sr.id),
                ).length;
                const isSelected = selectedSubRegion === sr.id;
                return (
                  <button
                    key={sr.id}
                    type="button"
                    onClick={() => onChangeSubRegion?.(isSelected ? null : sr.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-md shadow-cyan-500/20'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    {sr.name} {count > 0 && <span className="opacity-80">({count})</span>}
                  </button>
                );
              })}
            </div>

            {/* Active Head Highlights Card */}
            {activeSubRegionInfo && (
              <div className="mt-2.5 bg-gradient-to-r from-cyan-950/40 via-[#0b1b2b] to-slate-950 border border-cyan-500/30 rounded-xl p-3 text-xs shadow-inner">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-black text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    {activeSubRegionInfo.name}
                  </span>
                  {activeSubRegionInfo.scientificName && (
                    <span className="text-[10px] italic text-cyan-400/80 font-medium">
                      {activeSubRegionInfo.scientificName}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  {activeSubRegionInfo.description}
                </p>
                {activeSubRegionInfo.primaryAction && (
                  <div className="mt-1.5 text-[11px] text-cyan-300 font-semibold flex items-center gap-1">
                    <span className="text-slate-400 font-normal">Primary Action:</span>
                    <span>{activeSubRegionInfo.primaryAction}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* SECONDARY: Bilateral Side & 3D Isolation Controls */}
        <div className="pt-3 pb-2 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80">
          {onChangeSide && (
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <span className="text-[10px] text-slate-500 font-bold px-1.5 uppercase">Side:</span>
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

          {onToggleIsolate && (
            <button
              type="button"
              onClick={onToggleIsolate}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isIsolated
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:text-cyan-400'
              }`}
            >
              {isIsolated ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {isIsolated ? 'Show Full Body' : 'Isolate In 3D'}
            </button>
          )}
        </div>

        {/* Muscle Overview (when no specific sub-region is selected) */}
        {!selectedSubRegion && (
          <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{muscle.description}</p>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-2 mt-3.5 border-b border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('exercises')}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'exercises'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Exercises ({subRegionFilteredExercises.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('biomechanics')}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'biomechanics'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Biomechanics
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'videos'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Lectures ({muscle.featuredVideos.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-4 max-h-[460px] custom-scrollbar">
          {/* 1. EXERCISES TAB */}
          {activeTab === 'exercises' && (
            <div className="space-y-3.5">
              {/* Equipment Filter Bar */}
              <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold mb-1.5 px-1">
                  <Filter className="w-3 h-3 text-cyan-400" />
                  <span>Filter by Equipment:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEquipmentFilter('all')}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                      equipmentFilter === 'all'
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    All ({subRegionFilteredExercises.length})
                  </button>

                  {(['barbell', 'dumbbell', 'cable', 'machine', 'bodyweight'] as const).map(
                    (eq) => {
                      const count = availableEquipments[eq] || 0;
                      if (count === 0) return null;
                      return (
                        <button
                          key={eq}
                          type="button"
                          onClick={() => setEquipmentFilter(eq)}
                          className={`px-2 py-0.5 rounded-md text-[11px] font-medium capitalize transition-all ${
                            equipmentFilter === eq
                              ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                          }`}
                        >
                          {eq} ({count})
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              {/* Exercises List */}
              {filteredExercises.length > 0 ? (
                <div className="space-y-3.5">
                  {filteredExercises.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onWatchVideo={(youtubeId, title) => handleWatchVideo(youtubeId, title)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6 text-center">
                  <Dumbbell className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">
                    No {equipmentFilter} exercises found for{' '}
                    {activeSubRegionInfo ? activeSubRegionInfo.name : muscle.name}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setEquipmentFilter('all')}
                    className="mt-3 text-xs text-cyan-400 hover:underline font-semibold"
                  >
                    Reset Filter (Show All)
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 2. BIOMECHANICS TAB */}
          {activeTab === 'biomechanics' && (
            <div className="space-y-3.5 text-xs">
              {/* Highlighted Sub-Region Card */}
              {activeSubRegionInfo && (
                <div className="bg-gradient-to-r from-cyan-950/60 to-slate-950 border border-cyan-500/40 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-white text-sm">
                      {activeSubRegionInfo.name} Biomechanics
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-2.5">
                    {activeSubRegionInfo.description}
                  </p>
                  {activeSubRegionInfo.primaryAction && (
                    <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-cyan-300 font-semibold">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold mb-0.5">
                        Line of Pull & Joint Movement:
                      </span>
                      {activeSubRegionInfo.primaryAction}
                    </div>
                  )}
                </div>
              )}

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 font-medium block mb-1">Anatomical Origin:</span>
                <p className="text-slate-200 font-semibold">{muscle.biomechanics.origin}</p>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 font-medium block mb-1">Anatomical Insertion:</span>
                <p className="text-slate-200 font-semibold">{muscle.biomechanics.insertion}</p>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 font-medium block mb-1">Primary Joint Action:</span>
                <p className="text-cyan-300 font-semibold">{muscle.biomechanics.primaryAction}</p>
              </div>

              {muscle.biomechanics.secondaryAction && (
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 font-medium block mb-1">
                    Secondary Joint Action:
                  </span>
                  <p className="text-slate-200 font-semibold">
                    {muscle.biomechanics.secondaryAction}
                  </p>
                </div>
              )}

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 font-medium block mb-1">Fiber Orientation:</span>
                <p className="text-slate-200 font-semibold">
                  {muscle.biomechanics.fiberOrientation}
                </p>
              </div>
            </div>
          )}

          {/* 3. VIDEOS TAB */}
          {activeTab === 'videos' && (
            <div className="space-y-3.5">
              {muscle.featuredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between gap-3 hover:border-cyan-500/40 transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-white leading-snug">{video.title}</h4>
                      <span className="text-[10px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md shrink-0">
                        {video.duration}
                      </span>
                    </div>
                    <span className="text-[11px] text-cyan-400 font-medium block mt-1">
                      {video.creator} • {video.channelName}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                      {video.summary}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    className="w-full py-2 px-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Watch Lecture
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <VideoModal
          isOpen={Boolean(activeVideo)}
          youtubeId={activeVideo.youtubeId}
          title={activeVideo.title}
          creator={activeVideo.creator}
          summary={activeVideo.summary}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  );
};
