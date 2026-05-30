import type { CarMatchResult, QuizAnswers } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function fetchMatches(preferences: QuizAnswers): Promise<CarMatchResult[]> {
  const response = await fetch(`${API_BASE_URL}/api/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(preferences),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch car matches');
  }

  return response.json();
}
