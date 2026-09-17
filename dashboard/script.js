const cropProfiles = {
    Tomato: { threshold: 40 },
    Onion: { threshold: 45 },
    Chilli: { threshold: 35 },
    Cotton: { threshold: 30 },
    Sugarcane: { threshold: 50 },
    Groundnut: { threshold: 40 },
    Maize: { threshold: 40 },
    Sorghum: { threshold: 35 },
    Rice: { threshold: 50 },
    Wheat: { threshold: 40 },
    Ragi: { threshold: 35 },
    "Pearl Millet": { threshold: 35 }
};


/* =========================================
   SMARTFLOW IRRIGATION ANALYSIS
========================================= */

function analyzeIrrigation() {

    const cropElement = document.getElementById("crop");
    const soilElement = document.getElementById("soil");
    const tankElement = document.getElementById("tank");
    const temperatureElement = document.getElementById("temperature");
    const rainElement = document.getElementById("rain");

    const crop = cropElement.value;
    const soil = Number(soilElement.value);
    const tank = Number(tankElement.value);
    const temperature = Number(temperatureElement.value);
    const rain = Number(rainElement.value);

    const threshold = cropProfiles[crop].threshold;


    /* =========================================
       UPDATE SENSOR VALUES
    ========================================= */

    document.getElementById("soilValue").textContent =
        soil + "%";

    document.getElementById("tankValue").textContent =
        tank + "%";

    document.getElementById("rainValue").textContent =
        rain + "%";

    document.getElementById("soilDisplay").textContent =
        soil + "%";

    document.getElementById("tankDisplay").textContent =
        tank + "%";

    document.getElementById("rainDisplay").textContent =
        rain + "%";

    document.getElementById("tempDisplay").textContent =
        temperature + "°C";


    const recommendation =
        document.getElementById("recommendation");

    const reason =
        document.getElementById("reason");

    const waterAmount =
        document.getElementById("waterAmount");


    /* =========================================
       CASE 1 — TANK EMPTY / VERY LOW
    ========================================= */

    if (tank <= 10) {

        recommendation.innerHTML =
            `<span class="status-check">!</span>
             🚨 REFILL TANK`;

        reason.textContent =
            "Tank level is critically low. Pump operation is blocked to prevent dry running.";

        waterAmount.textContent =
            "Recommended action: Refill the irrigation tank.";

        recommendation.style.borderLeftColor =
            "#dc2626";

        recommendation.style.background =
            "linear-gradient(135deg, #fff1f2, #fee2e2)";

        turnPumpOff();

        return;
    }


    /* =========================================
       CASE 2 — SOIL MOISTURE IS SUFFICIENT
    ========================================= */

    if (soil >= threshold) {

        recommendation.innerHTML =
            `<span class="status-check">✓</span>
             ✅ NO WATER REQUIRED`;

        reason.textContent =
            `${crop} soil moisture is ${soil}%. Target threshold is ${threshold}%.`;

        waterAmount.textContent =
            "Recommended irrigation duration: 0 minutes.";

        recommendation.style.borderLeftColor =
            "#16a34a";

        recommendation.style.background =
            "linear-gradient(135deg, #ecfdf5, #dcfce7)";

        turnPumpOff();

        return;
    }


    /* =========================================
       CASE 3 — HIGH RAIN PROBABILITY
    ========================================= */

    if (rain >= 70) {

        recommendation.innerHTML =
            `<span class="status-check">☔</span>
             🌧️ WAIT — RAIN EXPECTED`;

        reason.textContent =
            `Soil moisture is ${soil}%, but rain probability is ${rain}%. Irrigation can be postponed to avoid unnecessary water usage.`;

        waterAmount.textContent =
            "Recommended action: Recheck after the expected rainfall.";

        recommendation.style.borderLeftColor =
            "#8b5cf6";

        recommendation.style.background =
            "linear-gradient(135deg, #f5f3ff, #ede9fe)";

        turnPumpOff();

        return;
    }


    /* =========================================
       CASE 4 — IRRIGATION REQUIRED
    ========================================= */

    const dryness = threshold - soil;

    let duration;
    let priority;


    if (dryness >= 20) {

        duration = 6;
        priority = "HIGH";

    }

    else if (dryness >= 10) {

        duration = 4;
        priority = "MEDIUM";

    }

    else {

        duration = 2;
        priority = "LOW";
    }


    /* =========================================
       SHOW IRRIGATION RECOMMENDATION
    ========================================= */

    recommendation.innerHTML =
        `<span class="status-check">✓</span>
         💧 IRRIGATION RECOMMENDED`;

    reason.textContent =
        `Soil moisture is ${soil}%, which is below the ${crop} threshold of ${threshold}%. Rain probability is ${rain}%. Temperature is ${temperature}°C.`;

    waterAmount.textContent =
        `Water priority: ${priority} | Recommended pump duration: approximately ${duration} minutes.`;

    recommendation.style.borderLeftColor =
        "#0ea5e9";

    recommendation.style.background =
        "linear-gradient(135deg, #ecfeff, #eff6ff)";


    /* Pump stays OFF until user manually turns it ON */

    turnPumpOff();
}


/* =========================================
   PUMP ON
========================================= */

function turnPumpOn() {

    const tank =
        Number(document.getElementById("tank").value);

    const soil =
        Number(document.getElementById("soil").value);


    /* Tank safety */

    if (tank <= 10) {

        alert(
            "🚨 Pump cannot be turned ON.\n\nTank water level is too low."
        );

        turnPumpOff();

        return;
    }


    /* Soil safety */

    if (soil >= 80) {

        alert(
            "🌱 Pump is not recommended.\n\nSoil moisture is already high."
        );

        turnPumpOff();

        return;
    }


    /* Turn pump ON */

    const pumpStatus =
        document.getElementById("pumpStatus");

    pumpStatus.textContent =
        "ON";

    pumpStatus.style.background =
        "#dcfce7";

    pumpStatus.style.color =
        "#15803d";
}


/* =========================================
   PUMP OFF
========================================= */

function turnPumpOff() {

    const pumpStatus =
        document.getElementById("pumpStatus");

    if (!pumpStatus) {
        return;
    }

    pumpStatus.textContent =
        "OFF";

    pumpStatus.style.background =
        "#fee2e2";

    pumpStatus.style.color =
        "#dc2626";
}


/* =========================================
   LIVE SOIL SENSOR
========================================= */

function updateSoilDisplay() {

    const soil =
        document.getElementById("soil").value;

    document.getElementById("soilValue").textContent =
        soil + "%";

    document.getElementById("soilDisplay").textContent =
        soil + "%";
}


/* =========================================
   LIVE TANK SENSOR
========================================= */

function updateTankDisplay() {

    const tank =
        document.getElementById("tank").value;

    document.getElementById("tankValue").textContent =
        tank + "%";

    document.getElementById("tankDisplay").textContent =
        tank + "%";
}


/* =========================================
   LIVE RAIN SENSOR
========================================= */

function updateRainDisplay() {

    const rain =
        document.getElementById("rain").value;

    document.getElementById("rainValue").textContent =
        rain + "%";

    document.getElementById("rainDisplay").textContent =
        rain + "%";
}


/* =========================================
   LIVE TEMPERATURE
========================================= */

function updateTemperatureDisplay() {

    const temperature =
        document.getElementById("temperature").value;

    document.getElementById("tempDisplay").textContent =
        temperature + "°C";
}


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const soil =
        document.getElementById("soil");

    const tank =
        document.getElementById("tank");

    const rain =
        document.getElementById("rain");

    const temperature =
        document.getElementById("temperature");


    if (soil) {
        soil.addEventListener(
            "input",
            updateSoilDisplay
        );
    }


    if (tank) {
        tank.addEventListener(
            "input",
            updateTankDisplay
        );
    }


    if (rain) {
        rain.addEventListener(
            "input",
            updateRainDisplay
        );
    }


    if (temperature) {
        temperature.addEventListener(
            "input",
            updateTemperatureDisplay
        );
    }


    /* Initial display */

    updateSoilDisplay();
    updateTankDisplay();
    updateRainDisplay();
    updateTemperatureDisplay();

});
