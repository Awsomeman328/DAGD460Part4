// MVC: model (data)
var spaces = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]];
// MVC: views (gui)
var bttns = [];
//var bttns = document.querySelectorAll("#main button");
var main = document.getElementById("main");
var turn = document.getElementById("turn");

var playerTurn = 1;

function buildBoard() {
    "use strict";
    var x = 0;
    var y = 0;
    
    spaces.forEach(s => {
        // create a row of buttons
        
        const div = document.createElement("div");
        const row = [];
        
        s.forEach( i => {
           // create button.. 
            var bttn = document.createElement("button");
            div.append(bttn);
            
            bttn.setAttribute("data-x", x);
            bttn.setAttribute("data-y", y);
            
            //bttns[x][y] = bttn;
            row.push(bttn);
            
            
            bttn.addEventListener("click", ()=>{
                /*if(bttn.innerHTML == ""){
                    bttn.innerHTML = playerTurn;
                    playerTurn = (playerTurn == 1) ? 2 : 1;
                }*/
                
                // lookup data in array
                var tx = bttn.getAttribute("data-x");
                var ty = bttn.getAttribute("data-y");
                var value = spaces[ty][tx];
                // if data is 0:
                if(value == 0){
                    //      set data to PlayerTurn
                    //      Change turn
                    spaces[ty][tx] = playerTurn;
                    playerTurn = (playerTurn == 1) ? 2 : 1;
                }
                updateBoard();  // updateBoard()
            }); 
            
            x++;
        });
        
        main.append(div);
        bttns.push(row)
        y++;
        x=0;
    });
}

// update the VIEWS with the data from the MODEL
// redner the board:
function updateBoard(){
    
    var winner = checkForWin();
    
    if(winner == 3) turn.innerHTML = "Cat's Game (No Winners)";
    else turn.innerHTML = "Player "+winner+""
    
    
    turn.innerHTML = "It is player " + playerTurn + "'s turn.";
    
    // loop through rows:
    for(var y = 0; y < bttns.length; y++){
        for (var x = 0; x < bttns[y].length; x++){
            
            let value = spaces[y][x];
            
            if(value == 0) value="";
            if(value == 1) value="X";
            if(value == 2) value="O";
            
            bttns[y][x].innterHHTML = value;
        }
    }
}
function checkForWin(){
    
    const s = spaces;
    
    if(spaces[0][0] != 0 && spaces[0][0] == spaces[0][1] && spaces[0][0] == spaces[0][2]) return spaces[0][0];
    if(spaces[1][0] != 0 && spaces[1][0] == spaces[1][1] && spaces[1][0] == spaces[1][2]) return spaces[1][0];
    if(spaces[2][0] != 0 && spaces[2][0] == spaces[2][1] && spaces[2][0] == spaces[2][2]) return spaces[2][0];
    
    if(spaces[0][0] != 0 && spaces[0][0] == spaces[1][0] && spaces[0][0] == spaces[2][0]) return spaces[0][0];
    if(spaces[0][1] != 0 && spaces[0][1] == spaces[1][1] && spaces[0][1] == spaces[2][1]) return spaces[0][1];
    if(spaces[0][2] != 0 && spaces[0][2] == spaces[1][1] && spaces[0][2] == spaces[2][0]) return spaces[0][2];
    
    if(spaces[0][0] != 0 && spaces[0][0] == spaces[1][1] && spaces[0][0] == spaces[2][2]) return spaces[0][0];
    if(spaces[0][2] != 0 && spaces[0][2] == spaces[1][1] && spaces[0][2] == spaces[0][2]) return spaces[0][2];
    
    if(spaces[0][0] != 0 && 
        spaces[0][1] != 0 &&
       spaces[0][2] != 0 &&
       spaces[1][0] != 0 &&
       spaces[1][0] != 0 &&
       spaces[1][0] != 0 &&
       spaces[2][0] != 0 &&
       spaces[2][1] != 0 &&
       spaces[2][2] != 0){ return 3}
    
       return 0;
}

buildBoard();