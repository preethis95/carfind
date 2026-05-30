package com.carfind.dto;

import com.carfind.entity.Car;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarMatchResult {

    private Car car;
    private int matchScore;
}
