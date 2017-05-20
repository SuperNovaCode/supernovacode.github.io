var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;                                                                 // imports for Matter.js

// objects for 2D engine/rendering
var engine;
var world;
var frameBox = [];
var frameBoxSize;
var ground;

// base variables /actually mostly used as constants/
var baseGravityY = 1;
var baseGravityX = 0;

// variables
var hsb_backgroundHue = 0;
var hsb_H_switch = 0;

function setup() {
    colorMode(HSB, 0xff);                                                                   // set color mode for cycles
    
    initStealthKeys();                                                                      // prepare key counts
    
    createCanvas(window.innerWidth, window.innerHeight);                                    // create a Canvas with the dimensions given by the window size

    engine = Engine.create();                                                               // create a new Matter.js engine with default settings
    world = engine.world;                                                                   // create a new Matter.js world with default settings

    ground = Bodies.rectangle(width/2, height, width*2, height/12, { isStatic: true });     // create a floor/ground, to keep entitys from falling infinitely
    
    World.add(world, [ground]);                                                             // add ^floor/ground to ^^world

    Engine.run(engine);                                                                     // initialize timed engine

    /* for potential debugging: */
    console.log(engine);
    console.log(world);
    console.log(frameBox);
    console.log(ground);
    /* end */
    
    world.gravity.x = baseGravityX;                                                         // set the idle gravity for the x axis
    world.gravity.y = baseGravityY;                                                         // set the idle gravity for the y axis

    frameBoxSize = window.innerWidth/window.innerHeight*12;                                 // set the size for the boxes based on the screen size
    if (frameBoxSize === null || frameBoxSize === 0) frameBoxSize = 20;                     // ^if not working, use the old constant
    
    // set the default colors
    background(hsb_backgroundHue, 0xef, 0xff);                                              // background : hue=dynamic saturation=239 brightness=255 :: dynamic
    stroke(0, 0, 0x00);                                                                     // frame_foreground : hue=0 saturation=0 brightness=0 :: black
    fill(hsb_backgroundHue, 0xef, 0xff);                                                    // frame_background : hue=dynamic saturation=239 brightness=255 :: dynamic
}

function draw() {
    colorTick();
    
    for (var i = 0; i < frameBox.length; ++i) render(frameBox[i]);                          // render loop for every box
    
    interactionCheck();
}

function render(box) {
    push();                                                                                 // prepare translation without moving base coordinate system
    translate(box.position.x, box.position.y);
    rotate(box.angle);
    rect(-frameBoxSize/2, -frameBoxSize/2, frameBoxSize, frameBoxSize);
    pop();                                                                                  // cleanup base coordinate system from translation
}

function interactionCheck() {
    keyCheck();                                                                             // check for interaction with keyTable.js
    stealthKeyCheck();                                                                      // check for interaction with stealthKeyTable.js
    mouseCheck();                                                                           // possible mouse actions
    touchCheck();                                                                           // possible touch actions
}

function createBox() {
    frameBox.push(
        Bodies.rectangle(
            mouseX+random(-2, 2),
            mouseY+random(-2, 2),
            frameBoxSize ,frameBoxSize)
    );                                                                                      // create new box and push it to the storage array
    World.add(world, [frameBox[frameBox.length-1]]);                                        // add ^box to world
}

function colorTick() {
    // background color tick
    background(hsb_backgroundHue, 0xee, 0xff);                                              // setting background to the same color as box fill to create wireframe illusion // reset background every loop for redraw
    fill(hsb_backgroundHue, 0xee, 0xff);                                                    // ^not using noFill() <-- it could create bugs on overlap
    if (hsb_H_switch === 20) {                                                              // if switcher has reached 20 [ticks]
        if (hsb_backgroundHue === 0xff) hsb_backgroundHue = 0x00;                           // if hue is at maximum =0xff reset
        else ++hsb_backgroundHue;                                                           // ^if not move background hue by 0x01
        hsb_H_switch = 0;                                                                   // reset switcher
    } else ++hsb_H_switch;                                                                  // add 1 to switcher
}

// mouse interaction
function mouseCheck() {if (mouseIsPressed) createBox();}                                    // mouse button held >> createBox()

// touch interaction
var touchIsPressed = false;                                                                 // create a variable similar to mouseIsPressed for touch intercaction
function touchStarted() {touchIsPressed = true;}                                            // begin holding touch
function touchEnded() {touchIsPressed = false;}                                             // end holding touch
function touchCheck() {if (touchIsPressed) createBox();}                                    // touch held >> createBox()