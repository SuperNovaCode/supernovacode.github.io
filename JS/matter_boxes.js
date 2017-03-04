var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var canvas;

var engine;
var world;
var rBox = [];
var rBoxSize = 20;
var ground;

var space = false;

function setup() {
  canvas = createCanvas(800, 650);
  canvas.parent('matter-boxes-holder');
  
  engine = Engine.create();
  world = engine.world;
  
  ground = Bodies.rectangle(width/2, height, width*2, height/12, { isStatic: true });
  
  World.add(world, [ground]);
  
  Engine.run(engine);
  
  console.log(engine);
  console.log(world);
  console.log(rBox);
  console.log(ground);
  
  stroke(255);
  fill(33);
}

function draw() {
  background(33);
  rect(0 ,0 , width-1, height-1);
  
  for(i = 0; i < rBox.length; ++i) {
    push();
    translate(rBox[i].position.x, rBox[i].position.y);
    rotate(rBox[i].angle);
    rect(0, 0, rBoxSize, rBoxSize);
    pop();
  }
  
  if(space) {
    for(j = 0; j < rBox.length; ++j) {
      if(rBox[j].force.y > -0.1) {
        rBox[j].force.y -= 0.001;
      }
    }
  }
  
  if(mouseIsPressed) {
    rBox.push(Bodies.rectangle(mouseX, mouseY, rBoxSize ,rBoxSize));
    World.add(world, [rBox[rBox.length-1]]);
  }
}

function keyPressed() {
  if(key == ' ') {
    space = true;
  }
}

function keyReleased() {
  if(key == ' ') {
    space = false;
  }
}