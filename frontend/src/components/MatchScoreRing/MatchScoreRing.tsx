import { getScoreTier } from '../../utils/matchScoreColor';
import styles from './MatchScoreRing.module.scss';

interface MatchScoreRingProps {
  score: number;
  size?: number;
}

export function MatchScoreRing({ score, size = 72 }: MatchScoreRingProps) {
  const tier = getScoreTier(score);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div
      className={`${styles.ring} ${styles[tier]}`}
      style={{ width: size, height: size }}
      aria-label={`Match score ${score} percent`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className={styles.track}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={6}
        />
        <circle
          className={styles.progress}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={6}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className={styles.label}>{score}%</span>
    </div>
  );
}
