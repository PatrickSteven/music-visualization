var song;
var fft;
var button;
var w;

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  //song = loadSound('rainbow.mp3');
}
function setup() {
  var myCanvas = createCanvas(1024, 1024);
    myCanvas.parent("music-visualization-canvas");
  colorMode(HSB);
  angleMode(DEGREES);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  //song.play();
  fft = new p5.FFT(0.9, 128);
  w = width / 128;


    let context = getAudioContext();
  // wire all media elements up to the p5.sound AudioContext
  for (let elem of selectAll('audio').concat(selectAll('video'))) {
    let mediaSource = context.createMediaElementSource(elem.elt);
    mediaSource.connect(p5.soundOut);
  }
}

function draw() {
  background(0);
  var spectrum = fft.analyze();
  noStroke();
  //translate(width / 2, height / 2);
  //beginShape();
  for (var i = 0; i < spectrum.length; i++) {
    //var angle = map(i, 0, spectrum.length, 0, 360);
    var amp = spectrum[i];
    //var r = map(amp, 0, 1024, 100, 500);
    //var x = r * cos(angle);
    //var y = r * sin(angle);
    stroke(i, 255, 255);
    //line(0, 0, x, y);
    //vertex(x, y);
    var y = map(amp, 0, 256, height, 0);
    fill(i, 255, 255);
    rect(i * w, y, w - 2, height - y);

    let waveform = fft.waveform();
    noFill();
    beginShape();
    stroke(20);
    for (let i = 0; i < waveform.length; i++){
        let x = map(i, 0, waveform.length, 0, width);
        let y = map( waveform[i], -1, 1, 0, height);
        vertex(x,y);
    }
    endShape();
  }
}
