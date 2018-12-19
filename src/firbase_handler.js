var config = {
    apiKey: "AIzaSyD56MPAP0299oYi2_MBhi0eKLFU8yGm_8s",
    authDomain: "checkers-9ebb8.firebaseapp.com",
    databaseURL: "https://checkers-9ebb8.firebaseio.com",
    projectId: "checkers-9ebb8",
    storageBucket: "checkers-9ebb8.appspot.com",
    messagingSenderId: "63926951876"
};
firebase.initializeApp(config);

let game = firebase.database().ref("Game/");


function opponent_moves_handler(data) {
    console.log(data.ref_.key);
    console.log(data.val());

    if(data.val().x < 0 || data.val().y < 0){
        return;
    }

    // write code for updating the pieces on the board
    // data.ref_.key is a string of 2 integers x , y of prev pos
    // todo yala ya Ali
    
}

function my_moves_handler(data) {
    console.log(data.ref_.key);
    console.log(data.val());

    if(data.val().x < 0 || data.val().y < 0){
        //my piece has been captured
        // remove it from the board
	// data.ref_.key is a string of 2 integers x , y of prev pos
        // todo yala ya ali
    }
}

// white always starts the game
function startNewGame(opponent_moves_handler, my_moves_handler) {
    let gameKey = game.push().key;
    let gameRef = game.child(gameKey);
    gameRef.child("red").on("child_added", function(data) {
        opponent_moves_handler(data);
    });
    gameRef.child("white").on("child_added", function(data) {
        my_moves_handler(data);
    });
    return gameKey;
}


function joinGame(gameKey, opponent_moves_handler, my_moves_handler) {
    let gameRef = game.child(gameKey);
    gameRef.child("red").on("child_added", function(data) {
        my_moves_handler(data);
    });
    gameRef.child("white").on("child_added", function(data) {
        opponent_moves_handler(data);
    });
}
//white is boolean of whether i was white in the game
function joinOldGame(gameKey, opponent_moves_handler, my_moves_handler, white) {
    let gameRef = game.child(gameKey);
if(white ){
    gameRef.child("red").on("child_added", function(data) {
        opponent_moves_handler(data);
    });
    gameRef.child("white").on("child_added", function(data) {
        my_moves_handler(data);
    });

}
else{
	gameRef.child("red").on("child_added", function(data) {
        my_moves_handler(data);
    });
    gameRef.child("white").on("child_added", function(data) {
        opponent_moves_handler(data);
    });

}
}

let newGameKey = startNewGame(opponent_moves_handler, my_moves_handler);

console.log(newGameKey);


//color is a small letter string
function movePiece(oldX, oldY, newX, newY, gameKey, color){
    let gameRef = game.child(gameKey);
    oldPosStr = oldX.toString() + oldY.toString();
    data = {};
    data[oldPosStr] = {
        "x": newX,
        "y": newY,
    };
    gameRef.child(color).set(data);
}

function capturedPiece(oldX, oldY, gameKey, color){
    let gameRef = game.child(gameKey);
    oldPosStr = oldX.toString() + oldY.toString();
    data = {};
    data[oldPosStr] = {
        "x": -1,
        "y": -1,
    };
    gameRef.child(color).set(data);
}
movePiece(5, 6, 8, 9, newGameKey,"red");

