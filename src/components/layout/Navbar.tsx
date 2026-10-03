'use client';

import type { UserProfile } from '@/types/user';
import { Activity, BookOpen, Compass, Dumbbell, Sparkles, User } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

interface NavbarProps {
  userProfile: UserProfile | null;
  onOpenOnboarding: () => void;
  activeView: '3d-explorer' | 'tracks';
  onSelectView: (view: '3d-explorer' | 'tracks') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userProfile,
  onOpenOnboarding,
  activeView,
  onSelectView,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <Activity className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-base font-black text-white tracking-tight flex items-center gap-1.5">
              Science of Body
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                PRO
              </span>
            </span>
            <span className="text-xs text-slate-400 block -mt-0.5">
              Human Anatomy & Exercise Biomechanics
            </span>
          </div>
        </div>

        {/* View Switchers (3D Explorer vs Learning Tracks) */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => onSelectView('3d-explorer')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === '3d-explorer'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            3D Anatomy Explorer
          </button>
          <button
            type="button"
            onClick={() => onSelectView('tracks')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'tracks'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Curriculum Tracks
          </button>
        </div>

        {/* User Profile / Onboarding Trigger */}
        <div className="flex items-center gap-3">
          {userProfile ? (
            <button
              type="button"
              onClick={onOpenOnboarding}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs">
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <span className="text-xs font-bold text-white block leading-none">
                  {userProfile.name}
                </span>
                <span className="text-[10px] text-slate-400 capitalize block mt-0.5">
                  {userProfile.heightCm}cm • {userProfile.weightKg}kg • {userProfile.primaryGoal}
                </span>
              </div>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenOnboarding}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
            >
              <User className="w-3.5 h-3.5" />
              Setup Profile
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
