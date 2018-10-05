class AiPlayer {
    constructor() {
        this.aiMove = false; //variable to track if it's the AI's move
        this.combination = ''; //this variable changes according to the situtation on the board
    }
    /* Get and Set methods */
    getMove() {
        return this.aiMove
    }
    setMove(e) {
        this.aiMove = e;
    }
    /* ------- */

    getBoardStateX(board, id) { //checks if the selected Square object in the Board object is an x
        return board.grid[id].state === 'x';
    }
    getBoardStateO(board, id) { //checks if the selected Square object in the Board object is an o
        return board.grid[id].state === 'o';
    }
    bestMove(board, move) { //tries to find the best move if the combination variable is not set
        if (move >= 5) { //the AI can only win if the current move is greater than 5. Checks if winning is possible on this turn
            for (var i = 0; i < 9; i++) { //iterate through 9 Square objects
                if (board.grid[i].state === '') { //find empty Square objects
                    board.grid[i].state = 'o'; //temporarily change the empty Square object's state to o
                    if (board.checkWinner()) { //check if o would win with that move
                        board.grid[i].state = ''; //reset the temporary value
                        return i; //return the best move (win the game)
                    }
                    board.grid[i].state = ''; //reset the temporary value
                }
            }
        }
        for (var i = 0; i < 9; i++) { //checks if losing is possible on this turn
            if (board.grid[i].state === '') { //find empty Square objects
                board.grid[i].state = 'x'; //temporarily change the empty Square object's state to x
                if (board.checkWinner()) { //check if x would win with that move
                    board.grid[i].state = ''; //reset the temporary value
                    return i; //return the best move (block x from winning)
                }
                board.grid[i].state = ''; //reset the temporary value
            }
        }
        /* If there is no combination set, o can't win, x can't win, AI selects a random empty Square */
        let moves = []; //initialize available moves array
        for (var i = 0; i < 9; i++) { //populate moves array with empty Square indexes
            if (board.grid[i].state === '') {
                moves.push(i);
            }
        }
        return moves[Math.floor(Math.random() * moves.length)] //return a random move from the moves array
    }
    think(board, move) { //used to make the AI object select the best move 
        if (move === 1) { //if the first move has been made
            if (this.getBoardStateX(board, 4)) { //if the player starts at the center, select a random corner Square
                let moves = [0, 2, 6, 8];
                return moves[Math.round(Math.random() * 3)];
            }
            if (this.getBoardStateX(board, 1)) { //if the player starts at the top middle Square, set the combination to try and win
                this.combination = 'topattack';
                return 2;
            }
            if (this.getBoardStateX(board, 3)) { //if the player starts at the left middle Square, set the combination to try and win
                this.combination = 'leftattack';
                return 5;
            }
            if (this.getBoardStateX(board, 5)) { //if the player starts at the right middle Square, set the combination to try and win
                this.combination = 'rightattack';
                return 8;
            }
            if (this.getBoardStateX(board, 7)) { //if the player starts at the bottom middle Square, set the combination to try and win
                this.combination = 'bottomattack';
                return 8;
            }
            else { //if the player selects anything else, select the center square 
                return 4;
            }
        }
        if (move === 3) { //if the third move has been made
            if (this.combination) { //if a combination has already been set, continue to try and win according to the user's input
                if (this.combination === 'topattack') { //different outcomes depend on the users input
                    if (this.getBoardStateX(board, 0)) {
                        this.combination = '';
                        return 5;
                    }
                    if (this.getBoardStateX(board, 3)) {
                        return 8;
                    }
                    if (this.getBoardStateX(board, 5)) {
                        this.combination = '';
                        return 4;
                    }
                    if (this.getBoardStateX(board, 6)) {
                        this.combination = 'topattack1';
                        return 7;
                    }
                    if (this.getBoardStateX(board, 8)) {
                        this.combination = 'topattack2';
                        return 7;
                    }
                    this.combination = ''; //reset the combination, there's no longer any need for it, bestMove() method will win or draw automatically
                    return this.bestMove(board, move);
                }
                if (this.combination === 'leftattack') { //different outcomes depend on the users input
                    if (this.getBoardStateX(board, 0)) {
                        return 6;
                    }
                    if (this.getBoardStateX(board, 1)) {
                        this.combination = 'leftattack3';
                        return 6;
                    }
                    if (this.getBoardStateX(board, 2)) {
                        this.combination = 'leftattack1';
                        return 0;
                    }
                    if (this.getBoardStateX(board, 4)) {
                        this.combination = '';
                        return 8;
                    }
                    if (this.getBoardStateX(board, 7)) {
                        this.combination = 'leftattack2';
                        return 0;
                    }
                    if (this.getBoardStateX(board, 8)) {
                        this.combination = 'leftattack4';
                        return 6;
                    }
                    this.combination = '';
                    return this.bestMove(board, move);
                }
                if (this.combination === 'rightattack') { //different outcomes depend on the users input
                    if (this.getBoardStateX(board, 0)) {
                        return 3;
                    }
                    if (this.getBoardStateX(board, 1)) {
                        this.combination = '';
                        return 6;
                    }
                    if (this.getBoardStateX(board, 2)) {
                        this.combination = '';
                        return 7;
                    }
                    if (this.getBoardStateX(board, 4)) {
                        this.combination = 'rightattack2';
                        return 3;
                    }
                    if (this.getBoardStateX(board, 6)) {
                        this.combination = 'rightattack3';
                        return 3;
                    }
                    if (this.getBoardStateX(board, 7)) {
                        this.combination = '';
                        return 4;
                    }
                    this.combination = '';
                    return this.bestMove(board, move);
                }
                if (this.combination === 'bottomattack') { //different outcomes depend on the users input
                    if (this.getBoardStateX(board, 0)) {
                        this.combination = '';
                        return 1;
                    }
                    if (this.getBoardStateX(board, 2)) {
                        return 1;
                    }
                    if (this.getBoardStateX(board, 3)) {
                        this.combination = '';
                        return 2;
                    }
                    if (this.getBoardStateX(board, 5)) {
                        this.combination = '';
                        return 4;
                    }
                    if (this.getBoardStateX(board, 6)) {
                        this.combination = '';
                        return 5;
                    }
                    this.combination = '';
                    return this.bestMove(board, move);
                }
            }
            if (this.getBoardStateX(board, 4)) { //if a combination has not been set and x is in middle Square
                if (this.getBoardStateO(board, 0)) { //checks if the user is attempting the double diagonal combination
                    if (this.getBoardStateX(board, 8)) {
                        this.combination = 'toprow'; //set the combination to defend against the user
                        return 2;
                    } else { //the user is not attempting the double diagonal combination
                        return this.bestMove(board, move);
                    }
                } else if (this.getBoardStateO(board, 2)) {
                    if (this.getBoardStateX(board, 6)) {
                        this.combination = 'rightrow';
                        return 8;
                    } else {
                        return this.bestMove(board, move);
                    }
                } else if (this.getBoardStateO(board, 6)) {
                    if (this.getBoardStateX(board, 2)) {
                        this.combination = 'leftrow';
                        return 0;
                    } else {
                        return this.bestMove(board, move);
                    }
                } else if (this.getBoardStateO(board, 8)) {
                    if (this.getBoardStateX(board, 0)) {
                        this.combination = 'bottomrow';
                        return 6;
                    } else {
                        return this.bestMove(board, move);
                    }
                }
            } else { //handle the single diagonal combination
                if (this.getBoardStateX(board, 0)) {
                    if (this.getBoardStateX(board, 8)) { //the user is attempting the single diagonal combination
                        if (Math.floor(Math.random() * 2) === 1) { //choose 1 of 2 combinations randomly for variation
                            this.combination = 'middefencelow'; //set the combination to defend against the user
                            return 7;
                        } else {
                            this.combination = 'middefencehigh';
                            return 1;
                        }

                    } else {
                        return this.bestMove(board, move);
                    }
                }
                if (this.getBoardStateX(board, 2)) {
                    if (this.getBoardStateX(board, 6)) { //the user is attempting the reverse single diagonal combination
                        if (Math.floor(Math.random() * 2) === 1) {
                            this.combination = 'middefencelowreverse';
                            return 7;
                        } else {
                            this.combination = 'middefencehighreverse';
                            return 1;
                        }

                    } else {
                        return this.bestMove(board, move);
                    }
                } else { //the user is not attempting the single diagonal combination
                    return this.bestMove(board, move);
                }
            }
        }
        if (move === 5) { //if the fifth move has been made
            if (this.combination) {  //if a combination has already been set, continue to try and win according to the user's input
                if (this.combination === 'toprow') {
                    if (this.getBoardStateX(board, 1)) {
                        return 7;
                    } else {
                        return 1;
                    }
                }
                else if (this.combination === 'rightrow') {
                    if (this.getBoardStateX(board, 5)) {
                        return 3;
                    } else {
                        return 5;
                    }
                } else if (this.combination === 'leftrow') {
                    if (this.getBoardStateX(board, 3)) {
                        return 5;
                    } else {
                        return 3;
                    }
                } else if (this.combination === 'bottomrow') {
                    if (this.getBoardStateX(board, 7)) {
                        return 1;
                    } else {
                        return 7;
                    }
                } else if (this.combination === 'middefencelow') {
                    if (this.getBoardStateX(board, 1)) {
                        return 2;
                    } else {
                        return 1;
                    }
                } else if (this.combination === 'middefencehigh') {
                    if (this.getBoardStateX(board, 7)) {
                        return 6;
                    } else {
                        return 7;
                    }
                } else if (this.combination === 'middefencelowreverse') {
                    if (this.getBoardStateX(board, 1)) {
                        return 0;
                    } else {
                        return 1;
                    }
                } else if (this.combination === 'middefencehighreverse') {
                    if (this.getBoardStateX(board, 7)) {
                        return 8;
                    } else {
                        return 7;
                    }
                } else if (this.combination === 'topattack') {
                    if (this.getBoardStateX(board, 5)) {
                        this.combination = ''; //combination is no longer needed, the AI will win or draw automatically
                        return 4;
                    } else {
                        return 5;
                    }
                } else if (this.combination === 'topattack1') {
                    if (this.getBoardStateX(board, 4)) {
                        this.combination = '';
                        return 5;
                    }
                    if (this.getBoardStateX(board, 5)) {
                        this.combination = '';
                        return 4;
                    }
                    if (this.getBoardStateX(board, 8)) {
                        this.combination = '';
                        return 0;
                    } else {
                        this.combination = '';
                        return this.bestMove(board, move);
                    }
                } else if (this.combination === 'topattack2') {
                    if (this.getBoardStateX(board, 3)) {
                        this.combination = '';
                        return 4;
                    }
                    if (this.getBoardStateX(board, 4)) {
                        this.combination = '';
                        return 0;
                    }
                    if (this.getBoardStateX(board, 6)) {
                        this.combination = '';
                        return 0;
                    } else {
                        this.combination = '';
                        return this.bestMove(board, move);
                    }
                } else if (this.combination === 'leftattack') {
                    if (this.getBoardStateX(board, 7)) {
                        this.combination = '';
                        return 4;
                    } else {
                        this.combination = '';
                        return this.bestMove(board, move);
                    }
                } else if (this.combination === 'leftattack1') {
                    if (this.getBoardStateX(board, 1) || this.getBoardStateX(board, 7)) {
                        this.combination = '';
                        return 6;
                    }
                    if (this.getBoardStateX(board, 8)) {
                        this.combination = '';
                        return 7;
                    } else {
                        this.combination = '';
                        return this.bestMove(board, move);
                    }
                } else if (this.combination === 'leftattack2') {
                    if (this.getBoardStateX(board, 2)) {
                        this.combination = '';
                        return 6;
                    }
                    else {
                        this.combination = '';
                        return this.bestMove(board, move);
                    }
                } else if (this.combination === 'leftattack3') {
                    if (this.getBoardStateX(board, 8)) {
                        this.combination = '';
                        return 0;
                    }
                    else {
                        this.combination = '';
                        return this.bestMove(board, move);
                    }
                } else if (this.combination === 'leftattack4') {
                    if (this.getBoardStateX(board, 1) || this.getBoardStateX(board, 7)) {
                        this.combination = '';
                        return 0;
                    }
                    if (this.getBoardStateX(board, 2)) {
                        this.combination = '';
                        return 1;
                    }
                    else {
                        this.combination = '';
                        return this.bestMove(board, move);
                    }
                } else if (this.combination === 'rightattack') {
                    if (this.getBoardStateX(board, 4)) {
                        this.combination = '';
                        return 7;
                    }
                    if (this.getBoardStateX(board, 6)) {
                        this.combination = '';
                        return 2;
                    }
                    if (this.getBoardStateX(board, 7)) {
                        this.combination = '';
                        return 4;
                    }
                    else {
                        this.combination = '';
                        return this.bestMove(board, move);
                    }
                } else if (this.combination === 'rightattack2') {
                    if (this.getBoardStateX(board, 0)) {
                        this.combination = '';
                        return 7;
                    }
                    else {
                        this.combination = '';
                        return this.bestMove(board, move);
                    }
                } else if (this.combination === 'rightattack3') {
                    if (this.getBoardStateX(board, 0)) {
                        this.combination = '';
                        return 2;
                    }
                    if (this.getBoardStateX(board, 1) || this.getBoardStateX(board, 7)) {
                        this.combination = '';
                        return 4;
                    }
                    else {
                        this.combination = '';
                        return this.bestMove(board, move);
                    }
                } else if (this.combination === 'bottomattack') {
                    if (this.getBoardStateX(board, 2)) {
                        this.combination = '';
                        return 6;
                    }
                    if (this.getBoardStateX(board, 4)) {
                        this.combination = '';
                        return 5;
                    }
                    if (this.getBoardStateX(board, 5)) {
                        this.combination = '';
                        return 4;
                    }
                    else {
                        this.combination = '';
                        return this.bestMove(board, move);
                    }
                }
            } else { //if no combination is set on the 5th move, the AI will win or draw automatically
                return this.bestMove(board, move)
            }
        }
        if (move === 7) { //if the last move has been made
            if (this.combination) { //if a combination has already been set, continue to try and win according to the user's input
                if (this.combination === 'toprow') {
                    if (this.getBoardStateX(board, 3)) {
                        return 5;
                    } else if (this.getBoardStateX(board, 5)) {
                        return 3;
                    } else {
                        let moves = [3, 5];
                        return moves[Math.floor(Math.random() * 2)];
                    }
                }
                if (this.combination === 'rightrow') {
                    if (this.getBoardStateX(board, 1)) {
                        return 7;
                    } else if (this.getBoardStateX(board, 7)) {
                        return 1;
                    } else {
                        let moves = [1, 7];
                        return moves[Math.floor(Math.random() * 2)];
                    }
                }
                if (this.combination === 'leftrow') {
                    if (this.getBoardStateX(board, 1)) {
                        return 7;
                    } else if (this.getBoardStateX(board, 7)) {
                        return 1;
                    } else {
                        let moves = [1, 7];
                        return moves[Math.floor(Math.random() * 2)];
                    }
                }
                if (this.combination === 'bottomrow') {
                    if (this.getBoardStateX(board, 3)) {
                        return 5;
                    } else if (this.getBoardStateX(board, 5)) {
                        return 3;
                    } else {
                        let moves = [3, 5];
                        return moves[Math.floor(Math.random() * 2)];
                    }
                }
                if (this.combination === 'middefencelow') {
                    if (this.getBoardStateX(board, 6)) {
                        return 3;
                    } else {
                        return 6;
                    }
                }
                if (this.combination === 'middefencehigh') {
                    if (this.getBoardStateX(board, 2)) {
                        return 5;
                    } else {
                        return 2;
                    }
                }
                if (this.combination === 'middefencelowreverse') {
                    if (this.getBoardStateX(board, 8)) {
                        return 5;
                    } else {
                        return 8;
                    }
                }
                if (this.combination === 'middefencehighreverse') {
                    if (this.getBoardStateX(board, 0)) {
                        return 3;
                    } else {
                        return 0;
                    }
                }
            } else { //if no combination is set on the 7th move, the AI will win or draw automatically
                return this.bestMove(board, move);
            }
        }
    }
}