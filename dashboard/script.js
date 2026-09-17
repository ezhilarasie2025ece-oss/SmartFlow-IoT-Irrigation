/* =========================================
   SMARTFLOW TAMIL / ENGLISH LANGUAGE
========================================= */

let tamilMode = false;

const translations = {
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

    "Suggested Water Action": "பரிந்துரைக்கப்பட்ட நீர்ப்பாசன நடவடிக்கை",
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

    "Water priority:": "தண்ணீர் முன்னுரிமை:",
    "Recommended pump duration: approximately":
        "பரிந்துரைக்கப்படும் பம்ப் நேரம் சுமார்",

    "Recommended action: Refill the irrigation tank.":
        "பரிந்துரைக்கப்படும் நடவடிக்கை: நீர்ப்பாசன தொட்டியை நிரப்பவும்.",

    "Recommended irrigation duration: 0 minutes.":
        "பரிந்துரைக்கப்படும் நீர்ப்பாசன நேரம்: 0 நிமிடங்கள்.",

    "Recommended action: Recheck after the expected rainfall.":
        "பரிந்துரைக்கப்படும் நடவடிக்கை: எதிர்பார்க்கப்படும் மழைக்குப் பிறகு மீண்டும் சரிபார்க்கவும்.",

    "ANALYZED": "பகுப்பாய்வு செய்யப்பட்டது",

    "Pump Turned ON": "பம்ப் ON செய்யப்பட்டது",
    "No Water Required": "தண்ணீர் தேவையில்லை",
    "Refill Tank": "தொட்டியை நிரப்பவும்",
    "Rain Expected — Irrigation Postponed":
        "மழை எதிர்பார்ப்பு — நீர்ப்பாசனம் ஒத்திவைக்கப்பட்டது",
    "Irrigation Recommended":
        "நீர்ப்பாசனம் பரிந்துரைக்கப்பட்டது"
};


/* =========================================
   TRANSLATE PAGE TEXT
========================================= */

function translatePage() {

    const elements = document.querySelectorAll(
        "main h1, main h2, main h3, main h4, main p, main label, main button, main span, main div"
    );

    elements.forEach(function(element) {

        if (element.children.length > 0) {
            return;
        }

        const englishText =
            element.dataset.englishText ||
            element.textContent.trim();

        if (!englishText) {
            return;
        }

        element.dataset.englishText = englishText;

        if (tamilMode && translations[englishText]) {
            element.textContent =
                translations[englishText];
        } else if (!tamilMode) {
            element.textContent =
                englishText;
        }
    });


    /* Translate dropdown options */

    const options =
        document.querySelectorAll("#crop option");

    options.forEach(function(option) {

        const englishText =
            option.dataset.englishText ||
            option.textContent.trim();

        option.dataset.englishText = englishText;

        if (tamilMode) {

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

            if (cropTranslations[englishText]) {
                option.textContent =
                    cropTranslations[englishText];
            }

        } else {

            option.textContent =
                englishText;
        }
    });
}


/* =========================================
   LANGUAGE BUTTON
========================================= */

function toggleLanguage() {

    tamilMode = !tamilMode;

    const button =
        document.getElementById("languageToggle");

    if (tamilMode) {

        button.textContent =
            "English";

    } else {

        button.textContent =
            "தமிழ்";
    }

    translatePage();
}
