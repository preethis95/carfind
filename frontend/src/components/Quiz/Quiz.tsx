import { useState } from 'react';
import type { FuelType, Priority, QuizAnswers, UseCase } from '../../types';
import { INITIAL_QUIZ_ANSWERS } from '../../types';
import styles from './Quiz.module.scss';

const TOTAL_STEPS = 6;

const USE_CASES: { value: UseCase; label: string }[] = [
  { value: 'CITY', label: 'City commute' },
  { value: 'HIGHWAY', label: 'Highway touring' },
  { value: 'OFFROAD', label: 'Weekend off-road' },
  { value: 'FAMILY', label: 'Family trips' },
  { value: 'MIXED', label: 'Mixed usage' },
];

const FUEL_TYPES: { value: FuelType; label: string }[] = [
  { value: 'PETROL', label: 'Petrol' },
  { value: 'DIESEL', label: 'Diesel' },
  { value: 'EV', label: 'Electric' },
  { value: 'CNG', label: 'CNG' },
  { value: 'HYBRID', label: 'Hybrid' },
  { value: 'ANY', label: 'No preference' },
];

const PRIORITIES: { value: Priority; label: string }[] = [
  { value: 'SAFETY', label: 'Safety' },
  { value: 'MILEAGE', label: 'Mileage' },
  { value: 'FEATURES', label: 'Features' },
  { value: 'SPACE', label: 'Boot space' },
  { value: 'PERFORMANCE', label: 'Performance' },
  { value: 'COMFORT', label: 'Comfort' },
];

const STEP_LABELS = [
  'Budget',
  'Use case',
  'Family size',
  'Fuel',
  'Priorities',
  'Features',
];

interface QuizProps {
  onComplete: (answers: QuizAnswers) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL_QUIZ_ANSWERS);

  const update = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const togglePriority = (priority: Priority) => {
    setAnswers((prev) => {
      const exists = prev.priorities.includes(priority);
      const priorities = exists
        ? prev.priorities.filter((p) => p !== priority)
        : [...prev.priorities, priority].slice(0, 3);
      return { ...prev, priorities };
    });
  };

  const canProceed = () => {
    if (step === 1) return answers.budgetMax >= answers.budgetMin;
    if (step === 5) return answers.priorities.length > 0;
    return true;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      return;
    }
    onComplete(answers);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  return (
    <div className={styles.quiz}>
      <header className={styles.header}>
        <span className={styles.brand}>CarFind</span>
        <p className={styles.subtitle}>6-step quiz to find your perfect match</p>
      </header>

      <div className={styles.progress}>
        {STEP_LABELS.map((label, index) => (
          <div
            key={label}
            className={`${styles.stepDot} ${index + 1 <= step ? styles.active : ''}`}
            title={label}
          />
        ))}
      </div>
      <p className={styles.stepLabel}>
        Step {step} of {TOTAL_STEPS}: {STEP_LABELS[step - 1]}
      </p>

      <div className={styles.panel}>
        {step === 1 && (
          <div className={styles.stepContent}>
            <h2>What is your budget?</h2>
            <p className={styles.hint}>Price range in Lakhs (₹)</p>
            <div className={styles.rangeRow}>
              <label>
                Min
                <input
                  type="number"
                  min={3}
                  max={50}
                  value={answers.budgetMin}
                  onChange={(e) => update('budgetMin', Number(e.target.value))}
                />
              </label>
              <span>—</span>
              <label>
                Max
                <input
                  type="number"
                  min={3}
                  max={50}
                  value={answers.budgetMax}
                  onChange={(e) => update('budgetMax', Number(e.target.value))}
                />
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.stepContent}>
            <h2>Primary use case?</h2>
            <div className={styles.chipGrid}>
              {USE_CASES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className={`${styles.chip} ${answers.useCase === value ? styles.chipActive : ''}`}
                  onClick={() => update('useCase', value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.stepContent}>
            <h2>Family size</h2>
            <p className={styles.hint}>Regular passengers including driver</p>
            <input
              type="range"
              min={1}
              max={8}
              value={answers.familySize}
              onChange={(e) => update('familySize', Number(e.target.value))}
              className={styles.slider}
            />
            <p className={styles.valueDisplay}>{answers.familySize} people</p>
          </div>
        )}

        {step === 4 && (
          <div className={styles.stepContent}>
            <h2>Preferred fuel type</h2>
            <div className={styles.chipGrid}>
              {FUEL_TYPES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className={`${styles.chip} ${answers.fuelType === value ? styles.chipActive : ''}`}
                  onClick={() => update('fuelType', value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className={styles.stepContent}>
            <h2>Top priorities</h2>
            <p className={styles.hint}>Pick up to 3</p>
            <div className={styles.chipGrid}>
              {PRIORITIES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className={`${styles.chip} ${answers.priorities.includes(value) ? styles.chipActive : ''}`}
                  onClick={() => togglePriority(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className={styles.stepContent}>
            <h2>Must-have features</h2>
            <div className={styles.checkList}>
              {(
                [
                  ['wantsSunroof', 'Panoramic sunroof'],
                  ['wantsAdas', 'ADAS / driver assist'],
                  ['wantsCam360', '360° camera'],
                  ['wantsVentilatedSeats', 'Ventilated seats'],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className={styles.checkItem}>
                  <input
                    type="checkbox"
                    checked={answers[key]}
                    onChange={(e) => update(key, e.target.checked)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.btnSecondary} onClick={handleBack} disabled={step === 1}>
          Back
        </button>
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {step === TOTAL_STEPS ? 'See results' : 'Next'}
        </button>
      </div>
    </div>
  );
}
