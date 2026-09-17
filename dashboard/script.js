const cropProfiles = {
    Tomato: {
        threshold: 40
    },
    Onion: {
        threshold: 45
    },
    Chilli: {
        threshold: 35
    },
    Cotton: {
        threshold: 30
    },
    Sugarcane: {
        threshold: 50
    },
    Groundnut: {
        threshold: 40
    },
    Maize: {
        threshold: 40
    },
    Sorghum: {
        threshold: 35
    },
    Rice: {
        threshold: 50
    },
    Wheat: {
        threshold: 40
    },
    Ragi: {
        threshold: 35
    },
    "Pearl Millet": {
        threshold: 35
    }
};

function analyzeIrrigation() {

    const crop = document.getElementById("crop").value;
    const soil = Number(document.getElementById("soil").value);
    const tank = Number(document.getElementById("tank").value);
    const temperature = Number(document.getElementById("temperature").value);
    const rain = Number(document.getElementById("rain").value);

    const threshold = cropProfiles[crop].threshold;

    document.getElementById("soilValue").textContent = soil + "%";
    document.getElementById("tankValue").textContent = tank + "%";
    document.getElementById("rainValue").textContent = rain + "%";

    document.getElementById("soilDisplay").textContent = soil + "%";
    document.getElementById("tankDisplay").textContent = tank + "%";
    document.getElementById("rainDisplay").textContent = rain + "%";
    document.getElementById("tempDisplay").textContent = temperature + "°C";

    const recommendation = document.getElementById("recommendation");
    const reason = document.getElementById("reason");
    const waterAmount = document.getElementById("waterAmount");

    // Safety condition: tank too low
    if (tank <= 10) {

        recommendation.textContent = "🚨 REFILL TANK";
        reason.textContent =
            "Tank level is critically low. Pump operation is blocked to prevent dry running.";

        waterAmount.textContent =
            "Recommended action: Refill the irrigation tank.";

        turnPumpOff();
        return;
    }

    // Soil already has enough moisture
    if (soil >= threshold) {

        recommendation.textContent = "✅ NO WATER REQUIRED";

        reason.textContent =
            `${crop} soil moisture is ${soil}%. Target threshold is ${threshold}%.`;

        waterAmount.textContent =
            "Recommended irrigation duration: 0 minutes.";

        turnPumpOff();
        return;
    }

    // Rain is expected
    if (rain >= 70) {

        recommendation.textContent = "🌧️ WAIT — RAIN EXPECTED";

        reason.textContent =
            `Soil moisture is ${soil}%, but rain probability is ${rain}%. Irrigation can be postponed to avoid unnecessary water usage.`;

        waterAmount.textContent =
            "Recommended action: Recheck after the expected rainfall.";

        turnPumpOff();
        return;
    }

    // Soil is dry and rain probability is low
    const dryness = threshold - soil;

    let duration;
    let priority;

    if (dryness >= 20) {
        duration = 6;
        priority = "HIGH";
    } else if (dryness >= 10) {
        duration = 4;
        priority = "MEDIUM";
    } else {
        duration = 2;
        priority = "LOW";
    }

    recommendation.textContent = "💧 IRRIGATION RECOMMENDED";

    reason.textContent =
        `Soil moisture is below the ${crop} threshold. Rain probability is only ${rain}%. Temperature is ${temperature}°C.`;

    waterAmount.textContent =
        `Water priority: ${priority} | Recommended pump duration: approximately ${duration} minutes.`;

    // Pump remains OFF until user manually turns it ON
    turnPumpOff();
}


function turnPumpOn() {

    const tank = Number(document.getElementById("tank").value);
    const soil = Number(document.getElementById("soil").value);

    if (tank <= 10) {
        alert("Pump cannot be turned ON. Tank water level is too low.");
        turnPumpOff();
        return;
    }

    if (soil >= 80) {
        alert("Pump is not recommended because soil moisture is already high.");
        return;
    }

    document.getElementById("pumpStatus").textContent = "ON";
}


function turnPumpOff() {
    document.getElementById("pumpStatus").textContent = "OFF";
}


// Update displayed sensor values while moving sliders
document.getElementById("soil").addEventListener("input", function () {
    document.getElementById("soilValue").textContent = this.value + "%";
});

document.getElementById("tank").addEventListener("input", function () {
    document.getElementById("tankValue").textContent = this.value + "%";
});

document.getElementById("rain").addEventListener("input", function () {
    document.getElementById("rainValue").textContent = this.value + "%";
});
