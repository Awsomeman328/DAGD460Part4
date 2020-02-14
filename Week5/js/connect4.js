const spaces = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 2, 2],
    [0, 0, 0, 0, 1, 2],
    [0, 0, 0, 0, 0, 1]];

var bttns = [];

var main = document.getElementById("main");
var turn = document.getElementById("turn");
var dropperRow = document.getElementById("droppers");
var scoreboard = document.getElementById("scoreboard");

/*
var c1 = document.getElementById("c1");
var c2 = document.getElementById("c2");
var c3 = document.getElementById("c3");
var c4 = document.getElementById("c4");
var c5 = document.getElementById("c5");
var c6 = document.getElementById("c6");
var c7 = document.getElementById("c7");
*/

var board = [];

var playerTurn = 1;

/*
TODO LIST:

DONE: Make a 2-dimentional array for the game grid (7 wide by 6 tall).
DONE: Drop values to the bottom of the columns using the dropper buttons.
DONE: Change the current player's turn after making a move.

TODO: Have the displayed board reflect the digital (data) array.
MOSTLY DONE: Check each column to see if it is full. (If there's a value other than 0 over any 0's, need to slide that value down so that there are no 0's undernieth any pieces (no pieces are floating in the air.))(If there are no 0's in the column (it is full of other values), disable that column's dropper button).
TODO: Check the board for a Connect4 (Win State). (If winner is found, diable all of the dropper buttons, highlight where the Connect4 is, state who the winner is, and update the Score Counter.)
TODO: Check if there are any possible moves left to make. (If not, Display it as a Tie Game).
TODO: Reset button to reset the board. (After clicking it, display a pop-up to ask if the play wants to "Play Again?" just in case they clicked the button by mistake).
TODO: Add option to play either multiplayer or singleplayer with AI.
TODO: Add AI. (Using the function to check for any possible moves, pick a random valid move.)
TODO: Add description of how to play my game (in the HTML (dom) doc).
*/

function buildBoard() {
    console.log("I'm Building the Board!");
    /*
    // First check that the element has child nodes 
    if (dropperRow.hasChildNodes()) {
        console.log("dropperRow has Child Nodes!");
        let droppers = dropperRow.childNodes;

        for (let i = 0; i < droppers.length; i++) {
            // do something with each child as children[i]
            // NOTE: List is live! Adding or removing children will change the list's `length`



                bttns.push(droppers[i]);

                bttns[i].addEventListener("click", ()=>{
                    if(checkColumnForSpace(bttns.indexOf(this))) {
                        //Drop piece to the bottom of the column
                        dropIntoColumn();
                    } else {
                        //Disable this button.
                    }
                });

        }
    }*/

    var columnNumber = 0;

    //create a row of buttons
    const div = document.createElement("div");


    spaces.forEach(s => {
        // create button...
        var bttn = document.createElement("button");
        div.append(bttn);

        bttn.setAttribute("columnNumber", columnNumber);

        bttn.addEventListener("click", ()=>{
            
            var temp = bttn.getAttribute("columnNumber");
            
            if(checkColumnForSpace(temp)) {
                //Drop piece to the bottom of the column
                dropIntoColumn(temp);
            } 
            else {
                //Disable this button.
            }
            updateBoard();
        });
        bttn.innerHTML = "&#9660";
        bttns.push(bttn);
        columnNumber++;
    });

    droppers.append(div);
    
    var x = 0;
    var y = 0;
    
    spaces.forEach(i => {
        var div2 = document.createElement("div");
        const column = [];
        
        i.forEach(j => {
        
            var space = document.createElement("div");
            div2.append(space);
            
            space.setAttribute("data-x", x);
            space.setAttribute("data-y", y);
            
            column.push(space);
            
            updateBoard();
            space.innerHTML = "O";
        });
        div2.setAttribute("class", "column");
        main.append(div2);
        board.push(column);
        columnNumber++;
    });

}

function updateBoard() {
    
    var winner = checkForWin();
    
    if(winner == 3) turn.innerHTML = "Cat's Game // Tie Game // No Winners";
    
    
    
    //for(var y = 0; y < 
    
    changeTurn();
}

function checkForWin() {
    
    checkForAnyMoves();
    
    return 0;
}

function checkColumnForSpace(columnIndex) {
    console.log("Checking Column " + columnIndex + " for space");
    //CURRENTLY ONLY CHECKS THE TOP ROW. SHOULD HAVE A FUNCTION THAT CHECKS FOR INCORRECT EMPTY SPACES (0's are not allowed to be under any other piece.)
    if(spaces[columnIndex][0] == 0) {
        console.log("Column " + columnIndex + " has space!");
        return true;
    } else {
        console.log("Column " + columnIndex + " has no space!");
        return false;
    }
}

function dropIntoColumn(columnIndex) {
    console.log("Dropping player " + playerTurn + " piece into column " + columnIndex);
    
    var done = false;
    
    for (let i = spaces[columnIndex].length; i > -1; i--) {
        if (done) return; // Return will exit out of this function entirely, not just the for loop.
        if(spaces[columnIndex][i] == 0){
            spaces[columnIndex][i] = playerTurn;
            done = true;
        }
        else {
            
        }
    }
}

function changeTurn() {
    console.log("CHANgING TURNS!");
    playerTurn = (playerTurn == 1) ? 2 : 1;
}

function checkForAnyMoves() {

}

function reset() {

}

function changeScore() {

}

buildBoard();