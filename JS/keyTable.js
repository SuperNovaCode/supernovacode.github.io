// variables for keyActive storage
var up_arrow = false;
var down_arrow = false;
var left_arrow = false;
var right_arrow = false;

function keyPressed() {
    // value based execution
    if(keyCode == UP_ARROW) {
        up_arrow = true;
    }
    if(keyCode == DOWN_ARROW) {
        down_arrow = true;
    }
    if(keyCode == LEFT_ARROW) {
        left_arrow = true;
    }
    if(keyCode == RIGHT_ARROW) {
        right_arrow = true;
    }
    
    // execute once
    if(key == " ") {
        for(var i = 0; i < frameBox.length; ++i) {
            engine.world.gravity.x = 0;                                                     // set x gravity value to 0
            engine.world.gravity.y = 0;                                                     // set y gravity value to 0
        }
    }
}

function keyReleased() {
    // value based execution
    if(keyCode == UP_ARROW) {
        up_arrow = false;
    }
    if(keyCode == DOWN_ARROW) {
        down_arrow = false;
    }
    if(keyCode == LEFT_ARROW) {
        left_arrow = false;
    }
    if(keyCode == RIGHT_ARROW) {
        right_arrow = false;
    }
    
    // execute on press
    if(key == " ") {
        for(var i = 0; i < frameBox.length; ++i) {
            engine.world.gravity.x = baseGravityX;                                          // reset to idle gravity value for x axis
            engine.world.gravity.y = baseGravityY;                                          // reset to idle gravity value for y axis
        }
    }
}

function keyCheck() {
    if(up_arrow) {
        for(var i = 0; i < frameBox.length; ++i) {
            frameBox[i].force.y -= 0.001;                                                   // add y- force on draw when keyActive
        }
    }
    if(down_arrow) {
        for(var i = 0; i < frameBox.length; ++i) {
            frameBox[i].force.y += 0.001;                                                   // add y+ force on draw when keyActive
        }
    }
    if(left_arrow) {
        for(var i = 0; i < frameBox.length; ++i) {
            frameBox[i].force.x -= 0.001;                                                   // add x- force on draw when keyActive
        }
    }
    if(right_arrow) {
        for(var i = 0; i < frameBox.length; ++i) {
            frameBox[i].force.x += 0.001;                                                   // add x+ force on draw when keyActive
        }
    }
    
}