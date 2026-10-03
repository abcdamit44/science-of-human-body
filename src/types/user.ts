import type { MuscleGroupId } from './anatomy';
import type { TrackCategory } from './track';

export type { TrackCategory };

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type Gender = 'male' | 'female' | 'other';

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  experienceLevel: ExperienceLevel;
  primaryGoal: TrackCategory;
  onboardingCompleted: boolean;
  savedExercises: string[];
  completedChapters: string[];
  inspectedMuscles: MuscleGroupId[];
  createdAt: string;
}

export interface BodyMetrics {
  bmi: number;
  bmiCategory: string;
  bmr: number;
  tdeeEstimate: number;
  recommendedWaterLiters: number;
  recommendedProteinGrams: number;
}
