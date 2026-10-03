export interface FitnessCreator {
  id: string;
  name: string;
  channelName: string;
  avatarUrl: string;
  specialty: string;
  channelUrl: string;
  credentials: string;
}

export const FITNESS_CREATORS: Record<string, FitnessCreator> = {
  jeff_nippard: {
    id: 'jeff_nippard',
    name: 'Jeff Nippard',
    channelName: 'Jeff Nippard',
    avatarUrl:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&auto=format&fit=crop&q=80',
    specialty: 'Science-based Hypertrophy & Technique Breakdowns',
    channelUrl: 'https://www.youtube.com/@JeffNippard',
    credentials: 'BSc in Biochemistry, Natural Pro Bodybuilder',
  },
  mike_israetel: {
    id: 'mike_israetel',
    name: 'Dr. Mike Israetel',
    channelName: 'Renaissance Periodization',
    avatarUrl:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=150&auto=format&fit=crop&q=80',
    specialty: 'Hypertrophy Biomechanics, Volume Landmarks, Cutting Science',
    channelUrl: 'https://www.youtube.com/@RenaissancePeriodization',
    credentials: 'PhD in Sport Physiology, Competitive Bodybuilder & BJJ Black Belt',
  },
  squat_university: {
    id: 'squat_university',
    name: 'Dr. Aaron Horschig',
    channelName: 'Squat University',
    avatarUrl:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=150&auto=format&fit=crop&q=80',
    specialty: 'Movement Biomechanics, Joint Mobility & Injury Rehabilitation',
    channelUrl: 'https://www.youtube.com/@SquatUniversity',
    credentials: 'DPT (Doctor of Physical Therapy), Strength & Conditioning Specialist',
  },
  jeremy_ethier: {
    id: 'jeremy_ethier',
    name: 'Jeremy Ethier',
    channelName: 'Built With Science',
    avatarUrl:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&auto=format&fit=crop&q=80',
    specialty: 'Electromyography (EMG) Muscle Activation & Workouts',
    channelUrl: 'https://www.youtube.com/@JeremyEthier',
    credentials: 'BSc in Kinesiology, NASM Certified',
  },
  sean_nalewanyj: {
    id: 'sean_nalewanyj',
    name: 'Sean Nalewanyj',
    channelName: 'Sean Nalewanyj',
    avatarUrl:
      'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=150&auto=format&fit=crop&q=80',
    specialty: 'No-BS Evidence Based Muscle Building & Dieting',
    channelUrl: 'https://www.youtube.com/@Sean_Nalewanyj',
    credentials: 'Fitness Author & Long-time Natural Lifter',
  },
};
