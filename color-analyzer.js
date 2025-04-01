const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const captureBtn = document.getElementById("capture");
const skinToneText = document.getElementById("skin-tone");
const undertoneText = document.getElementById("undertone");
const colorSuggestionsDiv = document.getElementById("color-suggestions");

// Start the webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => (video.srcObject = stream))
    .catch(err => console.error("Error accessing webcam:", err));

captureBtn.addEventListener("click", () => {
    // Capture image from video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get dominant color
    const colorThief = new ColorThief();
    const dominantColor = colorThief.getColor(canvas);

    // Process skin tone and undertone
    const skinTone = detectSkinTone(dominantColor);
    const undertone = detectUndertone(dominantColor);
    const fabricSuggestions = suggestFabricColors(skinTone, undertone);

    // Update UI for suggested colors
    skinToneText.textContent = skinTone;
    undertoneText.textContent = undertone;
    
    // Display color suggestions
    colorSuggestionsDiv.innerHTML = "";
    fabricSuggestions.suggested.forEach(color => {
        const colorBox = document.createElement("div");
        colorBox.classList.add("color-box");
        colorBox.style.backgroundColor = color.hex;
        colorBox.innerHTML = `<span>${color.name}</span>`;
        colorSuggestionsDiv.appendChild(colorBox);
    });

    // Display colors to avoid
    const avoidSuggestionsDiv = document.getElementById("avoid-suggestions");
    avoidSuggestionsDiv.innerHTML = "";
    fabricSuggestions.avoid.forEach(color => {
        const colorBox = document.createElement("div");
        colorBox.classList.add("color-box");
        colorBox.style.backgroundColor = color.hex;
        colorBox.innerHTML = `<span>${color.name}</span>`;
        avoidSuggestionsDiv.appendChild(colorBox);
    });
});

// Function to detect skin tone (Fair, Medium, Dusky)
function detectSkinTone([r, g, b]) {
    const brightness = (r + g + b) / 3;

    if (brightness > 200) return "Fair";
    if (brightness > 140) return "Medium";
    return "Dusky";
}

// Function to detect undertone (Cool, Warm, Neutral)
function detectUndertone([r, g, b]) {
    if (r > g && r > b) return "Warm";
    if (b > r && b > g) return "Cool";
    return "Neutral";
}

// Suggest colors with name and hex value (suggested and avoid colors)
function suggestFabricColors(skinTone, undertone) {
    const colorSuggestions = {
        Fair: {
            Warm: {
                suggested: [{ name: "Soft Peach", hex: "#FFDAB9" }, { name: "Light Coral", hex: "#FF6F61" }, { name: "Golden Yellow", hex: "#FFDB58" }],
                avoid: [{ name: "Deep Brown", hex: "#3E2723" }, { name: "Black", hex: "#000000" }, { name: "Bright Red", hex: "#FF0000" }]
            },
            Cool: {
                suggested: [{ name: "Soft Pink", hex: "#FFB6C1" }, { name: "Lavender", hex: "#E6E6FA" }, { name: "Light Blue", hex: "#ADD8E6" }],
                avoid: [{ name: "Bright Yellow", hex: "#FFFF00" }, { name: "Deep Orange", hex: "#FF7F50" }, { name: "Warm Red", hex: "#FF6347" }]
            },
            Neutral: {
                suggested: [{ name: "Soft Grey", hex: "#D3D3D3" }, { name: "Ivory", hex: "#FFFFF0" }, { name: "Blush Pink", hex: "#FFC0CB" }],
                avoid: [{ name: "Dark Colors", hex: "#2F4F4F" }, { name: "Bright Blue", hex: "#0000FF" }, { name: "Neon Green", hex: "#39FF14" }]
            }
        },
        Medium: {
            Warm: {
                suggested: [{ name: "Warm Red", hex: "#E2725B" }, { name: "Golden Yellow", hex: "#FFDF00" }, { name: "Burnt Orange", hex: "#FF5722" }],
                avoid: [{ name: "Pale Pastel", hex: "#F5F5F5" }, { name: "Icy Blue", hex: "#B0E0E6" }, { name: "Deep Purple", hex: "#800080" }]
            },
            Cool: {
                suggested: [{ name: "Teal", hex: "#008080" }, { name: "Aqua Blue", hex: "#00FFFF" }, { name: "Soft Lavender", hex: "#D3B6E6" }],
                avoid: [{ name: "Bright Orange", hex: "#FF7F50" }, { name: "Deep Yellow", hex: "#FFCC00" }, { name: "Saturated Red", hex: "#D32F2F" }]
            },
            Neutral: {
                suggested: [{ name: "Soft Green", hex: "#B0E57C" }, { name: "Beige", hex: "#F5F5DC" }, { name: "Navy Blue", hex: "#000080" }],
                avoid: [{ name: "Extreme Shades", hex: "#FF0000" }, { name: "Overly Saturated Colors", hex: "#FF1493" }]
            }
        },
        Dusky: {
            Warm: {
                suggested: [{ name: "Rich Brown", hex: "#6A4E23" }, { name: "Deep Orange", hex: "#FF5722" }, { name: "Golden Yellow", hex: "#FFB90F" }],
                avoid: [{ name: "Pale Pastels", hex: "#FAD02E" }, { name: "Neon Colors", hex: "#39FF14" }, { name: "Stark White", hex: "#FFFFFF" }]
            },
            Cool: {
                suggested: [{ name: "Emerald Green", hex: "#50C878" }, { name: "Sapphire Blue", hex: "#0F52BA" }, { name: "Amethyst Purple", hex: "#9966CC" }],
                avoid: [{ name: "Muted Brown", hex: "#8B4513" }, { name: "Mustard Yellow", hex: "#FFDB58" }, { name: "Warm Red", hex: "#FF6347" }]
            },
            Neutral: {
                suggested: [{ name: "Olive Green", hex: "#808000" }, { name: "Deep Navy", hex: "#000080" }, { name: "Charcoal Grey", hex: "#36454F" }],
                avoid: [{ name: "Very Bright Colors", hex: "#FF0000" }, { name: "Overly Saturated Colors", hex: "#FFFF00" }]
            }
        }
    };

    return colorSuggestions[skinTone][undertone] || { suggested: [], avoid: [] };
}
