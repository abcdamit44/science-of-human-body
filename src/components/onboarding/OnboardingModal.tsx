'use client';

import { calculateMetrics } from '@/lib/fitnessMath';
import type { TrackCategory } from '@/types/track';
import type { ExperienceLevel, Gender, UserProfile } from '@/types/user';
import { Activity, ArrowRight, Check, Flame, Sparkles, User, X } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: UserProfile) => void;
  onClose?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<Gender>('male');
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('intermediate');
  const [primaryGoal, setPrimaryGoal] = useState<TrackCategory>('hypertrophy');

  if (!isOpen) return null;

  const handleFinish = () => {
    const profile: UserProfile = {
      name: name.trim() || 'Athlete',
      age,
      gender,
      heightCm,
      weightKg,
      experienceLevel,
      primaryGoal,
      onboardingCompleted: true,
      savedExercises: [],
      completedChapters: [],
      inspectedMuscles: [],
      createdAt: new Date().toISOString(),
    };
    onComplete(profile);
  };

  const previewMetrics = calculateMetrics(
    weightKg,
    heightCm,
    age,
    gender,
    experienceLevel,
    primaryGoal,
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col">
        {/* Close button if onClose is provided */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Progress Dots */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Setup Your Profile • Step {step} of 3
            </span>
            <h2 className="text-xl font-black text-white mt-0.5">
              {step === 1 && 'Welcome to Gym Science Academy'}
              {step === 2 && 'Your Body Metrics'}
              {step === 3 && 'Choose Your Learning Focus'}
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  s === step ? 'bg-cyan-400 w-6' : s < step ? 'bg-emerald-400' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name-input"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                What should we call you?
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex, Jordan..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="age-input"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  Age
                </label>
                <input
                  id="age-input"
                  type="number"
                  min={14}
                  max={90}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label
                  htmlFor="gender-select"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  Gender
                </label>
                <select
                  id="gender-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Height & Weight */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="height-input"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  Height (cm)
                </label>
                <input
                  id="height-input"
                  type="number"
                  min={120}
                  max={230}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
                <span className="text-xs text-slate-500 mt-1 block">
                  ~{(heightCm / 30.48).toFixed(1)} feet
                </span>
              </div>

              <div>
                <label
                  htmlFor="weight-input"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  Weight (kg)
                </label>
                <input
                  id="weight-input"
                  type="number"
                  min={35}
                  max={200}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
                <span className="text-xs text-slate-500 mt-1 block">
                  ~{(weightKg * 2.20462).toFixed(1)} lbs
                </span>
              </div>
            </div>

            {/* Instant calculated preview box */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 grid grid-cols-3 gap-3 text-center">
              <div>
                <span className="text-xs text-slate-500 block">BMI</span>
                <span className="text-lg font-black text-cyan-400">{previewMetrics.bmi}</span>
                <span className="text-xs text-slate-400 block truncate">
                  {previewMetrics.bmiCategory}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Est. BMR</span>
                <span className="text-lg font-black text-white">{previewMetrics.bmr}</span>
                <span className="text-xs text-slate-400 block">kcal/day</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Protein Target</span>
                <span className="text-lg font-black text-emerald-400">
                  {previewMetrics.recommendedProteinGrams}g
                </span>
                <span className="text-xs text-slate-400 block">daily</span>
              </div>
            </div>

            <div className="pt-3 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Goal & Experience */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <span className="block text-xs font-semibold text-slate-300 mb-2">
                What is your primary training goal?
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  {
                    id: 'hypertrophy',
                    title: 'Hypertrophy',
                    desc: 'Muscle building & aesthetics',
                    icon: Sparkles,
                  },
                  {
                    id: 'powerlifting',
                    title: 'Powerlifting',
                    desc: 'Big 3 maximal strength',
                    icon: Activity,
                  },
                  {
                    id: 'cutting',
                    title: 'Cutting / Fat Loss',
                    desc: 'Lean deficit & retention',
                    icon: Flame,
                  },
                  {
                    id: 'calisthenics',
                    title: 'Calisthenics',
                    desc: 'Bodyweight & mobility',
                    icon: User,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = primaryGoal === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPrimaryGoal(item.id as TrackCategory)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-500 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon
                          className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}
                        />
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <h4 className="text-xs font-bold text-white mt-2">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="experience-select"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Experience Level
              </label>
              <select
                id="experience-select"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="beginner">Beginner (&lt; 1 year in gym)</option>
                <option value="intermediate">Intermediate (1 - 3 years consistent)</option>
                <option value="advanced">Advanced (3+ years serious lifting)</option>
              </select>
            </div>

            <div className="pt-3 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/25"
              >
                <Check className="w-4 h-4" />
                Launch Experience
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
