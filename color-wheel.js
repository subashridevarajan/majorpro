document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('colorWheel');
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2;
    const selectedColorBox = document.getElementById('selectedColorBox');
    const complementaryColorBox = document.getElementById('complementaryColorBox');
    const selectedColorElement = document.getElementById('selectedColor');
    const complementaryColorElement = document.getElementById('complementaryColor');

    drawColorWheel();

    canvas.addEventListener('click', function (event) {
        const { x, y } = getMousePos(canvas, event);
        const angle = (Math.atan2(y - radius, x - radius) * (180 / Math.PI) + 360) % 360;
        
        // 🔹 Correct order of colors: First box = selected, Second box = complementary
        const selectedHue = Math.round(angle);
        const complementaryHue = (selectedHue + 180) % 360;

        const selectedColor = `hsl(${selectedHue}, 100%, 50%)`;
        const complementaryColor = `hsl(${complementaryHue}, 100%, 50%)`;

        // ✅ Correcting the color placement
        selectedColorBox.style.backgroundColor = selectedColor;
        selectedColorElement.textContent = selectedColor;

        complementaryColorBox.style.backgroundColor = complementaryColor;
        complementaryColorElement.textContent = complementaryColor;
    });

    function drawColorWheel() {
        const segmentSize = 6; // 60 colors (360° / 60 = 6° per segment)
        for (let i = 0; i < 360; i += segmentSize) {
            ctx.beginPath();
            ctx.moveTo(radius, radius);
            ctx.arc(radius, radius, radius, (i * Math.PI) / 180, ((i + segmentSize) * Math.PI) / 180);
            ctx.closePath();
            ctx.fillStyle = `hsl(${i}, 100%, 50%)`;
            ctx.fill();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    function getMousePos(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
});
