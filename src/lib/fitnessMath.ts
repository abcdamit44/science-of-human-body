import type { TrackCategory } from '@/types/track';
import type { BodyMetrics, ExperienceLevel, Gender } from '@/types/user';

export function calculateMetrics(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: Gender,
  activityLevel: ExperienceLevel,
  goal: TrackCategory,
): BodyMetrics {
  // 1. BMI Calculation
  const heightMeters = heightCm / 100;
  const bmi = Number((weightKg / (heightMeters * heightMeters)).toFixed(1));

  let bmiCategory = 'Normal weight';
  if (bmi < 18.5) bmiCategory = 'Underweight';
  else if (bmi < 25) bmiCategory = 'Healthy weight';
  else if (bmi < 30) bmiCategory = 'Overweight';
  else bmiCategory = 'Obesity range';

  // 2. BMR (Mifflin-St Jeor Formula)
  let bmrBase = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'female') {
    bmrBase -= 161;
  } else {
    bmrBase += 5;
  }
  const bmr = Math.round(bmrBase);

  // 3. Activity multiplier based on experience/training volume
  let multiplier = 1.375; // light-moderate
  if (activityLevel === 'intermediate') multiplier = 1.55;
  if (activityLevel === 'advanced') multiplier = 1.725;

  let tdee = Math.round(bmr * multiplier);

  // Goal-specific caloric adjustments
  if (goal === 'cutting') {
    tdee = Math.round(tdee * 0.8); // 20% deficit
  } else if (goal === 'hypertrophy' || goal === 'powerlifting') {
    tdee = Math.round(tdee * 1.1); // 10% surplus
  }

  // 4. Protein recommendation (g/day): 1.8g - 2.2g per kg for lifting
  const proteinMultiplier = goal === 'cutting' ? 2.2 : 2.0;
  const recommendedProteinGrams = Math.round(weightKg * proteinMultiplier);

  // 5. Water recommendation: ~35-40ml per kg
  const recommendedWaterLiters = Number(((weightKg * 38) / 1000).toFixed(1));

  return {
    bmi,
    bmiCategory,
    bmr,
    tdeeEstimate: tdee,
    recommendedWaterLiters,
    recommendedProteinGrams,
  };
}
