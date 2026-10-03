'use client';

import type { LearningTrack } from '@/types/track';
import { Activity, ArrowRight, BookOpen, Clock, Dumbbell, Flame, Sparkles } from 'lucide-react';
import type React from 'react';

interface TrackCardProps {
  track: LearningTrack;
  isSelected: boolean;
  onSelect: (track: LearningTrack) => void;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track, isSelected, onSelect }) => {
  const getIcon = () => {
    switch (track.id) {
      case 'powerlifting':
        return <Dumbbell className="w-5 h-5 text-blue-400" />;
      case 'cutting':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'hypertrophy':
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
      default:
        return <Activity className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(track)}
      className={`p-6 rounded-2xl border transition-all text-left cursor-pointer flex flex-col justify-between w-full ${
        isSelected
          ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-500/50'
          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">{getIcon()}</div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {track.badge}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-1">{track.title}</h3>
        <p className="text-xs text-cyan-400 font-medium mb-2">{track.tagline}</p>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{track.description}</p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 w-full">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            {track.totalChapters} Chapters
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {track.estimatedWeeks} Weeks
          </span>
        </div>

        <span className="flex items-center gap-1 font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
          Explore
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </button>
  );
};
