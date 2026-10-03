import type { MuscleInfo } from '@/types/anatomy';

export const MUSCLES_DATA: Record<string, MuscleInfo> = {
  chest: {
    id: 'chest',
    name: 'Chest',
    scientificName: 'Pectoralis Major & Minor',
    viewSide: 'front',
    category: 'upper_push',
    description:
      'The primary pushing powerhouse of the upper body. Composed of the clavicular (upper) head, sternal (mid) head, and abdominal (lower) head.',
    biomechanics: {
      origin: 'Clavicle, Sternum, and 1st-6th ribs',
      insertion: 'Greater tubercle of humerus',
      primaryAction: 'Horizontal adduction and internal rotation of the humerus',
      secondaryAction: 'Shoulder flexion (upper head) and extension from flexed position',
      fiberOrientation: 'Convergent fan-shaped radiating toward the upper arm',
    },
    keyExercises: [
      'bench-press',
      'incline-db-press',
      'cable-fly',
      'dips',
      'push-ups',
      'machine-chest-press',
    ],
    featuredVideos: [
      {
        id: 'chest-jeff-science',
        title: 'The Smartest Way To Build A Bigger Chest (Science Explained)',
        creator: 'Jeff Nippard',
        channelName: 'Jeff Nippard',
        youtubeId: 'bEv6CCg2BC8',
        duration: '12:45',
        focusTopic: 'Incline vs Flat angles & maximizing stretch under tension',
        summary:
          'Deep dive into muscle fiber orientation and how deep stretch under tension triggers greater hypertrophy.',
      },
      {
        id: 'chest-dr-mike-technique',
        title: 'Stop Benching Like This (Proper Form & Technique)',
        creator: 'Dr. Mike Israetel',
        channelName: 'Renaissance Periodization',
        youtubeId: 'vcBig73ojpE',
        duration: '14:20',
        focusTopic: 'Full range of motion & scapular depression on bench press',
        summary:
          'Explains why locking out without bouncing and maintaining retracted scapula protects shoulders while overloading pecs.',
      },
    ],
    meshCoordinates: {
      x: 0,
      y: 1.45,
      z: 0.35,
    },
    subRegions: [
      {
        id: 'upper',
        name: 'Upper Chest',
        scientificName: 'Clavicular Head',
        description:
          'Arises from the anterior surface of the medial half of the clavicle. Drives shoulder flexion and upward horizontal adduction.',
        primaryAction: 'Shoulder flexion & upward diagonal adduction',
        targetExerciseIds: ['incline-db-press', 'incline-barbell-press', 'low-to-high-cable-fly'],
      },
      {
        id: 'middle',
        name: 'Middle Chest',
        scientificName: 'Sternocostal Head',
        description:
          'Arises from the anterior surface of the sternum and upper 6 costal cartilages. Provides maximum horizontal pressing force.',
        primaryAction: 'Horizontal adduction & transverse pressing',
        targetExerciseIds: ['bench-press', 'machine-chest-press', 'cable-fly', 'push-ups'],
      },
      {
        id: 'lower',
        name: 'Lower Chest',
        scientificName: 'Abdominal Head',
        description:
          'Arises from the aponeurosis of the external oblique. Pulls the humerus downward and inward across the torso.',
        primaryAction: 'Downward adduction & shoulder extension from flexed angle',
        targetExerciseIds: ['dips', 'high-to-low-cable-fly', 'decline-press'],
      },
      {
        id: 'inner_deep',
        name: 'Deep Pec Minor',
        scientificName: 'Pectoralis Minor',
        description:
          'Deep triangular muscle underlying pec major, running from ribs 3-5 to the coracoid process. Depresses and stabilizes the scapula.',
        primaryAction: 'Scapular depression and downward tilt',
        targetExerciseIds: ['dips', 'cable-fly'],
      },
    ],
  },
  lats: {
    id: 'lats',
    name: 'Lats',
    scientificName: 'Latissimus Dorsi',
    viewSide: 'back',
    category: 'upper_pull',
    description:
      'The broadest muscle in the human back, responsible for creating the classic "V-taper" aesthetic and pulling strength.',
    biomechanics: {
      origin: 'Thoracolumbar fascia, iliac crest, inferior 3-4 ribs',
      insertion: 'Intertubercular groove of humerus',
      primaryAction: 'Shoulder adduction, shoulder extension, and internal rotation',
      secondaryAction: 'Depression of the shoulder girdle',
      fiberOrientation: 'Sweeping diagonal fibers from spine up to armpit',
    },
    keyExercises: [
      'lat-pulldown',
      'barbell-row',
      'neutral-pullups',
      'single-arm-cable-row',
      'straight-arm-pulldown',
    ],
    featuredVideos: [
      {
        id: 'lats-jeff-v-taper',
        title: 'How To Actually Grow Your Lats (Anatomy Guide)',
        creator: 'Jeff Nippard',
        channelName: 'Jeff Nippard',
        youtubeId: '9efgn2w_6hM',
        duration: '15:10',
        focusTopic: 'Elbow path and sagittal vs frontal plane pulling',
        summary:
          'Illustrates why driving your elbows into your hips activates more lat fibers than simply pulling with arms.',
      },
    ],
    meshCoordinates: {
      x: 0,
      y: 1.35,
      z: -0.3,
    },
    subRegions: [
      {
        id: 'lats_all',
        name: 'Latissimus Dorsi (V-Taper)',
        scientificName: 'Thoracic & Lumbar Latissimus Dorsi',
        description:
          'The sweeping fan of the back running from lower spine to humerus. Drives vertical pulling and arm extension into the hips.',
        primaryAction: 'Shoulder adduction, extension, and internal rotation',
        targetExerciseIds: [
          'lat-pulldown',
          'neutral-pullups',
          'single-arm-cable-row',
          'barbell-row',
          'straight-arm-pulldown',
        ],
      },
    ],
  },
  upper_back: {
    id: 'upper_back',
    name: 'Upper Back & Traps',
    scientificName: 'Trapezius & Rhomboids',
    viewSide: 'back',
    category: 'upper_pull',
    description:
      'Crucial for posture, scapular retraction, neck stability, and upper body thickness.',
    biomechanics: {
      origin: 'Occipital bone, ligamentum nuchae, spinous processes C7-T12',
      insertion: 'Lateral clavicle, acromion, and scapular spine',
      primaryAction: 'Scapular elevation (upper), retraction (mid), and depression (lower)',
      secondaryAction: 'Upward rotation of the scapula during overhead reaching',
      fiberOrientation: 'Diamond-shaped with descending, horizontal, and ascending fibers',
    },
    keyExercises: ['chest-supported-row', 'face-pulls', 'barbell-shrugs', 't-bar-row'],
    featuredVideos: [
      {
        id: 'traps-dr-mike',
        title: 'The Most Effective Way To Grow Traps & Upper Back',
        creator: 'Dr. Mike Israetel',
        channelName: 'Renaissance Periodization',
        youtubeId: 'h8qU1h2f3YQ',
        duration: '11:05',
        focusTopic: 'Scapular retraction with slight forward torso lean',
        summary:
          'Shrugs done straight up only hit upper fibers; learn how an angle hits the whole trapezoid.',
      },
    ],
    meshCoordinates: {
      x: 0,
      y: 1.7,
      z: -0.28,
    },
    subRegions: [
      {
        id: 'upper_traps',
        name: 'Upper Trapezius',
        scientificName: 'Descending Part of Trapezius',
        description:
          'Descending fibers originating from occiput and cervical spine. Elevates the scapula and supports neck posture under heavy loads.',
        primaryAction: 'Scapular elevation and upward rotation',
        targetExerciseIds: ['barbell-shrugs'],
      },
      {
        id: 'mid_traps_rhomboids',
        name: 'Mid Traps & Rhomboids',
        scientificName: 'Transverse Trapezius & Rhomboids',
        description:
          'Horizontal fibers from thoracic vertebrae to medial scapular border. Drives scapular retraction and builds dense upper back thickness.',
        primaryAction: 'Scapular retraction (pulling shoulder blades together)',
        targetExerciseIds: ['chest-supported-row', 't-bar-row'],
      },
      {
        id: 'lower_traps',
        name: 'Lower Trapezius',
        scientificName: 'Ascending Part of Trapezius',
        description:
          'Ascending fibers inserting onto the scapular spine tubercle. Depresses and stabilizes the scapula, preventing shoulder impingement.',
        primaryAction: 'Scapular depression and upward rotation',
        targetExerciseIds: ['face-pulls'],
      },
      {
        id: 'rotator_cuff',
        name: 'Rotator Cuff & Teres Complex',
        scientificName: 'Infraspinatus, Supraspinatus & Teres',
        description:
          'Crucial dynamic stabilizers of the glenohumeral joint. Externally rotates the humerus and locks the ball in the socket.',
        primaryAction: 'Glenohumeral external rotation and stabilization',
        targetExerciseIds: ['face-pulls'],
      },
    ],
  },
  lower_back: {
    id: 'lower_back',
    name: 'Lower Back',
    scientificName: 'Erector Spinae & Quadratus Lumborum',
    viewSide: 'back',
    category: 'core',
    description:
      'The foundational spinal pillar running from the sacrum to the skull, responsible for maintaining posture, resisting spinal flexion, and transferring power during hip hinges.',
    biomechanics: {
      origin: 'Sacrum, iliac crest, and lumbar vertebrae spinous processes',
      insertion: 'Ribs, thoracic and cervical vertebrae, and occipital bone',
      primaryAction: 'Spinal extension, lateral flexion, and postural stabilization',
      secondaryAction: 'Anti-flexion bracing during heavy compound lifts',
      fiberOrientation: 'Vertical columnar bands running longitudinally flanking the spine',
    },
    keyExercises: ['conventional-deadlift', 'hyperextension', 'good-mornings'],
    featuredVideos: [
      {
        id: 'lower-back-squat-uni',
        title: 'How To Build A Bulletproof Lower Back (Prevent Herniations)',
        creator: 'Squat University',
        channelName: 'Squat University',
        youtubeId: 'bs_Ej32IYgo',
        duration: '14:30',
        focusTopic: 'Hip hinge mechanics vs spinal flexing under load',
        summary:
          'Demonstrates how strengthening the erector spinae prevents lower back pain and enables heavy deadlifts safely.',
      },
    ],
    meshCoordinates: {
      x: 0,
      y: 1.15,
      z: -0.22,
    },
    subRegions: [
      {
        id: 'erector_spinae',
        name: 'Erector Spinae Columns',
        scientificName: 'Iliocostalis, Longissimus & Spinalis',
        description:
          'Three longitudinal columns running parallel to the spine from sacrum to ribs. Resists spinal flexion and maintains neutral lumbar spine.',
        primaryAction: 'Spinal extension and anti-flexion posture',
        targetExerciseIds: ['conventional-deadlift', 'hyperextension', 'good-mornings'],
      },
      {
        id: 'deep_stabilizers',
        name: 'Deep Lumbar Stabilizers',
        scientificName: 'Multifidus & Quadratus Lumborum',
        description:
          'Deep intersegmental stabilizers protecting individual vertebrae against shear forces and lateral bending during heavy hinges.',
        primaryAction: 'Segmental spinal stabilization and lateral flexion control',
        targetExerciseIds: ['hyperextension', 'conventional-deadlift'],
      },
      {
        id: 'thoracolumbar_fascia',
        name: 'Thoracolumbar Fascia',
        scientificName: 'Fascia Thoracolumbalis',
        description:
          'The dense diamond-shaped connective tissue transferring massive loads between lats, glutes, and spinal erectors.',
        primaryAction: 'Force transmission and passive elastic bracing',
        targetExerciseIds: ['conventional-deadlift'],
      },
    ],
  },
  shoulders: {
    id: 'shoulders',
    name: 'Shoulders (Deltoids)',
    scientificName: 'Anterior, Lateral, & Posterior Deltoids',
    viewSide: 'both',
    category: 'upper_push',
    description:
      'A 3-headed muscular cap that enables overhead pushing, side abduction, and horizontal abduction for 3D shoulder fullness.',
    biomechanics: {
      origin: 'Clavicle (anterior), Acromion (lateral), Scapular spine (posterior)',
      insertion: 'Deltoid tuberosity of humerus',
      primaryAction: 'Arm abduction (side), flexion (front), and horizontal abduction (rear)',
      fiberOrientation: 'Multipennate lateral head for high force output',
    },
    keyExercises: [
      'overhead-press',
      'cable-lateral-raise',
      'dumbbell-lateral-raise',
      'reverse-pec-deck',
      'arnold-press',
    ],
    featuredVideos: [
      {
        id: 'delts-jeff-side',
        title: 'The Science of Lateral Raises (Build 3D Shoulders)',
        creator: 'Jeff Nippard',
        channelName: 'Jeff Nippard',
        youtubeId: 'yL_GjZ-n03k',
        duration: '13:50',
        focusTopic: 'Cable height vs dumbbell torque curve',
        summary:
          'Why dumbbells provide zero tension at the bottom of lateral raises, and how cable setup fixes the resistance profile.',
      },
    ],
    meshCoordinates: {
      x: 0.65,
      y: 1.6,
      z: 0.05,
    },
    subRegions: [
      {
        id: 'front',
        name: 'Front Deltoid',
        scientificName: 'Anterior / Clavicular Head',
        description:
          'Originates on the lateral third of the clavicle. Prime mover for forward shoulder flexion and overhead pressing.',
        primaryAction: 'Shoulder flexion & internal rotation',
        targetExerciseIds: ['overhead-press', 'arnold-press'],
      },
      {
        id: 'side',
        name: 'Side Deltoid',
        scientificName: 'Lateral / Acromial Head',
        description:
          'Originates on the acromion process. Responsible for arm abduction, creating the round 3D capped shoulder width.',
        primaryAction: 'Arm abduction in the scapular plane',
        targetExerciseIds: ['cable-lateral-raise', 'dumbbell-lateral-raise', 'arnold-press'],
      },
      {
        id: 'rear',
        name: 'Rear Deltoid',
        scientificName: 'Posterior / Scapular Spinal Head',
        description:
          'Originates on the spine of the scapula. Powers horizontal abduction and external rotation for upper back depth.',
        primaryAction: 'Horizontal abduction & external rotation',
        targetExerciseIds: ['reverse-pec-deck', 'face-pulls'],
      },
    ],
  },
  biceps: {
    id: 'biceps',
    name: 'Biceps',
    scientificName: 'Biceps Brachii & Brachialis',
    viewSide: 'front',
    category: 'arms',
    description:
      'Consists of the long head (peak) and short head (width), plus the underlying brachialis for arm thickness.',
    biomechanics: {
      origin: 'Supraglenoid tubercle (long head) & Coracoid process (short head)',
      insertion: 'Radial tuberosity and bicipital aponeurosis',
      primaryAction: 'Elbow flexion and forearm supination (turning palm up)',
      secondaryAction: 'Weak shoulder flexion',
      fiberOrientation: 'Fusiform parallel fibers oriented lengthwise down the humerus',
    },
    keyExercises: [
      'barbell-curl',
      'incline-db-curl',
      'preacher-curl',
      'hammer-curl',
      'bayesian-cable-curl',
    ],
    featuredVideos: [
      {
        id: 'biceps-jeremy',
        title: 'How To Get Peak & Width On Your Biceps',
        creator: 'Jeremy Ethier',
        channelName: 'Built With Science',
        youtubeId: 'i1YgFZB6alI',
        duration: '10:30',
        focusTopic: 'Incline curls for long head stretch vs preacher curls for short head',
        summary: 'EMG data comparing shoulder extension angles and forearm supination intensity.',
      },
    ],
    meshCoordinates: {
      x: 0.72,
      y: 1.25,
      z: 0.15,
    },
    subRegions: [
      {
        id: 'long',
        name: 'Long Head (Peak)',
        scientificName: 'Caput Longum Bicipitis',
        description:
          'Originates at the supraglenoid tubercle and runs through the bicipital groove. Creates the vertical bicep peak, heavily stimulated when elbow is drawn behind torso.',
        primaryAction: 'Elbow flexion and forearm supination',
        targetExerciseIds: ['incline-db-curl', 'bayesian-cable-curl'],
      },
      {
        id: 'short',
        name: 'Short Head (Inner Width)',
        scientificName: 'Caput Breve Bicipitis',
        description:
          'Originates at the coracoid process. Forms the thick medial belly giving biceps front-facing width and density.',
        primaryAction: 'Elbow flexion and supination with arms in front',
        targetExerciseIds: ['preacher-curl', 'barbell-curl'],
      },
      {
        id: 'brachialis',
        name: 'Brachialis & Coracobrachialis',
        scientificName: 'Brachialis & Coracobrachialis',
        description:
          'A pure elbow flexor lying beneath the biceps. Generates tremendous force and physically pushes the biceps upward for greater arm circumference.',
        primaryAction: 'Pure elbow flexion regardless of forearm rotation',
        targetExerciseIds: ['hammer-curl'],
      },
    ],
  },
  triceps: {
    id: 'triceps',
    name: 'Triceps',
    scientificName: 'Triceps Brachii',
    viewSide: 'back',
    category: 'arms',
    description:
      'Comprises roughly 60% of total upper arm volume with three heads: lateral, medial, and long head.',
    biomechanics: {
      origin: 'Infraglenoid tubercle (long head), posterior humerus (lateral & medial heads)',
      insertion: 'Olecranon process of ulna',
      primaryAction: 'Elbow extension',
      secondaryAction: 'Shoulder extension and adduction (long head only)',
      fiberOrientation: 'Pennate fibers inserting onto a broad shared tendon',
    },
    keyExercises: [
      'close-grip-bench',
      'tricep-pushdown',
      'overhead-cable-extension',
      'skull-crushers',
    ],
    featuredVideos: [
      {
        id: 'triceps-dr-mike',
        title: 'Hypertrophy Guide: Growing Giant Triceps',
        creator: 'Dr. Mike Israetel',
        channelName: 'Renaissance Periodization',
        youtubeId: 'cQuQp50a_b4',
        duration: '14:40',
        focusTopic: 'Overhead extensions for long-head stretch mediated hypertrophy',
        summary:
          'Deep dive on elbow positioning and why pushdowns alone leave half your tricep volume underdeveloped.',
      },
    ],
    meshCoordinates: {
      x: 0.72,
      y: 1.28,
      z: -0.15,
    },
    subRegions: [
      {
        id: 'long',
        name: 'Long Head',
        scientificName: 'Caput Longum Tricipitis',
        description:
          'The only bi-articular tricep head, crossing both shoulder and elbow from the infraglenoid tubercle. Heavily targeted when the arm is overhead in deep stretch.',
        primaryAction: 'Elbow extension and shoulder extension/adduction',
        targetExerciseIds: ['overhead-cable-extension', 'skull-crushers'],
      },
      {
        id: 'lateral',
        name: 'Lateral Head',
        scientificName: 'Caput Laterale Tricipitis',
        description:
          'Originates on the posterior humerus above the radial groove. Forms the classic lateral horseshoe profile and outputs peak power during pushdowns.',
        primaryAction: 'Powerful elbow extension',
        targetExerciseIds: ['tricep-pushdown', 'close-grip-bench'],
      },
      {
        id: 'medial',
        name: 'Medial Head',
        scientificName: 'Caput Mediale Tricipitis',
        description:
          'Deep head originating across the lower posterior humerus. The primary active workhorse for all elbow extension regardless of angle or load.',
        primaryAction: 'Elbow extension and joint stability',
        targetExerciseIds: ['close-grip-bench', 'tricep-pushdown'],
      },
    ],
  },
  forearms: {
    id: 'forearms',
    name: 'Forearms & Grip',
    scientificName: 'Brachioradialis, Flexor & Extensor Carpi Groups',
    viewSide: 'both',
    category: 'arms',
    description:
      'The critical gripping and wrist-stabilizing muscles of the lower arm, governing barbell grip security and forearm vascularity.',
    biomechanics: {
      origin: 'Medial epicondyle (flexors) and lateral epicondyle (extensors) of humerus',
      insertion: 'Metacarpal bases and phalanges of the hand',
      primaryAction: 'Wrist flexion, wrist extension, and finger adduction (grip)',
      secondaryAction: 'Forearm pronation and supination',
      fiberOrientation: 'Dense pennate fibers converging into long tendons crossing the wrist',
    },
    keyExercises: ['wrist-curls', 'reverse-wrist-curls', 'farmers-walk', 'dead-hang'],
    featuredVideos: [
      {
        id: 'forearms-dr-mike',
        title: 'How To Build Massive Forearms & Unbreakable Grip',
        creator: 'Dr. Mike Israetel',
        channelName: 'Renaissance Periodization',
        youtubeId: 'h8qU1h2f3YQ',
        duration: '12:10',
        focusTopic: 'Wrist flexion vs finger flexion vs isometric carry',
        summary:
          'Explains how direct wrist curls combined with heavy carries produce rapid forearm growth.',
      },
    ],
    meshCoordinates: {
      x: 0.8,
      y: 1.05,
      z: 0.05,
    },
    subRegions: [
      {
        id: 'brachioradialis',
        name: 'Brachioradialis (Top Forearm)',
        scientificName: 'Brachioradialis',
        description:
          'Originates on the lateral supracondylar ridge of humerus and inserts at radial styloid. Strongest when curling with a neutral or pronated grip.',
        primaryAction: 'Elbow flexion in neutral (hammer) position',
        targetExerciseIds: ['farmers-walk'],
      },
      {
        id: 'flexors',
        name: 'Wrist & Finger Flexors',
        scientificName: 'Flexor Carpi & Digitorum Group',
        description:
          'Inner forearm mass originating from medial epicondyle. Powers crushing grip strength and curling wrists upward.',
        primaryAction: 'Wrist flexion and finger gripping power',
        targetExerciseIds: ['wrist-curls', 'farmers-walk', 'dead-hang'],
      },
      {
        id: 'extensors',
        name: 'Wrist & Finger Extensors',
        scientificName: 'Extensor Carpi & Digitorum Group',
        description:
          'Outer forearm musculature originating from lateral epicondyle. Extends wrists backwards and stabilizes grip during heavy pulls.',
        primaryAction: 'Wrist extension and finger opening',
        targetExerciseIds: ['reverse-wrist-curls'],
      },
      {
        id: 'pronator_supinator',
        name: 'Pronator & Supinator Group',
        scientificName: 'Pronator Teres, Quadratus & Supinator',
        description:
          'Deep rotational muscles controlling forearm pronation (palm down) and supination (palm up).',
        primaryAction: 'Forearm rotation around the longitudinal axis',
        targetExerciseIds: ['wrist-curls', 'reverse-wrist-curls'],
      },
    ],
  },
  abs: {
    id: 'abs',
    name: 'Abs & Core',
    scientificName: 'Rectus Abdominis & Transverse Abdominis',
    viewSide: 'front',
    category: 'core',
    description:
      'The anterior core wall that flexes the spine, stabilizes the pelvis, and transfers power between lower and upper body.',
    biomechanics: {
      origin: 'Pubic crest and symphysis',
      insertion: 'Xiphoid process and 5th-7th costal cartilages',
      primaryAction: 'Spinal flexion and intra-abdominal pressure stabilization',
      secondaryAction: 'Posterior pelvic tilt',
      fiberOrientation: 'Vertical segmented bands divided by tendinous intersections',
    },
    keyExercises: ['hanging-leg-raise', 'cable-crunch', 'ab-wheel-rollout', 'plank'],
    featuredVideos: [
      {
        id: 'abs-jeff-science',
        title: 'The Most Scientific Way To Train Abs For A 6-Pack',
        creator: 'Jeff Nippard',
        channelName: 'Jeff Nippard',
        youtubeId: '5f9b4uM9xR4',
        duration: '11:15',
        focusTopic: 'Curling pelvis vs hip flexor dominance',
        summary:
          'How to isolate rectus abdominis rather than letting the psoas and hip flexors take over.',
      },
    ],
    meshCoordinates: {
      x: 0,
      y: 1.05,
      z: 0.25,
    },
    subRegions: [
      {
        id: 'upper_abs',
        name: 'Upper Rectus Abdominis',
        scientificName: 'Superior Rectus Abdominis',
        description:
          'Upper segments of the anterior abdominal wall. Flexes the thoracic spine downward toward the pelvis.',
        primaryAction: 'Thoracic spinal flexion toward fixed pelvis',
        targetExerciseIds: ['cable-crunch', 'ab-wheel-rollout'],
      },
      {
        id: 'lower_abs',
        name: 'Lower Rectus & Pyramidalis',
        scientificName: 'Inferior Rectus & Pyramidalis',
        description:
          'Lower segments inserting into the pubic crest. Posteriorly tilts the pelvis upward toward the ribcage.',
        primaryAction: 'Posterior pelvic tilt and lumbar flattening',
        targetExerciseIds: ['hanging-leg-raise'],
      },
      {
        id: 'obliques_core',
        name: 'Obliques & Lateral Core',
        scientificName: 'External & Internal Obliques',
        description:
          'Diagonal abdominal wall muscles controlling rotational power and resisting unwanted torso twisting.',
        primaryAction: 'Torso rotation and lateral stabilization',
        targetExerciseIds: ['cable-crunch', 'hanging-leg-raise'],
      },
      {
        id: 'transverse_core',
        name: 'Transverse Abdominis & Linea Alba',
        scientificName: 'Transversus Abdominis & Linea Alba',
        description:
          'The deep anatomical weight belt wrapping horizontally around the visceral cavity. Increases intra-abdominal pressure for lifting safety.',
        primaryAction: 'Abdominal compression and core bracing',
        targetExerciseIds: ['plank', 'ab-wheel-rollout'],
      },
    ],
  },
  obliques: {
    id: 'obliques',
    name: 'Obliques',
    scientificName: 'External & Internal Oblique Muscles',
    viewSide: 'both',
    category: 'core',
    description:
      'The diagonal muscular corset wrapping around the lateral trunk, driving torso rotation, lateral flexion, and waist definition.',
    biomechanics: {
      origin: 'External surfaces of ribs 5-12',
      insertion: 'Iliac crest, pubic tubercle, and abdominal aponeurosis',
      primaryAction: 'Trunk rotation and lateral flexion',
      secondaryAction: 'Abdominal compression and pelvic stabilization',
      fiberOrientation: 'Diagonal downward/inward and upward/inward cross-grid orientation',
    },
    keyExercises: ['russian-twist', 'cable-woodchopper', 'plank'],
    featuredVideos: [
      {
        id: 'obliques-jeff',
        title: 'How To Train Your Obliques (Without Making Your Waist Wide)',
        creator: 'Jeff Nippard',
        channelName: 'Jeff Nippard',
        youtubeId: '5f9b4uM9xR4',
        duration: '10:50',
        focusTopic: 'Rotational vs lateral flexion mechanics',
        summary:
          'Explains how to develop crisp oblique definition through controlled rotation without adding bulky blockiness.',
      },
    ],
    meshCoordinates: {
      x: 0.25,
      y: 1.05,
      z: 0.1,
    },
    subRegions: [
      {
        id: 'external_oblique',
        name: 'External Oblique (V-Cut)',
        scientificName: 'Musculus Obliquus Externus Abdominis',
        description:
          'Superficial lateral muscle with downward-and-inward fiber orientation, responsible for the aesthetic waistline V-cut.',
        primaryAction: 'Contralateral torso rotation and lateral flexion',
        targetExerciseIds: ['cable-woodchopper', 'russian-twist'],
      },
      {
        id: 'internal_oblique',
        name: 'Internal Oblique',
        scientificName: 'Musculus Obliquus Internus Abdominis',
        description:
          'Underlying muscle with upward-and-inward fibers acting antagonistically and synergistically during core twisting.',
        primaryAction: 'Ipsilateral torso rotation and pelvic compression',
        targetExerciseIds: ['russian-twist', 'plank'],
      },
    ],
  },
  quads: {
    id: 'quads',
    name: 'Quadriceps',
    scientificName: 'Rectus Femoris, Vastus Lateralis, Medialis & Intermedius',
    viewSide: 'front',
    category: 'lower_body',
    description:
      'The massive 4-part muscle on the front thigh responsible for knee extension, squat depth power, and athletic sprint drives.',
    biomechanics: {
      origin: 'Anterior inferior iliac spine (rectus femoris), femur shaft (vastus group)',
      insertion: 'Patella and tibial tuberosity via patellar ligament',
      primaryAction: 'Knee extension',
      secondaryAction: 'Hip flexion (rectus femoris only)',
      fiberOrientation: 'Pennate fibers angled down toward the central quadriceps tendon',
    },
    keyExercises: [
      'barbell-squat',
      'front-squat',
      'leg-press',
      'leg-extension',
      'hack-squat',
      'bulgarian-split-squat',
    ],
    featuredVideos: [
      {
        id: 'quads-squat-uni',
        title: 'Fix Your Squat Depth & Grow Your Quads Without Knee Pain',
        creator: 'Squat University',
        channelName: 'Squat University',
        youtubeId: 'bs_Ej32IYgo',
        duration: '16:00',
        focusTopic: 'Ankle dorsiflexion, knee tracking, and quad stretch mechanics',
        summary:
          'Step-by-step diagnostic on why your knees may hurt and how elevating heels increases quad activation.',
      },
    ],
    meshCoordinates: {
      x: 0.25,
      y: 0.45,
      z: 0.22,
    },
    subRegions: [
      {
        id: 'rectus_femoris',
        name: 'Rectus Femoris (Hip/Knee)',
        scientificName: 'Rectus Femoris',
        description:
          'The central superficial quad crossing both the hip and knee joints. Most active when knee extension occurs with hip extended.',
        primaryAction: 'Knee extension and hip flexion',
        targetExerciseIds: ['leg-extension', 'barbell-squat'],
      },
      {
        id: 'vastus_medialis',
        name: 'Teardrop (VMO)',
        scientificName: 'Vastus Medialis Oblique',
        description:
          'The teardrop-shaped muscle on the inside of the knee, crucial for patellar tracking and terminal knee extension locking.',
        primaryAction: 'Terminal knee extension & patellar stabilization',
        targetExerciseIds: ['barbell-squat', 'leg-press', 'hack-squat'],
      },
      {
        id: 'vastus_lateralis',
        name: 'Outer Sweep',
        scientificName: 'Vastus Lateralis',
        description:
          'The largest quadricep head on the outer thigh, creating the dramatic lateral leg sweep and carrying the bulk of squat load.',
        primaryAction: 'High-load knee extension across all squat angles',
        targetExerciseIds: ['barbell-squat', 'hack-squat', 'leg-press'],
      },
      {
        id: 'vastus_intermedius',
        name: 'Vastus Intermedius',
        scientificName: 'Vastus Intermedius',
        description:
          'Deep central powerhouse lying beneath rectus femoris directly on the anterior femur shaft.',
        primaryAction: 'Direct knee extension force production',
        targetExerciseIds: ['leg-press', 'barbell-squat'],
      },
    ],
  },
  hamstrings: {
    id: 'hamstrings',
    name: 'Hamstrings',
    scientificName: 'Biceps Femoris, Semitendinosus & Semimembranosus',
    viewSide: 'back',
    category: 'lower_body',
    description:
      'The posterior thigh muscles essential for hip extension during deadlifts and knee flexion during sprints.',
    biomechanics: {
      origin: 'Ischial tuberosity (sit bones) of pelvis',
      insertion: 'Head of fibula (lateral) and medial condyle of tibia',
      primaryAction: 'Knee flexion and hip extension',
      secondaryAction: 'Tibial rotation when knee is semi-flexed',
      fiberOrientation: 'Fusiform and semipennate running longitudinally along rear thigh',
    },
    keyExercises: [
      'romanian-deadlift',
      'seated-leg-curl',
      'lying-leg-curl',
      'stiff-legged-deadlift',
      'nordic-hamstring-curl',
    ],
    featuredVideos: [
      {
        id: 'hamstrings-dr-mike',
        title: 'Seated vs Lying Leg Curl & RDL Masterclass',
        creator: 'Dr. Mike Israetel',
        channelName: 'Renaissance Periodization',
        youtubeId: 'qQ2P8_7N1x0',
        duration: '13:15',
        focusTopic: 'Why seated leg curl grows significantly more muscle than lying curl',
        summary:
          'Demonstrating stretch-mediated hypertrophy by keeping the hip flexed during knee flexion.',
      },
    ],
    meshCoordinates: {
      x: 0.25,
      y: 0.45,
      z: -0.22,
    },
    subRegions: [
      {
        id: 'lateral_hamstrings',
        name: 'Outer Hamstrings (Biceps Femoris)',
        scientificName: 'Biceps Femoris (Long & Short Heads)',
        description:
          'Lateral side of posterior thigh. Long head extends hip; both heads flex the knee and externally rotate the flexed lower leg.',
        primaryAction: 'Knee flexion and hip extension',
        targetExerciseIds: ['seated-leg-curl', 'lying-leg-curl'],
      },
      {
        id: 'medial_hamstrings',
        name: 'Inner Hamstrings',
        scientificName: 'Semitendinosus & Semimembranosus',
        description:
          'Medial side of posterior thigh. Inserts into pes anserinus and medial tibial condyle, driving knee flexion and internal rotation.',
        primaryAction: 'Knee flexion with medial stabilization and hip hinge power',
        targetExerciseIds: ['romanian-deadlift', 'lying-leg-curl'],
      },
    ],
  },
  glutes: {
    id: 'glutes',
    name: 'Glutes',
    scientificName: 'Gluteus Maximus, Medius & Minimus',
    viewSide: 'back',
    category: 'lower_body',
    description:
      'The strongest and largest muscle group in the human body, serving as the central engine for sprint acceleration, jumping, and hip lockout.',
    biomechanics: {
      origin: 'Ilium, sacrum, and coccyx',
      insertion: 'Gluteal tuberosity of femur and iliotibial (IT) tract',
      primaryAction: 'Hip extension, external rotation, and hip abduction (medius)',
      secondaryAction: 'Pelvic stabilization in single-leg stance',
      fiberOrientation: 'Coarse, heavy diagonal fibers designed for tremendous force',
    },
    keyExercises: [
      'barbell-hip-thrust',
      'glute-bridge',
      'cable-glute-kickback',
      'hip-abduction-machine',
    ],
    featuredVideos: [
      {
        id: 'glutes-jeff-science',
        title: 'The Best Glute Exercises According to Science',
        creator: 'Jeff Nippard',
        channelName: 'Jeff Nippard',
        youtubeId: 'sF2X1a0N4uI',
        duration: '12:30',
        focusTopic: 'Hip thrust vs Squat vs RDL force vectors',
        summary:
          'Breaking down peak tension in the shortened vs lengthened positions for complete glute development.',
      },
    ],
    meshCoordinates: {
      x: 0,
      y: 0.85,
      z: -0.26,
    },
    subRegions: [
      {
        id: 'maximus',
        name: 'Gluteus Maximus',
        scientificName: 'Gluteus Maximus',
        description:
          'The largest and most powerful muscle in the human body. Primary engine for hip extension, sprinting thrust, and locking out deadlifts and squats.',
        primaryAction: 'Hip extension, external rotation, and posterior pelvic tilt',
        targetExerciseIds: ['hip-thrust', 'barbell-squat', 'glute-bridge', 'cable-glute-kickback'],
      },
      {
        id: 'medius',
        name: 'Gluteus Medius (Upper Shelf)',
        scientificName: 'Gluteus Medius',
        description:
          'Fans across the upper outer hip. Creates the upper glute shelf, prevents pelvic drop during single-leg stance, and abducts the hip.',
        primaryAction: 'Hip abduction and pelvic level stabilization',
        targetExerciseIds: ['cable-glute-kickback', 'hip-thrust'],
      },
      {
        id: 'minimus_rotators',
        name: 'Minimus & Deep Rotators',
        scientificName: 'Gluteus Minimus, Piriformis & Gemelli',
        description:
          'Deep stabilization complex locking the femoral head into the acetabulum during rotation and dynamic movement.',
        primaryAction: 'Femoral stabilization and external/internal rotation',
        targetExerciseIds: ['cable-glute-kickback'],
      },
    ],
  },
  calves: {
    id: 'calves',
    name: 'Calves',
    scientificName: 'Gastrocnemius & Soleus',
    viewSide: 'back',
    category: 'lower_body',
    description:
      'Lower leg muscles that drive plantarflexion (pushing toes down) and absorb impact during walking, running, and jumping.',
    biomechanics: {
      origin: 'Femur condyles (gastrocnemius) & upper tibia/fibula (soleus)',
      insertion: 'Calcaneus (heel bone) via Achilles tendon',
      primaryAction: 'Ankle plantarflexion',
      secondaryAction: 'Weak knee flexion (gastrocnemius only)',
      fiberOrientation: 'Dense bipennate fibers with high Achilles tendon elastic recoil',
    },
    keyExercises: [
      'standing-calf-raise',
      'seated-calf-raise',
      'leg-press-calf-raise',
      'tibialis-raise',
    ],
    featuredVideos: [
      {
        id: 'calves-dr-mike',
        title: 'How To Finally Make Your Calves Grow (The Deep Stretch Trick)',
        creator: 'Dr. Mike Israetel',
        channelName: 'Renaissance Periodization',
        youtubeId: '5xZ0-g-1x2w',
        duration: '10:45',
        focusTopic: 'Eliminating Achilles bounce with a 3-second pause at the bottom',
        summary:
          'Shows how the Achilles tendon absorbs bounce, taking tension off calf muscles unless you pause at the deep stretch.',
      },
    ],
    meshCoordinates: {
      x: 0.22,
      y: -0.15,
      z: -0.18,
    },
    subRegions: [
      {
        id: 'gastrocnemius',
        name: 'Diamond Calf (Gastrocnemius)',
        scientificName: 'Gastrocnemius (Medial & Lateral Heads)',
        description:
          'The visible, fast-twitch bi-articular calf muscle crossing both knee and ankle. Best overloaded with straight-knee standing calf raises.',
        primaryAction: 'Plantarflexion with knee straight & knee flexion assist',
        targetExerciseIds: ['standing-calf-raise'],
      },
      {
        id: 'soleus',
        name: 'Deep Calf (Soleus)',
        scientificName: 'Soleus',
        description:
          'Slow-twitch powerhouse lying under the gastrocnemius. Does not cross the knee, making it the primary mover during bent-knee seated calf raises.',
        primaryAction: 'Sustained plantarflexion & posture',
        targetExerciseIds: ['seated-calf-raise'],
      },
      {
        id: 'tibialis_peroneals',
        name: 'Tibialis Anterior & Shins',
        scientificName: 'Tibialis Anterior & Fibularis Group',
        description:
          'Anterior lower leg muscles responsible for dorsiflexion (pulling toes up), protecting knees during deceleration, and preventing shin splints.',
        primaryAction: 'Ankle dorsiflexion and inversion/eversion balance',
        targetExerciseIds: ['tibialis-raise'],
      },
    ],
  },
};
