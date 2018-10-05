class Game {
    constructor(mode) {
        if (mode) {
            this.mode = mode;
            this.timeout = '';
            this.canClick = true; //variable to check if player can select a move
            this.board = new Board();
            this.waitTime = 2000; //variable to set wait time between moves
            this.moves = 0; //moves made this Game session
            this.x = true; //this variable tracks whose turn it is
            if (this.mode === 'singleplayer') { //if the user selects the singleplayer mode, create new AI object to act as an opponent
                this.ai = new AiPlayer();
            }
            this.board.hideControls(); //purely UI functionality
        }
    }
    quit() { //UI functionality to hide the board and reset the Game object mode
        this.mode = '';
        this.board.showControls();
    }
    stop() { //UI functionality to show retry button and reset the Game object mode
        this.mode = '';
        this.board.hideQuit();
        this.board.showRetry();
    }
    restart() { //UI functionality to reload the UI and reset the Game object mode
        this.mode = '';
        this.board.showControls();
    }
    declareDraw() { //stop the game and declare a draw
        this.board.changeHeader("It's a draw!");
        this.stop();
    }
    declareWin(player) { //stop the game and declare a winner ('x' || 'o')
        if (player === 'x') {
            this.board.changeHeader("X's win!");
        } else if (player === 'o') {
            this.board.changeHeader("O's win!");
        }
        this.stop();
    }
    squareClick(id) { //this method tries to change the state of the specified Square object to either 'o' or 'x', depending on the turn
        if (this.board.grid[id].state !== '' || !this.mode) { //if the selected Square state is not empty or the Game object has no mode, do nothing
            return;
        }
        if (this.mode == 'multiplayer') {
            this.waitTime = 1000; //the 1000ms wait time is the minimum required to finish drawing animations
        }
        if (this.canClick) {
            this.canClick = false;
            this.x ? this.board.grid[id].draw(true) : this.board.grid[id].draw(false); //if current turn is x, call UI draw function for x, otherwise, draw o
            this.x = !this.x; //invert the turn variable
            this.moves++; //add to total moves made
            if (this.moves >= 5) { //a winner can be declared only after a minimum of 5 turns
                if (this.x) { //if the last turn was o, check if o is the winner
                    if (this.board.checkWinner()) {
                        this.declareWin('o');
                        return;
                    }
                } else { //if the last turn was x, check if x is the winner
                    if (this.board.checkWinner()) {
                        this.declareWin('x');
                        return;
                    }
                }
            }
            if (this.moves === 9) { //if 9 turns have been reached without a winner, it's automatically a draw
                this.declareDraw();
                return;
            }
            if (this.mode === 'singleplayer') { //if Game object's mode is set to singleplayer, this function handles the AI move
                this.ai.setMove(!this.ai.getMove()); //invert the AI's turn variable
                if (this.ai.getMove()) { //if AI's turn variable is true, let the AI make a move
                    setTimeout((function () { //simulate AI player thinking
                        this.board.showThinking();
                    }).bind(this), 1000);
                    setTimeout((function () {
                        Math.random() >= 0.55 ? this.waitTime = 2000 + Math.floor(Math.random() * 500 + 500) : this.waitTime = 2000; //get random thinking duration
                        this.canClick = true;
                        this.squareClick(this.ai.think(this.board, this.moves)); //the think() method returns the best Square objects id to select
                        this.board.hideThinking();
                        setTimeout((function () {
                            this.canClick = true; //let the user select a Square after the animation ends
                        }).bind(this), 1000);
                    }).bind(this), this.waitTime - 1000)
                } else {
                    setTimeout((function () {
                        this.canClick = true; //let the user select a Square after the animation ends
                    }).bind(this), 1000);
                }
            } else {
                setTimeout((function () {
                    this.canClick = true; //let the user select a Square after the animation ends
                }).bind(this), 1000);
            }

        }
    }
}