import type { CarMatchResult } from '../../types';
import { MatchScoreRing } from '../MatchScoreRing/MatchScoreRing';
import styles from './CarCard.module.scss';

interface CarCardProps {
  result: CarMatchResult;
  rank: number;
}

export function CarCard({ result, rank }: CarCardProps) {
  const { car, matchScore } = result;

  return (
    <article className={styles.card}>
      <div className={styles.rank}>#{rank}</div>
      <div className={styles.main}>
        <div>
          <p className={styles.brand}>{car.brand}</p>
          <h3 className={styles.name}>{car.name}</h3>
          <p className={styles.variant}>Best pick: {car.bestVariant}</p>
        </div>
        <MatchScoreRing score={matchScore} />
      </div>
      <div className={styles.specs}>
        <span>₹{car.priceMin}–{car.priceMax} L</span>
        <span>{car.mileage} km/l</span>
        <span>NCAP {car.safetyRating}★</span>
        <span>{car.bootSpace} L boot</span>
      </div>
      <div className={styles.tags}>
        <span className={styles.tag}>{car.segment.replace('_', ' ')}</span>
        <span className={styles.tag}>{car.fuelType}</span>
        {car.sunroof && <span className={styles.tag}>Sunroof</span>}
        {car.adas && <span className={styles.tag}>ADAS</span>}
        {car.cam360 && <span className={styles.tag}>360° cam</span>}
        {car.ventilatedSeats && <span className={styles.tag}>Ventilated</span>}
      </div>
    </article>
  );
}
