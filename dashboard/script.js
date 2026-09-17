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

    const crop = document.getElementById("crop").value;
    const soil = Number(document.getElementById("soil").value);
    const tank = Number(document.getElementById("tank").value);
    const temperature = Number(
        document.getElementById("temperature").value
    );
    const rain = Number(document.getElementById("rain").value);

    const threshold = cropProfiles[crop].threshold;


    /* =========================================
       UPDATE DASHBOARD VALUES
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
       CASE 1 — TANK VERY LOW
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

        addHistory(
            "Refill Tank",
            crop,
            soil,
            tank,
            rain
        );

        return;
    }


    /* =========================================
       CASE 2 — SOIL MOISTURE SUFFICIENT
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

        addHistory(
            "No Water Required",
            crop,
            soil,
            tank,
            rain
        );

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

        addHistory(
            "Rain Expected — Irrigation Postponed",
            crop,
            soil,
            tank,
            rain
        );

        return;
    }


    /* =========================================
       CASE 4 — IRRIGATION CALCULATION
    ========================================= */

    const dryness =
        threshold - soil;

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


    /* =========================================
       CASE 5 — IRRIGATION RECOMMENDED
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


    addHistory(
        "Irrigation Recommended",
        crop,
        soil,
        tank,
        rain
    );
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


    /* Add pump activity to history */

    const crop =
        document.getElementById("crop").value;

    const tankLevel =
        document.getElementById("tank").value;

    const soilLevel =
        document.getElementById("soil").value;

    const rainLevel =
        document.getElementById("rain").value;

    addHistory(
        "Pump Turned ON",
        crop,
        soilLevel,
        tankLevel,
        rainLevel
    );
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
   IRRIGATION HISTORY
========================================= */

function addHistory(
    status,
    crop,
    soil,
    tank,
    rain
) {

    const historyList =
        document.getElementById("historyList");

    if (!historyList) {
        return;
    }


    /* Remove empty message */

    const emptyMessage =
        historyList.querySelector(".history-empty");

    if (emptyMessage) {
        emptyMessage.remove();
    }


    /* Create history item */

    const historyItem =
        document.createElement("div");

    historyItem.className =
        "history-item";


    /* Current time */

    const time =
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });


    historyItem.innerHTML = `
        <div class="history-info">

            <h3>${status}</h3>

            <p>
                ${crop} • Soil ${soil}% • Tank ${tank}% • Rain ${rain}%
            </p>

            <p>
                Checked at ${time}
            </p>

        </div>

        <div class="history-status">
            ANALYZED
        </div>
    `;


    /* Newest activity on top */

    historyList.prepend(historyItem);
}


/* =========================================
   LIVE SOIL SENSOR DISPLAY
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
   LIVE TANK SENSOR DISPLAY
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
   LIVE RAIN SENSOR DISPLAY
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
   LIVE TEMPERATURE DISPLAY
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

document.addEventListener(
    "DOMContentLoaded",
    function () {

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


        /* Initial values */

        updateSoilDisplay();
        updateTankDisplay();
        updateRainDisplay();
        updateTemperatureDisplay();

    }
);
