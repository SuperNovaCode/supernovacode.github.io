// key type counters
var stKeyCount = [];
var stKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function initStealthKeys() {
    for (var i = 0; i < stKeys.length; ++i) {
        stKeyCount[i] = 0;                                                                  // set every key counter to 0 // just for using ++
    }
}

function keyTyped() {
    for (var i = 0; i < stKeys.length; ++i) {
        if (key === stKeys[i]) ++stKeyCount[i];                                             // if a key is pressed add 1 to its counter
    }
}

function stealthKeyCheck() {
    var correct = 0;                                                                        // create temporary variable to count correct entrys
    
    for (var i = 0; i < stKeys.length; ++i) {
        if (stKeyCount[i] === 1) ++correct;                                                 // if key press count === 1 add to 'n' of correct
    }
    
    if (correct === 26) {
		stKeyCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		window.location.href = "stDl.html";                                                 // if all counts are right redirect to downloads
	}
}