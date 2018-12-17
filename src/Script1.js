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
        return "#eacead";
    return "#442909";
}

function ClickMe(i,j){
    if (SelectedTile !== null) { // Second time pressing
        SetOriginalColor();

        if (SelectedTile !== Tiles[i][j]){  // Different tile pressed

            if (Tiles[i][j].firstChild === null) { // Tile Empty

                if (SelectedPiece.className == "Red"){    // Red Moving
                    Move(true,i,j);
                }    

                if (SelectedPiece.className == "White"){    // White Moving
                    Move(false,i,j);
                }
            }  
        }

        SelectedTile = null;
        OldI = null;
        OldJ = null;
        SelectedPiece = null;

    }else if(Tiles[i][j].firstChild !== null){  //First time pressing
        SelectedTile = Tiles[i][j];
        OldI = i;
        OldJ = j;
        SelectedPiece = SelectedTile.firstChild;
        SelectMe();
    }
}
function Move(Red, i, j){
    if(Red){

        if (IsDiagonal(Red,i,j)){ //Unpromoted Red Movement
            Tiles[i][j].appendChild(SelectedPiece);

            if (i === 0) {  //Red piece promotion
                SelectedPiece.src = "../Icons/RedK.png";
            }
        }
    }else{
        if (IsDiagonal(Red, i, j)){  //Unpromoted White Movement
            Tiles[i][j].appendChild(SelectedPiece);

            if (i === 7) {  //White piece promotion
                SelectedPiece.src = "../Icons/WhiteK.png";
            }
        }
    }
}

function IsDiagonal(Red, i, j) {
    let Crowned = false;
    if(SelectedPiece.src.substr(-5,1) === 'K'){ //Piece is Crowned
        Crowned = true;
    }
    
    if(Red || Crowned){ //Red Diagonal

        if((i === OldI - 1 && j === OldJ + 1) ||(i === OldI - 1 && j === OldJ - 1)){    //Unpromoted Red Movement
            return true;
        }

        if (i === OldI - 2 && j === OldJ + 2){  //Unpromoted Red Eat

            if(Tiles[OldI - 1][OldJ + 1].firstChild !== null){

                if(SelectedPiece.className !== Tiles[OldI - 1][OldJ + 1].firstChild.className){
                    Tiles[OldI - 1][OldJ + 1].removeChild(Tiles[OldI - 1][OldJ + 1].firstChild);
                    return true;
                }
            }
        }

        if (i === OldI - 2 && j === OldJ - 2){  //Unpromoted Red Eat

            if(Tiles[OldI - 1][OldJ - 1].firstChild !== null){

                if(SelectedPiece.className !== Tiles[OldI - 1][OldJ -1].firstChild.className){
                    Tiles[OldI - 1][OldJ - 1].removeChild(Tiles[OldI - 1][OldJ - 1].firstChild);
                    return true;
                }
            }
        }
    }

    if((!Red) || Crowned){  //White Diagonal
        if((i === OldI + 1 && j === OldJ - 1) ||(i === OldI + 1 && j === OldJ + 1)){    //Unpromoted White Movement
            return true;
        }

        if (i === OldI + 2 && j === OldJ + 2){  //Unpromoted White Eat

            if(Tiles[OldI + 1][OldJ + 1].firstChild !== null){

                if(SelectedPiece.className !== Tiles[OldI + 1][OldJ + 1].firstChild.className){
                    Tiles[OldI + 1][OldJ + 1].removeChild(Tiles[OldI + 1][OldJ + 1].firstChild);
                    return true;
                }
            }
        }

        if (i === OldI + 2 && j === OldJ - 2){  //Unpromoted White Eat

            if(Tiles[OldI + 1][OldJ - 1].firstChild !== null){

                if(SelectedPiece.className !== Tiles[OldI + 1][OldJ - 1].firstChild.className){
                    Tiles[OldI + 1][OldJ - 1].removeChild(Tiles[OldI + 1][OldJ - 1].firstChild);
                    return true;
                }
            }
        }
    }

    return false;
}
