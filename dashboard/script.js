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
   LANGUAGE SETTINGS
========================================= */

let tamilMode = false;

const tamilTranslations = {

    "Field Monitoring": "வயல் கண்காணிப்பு",
    "Live Data": "நேரடி தரவு",
    "Crop": "பயிர்",
    "Soil Moisture (%)": "மண் ஈரப்பதம் (%)",
    "Tank Level (%)": "தொட்டி நீர்மட்டம் (%)",
    "Temperature (°C)": "வெப்பநிலை (°C)",
    "Rain Probability (%)": "மழை வாய்ப்பு (%)",
    "Analyze Irrigation": "நீர்ப்பாசனத்தை பகுப்பாய்வு செய்",

    "Temperature": "வெப்பநிலை",
    "Soil Moisture": "மண் ஈரப்பதம்",
    "Tank Level": "தொட்டி நீர்மட்டம்",
    "Rain Probability": "மழை வாய்ப்பு",

    "SmartFlow Recommendation": "SmartFlow பரிந்துரை",
    "Context-aware irrigation decision engine":
        "சூழ்நிலைக்கு ஏற்ப நீர்ப்பாசன முடிவு அமைப்பு",

    "Suggested Water Action":
        "பரிந்துரைக்கப்பட்ட நீர்ப்பாசன நடவடிக்கை",

    "Why?": "ஏன்?",

    "Pump Control": "பம்ப் கட்டுப்பாடு",
    "Status:": "நிலை:",
    "Turn ON Pump": "பம்பை ON செய்",
    "Turn OFF Pump": "பம்பை OFF செய்",

    "Irrigation History": "நீர்ப்பாசன வரலாறு",

    "Recent irrigation decisions and pump activity":
        "சமீபத்திய நீர்ப்பாசன முடிவுகள் மற்றும் பம்ப் செயல்பாடுகள்",

    "System Flow": "சிஸ்டம் செயல்பாட்டு ஓட்டம்",

    "No irrigation activity yet.":
        "இன்னும் நீர்ப்பாசன செயல்பாடு இல்லை.",

    "IRRIGATION RECOMMENDED":
        "நீர்ப்பாசனம் பரிந்துரைக்கப்படுகிறது",

    "NO WATER REQUIRED":
        "தண்ணீர் தேவையில்லை",

    "REFILL TANK":
        "தொட்டியை நிரப்பவும்",

    "WAIT — RAIN EXPECTED":
        "காத்திருக்கவும் — மழை எதிர்பார்க்கப்படுகிறது",

    "Irrigation Recommended":
        "நீர்ப்பாசனம் பரிந்துரைக்கப்பட்டது",

    "No Water Required":
        "தண்ணீர் தேவையில்லை",

    "Refill Tank":
        "தொட்டியை நிரப்பவும்",

    "Rain Expected — Irrigation Postponed":
        "மழை எதிர்பார்ப்பு — நீர்ப்பாசனம் ஒத்திவைக்கப்பட்டது",

    "Pump Turned ON":
        "பம்ப் ON செய்யப்பட்டது",

    "ANALYZED":
        "பகுப்பாய்வு செய்யப்பட்டது",

    "Healthy Crops":
        "ஆரோக்கியமான பயிர்கள்",

    "Brighter Tomorrow":
        "பிரகாசமான நாளை",

    "Adaptive IoT Irrigation & Water Management System":
        "தகவமைப்பு IoT நீர்ப்பாசன மற்றும் நீர் மேலாண்மை அமைப்பு",

    "Real-time agricultural condition analysis":
        "நிகழ்நேர வேளாண் நிலை பகுப்பாய்வு"
};


const cropTranslations = {

    "Tomato": "தக்காளி",
    "Onion": "வெங்காயம்",
    "Chilli": "மிளகாய்",
    "Cotton": "பருத்தி",
    "Sugarcane": "கரும்பு",
    "Groundnut": "நிலக்கடலை",
    "Maize": "மக்காச்சோளம்",
    "Sorghum": "சோளம்",
    "Rice": "நெல்",
    "Wheat": "கோதுமை",
    "Ragi": "கேழ்வரகு",
    "Pearl Millet": "கம்பு"
};


/* =========================================
   SAVE ORIGINAL PAGE TEXT
========================================= */

const originalTextNodes = new Map();

function saveOriginalText() {

    const walker =
        document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );

    let node;

    while (node = walker.nextNode()) {

        if (
            node.parentElement &&
            !["SCRIPT", "STYLE"].includes(
                node.parentElement.tagName
            )
        ) {

            if (!originalTextNodes.has(node)) {

                originalTextNodes.set(
                    node,
                    node.textContent
                );
            }
        }
    }
}


/* =========================================
   TRANSLATE STATIC PAGE
========================================= */

function translateStaticPage() {

    saveOriginalText();

    originalTextNodes.forEach(
        function (originalText, node) {

            const cleanText =
                originalText.trim();

            if (!cleanText) {
                return;
            }

            if (tamilMode) {

                if (tamilTranslations[cleanText]) {

                    node.textContent =
                        originalText.replace(
                            cleanText,
                            tamilTranslations[cleanText]
                        );
                }

            } else {

                node.textContent =
                    originalText;
            }
        }
    );


    /* Crop dropdown */

    const options =
        document.querySelectorAll("#crop option");

    options.forEach(function (option) {

        const english =
            option.dataset.english ||
            option.textContent.trim();

        option.dataset.english =
            english;

        if (tamilMode) {

            option.textContent =
                cropTranslations[english] ||
                english;

        } else {

            option.textContent =
                english;
        }
    });


    /* Language button */

    const languageButton =
        document.getElementById("languageToggle");

    if (languageButton) {

        languageButton.textContent =
            tamilMode
                ? "English"
                : "தமிழ்";
    }
}


/* =========================================
   LANGUAGE TOGGLE
========================================= */

function toggleLanguage() {

    tamilMode = !tamilMode;

    translateStaticPage();

    updateDynamicLanguage();
}


/* =========================================
   DYNAMIC TEXT LANGUAGE
========================================= */

function updateDynamicLanguage() {

    const recommendation =
        document.getElementById("recommendation");

    const waterAmount =
        document.getElementById("waterAmount");

    const reason =
        document.getElementById("reason");

    if (!recommendation) {
        return;
    }


    /* If no analysis has happened yet */

    if (
        recommendation.dataset.state === "initial"
    ) {

        if (tamilMode) {

            recommendation.innerHTML =
                `<span class="status-check">✓</span>
                 💧 நீர்ப்பாசனத்தை பகுப்பாய்வு செய்யவும்`;

        } else {

            recommendation.innerHTML =
                `<span class="status-check">✓</span>
                 💧 Click "Analyze Irrigation" to get a recommendation.`;
        }

        return;
    }


    const state =
        recommendation.dataset.state;

    const crop =
        document.getElementById("crop").value;

    const soil =
        Number(document.getElementById("soil").value);

    const tank =
        Number(document.getElementById("tank").value);

    const rain =
        Number(document.getElementById("rain").value);

    const temperature =
        Number(document.getElementById("temperature").value);

    const threshold =
        cropProfiles[crop].threshold;


    /* Tank low */

    if (state === "tank-low") {

        recommendation.innerHTML =
            tamilMode
                ? `<span class="status-check">!</span>
                   🚨 தொட்டியை நிரப்பவும்`
                : `<span class="status-check">!</span>
                   🚨 REFILL TANK`;

        reason.textContent =
            tamilMode
                ? "தொட்டியில் நீர்மட்டம் மிகவும் குறைவாக உள்ளது. பம்ப் பாதுகாப்பிற்காக நிறுத்தப்பட்டுள்ளது."
                : "Tank level is critically low. Pump operation is blocked to prevent dry running.";

        waterAmount.textContent =
            tamilMode
                ? "பரிந்துரைக்கப்படும் நடவடிக்கை: நீர்ப்பாசன தொட்டியை நிரப்பவும்."
                : "Recommended action: Refill the irrigation tank.";

        return;
    }


    /* Soil sufficient */

    if (state === "no-water") {

        recommendation.innerHTML =
            tamilMode
                ? `<span class="status-check">✓</span>
                   ✅ தண்ணீர் தேவையில்லை`
                : `<span class="status-check">✓</span>
                   ✅ NO WATER REQUIRED`;

        reason.textContent =
            tamilMode
                ? `${crop} பயிரின் மண் ஈரப்பதம் ${soil}%. தேவையான அளவு ${threshold}%.`
                : `${crop} soil moisture is ${soil}%. Target threshold is ${threshold}%.`;

        waterAmount.textContent =
            tamilMode
                ? "பரிந்துரைக்கப்படும் நீர்ப்பாசன நேரம்: 0 நிமிடங்கள்."
                : "Recommended irrigation duration: 0 minutes.";

        return;
    }


    /* Rain expected */

    if (state === "rain") {

        recommendation.innerHTML =
            tamilMode
                ? `<span class="status-check">☔</span>
                   🌧️ காத்திருக்கவும் — மழை எதிர்பார்க்கப்படுகிறது`
                : `<span class="status-check">☔</span>
                   🌧️ WAIT — RAIN EXPECTED`;

        reason.textContent =
            tamilMode
                ? `மண் ஈரப்பதம் ${soil}%, ஆனால் மழை வாய்ப்பு ${rain}%. தேவையற்ற நீர் பயன்பாட்டைத் தவிர்க்க நீர்ப்பாசனத்தை ஒத்திவைக்கலாம்.`
                : `Soil moisture is ${soil}%, but rain probability is ${rain}%. Irrigation can be postponed to avoid unnecessary water usage.`;

        waterAmount.textContent =
            tamilMode
                ? "பரிந்துரைக்கப்படும் நடவடிக்கை: எதிர்பார்க்கப்படும் மழைக்குப் பிறகு மீண்டும் சரிபார்க்கவும்."
                : "Recommended action: Recheck after the expected rainfall.";

        return;
    }


    /* Irrigation recommended */

    if (state === "recommended") {

        const dryness =
            threshold - soil;

        let duration;
        let priority;

        if (dryness >= 20) {

            duration = 6;
            priority = tamilMode
                ? "அதிகம்"
                : "HIGH";

        } else if (dryness >= 10) {

            duration = 4;
            priority = tamilMode
                ? "நடுத்தரம்"
                : "MEDIUM";

        } else {

            duration = 2;
            priority = tamilMode
                ? "குறைவு"
                : "LOW";
        }


        recommendation.innerHTML =
            tamilMode
                ? `<span class="status-check">✓</span>
                   💧 நீர்ப்பாசனம் பரிந்துரைக்கப்படுகிறது`
                : `<span class="status-check">✓</span>
                   💧 IRRIGATION RECOMMENDED`;

        reason.textContent =
            tamilMode
                ? `மண் ஈரப்பதம் ${soil}%. ${crop} பயிருக்கு தேவையான அளவு ${threshold}%. மழை வாய்ப்பு ${rain}%. வெப்பநிலை ${temperature}°C.`
                : `Soil moisture is ${soil}%, which is below the ${crop} threshold of ${threshold}%. Rain probability is ${rain}%. Temperature is ${temperature}°C.`;

        waterAmount.textContent =
            tamilMode
                ? `தண்ணீர் முன்னுரிமை: ${priority} | பரிந்துரைக்கப்படும் பம்ப் நேரம் சுமார் ${duration} நிமிடங்கள்.`
                : `Water priority: ${priority} | Recommended pump duration: approximately ${duration} minutes.`;
    }
}


/* =========================================
   SMARTFLOW IRRIGATION ANALYSIS
========================================= */

function analyzeIrrigation() {

    const crop =
        document.getElementById("crop").value;

    const soil =
        Number(document.getElementById("soil").value);

    const tank =
        Number(document.getElementById("tank").value);

    const temperature =
        Number(
            document.getElementById("temperature").value
        );

    const rain =
        Number(document.getElementById("rain").value);

    const threshold =
        cropProfiles[crop].threshold;


    /* Dashboard values */

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
       TANK LOW
    ========================================= */

    if (tank <= 10) {

        recommendation.dataset.state =
            "tank-low";

        updateDynamicLanguage();

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
       SOIL MOISTURE SUFFICIENT
    ========================================= */

    if (soil >= threshold) {

        recommendation.dataset.state =
            "no-water";

        updateDynamicLanguage();

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
       HIGH RAIN PROBABILITY
    ========================================= */

    if (rain >= 70) {

        recommendation.dataset.state =
            "rain";

        updateDynamicLanguage();

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
       IRRIGATION CALCULATION
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
       IRRIGATION RECOMMENDED
    ========================================= */

    recommendation.dataset.state =
        "recommended";

    updateDynamicLanguage();

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
            tamilMode
                ? "🚨 பம்பை ON செய்ய முடியாது.\n\nதொட்டியில் நீர்மட்டம் மிகவும் குறைவாக உள்ளது."
                : "🚨 Pump cannot be turned ON.\n\nTank water level is too low."
        );

        turnPumpOff();

        return;
    }


    /* Soil safety */

    if (soil >= 80) {

        alert(
            tamilMode
                ? "🌱 பம்ப் இயக்க பரிந்துரைக்கப்படவில்லை.\n\nமண் ஈரப்பதம் ஏற்கனவே அதிகமாக உள்ளது."
                : "🌱 Pump is not recommended.\n\nSoil moisture is already high."
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


    /* History */

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


    const emptyMessage =
        historyList.querySelector(
            ".history-empty"
        );

    if (emptyMessage) {
        emptyMessage.remove();
    }


    const historyItem =
        document.createElement("div");

    historyItem.className =
        "history-item";


    const time =
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });


    let displayStatus =
        status;

    if (tamilMode) {

        displayStatus =
            tamilTranslations[status] ||
            status;
    }


    let displayCrop =
        crop;

    if (tamilMode) {

        displayCrop =
            cropTranslations[crop] ||
            crop;
    }


    historyItem.innerHTML = `
        <div class="history-info">

            <h3>${displayStatus}</h3>

            <p>
                ${displayCrop} • Soil ${soil}% • Tank ${tank}% • Rain ${rain}%
            </p>

            <p>
                ${tamilMode
                    ? "சரிபார்க்கப்பட்ட நேரம்"
                    : "Checked at"} ${time}
            </p>

        </div>

        <div class="history-status">
            ${tamilMode
                ? "பகுப்பாய்வு"
                : "ANALYZED"}
        </div>
    `;


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

        saveOriginalText();

    }
);
/* =========================================
   WATER SAVING ANALYTICS
========================================= */

let waterSaved = 0;

function updateWaterSaving(amount) {

    waterSaved += amount;

    const savingValue =
        document.querySelector(".saving-value");

    if (savingValue) {
        savingValue.textContent =
            waterSaved + " L";
    }
}
