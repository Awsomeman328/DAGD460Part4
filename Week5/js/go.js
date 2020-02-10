
var gameState = {
    isPlayer1Turn: true,
    scorePlayer1: 0,
    scorePlayer2: 2,
    board: [
        [0,0,2,1,0,0,0,0,0],
        [0,1,0,0,2,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0],
        [0,2,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ]
};
/*
function stone(){
    this.alreadyInGroup = false;
}

var s = new stone();
*/


function buildGrid(){  
    const grid = document.getElementById("grid");  
    for(var y = 0; y < 8; y++){
        for(var x = 0; x < 8; x++){

            const d = document.createElement("div");
            grid.appendChild(d);

        }
    }
}

function updateStones(){
    // DONE: remove all stones

    const rows = gameState.board;
    const stonesDiv = document.getElementById("stones");

    stonesDiv.innerHTML = ""; // Clear all the current stones

    for(var y = 0; y < rows.length; y++){
        // looping through each row...

        for(var x = 0; x < rows[y].length; x++){
            // loop through each cell in this row...

            const val = rows[y][x]; // 0 or 1 or 2

            const d = document.createElement("div");

            let className = "stone";

            if(val == 1) className += " black";
            if(val == 2) className += " white";

            const gridPos = {x: x, y: y};

            if(val == 0) d.addEventListener("click", ()=>{
                /*alert(gridPos.x + " , " + gridPos.y);*/
                rows[gridPos.y][gridPos.x] = (gameState.isPlayer1Turn ? 1 : 2);

                searchBoardForGroups();
                // TODO: 

                gameState.isPlayer1Turn = !gameState.isPlayer1Turn;

                updateStones();
            });

            d.setAttribute("class", className);


            d.style.left = 100*(x/8) + "%";
            d.style.top = 100*(y/8) + "%";


            stonesDiv.appendChild(d);
        }    
    }  
}

function lookupStone(pos){

    if(pos.x < 0) return -1;
    if(pos.y < 0) return -1;
    if(pos.y >= gameState.board.length) return -1;
    if(pos.x >= gameState.board[pos.y].length) return -1;

    return gameState.board[pos.y][pos.x];
}
function searchBoardForGroups(){

    const rows = gameState.board;
    
    const groups = [];

    for(var y = 0; y < rows.length; y++){
        // looping through each row...

        for(var x = 0; x < rows[y].length; x++){
            // loop through each cell in this row...

            // TODO: Check if stone is already in a group...
            var group = getStoneGroup({x:x, y:y}, []);
            if(group.length >= 1) groups.push(group);

        }
    }
}
function isStoneInGroup(pos, arr){
    
    for(var i = 0; i < arr.length; i++){
        if(arr[i].x == pos.x && arr[i].y == pos.y){
            return true;
        }
    }
    return false;
}
function getStoneGroup(pos, arr){

    if(!Array.isArray(arr)) arr = [];

    var currentStone = lookupStone(pos);

    if(currentStone <= 0) return arr; // empty or off the board

    if(isStoneInGroup(pos, arr)) {
        return arr;
    } else {
        arr.push(pos); // this stone isn't empty... let's add it to the collection
    }
    var posLeft = {x:pos.x -1, y: pos.y};
    var posRight = {x:pos.x +1, y: pos.y};
    var posAbove = {x:pos.x, y: pos.y - 1};
    var posBelow = {x:pos.x, y: pos.y + 1};


    if(currentStone == lookupStone(posLeft)){
        arr.concat(getStoneGroup(posLeft, arr));
    }
    if(currentStone == lookupStone(posRight)){
        arr.concat(getStoneGroup(posRight, arr));
    }
    if(currentStone == lookupStone(posAbove)){
        arr.concat(getStoneGroup(posAbove, arr));
    }
    if(currentStone == lookupStone(posBelow)){
        arr.concat(getStoneGroup(posBelow, arr));
    }
    return arr;
}


buildGrid();
updateStones();