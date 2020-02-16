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