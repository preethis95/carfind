package com.carfind.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserPreferences {

    private double budgetMin;
    private double budgetMax;
    private String useCase;
    private int familySize;
    private String fuelType;
    private List<String> priorities;
    private boolean wantsSunroof;
    private boolean wantsAdas;
    private boolean wantsCam360;
    private boolean wantsVentilatedSeats;
}
