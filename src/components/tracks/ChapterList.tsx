'use client';

import { EXERCISES_DATA } from '@/data/exercises';
import type { LearningTrack } from '@/types/track';
import { CheckCircle2, ChevronRight, Clock, Dumbbell, PlayCircle } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { VideoModal } from '../anatomy/VideoModal';

interface ChapterListProps {
  track: LearningTrack;
  completedChapters: string[];
  onToggleComplete: (chapterId: string) => void;
}

export const ChapterList: React.FC<ChapterListProps> = ({
  track,
  completedChapters,
  onToggleComplete,
}) => {
  const [activeVideo, setActiveVideo] = useState<{
    youtubeId: string;
    title: string;
    creator: string;
    summary: string;
  } | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Curriculum Track
            </span>
            <h2 className="text-2xl font-black text-white">{track.title}</h2>
          </div>
          <div className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            Progress: {completedChapters.filter((id) => id.startsWith(track.id.slice(0, 3))).length}{' '}
            / {track.chapters.length} Completed
          </div>
        </div>
        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">{track.description}</p>
      </div>

      {/* Chapters Accordion / List */}
      <div className="space-y-4">
        {track.chapters.map((chapter) => {
          const isDone = completedChapters.includes(chapter.id);
          const exercises = chapter.recommendedExercises
            .map((id) => EXERCISES_DATA[id])
            .filter(Boolean);

          return (
            <div
              key={chapter.id}
              className={`bg-slate-900/90 border rounded-2xl p-6 transition-all shadow-md ${
                isDone
                  ? 'border-emerald-500/40 bg-slate-900/50'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-cyan-400 flex items-center justify-center">
                      {chapter.order}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {chapter.durationMinutes} mins lecture & notes
                    </span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-400">
                      Instructor: {chapter.lectureCreator}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{chapter.title}</h3>
                  <p className="text-xs text-cyan-400/90 font-medium mt-0.5">{chapter.subtitle}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveVideo({
                        youtubeId: chapter.lectureVideoId,
                        title: `${chapter.title} - ${chapter.subtitle}`,
                        creator: chapter.lectureCreator,
                        summary: chapter.overview,
                      })
                    }
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Watch Lecture
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleComplete(chapter.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                      isDone
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${isDone ? 'text-emerald-400' : 'text-slate-600'}`}
                    />
                    {isDone ? 'Completed' : 'Mark Done'}
                  </button>
                </div>
              </div>

              {/* Chapter Overview */}
              <p className="text-xs text-slate-300 mt-4 leading-relaxed">{chapter.overview}</p>

              {/* Key Takeaways */}
              <div className="mt-4 pt-4 border-t border-slate-800/80">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Core Scientific Principles
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {chapter.learningOutcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2 text-xs text-slate-300">
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practical Exercise Connections */}
              {exercises.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
                    <Dumbbell className="w-3.5 h-3.5 text-slate-500" />
                    Target Exercises:
                  </span>
                  {exercises.map((ex) => (
                    <span
                      key={ex.id}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-medium"
                    >
                      {ex.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal
          isOpen={true}
          onClose={() => setActiveVideo(null)}
          youtubeId={activeVideo.youtubeId}
          title={activeVideo.title}
          creator={activeVideo.creator}
          summary={activeVideo.summary}
        />
      )}
    </div>
  );
};
