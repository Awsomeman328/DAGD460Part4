var emptySpace = [[0,0],[0,1],[0,2],[0,3]];

var whiteS0 = [1,0];
var whiteS1 = [1,1];
var whiteS2 = [1,2];
var whiteS3 = [1,3];

var blackS0 = [2,0];
var blackS1 = [2,1];
var blackS2 = [2,2];
var blackS3 = [2,3];

var gameState = {
    isPlayer1Turn: true,
    board: [
        [ emptySpace, emptySpace, emptySpace, emptySpace ],
        [ emptySpace, emptySpace, emptySpace, emptySpace ],
        [ emptySpace, emptySpace, emptySpace, emptySpace ],
        [ emptySpace, emptySpace, emptySpace, emptySpace ]
    ],
    whiteExternal: [
        [ whiteS0, whiteS1, whiteS2, whiteS3 ],
        [ whiteS0, whiteS1, whiteS2, whiteS3 ],
        [ whiteS0, whiteS1, whiteS2, whiteS3 ]
    ],
    blackExternal: [
        [ blackS0, blackS1, blackS2, blackS3 ],
        [ blackS0, blackS1, blackS2, blackS3 ],
        [ blackS0, blackS1, blackS2, blackS3 ]
    ]
};

/*
TODO List:

TODO: Add 'click' Event listeners to pieces. These Listeners:
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
    
    const blackPieces = document.getElementById("blackPieces");
    for(var b = 0; b < 3; b++){
        const bp = document.createElement("div");
        bp.setAttribute("class", "blackPiece size3");
        blackPieces.append(bp);
    }
    
    const spaces = document.getElementById("spaces");  
    for(var y = 0; y < 4; y++){
        const r = document.createElement("div");
        r.setAttribute("class", "row");
        spaces.appendChild(r);
        
        for(var x = 0; x < 4; x++){
            const d = document.createElement("div");
            d.setAttribute("class", "space");
            r.appendChild(d);
        }
    }
    
    const whitePieces = document.getElementById("whitePieces");
    for(var w = 0; w < 3; w++){
        const wp = document.createElement("div");
        wp.setAttribute("class", "whitePiece size3");
        whitePieces.append(wp);
    }
    
    const s = document.createElement("div");
    s.setAttribute("id", "turnCounter");
    s.innerHTML = "(Player (1//2)'s turn. (Please select a (white//black) Piece // Choose a valid space to place that piece.)) // (Game Over! (Player (1//2) wins!) // Tie Game.)";
    spaces.appendChild(s);
    
}

buildGame();