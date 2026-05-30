package com.carfind.controller;

import com.carfind.dto.CarMatchResult;
import com.carfind.dto.UserPreferences;
import com.carfind.service.MatchEngine;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class MatchController {

    private final MatchEngine matchEngine;

    @PostMapping("/match")
    public List<CarMatchResult> match(@RequestBody UserPreferences preferences) {
        return matchEngine.rankCars(preferences);
    }
}
