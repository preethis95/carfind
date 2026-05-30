import { CarCard } from '../../components/CarCard/CarCard';
import type { CarMatchResult } from '../../types';
import styles from './Results.module.scss';

interface ResultsProps {
  results: CarMatchResult[];
  onRetake: () => void;
}

export function Results({ results, onRetake }: ResultsProps) {
  const topPick = results[0];

  return (
    <div className={styles.results}>
      <header className={styles.header}>
        <span className={styles.brand}>CarFind</span>
        <h1>Your matches</h1>
        {topPick && (
          <p className={styles.hero}>
            Top recommendation:{' '}
            <strong>
              {topPick.car.brand} {topPick.car.name}
            </strong>{' '}
            — {topPick.matchScore}% match
          </p>
        )}
      </header>

      <div className={styles.legend}>
        <span className={styles.legendHigh}>● &gt;80% Excellent</span>
        <span className={styles.legendMed}>● 60–80% Good</span>
        <span className={styles.legendLow}>● &lt;60% Fair</span>
      </div>

      <div className={styles.grid}>
        {results.map((result, index) => (
          <CarCard key={result.car.id} result={result} rank={index + 1} />
        ))}
      </div>

      <button type="button" className={styles.retake} onClick={onRetake}>
        Retake quiz
      </button>
    </div>
  );
}
