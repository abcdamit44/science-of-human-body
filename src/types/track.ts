import type { MuscleGroupId } from './anatomy';

export type TrackCategory = 'powerlifting' | 'cutting' | 'hypertrophy' | 'calisthenics';

export interface Chapter {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  durationMinutes: number;
  overview: string;
  learningOutcomes: string[];
  lectureVideoId: string;
  lectureCreator: string;
  relatedMuscles: MuscleGroupId[];
  recommendedExercises: string[]; // exercise ids
}

export interface LearningTrack {
  id: TrackCategory;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  iconName: string;
  colorScheme: {
    primary: string;
    secondary: string;
    border: string;
  };
  totalChapters: number;
  estimatedWeeks: number;
  targetAudience: string;
  chapters: Chapter[];
}
