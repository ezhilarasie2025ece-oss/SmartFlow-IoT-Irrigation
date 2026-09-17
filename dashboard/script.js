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


function analyzeIrrigation() {

    const crop = document.getElementById("crop").value;
    const soil = Number(document.getElementById("soil").value);
    const tank = Number(document.getElementById("tank").value);
    const temperature =
        Number(document.getElementById("temperature").value);
    const rain = Number(document.getElementById("rain").value);

    const threshold = cropProfiles[crop].threshold;

    // Update dashboard values
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


    /* =========================
       TANK SAFETY
    ========================= */

    if (tank <= 10) {

        recommendation.innerHTML =
            `<span class="status-check">!</span>
             🚨 REFILL TANK`;

        reason.textContent =
            "Tank level is critically low. Pump operation is blocked to prevent dry running.";

        waterAmount.textContent =
            "Recommended action: Refill the irrigation tank.";

        recommendation.style.borderLeftColor = "#dc2626";
        recommendation.style.background =
            "linear-gradient(135deg, #fff1f2, #fee2e2)";

        turnPumpOff();

        return;
    }


    /* =========================
       SOIL HAS ENOUGH MOISTURE
    ========================= */

    if (soil >= threshold) {

        recommendation.innerHTML =
            `<span class="status-check">✓</span>
             ✅ NO WATER REQUIRED`;

        reason.textContent =
            `${crop} soil moisture is ${soil}%. Target threshold is ${threshold}%.`;

        waterAmount.textContent =
            "Recommended irrigation duration: 0 minutes.";

        recommendation.style.borderLeftColor = "#16a34a";
        recommendation.style.background =
            "linear-gradient(135deg, #ecfdf5, #dcfce7)";

        turnPumpOff();

        return;
    }


    /* =========================
       HIGH RAIN PROBABILITY
    ========================= */

    if (rain >= 70) {

        recommendation.innerHTML =
            `<span class="status-check">☔</span>
             🌧️ WAIT — RAIN EXPECTED`;

        reason.textContent =
            `Soil moisture is ${soil}%, but rain probability is ${rain}%. Irrigation can be postponed to avoid unnecessary water usage.`;

        waterAmount.textContent =
            "Recommended action: Recheck after the expected rainfall.";

        recommendation.style.borderLeftColor = "#8b5cf6";
        recommendation.style.background =
            "linear-gradient(135deg, #f5f3ff, #ede9fe)";

        turnPumpOff();

        return;
    }


    /* =========================
       IRRIGATION CALCULATION
    ========================= */

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


    /* =========================
       IRRIGATION RECOMMENDATION
    ========================= */

    recommendation.innerHTML =
        `<span class="status-check">✓</span>
         💧 IRRIGATION RECOMMENDED`;

    reason.textContent =
        `Soil moisture is below the ${crop} threshold. Rain probability is only ${rain}%. Temperature is ${temperature}°C.`;

    waterAmount.textContent =
        `Water priority: ${priority} | Recommended pump duration: approximately ${duration} minutes.`;


    recommendation.style.borderLeftColor = "#0ea5e9";

    recommendation.style.background =
        "linear-gradient(135deg, #ecfeff, #eff6ff)";


    // Pump remains OFF until user manually turns it ON
    turnPumpOff();
}


/* =========================
   PUMP ON
========================= */

function turnPumpOn() {

    const tank =
        Number(document.getElementById("tank").value);

    const soil =
        Number(document.getElementById("soil").value);


    if (tank <= 10) {

        alert(
            "🚨 Pump cannot be turned ON.\n\nTank water level is too low."
        );

        turnPumpOff();

        return;
    }


    if (soil >= 80) {

        alert(
            "🌱 Pump is not recommended.\n\nSoil moisture is already high."
        );

        turnPumpOff();

        return;
    }


    document.getElementById("pumpStatus").textContent =
        "ON";

    document.getElementById("pumpStatus").style.background =
        "#dcfce7";

    document.getElementById("pumpStatus").style.color =
        "#15803d";
}


/* =========================
   PUMP OFF
========================= */

function turnPumpOff() {

    document.getElementById("pumpStatus").textContent =
        "OFF";

    document.getElementById("pumpStatus").style.background =
        "#fee2e2";

    document.getElementById("pumpStatus").style.color =
        "#dc2626";
}


/* =========================
   LIVE SENSOR DISPLAY
========================= */

document.getElementById("soil")
    .addEventListener("input", function () {

        document.getElementById("soilValue").textContent =
            this.value + "%";

        document.getElementById("soilDisplay").textContent =
            this.value + "%";
    });


document.getElementById("tank")
    .addEventListener("input", function () {

        document.getElementById("tankValue").textContent =
            this.value + "%";

        document.getElementById("tankDisplay").textContent =
            this.value + "%";
    });


document.getElementById("rain")
    .addEventListener("input", function () {

        document.getElementById("rainValue").textContent =
            this.value + "%";

        document.getElementById("rainDisplay").textContent =
            this.value + "%";
    });


document.getElementById("temperature")
    .addEventListener("input", function () {

        document.getElementById("tempDisplay").textContent =
            this.value + "°C";
    });
