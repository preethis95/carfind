export type UseCase = 'CITY' | 'HIGHWAY' | 'OFFROAD' | 'FAMILY' | 'MIXED';
export type FuelType = 'PETROL' | 'DIESEL' | 'EV' | 'CNG' | 'HYBRID' | 'ANY';
export type Priority = 'SAFETY' | 'MILEAGE' | 'FEATURES' | 'SPACE' | 'PERFORMANCE' | 'COMFORT';

export interface QuizAnswers {
  budgetMin: number;
  budgetMax: number;
  useCase: UseCase;
  familySize: number;
  fuelType: FuelType;
  priorities: Priority[];
  wantsSunroof: boolean;
  wantsAdas: boolean;
  wantsCam360: boolean;
  wantsVentilatedSeats: boolean;
}

export interface Car {
  id: number;
  name: string;
  brand: string;
  priceMin: number;
  priceMax: number;
  safetyRating: number;
  mileage: number;
  fuelType: string;
  segment: string;
  bootSpace: number;
  bestVariant: string;
  sunroof: boolean;
  adas: boolean;
  cam360: boolean;
  ventilatedSeats: boolean;
}

export interface CarMatchResult {
  car: Car;
  matchScore: number;
}

export const INITIAL_QUIZ_ANSWERS: QuizAnswers = {
  budgetMin: 8,
  budgetMax: 15,
  useCase: 'CITY',
  familySize: 4,
  fuelType: 'PETROL',
  priorities: ['SAFETY', 'MILEAGE'],
  wantsSunroof: false,
  wantsAdas: false,
  wantsCam360: false,
  wantsVentilatedSeats: false,
};
