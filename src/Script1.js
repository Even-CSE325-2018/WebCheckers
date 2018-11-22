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
var SelectedPiece = null;

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
                Tiles[i][j].appendChild(SelectedPiece);
            }  
        }

        SelectedTile = null;
        SelectedPiece = null;

    }else if(Tiles[i][j].firstChild !== null){  //First time pressing
        SelectedTile = Tiles[i][j];
        SelectedPiece = SelectedTile.firstChild;
        SelectMe();
    }
    
}
