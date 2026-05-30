export type ScoreTier = 'high' | 'medium' | 'low';

export function getScoreTier(score: number): ScoreTier {
  if (score > 80) return 'high';
  if (score >= 60) return 'medium';
  return 'low';
}
