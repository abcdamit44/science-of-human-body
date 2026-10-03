export type MuscleGroupId =
  | 'chest'
  | 'lats'
  | 'upper_back'
  | 'lower_back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'abs'
  | 'obliques'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves';

export type MuscleSide = 'left' | 'right' | 'both';

export interface SubRegionInfo {
  id: string;
  name: string;
  scientificName?: string;
  description: string;
  primaryAction?: string;
  targetExerciseIds?: string[];
  meshNames?: string[];
}

export interface SelectedMuscleState {
  groupId: MuscleGroupId;
  side: MuscleSide;
  subRegion?: string | null;
  meshName?: string;
  meshLabel?: string;
}

export type BodyViewSide = 'front' | 'back';

export interface Biomechanics {
  origin: string;
  insertion: string;
  primaryAction: string;
  secondaryAction?: string;
  fiberOrientation: string;
}

export interface ExerciseGuide {
  id: string;
  name: string;
  targetMuscle: MuscleGroupId;
  targetSubRegions?: string[];
  targetSubRegionLabel?: string;
  secondaryMuscles: MuscleGroupId[];
  type: 'compound' | 'isolation';
  equipment: 'barbell' | 'dumbbell' | 'cable' | 'machine' | 'bodyweight';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  formCues: string[];
  commonMistakes: string[];
  youtubeVideoId?: string;
  videoTimestamp?: number;
}

export interface VideoLecture {
  id: string;
  title: string;
  creator: string;
  channelName: string;
  youtubeId: string;
  duration: string;
  focusTopic: string;
  summary: string;
}

export interface MuscleInfo {
  id: MuscleGroupId;
  name: string;
  scientificName: string;
  viewSide: BodyViewSide | 'both';
  category: 'upper_push' | 'upper_pull' | 'arms' | 'core' | 'lower_body';
  description: string;
  subRegions?: SubRegionInfo[];
  biomechanics: Biomechanics;
  keyExercises: string[]; // exercise ids
  featuredVideos: VideoLecture[];
  // 3D placement metadata
  meshCoordinates: {
    x: number;
    y: number;
    z: number;
  };
}
