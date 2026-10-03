import fs from 'fs';
import path from 'path';

const SUBREGIONS_BY_MUSCLE: Record<string, any[]> = {
  chest: [
    {
      id: 'upper',
      name: 'Upper Chest',
      scientificName: 'Clavicular Head',
      description: 'Arises from the anterior surface of the medial half of the clavicle. Drives shoulder flexion and upward horizontal adduction.',
      primaryAction: 'Shoulder flexion & upward diagonal adduction',
      targetExerciseIds: ['incline-db-press', 'incline-barbell-press', 'low-to-high-cable-fly'],
    },
    {
      id: 'middle',
      name: 'Middle Chest',
      scientificName: 'Sternocostal Head',
      description: 'Arises from the anterior surface of the sternum and upper 6 costal cartilages. Provides maximum horizontal pressing force.',
      primaryAction: 'Horizontal adduction & transverse pressing',
      targetExerciseIds: ['bench-press', 'machine-chest-press', 'cable-fly', 'push-ups'],
    },
    {
      id: 'lower',
      name: 'Lower Chest',
      scientificName: 'Abdominal Head',
      description: 'Arises from the aponeurosis of the external oblique. Pulls the humerus downward and inward across the torso.',
      primaryAction: 'Downward adduction & shoulder extension from flexed angle',
      targetExerciseIds: ['dips', 'high-to-low-cable-fly', 'decline-press'],
    },
    {
      id: 'inner_deep',
      name: 'Deep Pec Minor',
      scientificName: 'Pectoralis Minor',
      description: 'Deep triangular muscle underlying pec major, running from ribs 3-5 to the coracoid process. Depresses and stabilizes the scapula.',
      primaryAction: 'Scapular depression and downward tilt',
      targetExerciseIds: ['dips', 'cable-fly'],
    },
  ],
  shoulders: [
    {
      id: 'front',
      name: 'Front Deltoid',
      scientificName: 'Anterior / Clavicular Head',
      description: 'Originates on the lateral third of the clavicle. Prime mover for forward shoulder flexion and overhead pressing.',
      primaryAction: 'Shoulder flexion & internal rotation',
      targetExerciseIds: ['overhead-press', 'arnold-press'],
    },
    {
      id: 'side',
      name: 'Side Deltoid',
      scientificName: 'Lateral / Acromial Head',
      description: 'Originates on the acromion process. Responsible for arm abduction, creating the round 3D capped shoulder width.',
      primaryAction: 'Arm abduction in the scapular plane',
      targetExerciseIds: ['cable-lateral-raise', 'dumbbell-lateral-raise', 'arnold-press'],
    },
    {
      id: 'rear',
      name: 'Rear Deltoid',
      scientificName: 'Posterior / Scapular Spinal Head',
      description: 'Originates on the spine of the scapula. Powers horizontal abduction and external rotation for upper back depth.',
      primaryAction: 'Horizontal abduction & external rotation',
      targetExerciseIds: ['reverse-pec-deck', 'face-pulls'],
    },
  ],
  triceps: [
    {
      id: 'long',
      name: 'Long Head',
      scientificName: 'Caput Longum Tricipitis',
      description: 'The only bi-articular tricep head, crossing both shoulder and elbow from the infraglenoid tubercle. Heavily targeted when the arm is overhead in deep stretch.',
      primaryAction: 'Elbow extension and shoulder extension/adduction',
      targetExerciseIds: ['overhead-cable-extension', 'skull-crushers'],
    },
    {
      id: 'lateral',
      name: 'Lateral Head',
      scientificName: 'Caput Laterale Tricipitis',
      description: 'Originates on the posterior humerus above the radial groove. Forms the classic lateral horseshoe profile and outputs peak power during pushdowns.',
      primaryAction: 'Powerful elbow extension',
      targetExerciseIds: ['tricep-pushdown', 'close-grip-bench'],
    },
    {
      id: 'medial',
      name: 'Medial Head',
      scientificName: 'Caput Mediale Tricipitis',
      description: 'Deep head originating across the lower posterior humerus. The primary active workhorse for all elbow extension regardless of angle or load.',
      primaryAction: 'Elbow extension and joint stability',
      targetExerciseIds: ['close-grip-bench', 'tricep-pushdown'],
    },
  ],
  biceps: [
    {
      id: 'long',
      name: 'Long Head (Peak)',
      scientificName: 'Caput Longum Bicipitis',
      description: 'Originates at the supraglenoid tubercle and runs through the bicipital groove. Creates the vertical bicep peak, heavily stimulated when elbow is drawn behind torso.',
      primaryAction: 'Elbow flexion and forearm supination',
      targetExerciseIds: ['incline-db-curl', 'bayesian-cable-curl'],
    },
    {
      id: 'short',
      name: 'Short Head (Inner Width)',
      scientificName: 'Caput Breve Bicipitis',
      description: 'Originates at the coracoid process. Forms the thick medial belly giving biceps front-facing width and density.',
      primaryAction: 'Elbow flexion and supination with arms in front',
      targetExerciseIds: ['preacher-curl', 'barbell-curl'],
    },
    {
      id: 'brachialis',
      name: 'Brachialis & Coracobrachialis',
      scientificName: 'Brachialis & Coracobrachialis',
      description: 'A pure elbow flexor lying beneath the biceps. Generates tremendous force and physically pushes the biceps upward for greater arm circumference.',
      primaryAction: 'Pure elbow flexion regardless of forearm rotation',
      targetExerciseIds: ['hammer-curl'],
    },
  ],
  upper_back: [
    {
      id: 'upper_traps',
      name: 'Upper Trapezius',
      scientificName: 'Descending Part of Trapezius',
      description: 'Descending fibers originating from occiput and cervical spine. Elevates the scapula and supports neck posture under heavy loads.',
      primaryAction: 'Scapular elevation and upward rotation',
      targetExerciseIds: ['barbell-shrugs'],
    },
    {
      id: 'mid_traps_rhomboids',
      name: 'Mid Traps & Rhomboids',
      scientificName: 'Transverse Trapezius & Rhomboids',
      description: 'Horizontal fibers from thoracic vertebrae to medial scapular border. Drives scapular retraction and builds dense upper back thickness.',
      primaryAction: 'Scapular retraction (pulling shoulder blades together)',
      targetExerciseIds: ['chest-supported-row', 't-bar-row'],
    },
    {
      id: 'lower_traps',
      name: 'Lower Trapezius',
      scientificName: 'Ascending Part of Trapezius',
      description: 'Ascending fibers inserting onto the scapular spine tubercle. Depresses and stabilizes the scapula, preventing shoulder impingement.',
      primaryAction: 'Scapular depression and upward rotation',
      targetExerciseIds: ['face-pulls'],
    },
    {
      id: 'rotator_cuff',
      name: 'Rotator Cuff & Teres Complex',
      scientificName: 'Infraspinatus, Supraspinatus & Teres',
      description: 'Crucial dynamic stabilizers of the glenohumeral joint. Externally rotates the humerus and locks the ball in the socket.',
      primaryAction: 'Glenohumeral external rotation and stabilization',
      targetExerciseIds: ['face-pulls'],
    },
  ],
  lats: [
    {
      id: 'lats_all',
      name: 'Latissimus Dorsi (V-Taper)',
      scientificName: 'Thoracic & Lumbar Latissimus Dorsi',
      description: 'The sweeping fan of the back running from lower spine to humerus. Drives vertical pulling and arm extension into the hips.',
      primaryAction: 'Shoulder adduction, extension, and internal rotation',
      targetExerciseIds: ['lat-pulldown', 'neutral-pullups', 'single-arm-cable-row', 'barbell-row', 'straight-arm-pulldown'],
    },
  ],
  lower_back: [
    {
      id: 'erector_spinae',
      name: 'Erector Spinae Columns',
      scientificName: 'Iliocostalis, Longissimus & Spinalis',
      description: 'Three longitudinal columns running parallel to the spine from sacrum to ribs. Resists spinal flexion and maintains neutral lumbar spine.',
      primaryAction: 'Spinal extension and anti-flexion posture',
      targetExerciseIds: ['conventional-deadlift', 'hyperextension', 'good-mornings'],
    },
    {
      id: 'deep_stabilizers',
      name: 'Deep Lumbar Stabilizers',
      scientificName: 'Multifidus & Quadratus Lumborum',
      description: 'Deep intersegmental stabilizers protecting individual vertebrae against shear forces and lateral bending during heavy hinges.',
      primaryAction: 'Segmental spinal stabilization and lateral flexion control',
      targetExerciseIds: ['hyperextension', 'conventional-deadlift'],
    },
    {
      id: 'thoracolumbar_fascia',
      name: 'Thoracolumbar Fascia',
      scientificName: 'Fascia Thoracolumbalis',
      description: 'The dense diamond-shaped connective tissue transferring massive loads between lats, glutes, and spinal erectors.',
      primaryAction: 'Force transmission and passive elastic bracing',
      targetExerciseIds: ['conventional-deadlift'],
    },
  ],
  abs: [
    {
      id: 'upper_abs',
      name: 'Upper Rectus Abdominis',
      scientificName: 'Superior Rectus Abdominis',
      description: 'Upper segments of the anterior abdominal wall. Flexes the thoracic spine downward toward the pelvis.',
      primaryAction: 'Thoracic spinal flexion toward fixed pelvis',
      targetExerciseIds: ['cable-crunch', 'ab-wheel-rollout'],
    },
    {
      id: 'lower_abs',
      name: 'Lower Rectus & Pyramidalis',
      scientificName: 'Inferior Rectus & Pyramidalis',
      description: 'Lower segments inserting into the pubic crest. Posteriorly tilts the pelvis upward toward the ribcage.',
      primaryAction: 'Posterior pelvic tilt and lumbar flattening',
      targetExerciseIds: ['hanging-leg-raise'],
    },
    {
      id: 'obliques_core',
      name: 'Obliques & Lateral Core',
      scientificName: 'External & Internal Obliques',
      description: 'Diagonal abdominal wall muscles controlling rotational power and resisting unwanted torso twisting.',
      primaryAction: 'Torso rotation and lateral stabilization',
      targetExerciseIds: ['cable-crunch', 'hanging-leg-raise'],
    },
    {
      id: 'transverse_core',
      name: 'Transverse Abdominis & Linea Alba',
      scientificName: 'Transversus Abdominis & Linea Alba',
      description: 'The deep anatomical weight belt wrapping horizontally around the visceral cavity. Increases intra-abdominal pressure for lifting safety.',
      primaryAction: 'Abdominal compression and core bracing',
      targetExerciseIds: ['plank', 'ab-wheel-rollout'],
    },
  ],
  obliques: [
    {
      id: 'external_oblique',
      name: 'External Oblique (V-Cut)',
      scientificName: 'Musculus Obliquus Externus Abdominis',
      description: 'Superficial lateral muscle with downward-and-inward fiber orientation, responsible for the aesthetic waistline V-cut.',
      primaryAction: 'Contralateral torso rotation and lateral flexion',
      targetExerciseIds: ['cable-woodchopper', 'russian-twist'],
    },
    {
      id: 'internal_oblique',
      name: 'Internal Oblique',
      scientificName: 'Musculus Obliquus Internus Abdominis',
      description: 'Underlying muscle with upward-and-inward fibers acting antagonistically and synergistically during core twisting.',
      primaryAction: 'Ipsilateral torso rotation and pelvic compression',
      targetExerciseIds: ['russian-twist', 'plank'],
    },
  ],
  quads: [
    {
      id: 'rectus_femoris',
      name: 'Rectus Femoris (Hip/Knee)',
      scientificName: 'Rectus Femoris',
      description: 'The central superficial quad crossing both the hip and knee joints. Most active when knee extension occurs with hip extended.',
      primaryAction: 'Knee extension and hip flexion',
      targetExerciseIds: ['leg-extension', 'barbell-squat'],
    },
    {
      id: 'vastus_medialis',
      name: 'Teardrop (VMO)',
      scientificName: 'Vastus Medialis Oblique',
      description: 'The teardrop-shaped muscle on the inside of the knee, crucial for patellar tracking and terminal knee extension locking.',
      primaryAction: 'Terminal knee extension & patellar stabilization',
      targetExerciseIds: ['barbell-squat', 'leg-press', 'hack-squat'],
    },
    {
      id: 'vastus_lateralis',
      name: 'Outer Sweep',
      scientificName: 'Vastus Lateralis',
      description: 'The largest quadricep head on the outer thigh, creating the dramatic lateral leg sweep and carrying the bulk of squat load.',
      primaryAction: 'High-load knee extension across all squat angles',
      targetExerciseIds: ['barbell-squat', 'hack-squat', 'leg-press'],
    },
    {
      id: 'vastus_intermedius',
      name: 'Vastus Intermedius',
      scientificName: 'Vastus Intermedius',
      description: 'Deep central powerhouse lying beneath rectus femoris directly on the anterior femur shaft.',
      primaryAction: 'Direct knee extension force production',
      targetExerciseIds: ['leg-press', 'barbell-squat'],
    },
  ],
  hamstrings: [
    {
      id: 'lateral_hamstrings',
      name: 'Outer Hamstrings (Biceps Femoris)',
      scientificName: 'Biceps Femoris (Long & Short Heads)',
      description: 'Lateral side of posterior thigh. Long head extends hip; both heads flex the knee and externally rotate the flexed lower leg.',
      primaryAction: 'Knee flexion and hip extension',
      targetExerciseIds: ['seated-leg-curl', 'lying-leg-curl'],
    },
    {
      id: 'medial_hamstrings',
      name: 'Inner Hamstrings',
      scientificName: 'Semitendinosus & Semimembranosus',
      description: 'Medial side of posterior thigh. Inserts into pes anserinus and medial tibial condyle, driving knee flexion and internal rotation.',
      primaryAction: 'Knee flexion with medial stabilization and hip hinge power',
      targetExerciseIds: ['romanian-deadlift', 'lying-leg-curl'],
    },
  ],
  glutes: [
    {
      id: 'maximus',
      name: 'Gluteus Maximus',
      scientificName: 'Gluteus Maximus',
      description: 'The largest and most powerful muscle in the human body. Primary engine for hip extension, sprinting thrust, and locking out deadlifts and squats.',
      primaryAction: 'Hip extension, external rotation, and posterior pelvic tilt',
      targetExerciseIds: ['hip-thrust', 'barbell-squat', 'glute-bridge', 'cable-glute-kickback'],
    },
    {
      id: 'medius',
      name: 'Gluteus Medius (Upper Shelf)',
      scientificName: 'Gluteus Medius',
      description: 'Fans across the upper outer hip. Creates the upper glute shelf, prevents pelvic drop during single-leg stance, and abducts the hip.',
      primaryAction: 'Hip abduction and pelvic level stabilization',
      targetExerciseIds: ['cable-glute-kickback', 'hip-thrust'],
    },
    {
      id: 'minimus_rotators',
      name: 'Minimus & Deep Rotators',
      scientificName: 'Gluteus Minimus, Piriformis & Gemelli',
      description: 'Deep stabilization complex locking the femoral head into the acetabulum during rotation and dynamic movement.',
      primaryAction: 'Femoral stabilization and external/internal rotation',
      targetExerciseIds: ['cable-glute-kickback'],
    },
  ],
  calves: [
    {
      id: 'gastrocnemius',
      name: 'Diamond Calf (Gastrocnemius)',
      scientificName: 'Gastrocnemius (Medial & Lateral Heads)',
      description: 'The visible, fast-twitch bi-articular calf muscle crossing both knee and ankle. Best overloaded with straight-knee standing calf raises.',
      primaryAction: 'Plantarflexion with knee straight & knee flexion assist',
      targetExerciseIds: ['standing-calf-raise'],
    },
    {
      id: 'soleus',
      name: 'Deep Calf (Soleus)',
      scientificName: 'Soleus',
      description: 'Slow-twitch powerhouse lying under the gastrocnemius. Does not cross the knee, making it the primary mover during bent-knee seated calf raises.',
      primaryAction: 'Sustained plantarflexion & posture',
      targetExerciseIds: ['seated-calf-raise'],
    },
    {
      id: 'tibialis_peroneals',
      name: 'Tibialis Anterior & Shins',
      scientificName: 'Tibialis Anterior & Fibularis Group',
      description: 'Anterior lower leg muscles responsible for dorsiflexion (pulling toes up), protecting knees during deceleration, and preventing shin splints.',
      primaryAction: 'Ankle dorsiflexion and inversion/eversion balance',
      targetExerciseIds: ['tibialis-raise'],
    },
  ],
  forearms: [
    {
      id: 'brachioradialis',
      name: 'Brachioradialis (Top Forearm)',
      scientificName: 'Brachioradialis',
      description: 'Originates on the lateral supracondylar ridge of humerus and inserts at radial styloid. Strongest when curling with a neutral or pronated grip.',
      primaryAction: 'Elbow flexion in neutral (hammer) position',
      targetExerciseIds: ['farmers-walk'],
    },
    {
      id: 'flexors',
      name: 'Wrist & Finger Flexors',
      scientificName: 'Flexor Carpi & Digitorum Group',
      description: 'Inner forearm mass originating from medial epicondyle. Powers crushing grip strength and curling wrists upward.',
      primaryAction: 'Wrist flexion and finger gripping power',
      targetExerciseIds: ['wrist-curls', 'farmers-walk', 'dead-hang'],
    },
    {
      id: 'extensors',
      name: 'Wrist & Finger Extensors',
      scientificName: 'Extensor Carpi & Digitorum Group',
      description: 'Outer forearm musculature originating from lateral epicondyle. Extends wrists backwards and stabilizes grip during heavy pulls.',
      primaryAction: 'Wrist extension and finger opening',
      targetExerciseIds: ['reverse-wrist-curls'],
    },
    {
      id: 'pronator_supinator',
      name: 'Pronator & Supinator Group',
      scientificName: 'Pronator Teres, Quadratus & Supinator',
      description: 'Deep rotational muscles controlling forearm pronation (palm down) and supination (palm up).',
      primaryAction: 'Forearm rotation around the longitudinal axis',
      targetExerciseIds: ['wrist-curls', 'reverse-wrist-curls'],
    },
  ],
};

const musclesPath = path.resolve(__dirname, '../src/data/muscles.ts');
const raw = fs.readFileSync(musclesPath, 'utf8');

// Require the existing MUSCLES_DATA
const { MUSCLES_DATA } = require('../src/data/muscles.ts');

const updated: Record<string, any> = {};
for (const [key, data] of Object.entries(MUSCLES_DATA) as [string, any][]) {
  updated[key] = {
    ...data,
    subRegions: SUBREGIONS_BY_MUSCLE[key] || [],
  };
}

const fileContent = `import type { MuscleInfo } from '@/types/anatomy';

export const MUSCLES_DATA: Record<string, MuscleInfo> = ${JSON.stringify(updated, null, 2)};
`;

fs.writeFileSync(musclesPath, fileContent, 'utf8');
console.log('Successfully updated muscles.ts with subRegions!');
