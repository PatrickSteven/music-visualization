var song;
var fft;
var button;
var w;

//var bins = 256;
var binsExponential = 7;
const exponentialMax = 10;
const exponentialMin = 5;
const smoothing = 0.9; 

const canvasX = 1500;
const canvasY = 700;

function setup() {
    var myCanvas = createCanvas(canvasX, canvasY);
    var bins = 2**binsExponential;
    myCanvas.parent("music-visualization-canvas");
    colorMode(RGB);
    angleMode(DEGREES);
    fft = new p5.FFT(smoothing, bins);
    w = canvasX / bins;


    let context = getAudioContext();
    // wire all media elements up to the p5.sound AudioContext
    for (let elem of selectAll('audio').concat(selectAll('video'))) {
        let mediaSource = context.createMediaElementSource(elem.elt);
        mediaSource.connect(p5.soundOut);
    }
}

function draw() {
    background("#fff");
    var spectrum = fft.analyze();
    noStroke();
    for (var i = 0; i < spectrum.length; i++) {
        var amp = spectrum[i];
        colorMode(RGB);
        stroke(52, 58, 64);
        var y = map(amp, 0, 256, height, 0);
        colorMode(HSB);
        fill(i, 255, 255);
        rect(i * w, y, w - 2, height - y);

        //let waveform = fft.waveform();
        //noFill();
        //beginShape();
        //stroke(20);
        //for (let i = 0; i < waveform.length; i++){
            //let x = map(i, 0, waveform.length, 0, width);
            //let y = map( waveform[i], -1, 1, 0, height);
            //vertex(x,y);
        //}
        //endShape();
    }

}


function increaseBins(){
    if(binsExponential < exponentialMax){
        binsExponential++;
        setup()
    }
}

function decreaseBins(){
    if(binsExponential > exponentialMin){
        binsExponential--;
        setup()
    }
}
