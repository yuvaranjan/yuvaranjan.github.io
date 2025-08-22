var radius = 40;
var x = 100
var direction = 1 ;




function setup(){
  ellipseMode(RADIUS);
 // var elemWidth = document.getElementById("canvadiv").offsetWidth;
 // var l = elemWidth-50;
  myCanvas = createCanvas(600, 150);
  myCanvas.parent("canvadiv");
  pacManColor = createColorPicker('#f7f700');
  pacManColor.parent("pacmancolor")  
  bgColor = createColorPicker('#1b1b1b');
  bgColor.parent("bgcolor")
  slider = createSlider(1, 15, 4);
  slider.parent("slider")
}

//pacman changer
var p = "0.1";
var q = "6.15";
var r = "3.27";
var s = "9.3";
var changeCounter = function () {
  p = p === 0.1 ? 0.55 : 0.1;
  q = q === 6.15 ? 5.76 : 6.15;
  r = r === 3.27 ? 3.67 : 3.27;
  s = s === 9.3 ? 8.9 : 9.3;
  setTimeout(changeCounter, 130);
}
changeCounter();

// draw function
function draw(){
  let speed = slider.value();
  x += speed * direction;
  fill(pacManColor.color());
  background(bgColor.color());

  if ((x > width-radius) || (x < radius)) {
    direction = -direction; // Flip direction
  }
  if (direction == 1) {
    arc(x, 75, radius, radius, p, q ); // Face right
  } else {
    arc(x, 75, radius, radius, r, s); // Face left
  }
}



