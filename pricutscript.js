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
document.getElementById('textForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    
    // Get the value from the input field
    const blength = document.getElementById('bl').value;
    const tempw  = document.getElementById('wr').value;
    const bneck  = document.getElementById('bn').value;
    const temp1  = document.getElementById('shold').value;
    var shoulder=(((temp1-(bneck/2))/2)+0.5);
    var waistr = tempw/4;
    const temp2 = document.getElementById('cr').value;
    if (temp2 >= 44) {
        var a = 2;
    } 
    else if (temp2 >= 40 && temp2 <= 42) {
        var a = 1.75;
    } 
    else if (temp2 >= 36 && temp2 <= 38) {
        var a = 1.5;
    } 
    else if (temp2 >= 30 && temp2 <= 34) {
        var a = 1.25;
    }      
    var chest = temp2/4;
    var fchest=chest+0.5;
    const temp3  = document.getElementById('armr').value;
    var armhole=(temp3-2.5)/2;
    var neckw=shoulder-2.75;
    const bustlen = document.getElementById('s2a').value;
    const fneck = document.getElementById('fn').value;
    const temp5 = document.getElementById('a2a').value;
    var fl = 0;
    if (temp2 >= 29 && temp2 <= 30)
        fl = 11.5;
    else if (temp2 >= 31 && temp2 <= 32)
        fl = 12;
    else if (temp2 >= 33 && temp2 <= 34)
        fl = 12.5;
    else if (temp2 >= 35 && temp2 <= 36)
        fl = 13;
    else if (temp2 >= 37 && temp2 <= 38)
        fl = 13.5;
    else if (temp2 >= 39 && temp2 <= 40)
        fl = 14;
    else if (temp2 >= 41 && temp2 <= 42)
        fl = 14.5;
    else if (temp2 >= 43 && temp2 <= 44)
        fl = 15;
    else
        fl = 0;
    var temp6=((temp5/2)-a)+0.5;
    var fwr=waistr+(2*a)+0.50;
    const temp7 = document.getElementById('sr').value;
    const temp8 = parseFloat(document.getElementById('sl').value);
    if(slen<=6)
    {
        var capheight=slen/2;
    }
    else
    {
        var capheight=3.5;
    }
    var armline=temp3/2;
    var sround=temp7/2;
    var slen=(temp8 + 1.5);
    // Update the SVG text with the input value
    updateSVGText('b1',blength);
    updateSVGText('b2',bneck);
    updateSVGText('b3',shoulder);
    updateSVGText('b4',neckw);
    updateSVGText('b5',chest);
    updateSVGText('b6',waistr);
    updateSVGText('b7',armhole);
    updateSVGText('f1',fl);
    updateSVGText('f2',fneck)
    updateSVGText('f3',shoulder)
    updateSVGText('f4',neckw);
    updateSVGText('f5',fchest)
    updateSVGText('f6',bustlen);
    updateSVGText('f7',armhole);
    updateSVGText('f8',fwr)
    updateSVGText('f9',temp6)
    updateSVGText1('f10',a);
    updateSVGText1('f11',a);
    updateSVGText('s1',slen);
    updateSVGText('s2',capheight);
    updateSVGText('s3',armline);
    updateSVGText('s4',sround);
});