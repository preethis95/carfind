import { useState } from 'react';
import { fetchMatches } from './api/matchApi';
import { Quiz } from './components/Quiz/Quiz';
import { Results } from './pages/Results/Results';
import type { CarMatchResult, QuizAnswers } from './types';

type AppView = 'quiz' | 'results' | 'loading' | 'error';

export default function App() {
  const [view, setView] = useState<AppView>('quiz');
  const [results, setResults] = useState<CarMatchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleQuizComplete = async (answers: QuizAnswers) => {
    setView('loading');
    setError(null);
    try {
      const matches = await fetchMatches(answers);
      setResults(matches);
      setView('results');
    } catch {
      setError('Could not reach the match engine. Start the backend on port 8080.');
      setView('error');
    }
  };

  const handleRetake = () => {
    setResults([]);
    setView('quiz');
  };

  if (view === 'loading') {
    return (
      <div className="app-loading">
        <p>Calculating your perfect match…</p>
      </div>
    );
  }

  if (view === 'error') {
    return (
      <div className="app-error">
        <p>{error}</p>
        <button type="button" onClick={handleRetake}>
          Try again
        </button>
      </div>
    );
  }

  if (view === 'results') {
    return <Results results={results} onRetake={handleRetake} />;
  }

  return <Quiz onComplete={handleQuizComplete} />;
}
