'use client';

import type { ExerciseGuide } from '@/types/anatomy';
import { AlertTriangle, CheckCircle2, Dumbbell, PlayCircle } from 'lucide-react';
import type React from 'react';

interface ExerciseCardProps {
  exercise: ExerciseGuide;
  onWatchVideo?: (youtubeId: string, title: string) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onWatchVideo }) => {
  const videoId = exercise.youtubeVideoId;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all shadow-md">
      {/* Title & Badges */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-cyan-400" />
            {exercise.name}
          </h4>
          <div className="flex items-center gap-2 flex-wrap mt-0.5">
            {exercise.targetSubRegionLabel && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                🎯 {exercise.targetSubRegionLabel}
              </span>
            )}
            <span className="text-xs text-slate-400 capitalize">
              Equipment: {exercise.equipment} • Level: {exercise.difficulty}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-slate-800 text-slate-300 border border-slate-700 capitalize">
            {exercise.type}
          </span>
          {videoId && onWatchVideo && (
            <button
              type="button"
              onClick={() => onWatchVideo(videoId, exercise.name)}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950 transition-colors"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              Watch Video
            </button>
          )}
        </div>
      </div>

      {/* Form Cues */}
      <div className="mb-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
          Form Execution Cues
        </span>
        <ul className="space-y-1.5">
          {exercise.formCues.map((cue) => (
            <li key={cue} className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{cue}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Common Mistakes */}
      {exercise.commonMistakes.length > 0 && (
        <div className="pt-2 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-rose-400/90 uppercase tracking-wider flex items-center gap-1 mb-1.5">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            Mistakes To Avoid
          </span>
          <ul className="space-y-1">
            {exercise.commonMistakes.map((mistake) => (
              <li key={mistake} className="text-xs text-slate-400 pl-4 relative">
                <span className="absolute left-1.5 top-1.5 w-1 h-1 rounded-full bg-rose-400" />
                {mistake}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
