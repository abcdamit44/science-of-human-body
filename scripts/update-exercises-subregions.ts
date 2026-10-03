import fs from 'fs';
import path from 'path';

const SUBREGION_MAPPINGS: Record<string, { targetSubRegions: string[]; targetSubRegionLabel: string }> = {
  // Chest
  'bench-press': {
    targetSubRegions: ['middle'],
    targetSubRegionLabel: 'Middle (Sternocostal Head)',
  },
  'incline-db-press': {
    targetSubRegions: ['upper'],
    targetSubRegionLabel: 'Upper (Clavicular Head)',
  },
  'cable-fly': {
    targetSubRegions: ['middle', 'inner_deep'],
    targetSubRegionLabel: 'Middle (Sternocostal Head)',
  },
  'dips': {
    targetSubRegions: ['lower'],
    targetSubRegionLabel: 'Lower (Abdominal Head)',
  },
  'push-ups': {
    targetSubRegions: ['middle'],
    targetSubRegionLabel: 'Middle (Sternocostal Head)',
  },
  'machine-chest-press': {
    targetSubRegions: ['middle'],
    targetSubRegionLabel: 'Middle (Sternocostal Head)',
  },

  // Lats
  'lat-pulldown': {
    targetSubRegions: ['lats_all'],
    targetSubRegionLabel: 'Thoracic & Lumbar Lats',
  },
  'barbell-row': {
    targetSubRegions: ['lats_all'],
    targetSubRegionLabel: 'Thoracic & Lumbar Lats',
  },
  'neutral-pullups': {
    targetSubRegions: ['lats_all'],
    targetSubRegionLabel: 'Thoracic & Lumbar Lats',
  },
  'single-arm-cable-row': {
    targetSubRegions: ['lats_all'],
    targetSubRegionLabel: 'Lower / Iliac Lat Origin',
  },
  'straight-arm-pulldown': {
    targetSubRegions: ['lats_all'],
    targetSubRegionLabel: 'Thoracic & Lumbar Lats',
  },

  // Upper Back
  'chest-supported-row': {
    targetSubRegions: ['mid_traps_rhomboids'],
    targetSubRegionLabel: 'Mid Traps & Rhomboids',
  },
  'face-pulls': {
    targetSubRegions: ['lower_traps', 'rotator_cuff'],
    targetSubRegionLabel: 'Lower Traps & Rotator Cuff',
  },
  'barbell-shrugs': {
    targetSubRegions: ['upper_traps'],
    targetSubRegionLabel: 'Upper Trapezius (Elevation)',
  },
  't-bar-row': {
    targetSubRegions: ['mid_traps_rhomboids'],
    targetSubRegionLabel: 'Mid Traps & Rhomboids',
  },

  // Lower Back
  'conventional-deadlift': {
    targetSubRegions: ['erector_spinae', 'thoracolumbar_fascia'],
    targetSubRegionLabel: 'Erector Spinae & Thoracolumbar Fascia',
  },
  'hyperextension': {
    targetSubRegions: ['erector_spinae', 'deep_stabilizers'],
    targetSubRegionLabel: 'Erector Spinae & Multifidus',
  },
  'good-mornings': {
    targetSubRegions: ['erector_spinae'],
    targetSubRegionLabel: 'Erector Spinae Columns',
  },

  // Shoulders
  'overhead-press': {
    targetSubRegions: ['front'],
    targetSubRegionLabel: 'Front Deltoid (Anterior)',
  },
  'cable-lateral-raise': {
    targetSubRegions: ['side'],
    targetSubRegionLabel: 'Side Deltoid (Lateral / Boulder)',
  },
  'dumbbell-lateral-raise': {
    targetSubRegions: ['side'],
    targetSubRegionLabel: 'Side Deltoid (Lateral / Boulder)',
  },
  'reverse-pec-deck': {
    targetSubRegions: ['rear'],
    targetSubRegionLabel: 'Rear Deltoid (Posterior)',
  },
  'arnold-press': {
    targetSubRegions: ['front', 'side'],
    targetSubRegionLabel: 'Front & Side Deltoid',
  },

  // Biceps
  'barbell-curl': {
    targetSubRegions: ['short', 'long'],
    targetSubRegionLabel: 'Short Head & Long Head',
  },
  'incline-db-curl': {
    targetSubRegions: ['long'],
    targetSubRegionLabel: 'Long Head (Peak / Stretch)',
  },
  'preacher-curl': {
    targetSubRegions: ['short'],
    targetSubRegionLabel: 'Short Head (Inner Width)',
  },
  'hammer-curl': {
    targetSubRegions: ['brachialis'],
    targetSubRegionLabel: 'Brachialis & Brachioradialis',
  },
  'bayesian-cable-curl': {
    targetSubRegions: ['long'],
    targetSubRegionLabel: 'Long Head (Stretch Hypertrophy)',
  },

  // Triceps
  'close-grip-bench': {
    targetSubRegions: ['medial', 'lateral'],
    targetSubRegionLabel: 'Medial & Lateral Heads',
  },
  'tricep-pushdown': {
    targetSubRegions: ['lateral', 'medial'],
    targetSubRegionLabel: 'Lateral Head (Horseshoe)',
  },
  'overhead-cable-extension': {
    targetSubRegions: ['long'],
    targetSubRegionLabel: 'Long Head (Stretch / Overhead)',
  },
  'skull-crushers': {
    targetSubRegions: ['long', 'medial'],
    targetSubRegionLabel: 'Long Head & Medial Head',
  },

  // Forearms
  'wrist-curls': {
    targetSubRegions: ['flexors'],
    targetSubRegionLabel: 'Wrist & Finger Flexors',
  },
  'reverse-wrist-curls': {
    targetSubRegions: ['extensors'],
    targetSubRegionLabel: 'Wrist & Finger Extensors',
  },
  'farmers-walk': {
    targetSubRegions: ['flexors', 'brachioradialis'],
    targetSubRegionLabel: 'Flexors & Brachioradialis',
  },
  'dead-hang': {
    targetSubRegions: ['flexors'],
    targetSubRegionLabel: 'Deep Finger Flexors & Grip',
  },

  // Abs
  'hanging-leg-raise': {
    targetSubRegions: ['lower_abs'],
    targetSubRegionLabel: 'Lower Rectus & Pelvic Curl',
  },
  'cable-crunch': {
    targetSubRegions: ['upper_abs'],
    targetSubRegionLabel: 'Upper Rectus Abdominis',
  },
  'ab-wheel-rollout': {
    targetSubRegions: ['upper_abs', 'transverse_core'],
    targetSubRegionLabel: 'Rectus Abdominis & Deep Core',
  },
  'plank': {
    targetSubRegions: ['transverse_core'],
    targetSubRegionLabel: 'Transverse Abdominis & Deep Core',
  },

  // Obliques
  'russian-twist': {
    targetSubRegions: ['external_oblique', 'internal_oblique'],
    targetSubRegionLabel: 'Internal & External Obliques',
  },
  'cable-woodchopper': {
    targetSubRegions: ['external_oblique'],
    targetSubRegionLabel: 'External Oblique (V-Cut)',
  },

  // Glutes
  'barbell-hip-thrust': {
    targetSubRegions: ['maximus'],
    targetSubRegionLabel: 'Gluteus Maximus (Peak Contraction)',
  },
  'glute-bridge': {
    targetSubRegions: ['maximus'],
    targetSubRegionLabel: 'Gluteus Maximus',
  },
  'cable-glute-kickback': {
    targetSubRegions: ['maximus', 'medius'],
    targetSubRegionLabel: 'Gluteus Maximus & Medius',
  },
  'hip-abduction-machine': {
    targetSubRegions: ['medius', 'minimus_rotators'],
    targetSubRegionLabel: 'Gluteus Medius (Upper Shelf)',
  },

  // Quads
  'barbell-squat': {
    targetSubRegions: ['vastus_lateralis', 'vastus_medialis', 'vastus_intermedius'],
    targetSubRegionLabel: 'Outer Sweep & Teardrop',
  },
  'front-squat': {
    targetSubRegions: ['rectus_femoris', 'vastus_medialis'],
    targetSubRegionLabel: 'Rectus Femoris & Teardrop',
  },
  'leg-press': {
    targetSubRegions: ['vastus_lateralis', 'vastus_intermedius'],
    targetSubRegionLabel: 'Vastus Lateralis & Intermedius',
  },
  'leg-extension': {
    targetSubRegions: ['rectus_femoris', 'vastus_medialis'],
    targetSubRegionLabel: 'Rectus Femoris (Hip Flexion / Lockout)',
  },
  'hack-squat': {
    targetSubRegions: ['vastus_lateralis', 'vastus_medialis'],
    targetSubRegionLabel: 'Outer Sweep (Vastus Lateralis)',
  },
  'bulgarian-split-squat': {
    targetSubRegions: ['vastus_medialis'],
    targetSubRegionLabel: 'Teardrop (Vastus Medialis / VMO)',
  },

  // Hamstrings
  'romanian-deadlift': {
    targetSubRegions: ['medial_hamstrings', 'lateral_hamstrings'],
    targetSubRegionLabel: 'Medial & Lateral Hamstrings (Hip Extension)',
  },
  'seated-leg-curl': {
    targetSubRegions: ['lateral_hamstrings', 'medial_hamstrings'],
    targetSubRegionLabel: 'Biceps Femoris & Semitendinosus',
  },
  'lying-leg-curl': {
    targetSubRegions: ['lateral_hamstrings'],
    targetSubRegionLabel: 'Lateral Hamstrings (Biceps Femoris)',
  },
  'stiff-legged-deadlift': {
    targetSubRegions: ['medial_hamstrings'],
    targetSubRegionLabel: 'Medial Hamstrings (Semimembranosus)',
  },
  'nordic-hamstring-curl': {
    targetSubRegions: ['lateral_hamstrings', 'medial_hamstrings'],
    targetSubRegionLabel: 'Eccentric Biceps Femoris & Medial',
  },

  // Calves
  'standing-calf-raise': {
    targetSubRegions: ['gastrocnemius'],
    targetSubRegionLabel: 'Diamond Calf (Gastrocnemius)',
  },
  'seated-calf-raise': {
    targetSubRegions: ['soleus'],
    targetSubRegionLabel: 'Deep Calf (Soleus)',
  },
  'leg-press-calf-raise': {
    targetSubRegions: ['gastrocnemius'],
    targetSubRegionLabel: 'Diamond Calf (Gastrocnemius)',
  },
  'tibialis-raise': {
    targetSubRegions: ['tibialis_peroneals'],
    targetSubRegionLabel: 'Tibialis Anterior & Shins',
  },
};

const exercisesPath = path.resolve(__dirname, '../src/data/exercises.ts');
const { EXERCISES_DATA } = require('../src/data/exercises.ts');

const updated: Record<string, any> = {};
for (const [key, data] of Object.entries(EXERCISES_DATA) as [string, any][]) {
  const map = SUBREGION_MAPPINGS[key] || { targetSubRegions: [], targetSubRegionLabel: undefined };
  updated[key] = {
    ...data,
    targetSubRegions: map.targetSubRegions,
    targetSubRegionLabel: map.targetSubRegionLabel,
  };
}

const fileContent = `import type { ExerciseGuide } from '@/types/anatomy';

export const EXERCISES_DATA: Record<string, ExerciseGuide> = ${JSON.stringify(updated, null, 2)};
`;

fs.writeFileSync(exercisesPath, fileContent, 'utf8');
console.log('Successfully updated exercises.ts with targetSubRegions and targetSubRegionLabel!');
