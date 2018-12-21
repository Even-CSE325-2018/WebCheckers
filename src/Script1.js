const MainFrame = document.getElementById("MainFrame");
const WhitePieces = (MainFrame.getElementsByClassName("White"));
const RedPieces = (MainFrame.getElementsByClassName("Red"));
const Tiles = [
MainFrame.getElementsByClassName("Ones"),MainFrame.getElementsByClassName("Twos"),
MainFrame.getElementsByClassName("Threes"),MainFrame.getElementsByClassName("Fours"),
MainFrame.getElementsByClassName("Fives"),MainFrame.getElementsByClassName("Sixes"),
MainFrame.getElementsByClassName("Sevens"),MainFrame.getElementsByClassName("Eights")
];

var SelectedTile = null;
var OldI, OldJ = null;
var SelectedPiece = null;
var Player = 1; //Change later


for (let index = 0, len = RedPieces.length; index < len; index++) {     //Cursor over a piece
    WhitePieces[index].style.cursor = "pointer";
    RedPieces[index].style.cursor = "pointer";
    
}

function SetOriginalColor(){
    SelectedTile.style.backgroundColor = OriginalColor(SelectedTile.className.substr(0,5));
    SelectedTile.style.borderColor = "Black";
}

function SelectMe(){    //Highlight selected tile
    SelectedTile.style.backgroundColor = "#c9d677";
    SelectedTile.style.borderColor = "Green";
}

function OriginalColor(ss){ //Tile Colors
    if (ss === "White") 
        return "whitesmoke";
    return "rgb(41, 39, 39)";
}

function ClickMe(i,j){
    if (SelectedTile !== null) { // Second time pressing
        SetOriginalColor();

        if (SelectedTile !== Tiles[i][j]){  // Different tile pressed

            if (Tiles[i][j].firstChild === null) { // Tile Empty

                if (SelectedPiece.className == "Red"){    // Red Moving
                    Move(true, OldI, OldJ, i, j);
                }    

                if (SelectedPiece.className == "White"){    // White Moving
                    Move(false, OldI, OldJ, i, j);
                }
            }
        }

        SelectedTile = null;
        OldI = null;
        OldJ = null;
        SelectedPiece = null;

    }else if(Tiles[i][j].firstChild !== null){  //First time pressing

        let PieceColor = Tiles[i][j].firstChild.className;
        if ((PieceColor == "Red" && Player == 1) || (PieceColor == "White" && Player == 2)) {

        SelectedTile = Tiles[i][j];
        OldI = i;
        OldJ = j;
        SelectedPiece = SelectedTile.firstChild;
        SelectMe();
        }
    }
}

function Move(Red, OldI, OldJ, i, j){

    if(CanEat(Red, OldI, OldJ)){
        if(EatThis(Red, i, j, OldI, OldJ)){
            Tiles[i][j].appendChild(SelectedPiece);
            if(Red && i == 7){    //Crown Red Piece
                SelectedPiece.src = "../Icons/RedK.png";
                SelectedPiece.Crowned = true;
                
            }
            else if(!Red && i == 0) {      //Crown White Piece
                SelectedPiece.src = "../Icons/WhiteK.png";
                SelectedPiece.Crowned = true;
            }
            if(!CanEat(Red, i, j)){
                SwapPlayers();
            }
        }
    }
    if (IsDiagonal(Red, OldI, OldJ, i, j)){ //Check  Movement
        Tiles[i][j].appendChild(SelectedPiece);
        if(Red && i == 7){    //Crown Red Piece
            SelectedPiece.src = "../Icons/RedK.png";
            SelectedPiece.Crowned = true;
            
        }
        else if(!Red && i == 0) {      //Crown White Piece
            SelectedPiece.src = "../Icons/WhiteK.png";
            SelectedPiece.Crowned = true;
        }
        SwapPlayers();
    }
}

function IsDiagonal(Red, OldI, OldJ, i, j) {
    if(!Red || SelectedPiece.Crowned){ //White Diagonal

        if((i === OldI - 1 && j === OldJ + 1) ||(i === OldI - 1 && j === OldJ - 1)){    //Unpromoted White Movement
            return true;
        }
    }

    else if(Red || SelectedPiece.Crowned){  //Red Diagonal
        if ((i === OldI + 1 && j === OldJ - 1) ||(i === OldI + 1 && j === OldJ + 1)){    //Unpromoted Red Movement
            return true;
        }
    }

    return false;
}

function CanEat(Red, i, j) {
    if(!Red || Tiles[i][j].firstChild.Crowned){ //White Diagonal
        try {
            if(Tiles[i - 1][j + 1].firstChild !== null){    //Unpromoted White Eat

                if(Tiles[i][j].className !== Tiles[i - 1][j + 1].firstChild.className){

                    if (Tiles[i - 2][j + 2].firstChild === null) {
                        return true;
                    }
                }
            }
        }catch{}
        try {
            if(Tiles[i - 1][j - 1].firstChild !== null){   //Unpromoted White Eat

                if(Tiles[i][j].className !== Tiles[i - 1][j - 1].firstChild.className){

                    if (Tiles[i - 2][j - 2].firstChild === null) {
                        return true;
                    }
                }
            }
        }catch{}
    }
    
    if(Red || Tiles[i][j].firstChild.Crowned){ //Red Diagonal
        try {
            if(Tiles[i + 1][j + 1].firstChild !== null){    //Unpromoted Red Eat

                if(Tiles[i][j].className !== Tiles[i + 1][j + 1].firstChild.className){

                    if (Tiles[i + 2][j + 2].firstChild === null) {
                        return true;
                    }
                }
            }
        }catch{}
        try {
            if(Tiles[i + 1][j - 1].firstChild !== null){   //Unpromoted Red Eat

                if(Tiles[i][j].className !== Tiles[i + 1][j - 1].firstChild.className){
                    
                    if (Tiles[i + 2][j - 2].firstChild === null) {
                        return true;
                    }
                }
            }
        }catch{}
    }
    return false;
}
function EatThis(Red, i, j, OldI, OldJ) {
    if(!Red || SelectedPiece.Crowned){ //White Diagonal
        if (i === OldI - 2 && j === OldJ + 2){  //Unpromoted White Eat

            if(Tiles[OldI - 1][OldJ + 1].firstChild !== null){

                if(SelectedPiece.className !== Tiles[OldI - 1][OldJ + 1].firstChild.className){
                    Tiles[OldI - 1][OldJ + 1].removeChild(Tiles[OldI - 1][OldJ + 1].firstChild);
                    return true;
                }
            }
        }

        else if (i === OldI - 2 && j === OldJ - 2){  //Unpromoted White Eat

            if(Tiles[OldI - 1][OldJ - 1].firstChild !== null){

                if(SelectedPiece.className !== Tiles[OldI - 1][OldJ -1].firstChild.className){
                    Tiles[OldI - 1][OldJ - 1].removeChild(Tiles[OldI - 1][OldJ - 1].firstChild);
                    return true;
                }
            }
        }
    }
    else if(Red || SelectedPiece.Crowned){  //Red Diagonal

        if (i === OldI + 2 && j === OldJ + 2){  //Unpromoted Red Eat

            if(Tiles[OldI + 1][OldJ + 1].firstChild !== null){

                if(SelectedPiece.className !== Tiles[OldI + 1][OldJ + 1].firstChild.className){
                    Tiles[OldI + 1][OldJ + 1].removeChild(Tiles[OldI + 1][OldJ + 1].firstChild);
                    return true;
                }
            }
        }

        else if (i === OldI + 2 && j === OldJ - 2){  //Unpromoted Red Eat

            if(Tiles[OldI + 1][OldJ - 1].firstChild !== null){

                if(SelectedPiece.className !== Tiles[OldI + 1][OldJ - 1].firstChild.className){
                    Tiles[OldI + 1][OldJ - 1].removeChild(Tiles[OldI + 1][OldJ - 1].firstChild);
                    return true;
                }
            }
        }
    }
}

function EndGame(Player) {
    let MyPieces = WhitePieces;
    let Winner = "White";
    if (Player == 1) {
        MyPieces = RedPieces;
        Winner = "Red";
    }
    for (let index = 0; index < MyPieces.length; index++) {
        if (MyPieces[index].parentNode != null) {
            return;
        }
    }
    alert(`${Winner} Wins!!`);
}

function SwapPlayers() {
    if (Player == 1) {
        Player = 2;
    }else{
        Player = 1;
    }
    EndGame(Player);
}
