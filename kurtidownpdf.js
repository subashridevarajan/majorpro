document.getElementById('downloadBtn').addEventListener('click', function() {
    const zip = new JSZip();
    const svgElements = [
        document.getElementById('svg1'),
        document.getElementById('svg2')
    ];

    const promises = svgElements.map((svg, index) => {
        return new Promise((resolve) => {
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const scale = 2; // Scale for higher quality
            canvas.width = svg.width.baseVal.value * scale;
            canvas.height = svg.height.baseVal.value * scale;
            ctx.scale(scale, scale); // Scale context for better resolution
            
            const img = new Image();
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    zip.file(`image${index + 1}.png`, blob); // Add PNG to ZIP
                    resolve();
                }, 'image/png');
            };

            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);
            img.src = url;
        });
    });

    Promise.all(promises).then(() => {
        zip.generateAsync({ type: 'blob' }).then((content) => {
            // Force download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'Kurti.zip';
            link.click();
        });
    });
});
