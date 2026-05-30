package com.carfind.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cars")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String brand;

    @Column(name = "price_min")
    private double priceMin;

    @Column(name = "price_max")
    private double priceMax;

    @Column(name = "safety_rating")
    private int safetyRating;

    private double mileage;
    private String fuelType;
    private String segment;
    private int bootSpace;

    private String bestVariant;

    private boolean sunroof;
    private boolean adas;
    private boolean cam360;
    private boolean ventilatedSeats;
}
