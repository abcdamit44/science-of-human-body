'use client';

import { MuscleDrawer } from '@/components/anatomy/MuscleDrawer';
import { Navbar } from '@/components/layout/Navbar';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { ChapterList } from '@/components/tracks/ChapterList';
import { TrackCard } from '@/components/tracks/TrackCard';
import { MUSCLES_DATA } from '@/data/muscles';
import { LEARNING_TRACKS } from '@/data/tracks';
import { FITNESS_CREATORS } from '@/data/youtubers';
import { calculateMetrics } from '@/lib/fitnessMath';
import type { MuscleGroupId, MuscleSide } from '@/types/anatomy';
import type { LearningTrack } from '@/types/track';
import type { UserProfile } from '@/types/user';
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Dumbbell,
  Flame,
  HelpCircle,
  Play,
  Rotate3d,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import BodyCanvas with SSR disabled because Three.js / WebGL is client-only
const BodyCanvas = dynamic(
  () => import('@/components/3d/BodyCanvas').then((mod) => mod.BodyCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[620px] lg:h-[720px] bg-slate-900/70 border border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-medium">
          Initializing 3D Anatomy Engine...
        </span>
      </div>
    ),
  },
);

export default function Home() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeView, setActiveView] = useState<'3d-explorer' | 'tracks'>('3d-explorer');

  // Interactive 3D & Anatomy State with Bilateral, Sub-Region, and Isolation Support
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroupId | null>('chest');
  const [selectedSide, setSelectedSide] = useState<MuscleSide>('both');
  const [selectedSubRegion, setSelectedSubRegion] = useState<string | null>(null);
  const [selectedMeshName, setSelectedMeshName] = useState<string | null>(null);
  const [selectedMeshLabel, setSelectedMeshLabel] = useState<string | null>(null);
  const [isIsolated, setIsIsolated] = useState<boolean>(false);
  const [hoveredMuscle, setHoveredMuscle] = useState<MuscleGroupId | null>(null);

  // Curriculum State
  const [selectedTrack, setSelectedTrack] = useState<LearningTrack>(LEARNING_TRACKS.hypertrophy);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);

  // Load saved profile & progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('science_body_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        setUserProfile(parsed);
        if (parsed.primaryGoal && LEARNING_TRACKS[parsed.primaryGoal]) {
          setSelectedTrack(LEARNING_TRACKS[parsed.primaryGoal]);
        }
      }
      const savedChapters = localStorage.getItem('science_body_completed_chapters');
      if (savedChapters) {
        setCompletedChapters(JSON.parse(savedChapters));
      }

      const params = new URLSearchParams(window.location.search);
      const muscleParam = params.get('muscle') as MuscleGroupId;
      if (muscleParam && MUSCLES_DATA[muscleParam]) {
        setSelectedMuscle(muscleParam);
      }
      const sideParam = params.get('side') as MuscleSide;
      if (sideParam && ['left', 'right', 'both'].includes(sideParam)) {
        setSelectedSide(sideParam);
      }
      const subParam = params.get('sub');
      if (subParam) {
        setSelectedSubRegion(subParam);
      }
    } catch {
      // Ignore storage read error
    }
  }, []);

  const handleSelectMuscle = (
    groupId: MuscleGroupId,
    side: MuscleSide = 'both',
    subRegion?: string | null,
    meshName?: string,
    label?: string,
  ) => {
    setSelectedMuscle(groupId);
    setSelectedSide(side);
    setSelectedSubRegion(subRegion || null);
    setSelectedMeshName(meshName || null);
    setSelectedMeshLabel(label || null);
  };

  const handleCompleteOnboarding = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowOnboarding(false);
    if (LEARNING_TRACKS[profile.primaryGoal]) {
      setSelectedTrack(LEARNING_TRACKS[profile.primaryGoal]);
    }
    try {
      localStorage.setItem('science_body_profile', JSON.stringify(profile));
    } catch {
      // Storage error ignored
    }
  };

  const handleToggleChapter = (chapterId: string) => {
    setCompletedChapters((prev) => {
      const next = prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId];
      try {
        localStorage.setItem('science_body_completed_chapters', JSON.stringify(next));
      } catch {
        // Storage error ignored
      }
      return next;
    });
  };

  const calculatedMetrics = userProfile
    ? calculateMetrics(
        userProfile.weightKg,
        userProfile.heightCm,
        userProfile.age,
        userProfile.gender,
        userProfile.experienceLevel,
        userProfile.primaryGoal,
      )
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      <Navbar
        userProfile={userProfile}
        onOpenOnboarding={() => setShowOnboarding(true)}
        activeView={activeView}
        onSelectView={setActiveView}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Welcome / Metrics Bar */}
        {userProfile && calculatedMetrics && (
          <div className="bg-gradient-to-r from-slate-900 via-[#0e1628] to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Welcome back, {userProfile.name}!</h3>
                <p className="text-xs text-slate-400">
                  Track focus:{' '}
                  <span className="text-cyan-300 font-medium capitalize">
                    {userProfile.primaryGoal}
                  </span>{' '}
                  • {userProfile.experienceLevel} level
                </p>
              </div>
            </div>

            {/* Quick Metrics Badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="text-slate-500">BMI: </span>
                <span className="font-bold text-white">{calculatedMetrics.bmi}</span>
                <span className="text-slate-500 text-[10px] ml-1">
                  ({calculatedMetrics.bmiCategory})
                </span>
              </div>
              <div className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="text-slate-500">Daily Target: </span>
                <span className="font-bold text-cyan-400">{calculatedMetrics.tdeeEstimate}</span>
                <span className="text-slate-500 text-[10px] ml-1">kcal</span>
              </div>
              <div className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="text-slate-500">Protein: </span>
                <span className="font-bold text-emerald-400">
                  {calculatedMetrics.recommendedProteinGrams}g
                </span>
                <span className="text-slate-500 text-[10px] ml-1">/day</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 1: 3D ANATOMY EXPLORER */}
        {activeView === '3d-explorer' && (
          <div className="space-y-6">
            {/* Quick Muscle Selector Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
                <Rotate3d className="w-3.5 h-3.5 text-cyan-400" />
                Select Muscle:
              </span>
              {Object.values(MUSCLES_DATA).map((m) => {
                const isSelected = selectedMuscle === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleSelectMuscle(m.id, 'both', null)}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {m.name}
                  </button>
                );
              })}
            </div>

            {/* Split Grid: 3D Canvas on Left, Muscle Drawer on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* 3D Human Body Canvas (7 cols on large screens) */}
              <div className="lg:col-span-7">
                <BodyCanvas
                  selectedMuscle={selectedMuscle}
                  selectedSide={selectedSide}
                  selectedSubRegion={selectedSubRegion}
                  selectedMeshName={selectedMeshName}
                  selectedMeshLabel={selectedMeshLabel}
                  hoveredMuscle={hoveredMuscle}
                  isIsolated={isIsolated}
                  onToggleIsolate={() => setIsIsolated((prev) => !prev)}
                  onChangeSide={(side) => {
                    setSelectedSide(side);
                    setSelectedMeshName(null);
                    setSelectedMeshLabel(null);
                  }}
                  onChangeSubRegion={(subRegion) => {
                    setSelectedSubRegion(subRegion);
                    setSelectedMeshName(null);
                    setSelectedMeshLabel(null);
                  }}
                  onSelectMuscle={handleSelectMuscle}
                  onHoverMuscle={(id) => setHoveredMuscle(id)}
                />
              </div>

              {/* Muscle Details & Exercise Breakdown (5 cols on large screens) */}
              <div className="lg:col-span-5">
                {selectedMuscle ? (
                  <MuscleDrawer
                    muscleId={selectedMuscle}
                    selectedSide={selectedSide}
                    selectedSubRegion={selectedSubRegion}
                    selectedMeshLabel={selectedMeshLabel}
                    isIsolated={isIsolated}
                    onToggleIsolate={() => setIsIsolated((prev) => !prev)}
                    onChangeSide={(side) => {
                      setSelectedSide(side);
                      setSelectedMeshName(null);
                      setSelectedMeshLabel(null);
                    }}
                    onChangeSubRegion={(subRegion) => {
                      setSelectedSubRegion(subRegion);
                      setSelectedMeshName(null);
                      setSelectedMeshLabel(null);
                    }}
                    onClose={() => {
                      setSelectedMuscle(null);
                      setSelectedSubRegion(null);
                      setSelectedMeshName(null);
                      setSelectedMeshLabel(null);
                      setIsIsolated(false);
                    }}
                  />
                ) : (
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-4 text-cyan-400">
                      <Rotate3d className="w-7 h-7 stroke-[1.5]" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">Select A Muscle Group</h3>
                    <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-4">
                      Click directly on the 3D human body or choose a muscle pill above to explore
                      biomechanics, form guides, and expert video lectures.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSelectMuscle('chest', 'both')}
                      className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-semibold transition-colors"
                    >
                      Inspect Chest Pectorals
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Science YouTubers & Educators */}
            <div className="pt-6 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Featured Science-Based Fitness Educators
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Curated content backed by biochemistry, exercise physiology, and biomechanics.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {Object.values(FITNESS_CREATORS).map((creator) => (
                  <a
                    key={creator.id}
                    href={creator.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {creator.name}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                      <span className="text-[10px] text-cyan-400/90 font-medium block mt-0.5">
                        {creator.channelName}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {creator.credentials}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-3 pt-2 border-t border-slate-800/60 block">
                      {creator.specialty}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CURRICULUM TRACKS */}
        {activeView === 'tracks' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-white">Structured Learning Tracks</h2>
              <p className="text-xs text-slate-400 mt-1">
                Choose your focus domain to access complete, chapter-by-chapter video lectures and
                exercises.
              </p>
            </div>

            {/* Track Selector Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.values(LEARNING_TRACKS).map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  isSelected={selectedTrack.id === track.id}
                  onSelect={(t) => setSelectedTrack(t)}
                />
              ))}
            </div>

            {/* Selected Track Chapters Syllabus */}
            <ChapterList
              track={selectedTrack}
              completedChapters={completedChapters}
              onToggleComplete={handleToggleChapter}
            />
          </div>
        )}
      </main>

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onComplete={handleCompleteOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
}
