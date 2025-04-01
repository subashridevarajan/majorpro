// Function to update the SVG text element
function updateSVGText(elementId, newText) {
    // Get the SVG text element by its ID
    const svgTextElement = document.getElementById(elementId);
    // Update the text content
    svgTextElement.textContent = newText + " inch";
}
function updateSVGText1(elementId, newText) {
    // Get the SVG text element by its ID
    const svgTextElement = document.getElementById(elementId);
    // Update the text content
    svgTextElement.textContent = newText + "\"";
}

// Event listener for the form submission
document.getElementById('textForm1').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    
    // Get the value from the input field
    const temp1 =parseFloat(document.getElementById('fl').value);
    var flength = temp1+1+0.5;
    const temp2  = document.getElementById('shold').value;
    const bneck  = document.getElementById('bn').value;
    var temp3=(((temp2-(bneck/2))/2)+0.5);
    var neckw=temp3-2.75;
    var shoulder=3;
    var temp4 = document.getElementById('armr').value;
    var armhole=(temp4-2.5)/2;
    var temp5 = document.getElementById('cr').value;
    var cw=temp5/4;
    var temp6 = document.getElementById('wr').value;
    var ww=temp6/4;
    var temp7 = document.getElementById('hr').value;
    var hw=temp7/4;
    const temp8 = document.getElementById('sr').value;
    const temp9 = parseFloat(document.getElementById('sl').value);
    if(slen<=6)
    {
        var capheight=slen/2;
    }
    else
    {
        var capheight=3.5;
    }
    var armline=temp4/2;
    var sround=temp8/2;
    var slen=(temp9 + 1.5);
    // Update the SVG text with the input value
    updateSVGText('k8',flength);
    updateSVGText('k1',neckw);
    updateSVGText('k2',shoulder);
    updateSVGText('k3',armhole);
    updateSVGText('k4',cw);
    updateSVGText('k5',ww);
    updateSVGText('k6',hw);
    updateSVGText('k7',hw);
    updateSVGText('s1',slen);
    updateSVGText('s2',capheight);
    updateSVGText('s3',armline);
    updateSVGText('s4',sround);
    
});