var emptySpace = [0,0,0,0];

/*
var whiteS0 = [1,0];
var whiteS1 = [1,1];
var whiteS2 = [1,2];
var whiteS3 = [1,3];

var blackS0 = [2,0];
var blackS1 = [2,1];
var blackS2 = [2,2];
var blackS3 = [2,3];
*/

var gameState = {
    isPlayer1Turn: true,
    board: [
        [ emptySpace, emptySpace, emptySpace, emptySpace ],
        [ emptySpace, emptySpace, emptySpace, emptySpace ],
        [ emptySpace, emptySpace, emptySpace, emptySpace ],
        [ emptySpace, emptySpace, emptySpace, emptySpace ]
    ],
    whiteExternal: [
        [ 1, 1, 1, 1 ],
        [ 1, 1, 1, 1 ],
        [ 1, 1, 1, 1 ]
    ],
    blackExternal: [
        [ 2, 2, 2, 2 ],
        [ 2, 2, 2, 2 ],
        [ 2, 2, 2, 2 ]
    ]
};

var selectedPiece;

/*
TODO List:

DONE: Add 'click' Event listeners to pieces. These Listeners:
    -Checks whose turn it is. If the current turn matches their player's turn, then that player 'picks up' that piece.
TODO: (Optional) When a piece is 'picked up', have that piece follow the mouse around until it is 'placed down'.
TODO: Add 'click Event Listeners to spaces. These listeners:
    -Checks to see if there is a piece 'picked up'. 
    -If so, it checks to see if the 'picked up' piece is able to be placed in this space. It'll do this by first checking if the space has any pieces on it, and if not it will succeed the check and skip the next step.
    -If there is at least 1 piece on this space, it will compare the size of the 'picked up' piece to all of the pieces currently on that space. If any pieces on the space are the same size or bigger, the check will fail and will return w/o placing the piece.
    -If all checks succeed, it then places that piece on it's space and removes it from being 'picked up'.
TODO: Spaces can remember all pieces ever placed on it, even gobbled up pieces.
TODO: Spaces only display the biggest sized piece on them.
TODO: The external stacks of pieces will display the next smallest piece when a piece if 'picked up'.
TODO: Determine the winner.
TODO: Create Reset Function.
TODO: (Optional) visually display what are valid moves by outlining in green.

*/

function buildGame(){  
    
    const rows = gameState.board;

    const blackPieces = document.getElementById("blackPieces");
    for(var b = 0; b < 3; b++){
        const bp = document.createElement("div");

        bp.addEventListener("click", ()=>{
            //DONE: Check the current turn. If it's black's turn, continue...
            console.log(bp + " the black piece heard a click!");
            if(!gameState.isPlayer1Turn){
                //^black is player 2^
                selectedPiece=bp;
                console.log("selected piece: " + selectedPiece);
            }
        });

        bp.setAttribute("class", "blackPiece size3");
        blackPieces.append(bp);
    }

    const spaces = document.getElementById("spaces");

    for(var y = 0; y < 4; y++){
        // loop through each row...
        const r = document.createElement("div");
        r.setAttribute("class", "row");
        spaces.appendChild(r);

        for(var x = 0; x < 4; x++){
            // loop through each space in this row...

            const d = document.createElement("div");

            let className = "space row:" + y + " col:" + x;

            d.addEventListener("click", ()=>{
                var temp = d.className.split(" ");
                var tempY = temp[1].split(":");
                var tempX = temp[2].split(":");

                var gridPos = {x: parseInt(tempX[1]), y: parseInt(tempY[1])};
                console.log(d + " at position " + gridPos.y + " " + gridPos.x + " heard a click!");

                 //DONE: Check if there is any piece 'picked up'
                if(selectedPiece != null){
                    
                    
                    //console.log(gridPos);

                    var hasAPiece;
                    //DONE: Check if the current space have any pieces.
                    for(var c = 0; c < 4; c++){
                        if(hasAPiece == null || !hasAPiece){
                        if(rows[gridPos.y][gridPos.x][c] == 0) hasAPiece = false;

                        if(rows[gridPos.y][gridPos.x][c] == 1) hasAPiece = true;
                        if(rows[gridPos.y][gridPos.x][c] == 2) hasAPiece = true;
                        }
                    }

                    if(hasAPiece != null && !hasAPiece){ // If hasAPiece is a valid value & that value is false.

                        console.log(d + " has no pieces yet!");
                        var sel = selectedPiece.className.split(" ");
                        console.log(sel);
                        if(sel[0] == "whitePiece") {
                            if(sel[1] == "size3") {
                                console.log("woah, that's a big white boi!");
                                rows[gridPos.y][gridPos.x][3] = 1;
                                var pie = document.createElement("div")
                                pie.className = "whitePiece size3";
                                d.appendChild(pie);
                                selectedPiece.className = "whitePiece size2";
                                selectedPiece = null;
                            }
                            else if(sel[1] == "size2") {
                                rows[gridPos.y][gridPos.x][2] = 1;
                                var pie = document.createElement("div")
                                pie.className = "whitePiece size2";
                                d.appendChild(pie);
                                selectedPiece.className = "whitePiece size1";
                                selectedPiece = null;
                            }
                            else if(sel[1] == "size1") {
                                rows[gridPos.y][gridPos.x][1] = 1;
                                var pie = document.createElement("div")
                                pie.className = "whitePiece size1";
                                d.appendChild(pie);
                                selectedPiece.className = "whitePiece size0";
                                selectedPiece = null;
                            }
                            else if(sel[1] == "size0") {
                                rows[gridPos.y][gridPos.x][0] = 1;
                                var pie = document.createElement("div")
                                pie.className = "whitePiece size0";
                                d.appendChild(pie);
                                selectedPiece.remove();
                                selectedPiece = null;
                            }
                            else console.log("Error, Attempting to place a piece w/ no valid size");
                        }

                        else if(sel[0] == "blackPiece") {
                            if(sel[1] == "size3") {
                                rows[gridPos.y][gridPos.x][3] = 2;
                                var pie = document.createElement("div")
                                pie.className = "blackPiece size3";
                                d.appendChild(pie);
                                selectedPiece.className = "blackPiece size2";
                                selectedPiece = null;
                            }
                            else if(sel[1] == "size2") {
                                rows[gridPos.y][gridPos.x][2] = 2;
                                var pie = document.createElement("div")
                                pie.className = "blackPiece size2";
                                d.appendChild(pie);
                                selectedPiece.className = "blackPiece size1";
                                selectedPiece = null;
                            }
                            else if(sel[1] == "size1") {
                                rows[gridPos.y][gridPos.x][1] = 2;
                                var pie = document.createElement("div")
                                pie.className = "blackPiece size1";
                                d.appendChild(pie);
                                selectedPiece.className = "blackPiece size0";
                                selectedPiece = null;
                            }
                            else if(sel[1] == "size0") {
                                rows[gridPos.y][gridPos.x][0] = 2;
                                var pie = document.createElement("div")
                                pie.className = "blackPiece size0";
                                d.appendChild(pie);
                                selectedPiece.remove();
                                selectedPiece = null;
                            }
                            else console.log("Error, Attempting to place a piece w/ no valid size");
                        }
                        else console.log("Error, Attempting to place a piece w/ no valid player");

                        gameState.isPlayer1Turn = !gameState.isPlayer1Turn;
                    }
                    else if(hasAPiece != null && hasAPiece){ // If hasAPiece is a valid value & that value is true.
                        console.log(d + " has at least 1 piece!");
                        //DONE: Check the size of the biggest piece on this space.
                        var biggest;
                        for(var s = 0; s < 4; s++){
                            if(rows[gridPos.y][gridPos.x][s] == 1 || rows[gridPos.y][gridPos.x][s] == 2){
                                biggest = s;
                            }
                        }
                        console.log(biggest + " is the biggest piece on this space!");
                        //TODO: Compare the sizes of the biggest piece on this space to the selected piece. If they are the same size or the selected piece is smaller, do nothing. Otherwise place the selected piece on this space.
                        var sel = selectedPiece.className.split(" ")
                        if(sel[1] > biggest){
                            console.log(selectedPiece.className);
                            if(sel[0] == "whitePiece") {
                                if(sel[1] == "size3") {
                                    rows[gridPos.y][gridPos.x][3] = 1;
                                    var pie = document.createElement("div")
                                    pie.className = "whitePiece size3";
                                    d.appendChild(pie);
                                    selectedPiece.className = "whitePiece size2";
                                    selectedPiece = null;
                                }
                                else if(sel[1] == "size2") {
                                    rows[gridPos.y][gridPos.x][2] = 1;
                                    var pie = document.createElement("div")
                                    pie.className = "whitePiece size2";
                                    d.appendChild(pie);
                                    selectedPiece.className = "whitePiece size1";
                                    selectedPiece = null;
                                }
                                else if(sel[1] == "size1") {
                                    rows[gridPos.y][gridPos.x][1] = 1;
                                    var pie = document.createElement("div")
                                    pie.className = "whitePiece size1";
                                    d.appendChild(pie);
                                    selectedPiece.className = "whitePiece size0";
                                    selectedPiece = null;
                                }
                                else if(sel[1] == "size0") {
                                    rows[gridPos.y][gridPos.x][0] = 1;
                                    var pie = document.createElement("div")
                                    pie.className = "whitePiece size0";
                                    d.appendChild(pie);
                                    selectedPiece.remove();
                                    selectedPiece = null;
                                }
                                else console.log("Error, Attempting to place a piece w/ no valid size");
                            }

                            else if(sel[0] == "blackPiece") {
                                if(sel[1] == "size3") {
                                    rows[gridPos.y][gridPos.x][3] = 2;
                                    var pie = document.createElement("div")
                                    pie.className = "blackPiece size3";
                                    d.appendChild(pie);
                                    selectedPiece.className = "blackPiece size2";
                                    selectedPiece = null;
                                }
                                else if(sel[1] == "size2") {
                                    rows[gridPos.y][gridPos.x][2] = 2;
                                    var pie = document.createElement("div")
                                    pie.className = "blackPiece size2";
                                    d.appendChild(pie);
                                    selectedPiece.className = "blackPiece size1";
                                    selectedPiece = null;
                                }
                                else if(sel[1] == "size1") {
                                    rows[gridPos.y][gridPos.x][1] = 2;
                                    var pie = document.createElement("div")
                                    pie.className = "blackPiece size1";
                                    d.appendChild(pie);
                                    selectedPiece.className = "blackPiece size0";
                                    selectedPiece = null;
                                }
                                else  if(sel[1] == "size0") {
                                    rows[gridPos.y][gridPos.x][0] = 2;
                                    var pie = document.createElement("div")
                                    pie.className = "blackPiece size0";
                                    d.appendChild(pie);
                                    selectedPiece.remove();
                                    selectedPiece = null;
                                }
                                else console.log("Error, Attempting to place a piece w/ no valid size");
                            }
                            else console.log("Error, Attempting to place a piece w/ no valid player");

                            gameState.isPlayer1Turn = !gameState.isPlayer1Turn;
                        }
                    }
                }
                updateGame();
            });

            d.setAttribute("class", className);
            r.appendChild(d);
        }
    }

    const whitePieces = document.getElementById("whitePieces");
    for(var w = 0; w < 3; w++){
        const wp = document.createElement("div");

        wp.addEventListener("click", ()=>{
            //DONE: Check the current turn. If it's white's turn, continue...
            console.log(wp + " the white piece heard a click!");
            if(gameState.isPlayer1Turn){
                //^white is player 1^
                selectedPiece=wp;
                console.log("selected piece: " + selectedPiece);
            }
        });

        wp.setAttribute("class", "whitePiece size3");
        whitePieces.append(wp);
    }

    const s = document.createElement("div");
    s.setAttribute("id", "turnCounter");
    s.innerHTML = "(Player (1//2)'s turn. (Please select a (white//black) Piece // Choose a valid space to place that piece.)) // (Game Over! (Player (1//2) wins!) // Tie Game.)";
    spaces.appendChild(s);

}

function updateGame(){
    console.log(gameState.board);
}

buildGame();
updateGame();