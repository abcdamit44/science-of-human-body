import type { LearningTrack } from '@/types/track';

export const LEARNING_TRACKS: Record<string, LearningTrack> = {
  powerlifting: {
    id: 'powerlifting',
    title: 'The Science of Powerlifting',
    badge: 'Strength & Biomechanics',
    tagline: 'Master the Big 3: Squat, Bench Press, and Deadlift',
    description:
      'A biomechanically rigorous curriculum breaking down maximal strength production, bar path physics, nervous system adaptations, and peaking protocols.',
    iconName: 'Dumbbell',
    colorScheme: {
      primary: '#3b82f6',
      secondary: '#1d4ed8',
      border: 'rgba(59, 130, 246, 0.3)',
    },
    totalChapters: 3,
    estimatedWeeks: 6,
    targetAudience: 'Lifters looking to increase maximal 1RM strength with bulletproof technique.',
    chapters: [
      {
        id: 'pl-ch1-squat-mechanics',
        order: 1,
        title: 'Squat Mechanics & Levers',
        subtitle: 'Foot pressure, hip mobility, and spinal bracing',
        durationMinutes: 45,
        overview:
          'Deep dive into ankle dorsiflexion, femur length variations, high-bar vs low-bar torque equations, and how to eliminate knee collapse.',
        learningOutcomes: [
          'Calculate your optimal foot stance width based on hip anatomy',
          'Master the 360-degree intra-abdominal pressure Valsalva brace',
          'Correct hip shifting and asymmetric bar travel',
        ],
        lectureVideoId: 'bs_Ej32IYgo',
        lectureCreator: 'Squat University',
        relatedMuscles: ['quads', 'glutes', 'abs'],
        recommendedExercises: ['barbell-squat'],
      },
      {
        id: 'pl-ch2-bench-leg-drive',
        order: 2,
        title: 'Bench Press Arch & Kinetic Chain',
        subtitle: 'Scapular packing, leg drive, and bar path',
        durationMinutes: 35,
        overview:
          'Transform your bench press from an isolated chest exercise into a total-body compound lift using full leg drive and shoulder stabilization.',
        learningOutcomes: [
          'Create a safe, stable thoracic arch without lumbar hyperextension',
          'Transfer lateral and vertical leg drive into horizontal bar velocity',
          'Learn the J-curve bar path for maximal mechanical efficiency',
        ],
        lectureVideoId: 'vcBig73ojpE',
        lectureCreator: 'Dr. Mike Israetel',
        relatedMuscles: ['chest', 'triceps', 'shoulders'],
        recommendedExercises: ['bench-press'],
      },
      {
        id: 'pl-ch3-deadlift-wedge',
        order: 3,
        title: 'Deadlift Wedging & Hip Lockout',
        subtitle: 'Conventional vs Sumo lever mechanics',
        durationMinutes: 40,
        overview:
          'Analyze the physics of wedging your hips into the bar, taking the slack out, and finishing with active glute extension instead of hyperextending the back.',
        learningOutcomes: [
          'Diagnose whether Conventional or Sumo suits your hip anatomy',
          'Perfect the slack pull and lat engagement before bar leaves floor',
          'Prevent lower back rounding during heavy pulls',
        ],
        lectureVideoId: 'qQ2P8_7N1x0',
        lectureCreator: 'Jeff Nippard',
        relatedMuscles: ['hamstrings', 'glutes', 'upper_back', 'lats'],
        recommendedExercises: ['romanian-deadlift'],
      },
    ],
  },
  cutting: {
    id: 'cutting',
    title: 'Scientific Cutting & Fat Loss',
    badge: 'Metabolism & Preservation',
    tagline: 'Shed body fat while preserving 100% of lean muscle mass',
    description:
      'Learn the biological mechanisms of calorie deficits, protein synthesis during caloric restriction, refeeds, NEAT optimization, and hunger management.',
    iconName: 'Flame',
    colorScheme: {
      primary: '#f59e0b',
      secondary: '#d97706',
      border: 'rgba(245, 158, 11, 0.3)',
    },
    totalChapters: 3,
    estimatedWeeks: 8,
    targetAudience:
      'Anyone aiming to drop body fat cleanly without crashing their metabolism or losing strength.',
    chapters: [
      {
        id: 'cut-ch1-deficit-math',
        order: 1,
        title: 'Energy Balance & Deficit Calibration',
        subtitle: 'Calculating accurate maintenance and deficit thresholds',
        durationMinutes: 30,
        overview:
          'Stop guessing calorie needs. Learn how metabolic adaptation occurs, how to determine a safe 300-500 kcal deficit, and how to track true weekly rate of loss.',
        learningOutcomes: [
          'Determine your exact maintenance calories using 14-day weight averages',
          'Set protein intake at 2.0-2.4g/kg to shield against catabolism',
          'Understand when and why water weight fluctuations happen',
        ],
        lectureVideoId: 'cQuQp50a_b4',
        lectureCreator: 'Dr. Mike Israetel',
        relatedMuscles: ['abs'],
        recommendedExercises: ['hanging-leg-raise'],
      },
      {
        id: 'cut-ch2-training-adjustments',
        order: 2,
        title: 'Lifting Heavy on a Cut',
        subtitle: 'Volume reduction vs intensity preservation',
        durationMinutes: 35,
        overview:
          'The biggest mistake lifters make when cutting is switching to high-rep light weights. Discover why heavy tension is the only signal that tells your body to keep muscle.',
        learningOutcomes: [
          'Why high reps do NOT "tone" muscles or burn localized fat',
          'Reducing set volume by 30-40% while maintaining heavy load intensity',
          'Managing central nervous system recovery during deficit phases',
        ],
        lectureVideoId: 'bEv6CCg2BC8',
        lectureCreator: 'Jeff Nippard',
        relatedMuscles: ['chest', 'quads', 'lats'],
        recommendedExercises: ['bench-press', 'barbell-squat', 'lat-pulldown'],
      },
      {
        id: 'cut-ch3-neat-cardio',
        order: 3,
        title: 'NEAT, Steps & Low-Impact Cardio',
        subtitle: 'Burning calories without triggering ravenous hunger',
        durationMinutes: 25,
        overview:
          'Compare Zone 2 walking vs HIIT cardio. See why 8,000-10,000 daily steps outperforms exhausting sprint sessions for fat loss.',
        learningOutcomes: [
          'Harness Non-Exercise Activity Thermogenesis (NEAT) effortlessly',
          'Schedule Zone 2 cardio without compromising leg recovery',
          'Use satiety indexes and high-volume food hacks to eliminate hunger',
        ],
        lectureVideoId: '5f9b4uM9xR4',
        lectureCreator: 'Jeremy Ethier',
        relatedMuscles: ['calves', 'quads'],
        recommendedExercises: ['hanging-leg-raise'],
      },
    ],
  },
  hypertrophy: {
    id: 'hypertrophy',
    title: 'Hypertrophy & Muscle Science',
    badge: 'Mechanical Tension & Growth',
    tagline: 'Maximize muscle protein synthesis and progressive overload',
    description:
      'The modern scientific blueprint for building maximum muscular size: stretch-mediated hypertrophy, effective reps (RIR 0-3), and volume landmarks.',
    iconName: 'Sparkles',
    colorScheme: {
      primary: '#10b981',
      secondary: '#059669',
      border: 'rgba(16, 185, 129, 0.3)',
    },
    totalChapters: 3,
    estimatedWeeks: 12,
    targetAudience: 'Bodybuilders and fitness enthusiasts seeking optimal muscle hypertrophy.',
    chapters: [
      {
        id: 'hyp-ch1-mechanical-tension',
        order: 1,
        title: 'The Holy Grail: Mechanical Tension & Stretch',
        subtitle: 'Why pump and soreness are secondary to loaded stretch',
        durationMinutes: 40,
        overview:
          'Explore modern findings on stretch-mediated hypertrophy (SMH) and why exercises that heavily challenge muscles in their lengthened position yield superior growth.',
        learningOutcomes: [
          'Choose exercises with optimal resistance curves (cable vs dumbbell)',
          'Implement 2-3 second controlled eccentrics to trigger mechanotransduction',
          'Train within 1-3 Reps in Reserve (RIR) for genuine stimulus',
        ],
        lectureVideoId: 'bEv6CCg2BC8',
        lectureCreator: 'Jeff Nippard',
        relatedMuscles: ['chest', 'hamstrings', 'triceps'],
        recommendedExercises: ['incline-db-press', 'romanian-deadlift'],
      },
      {
        id: 'hyp-ch2-volume-landmarks',
        order: 2,
        title: 'Volume Landmarks (MEV, MAV, MRV)',
        subtitle: 'How many sets per muscle group each week',
        durationMinutes: 35,
        overview:
          'Understand Dr. Mike Israetel’s volume landmarks: Minimum Effective Volume (MEV), Maximum Adaptive Volume (MAV), and Maximum Recoverable Volume (MRV).',
        learningOutcomes: [
          'Calculate your individual weekly set sweet spot (usually 10-20 sets/week)',
          'Diagnose systemic vs local muscle fatigue',
          'Time strategic deload weeks before hitting overreaching walls',
        ],
        lectureVideoId: 'vcBig73ojpE',
        lectureCreator: 'Dr. Mike Israetel',
        relatedMuscles: ['lats', 'shoulders', 'biceps'],
        recommendedExercises: ['lat-pulldown', 'cable-lateral-raise'],
      },
    ],
  },
  calisthenics: {
    id: 'calisthenics',
    title: 'Calisthenics & Functional Mobility',
    badge: 'Bodyweight Mastery',
    tagline: 'Master gravity, joint resilience, and relative body strength',
    description:
      'Learn bodyweight lever mechanics, scapular control, handstand stability, and tendon conditioning for a functional physique.',
    iconName: 'Activity',
    colorScheme: {
      primary: '#8b5cf6',
      secondary: '#6d28d9',
      border: 'rgba(139, 92, 246, 0.3)',
    },
    totalChapters: 2,
    estimatedWeeks: 8,
    targetAudience:
      'Athletes focused on body control, gymnastic strength, and joint bulletproofing.',
    chapters: [
      {
        id: 'cal-ch1-pull-push-levers',
        order: 1,
        title: 'Relative Strength & Lever Progressions',
        subtitle: 'From strict pull-ups to front lever and muscle-up',
        durationMinutes: 35,
        overview:
          'Physics of bodyweight levers. How extending or tucking limbs alters moment arms and force requirements.',
        learningOutcomes: [
          'Master scapular depression and retraction for pull-up mechanics',
          'Progress through tucked, advanced tuck, and full lever variations',
          'Condition elbow and bicep tendons for high-stress static holds',
        ],
        lectureVideoId: '9efgn2w_6hM',
        lectureCreator: 'Jeff Nippard',
        relatedMuscles: ['lats', 'abs', 'forearms'],
        recommendedExercises: ['dips', 'hanging-leg-raise'],
      },
    ],
  },
};
