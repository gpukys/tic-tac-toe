class Game {
    constructor(mode) {
        if (mode) {
            this.mode = mode;
            this.timeout = '';
            this.canClick = true;
            this.board = new Board();
            this.waitTime = 2000;s
            this.moves = 0;
            this.x = true; //this variable tracks whose turn it is
            if (this.mode === 'singleplayer') {
                this.ai = new AiPlayer();
            }
            this.board.hideControls();
        }
    }
    quit() {
        this.mode = '';
        this.board.showControls();
    }
    stop() {
        this.mode = '';
        this.board.hideQuit();
        this.board.showRetry();
    }
    restart() {
        this.mode = '';
        this.board.showControls();
    }
    declareDraw() {
        this.board.changeHeader("It's a draw!");
        this.stop();
    }
    declareWin(player) {
        if (player === 'x') {
            this.board.changeHeader("X's win!");
        } else if (player === 'o') {
            this.board.changeHeader("O's win!");
        }
        this.stop();
    }
    squareClick(id) {
        if (this.board.grid[id].state !== '' || !this.mode) {
            return;
        }
        if (this.mode == 'multiplayer') {
            this.waitTime = 1000;
        }
        if (this.canClick) {
            this.canClick = false;
            this.x ? this.board.grid[id].draw(true) : this.board.grid[id].draw(false);
            this.x = !this.x;
            this.moves++; 
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
            if (this.moves === 9) {
                this.declareDraw();
                return;
            }
            if (this.mode === 'singleplayer') { //if Game object's mode is set to singleplayer, this function handles the AI move
                this.ai.setMove(!this.ai.getMove()); 
                if (this.ai.getMove()) { 
                    setTimeout((function () {
                        this.board.showThinking();
                    }).bind(this), 1000);
                    setTimeout((function () {
                        Math.random() >= 0.55 ? this.waitTime = 2000 + Math.floor(Math.random() * 500 + 500) : this.waitTime = 2000; //get random thinking duration
                        this.canClick = true;
                        this.squareClick(this.ai.think(this.board, this.moves));
                        this.board.hideThinking();
                        setTimeout((function () {
                            this.canClick = true; 
                        }).bind(this), 1000);
                    }).bind(this), this.waitTime - 1000)
                } else {
                    setTimeout((function () {
                        this.canClick = true; 
                    }).bind(this), 1000);
                }
            } else {
                setTimeout((function () {
                    this.canClick = true;
                }).bind(this), 1000);
            }

        }
    }
}