

let block1;
let block2;
let slider1v;
let slider1m;
let slider1x;

let slider2v;
let slider2m;
let slider2x;

let button;
let pauseButton;
let running;
let pause;

function setup() {
  createCanvas(800, 400);
  
  
  rectMode(CENTER);
  
  slider1m = createSlider(0.1, 10.0, 1,0.1);
  slider1m.position(10, 30);
  slider1m.style("width", "120px");
 
 
  slider1v = createSlider(-5.0, 5.0, 2, 0.1);
  slider1v.position(10, 50);
  slider1v.style("width", "120px");
  
  slider1x = createSlider(50, width - 50, 1);
  slider1x.position(10, 70);
  slider1x.style("width", "120px");
  slider1x.value(width / 4);

  slider2m = createSlider(0.1, 10.0, 1, 0.1);
  slider2m.position(width - 140, 30);
  slider2m.style("width", "120px");
  slider2m.style("color", color(100,220,200));

  slider2v = createSlider(-5.0, 5.0, -1,.1);
  slider2v.position(width - 140, 50);
  slider2v.style("width", "120px");

  slider2x = createSlider(50, width - 50, 1);
  slider2x.position(width - 140, 70);
  slider2x.style("width", "120px");
  slider2x.value((3 * width) / 4);

  button = createButton("Run");
  button.position(10, height - 50);
  button.size(100,40);
  button.style("font-size", "20px");
  button.style("background-color", color(100,220,200));
  button.mousePressed(go);
  
  pauseButton = createButton("Pause");
  pauseButton.position(140, height - 50);
  pauseButton.size(100,40);
  pauseButton.style("font-size", "20px");
  pauseButton.style("background-color", color(230,220,100));
  pauseButton.mousePressed(freeze);
  

  block1 = new Block(1, width / 3, 2);
  block2 = new Block(1, (3 * width) / 4, -1);

  running = false;
  pause = false;
}

function draw() {
  background(220);
  textSize(20);
  textAlign(LEFT, CENTER);
  text("Block 1", 40, 15);
  text("Block 2", width-110, 15);
  textSize(16);
  text("Mass", 140, 40);
  text("Initial Velocity", 140, 60);
  text("Initial Position", 140, 80);
  textAlign(RIGHT, CENTER);
  text("Mass", width-150, 40);
  text("Initial Velocity", width-150, 60);
  text("Initial Position", width-150, 80);

  if (running != true) {
    block1.m = slider1m.value();
    block1.vold = slider1v.value();
    block1.v= slider1v.value();
    block1.x = slider1x.value();

    block2.m = slider2m.value();
    block2.vold = slider2v.value();
    block2.v= slider2v.value();
    block2.x = slider2x.value();
  }

  block1.display();
  block2.display();

  if (running == true && pause == false) {
    block1.collisionCheck(block2);
    block2.collisionCheck(block1);
    block1.move();
    block2.move();
  }
}

class Block {
  constructor(m, x, v) {
    this.x = x;
    this.m = m;
    this.v = v;
    this.vold = v;
    this.size = 100;
  }

  move() {
    this.x += this.v;
  }

  display() {
    textAlign(CENTER, CENTER);
    textSize(28);
    rect(this.x, 2*height / 3, this.size, this.size);
    text(this.m+" kg", this.x, 2*height/3);
    textSize(20);
    text(round(this.v,2)+ " m/s", this.x, 2*height/3 -70);
  }

  collisionCheck(other) {
    if (abs(other.x - this.x) / 2 < abs(other.size + this.size) / 4) {
      this.v = (this.m * this.vold + other.m * other.vold) / (this.m + other.m);
    }
  }


}

function go() {
  if (running) {
    button.html("Run");
    slider1x.value(width/4);
    slider2x.value(3*width/4);
    block1.x = slider1x.value();
    block2.x = slider2x.value();
  } else {
    button.html("Reset");
  }
  running = !running;
  pause = false;
}

function freeze() {
  let v1 = block1.v;
  let v2 = block2.v;
  if (running && !pause) {
    pauseButton.html("Unpause");
    
  } else if (running && pause) {
    pauseButton.html("Pause");
  }
  pause = !pause
 
}
