package com.carfind.service;

import com.carfind.dto.CarMatchResult;
import com.carfind.dto.UserPreferences;
import com.carfind.entity.Car;
import com.carfind.repository.CarRepository;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MatchEngine {

    private final CarRepository carRepository;

    public List<CarMatchResult> rankCars(UserPreferences prefs) {
        return carRepository.findAll().stream()
                .map(car -> CarMatchResult.builder()
                        .car(car)
                        .matchScore(calculateScore(car, prefs))
                        .build())
                .sorted(Comparator.comparingInt(CarMatchResult::getMatchScore).reversed())
                .collect(Collectors.toList());
    }

    int calculateScore(Car car, UserPreferences prefs) {
        double score = 0;

        score += budgetScore(car, prefs) * 25;
        score += fuelScore(car, prefs) * 15;
        score += familyScore(car, prefs) * 15;
        score += useCaseScore(car, prefs) * 15;
        score += priorityScore(car, prefs) * 20;
        score += featureScore(car, prefs) * 10;

        return (int) Math.round(Math.min(100, Math.max(0, score)));
    }

    private double budgetScore(Car car, UserPreferences prefs) {
        double userMid = (prefs.getBudgetMin() + prefs.getBudgetMax()) / 2;
        double carMid = (car.getPriceMin() + car.getPriceMax()) / 2;

        if (carMid >= prefs.getBudgetMin() && carMid <= prefs.getBudgetMax()) {
            return 1.0;
        }

        double gap = Math.min(
                Math.abs(carMid - prefs.getBudgetMin()),
                Math.abs(carMid - prefs.getBudgetMax()));

        return Math.max(0, 1 - gap / Math.max(userMid, 1));
    }

    private double fuelScore(Car car, UserPreferences prefs) {
        if (prefs.getFuelType() == null || "ANY".equalsIgnoreCase(prefs.getFuelType())) {
            return 1.0;
        }
        return car.getFuelType().equalsIgnoreCase(prefs.getFuelType()) ? 1.0 : 0.3;
    }

    private double familyScore(Car car, UserPreferences prefs) {
        int size = prefs.getFamilySize();
        if (size <= 2) {
            return matchesSegment(car, "HATCHBACK", "SEDAN", "COMPACT_SUV") ? 1.0 : 0.6;
        }
        if (size <= 4) {
            return matchesSegment(car, "SEDAN", "COMPACT_SUV", "MID_SUV") ? 1.0 : 0.65;
        }
        if (size <= 6) {
            return matchesSegment(car, "MID_SUV", "FULL_SUV", "MUV") ? 1.0 : 0.5;
        }
        return matchesSegment(car, "MUV", "FULL_SUV") && car.getBootSpace() >= 400 ? 1.0 : 0.4;
    }

    private double useCaseScore(Car car, UserPreferences prefs) {
        String useCase = normalize(prefs.getUseCase());
        return switch (useCase) {
            case "CITY" -> car.getMileage() >= 16 ? 1.0 : 0.7;
            case "HIGHWAY" -> car.getSafetyRating() >= 4 ? 1.0 : 0.65;
            case "OFFROAD" -> matchesSegment(car, "FULL_SUV", "MID_SUV") && car.getBootSpace() >= 380 ? 1.0 : 0.5;
            case "FAMILY" -> car.getBootSpace() >= 350 ? 1.0 : 0.6;
            default -> 0.75;
        };
    }

    private double priorityScore(Car car, UserPreferences prefs) {
        if (prefs.getPriorities() == null || prefs.getPriorities().isEmpty()) {
            return 0.75;
        }

        double total = 0;
        for (String priority : prefs.getPriorities()) {
            total += switch (normalize(priority)) {
                case "SAFETY" -> car.getSafetyRating() / 5.0;
                case "MILEAGE" -> Math.min(1.0, car.getMileage() / 22.0);
                case "FEATURES" -> featureRichness(car);
                case "SPACE" -> Math.min(1.0, car.getBootSpace() / 550.0);
                case "PERFORMANCE" -> matchesSegment(car, "SEDAN", "FULL_SUV", "MID_SUV") ? 0.9 : 0.6;
                case "COMFORT" -> (car.isVentilatedSeats() ? 0.5 : 0) + (car.isSunroof() ? 0.5 : 0);
                default -> 0.5;
            };
        }
        return total / prefs.getPriorities().size();
    }

    private double featureScore(Car car, UserPreferences prefs) {
        int requested = 0;
        int matched = 0;

        if (prefs.isWantsSunroof()) {
            requested++;
            if (car.isSunroof()) matched++;
        }
        if (prefs.isWantsAdas()) {
            requested++;
            if (car.isAdas()) matched++;
        }
        if (prefs.isWantsCam360()) {
            requested++;
            if (car.isCam360()) matched++;
        }
        if (prefs.isWantsVentilatedSeats()) {
            requested++;
            if (car.isVentilatedSeats()) matched++;
        }

        if (requested == 0) {
            return 1.0;
        }
        return (double) matched / requested;
    }

    private double featureRichness(Car car) {
        int count = 0;
        if (car.isSunroof()) count++;
        if (car.isAdas()) count++;
        if (car.isCam360()) count++;
        if (car.isVentilatedSeats()) count++;
        return count / 4.0;
    }

    private boolean matchesSegment(Car car, String... segments) {
        String segment = normalize(car.getSegment());
        for (String s : segments) {
            if (segment.equals(normalize(s))) {
                return true;
            }
        }
        return false;
    }

    private String normalize(String value) {
        if (value == null) {
            return "";
        }
        return value.trim().toUpperCase(Locale.ROOT).replace(' ', '_');
    }
}
