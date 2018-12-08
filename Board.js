class Board {
    constructor(mode) {
        this.grid = [];
        for (var i = 0; i <= 8; i++) {
            this.grid.push(new Square(i));
        }
    }
    /* Click handlers for UI */
    showBoard() {
        $('#board').addClass('active');
    }
    hideBoard() {
        $('#board').removeClass('active');
    }
    showQuit() {
        $('#quit').addClass('active');
    }
    hideQuit() {
        $('#quit').removeClass('active');
    }
    showRetry() {
        $('#again').addClass('active');
    }
    hideRetry() {
        $('#again').removeClass('active');
    }
    showThinking() {
        $('#thinking').css('display', 'block');
    }
    hideThinking() {
        $('#thinking').css('display', 'none');
    }
    changeHeader(text) {
        $('h1').text(text);
    }
    showControls() {
        $('.buttons').addClass('active');
        this.hideRetry();
        this.hideQuit();
        this.hideBoard();
        this.changeHeader('Tic-Tac-Toe!');
    }
    hideControls() {
        $('.buttons').removeClass('active');
        this.showBoard();
        this.showQuit();
        this.hideRetry();
        this.changeHeader('');
    }
    /* ---- */

    checkWinner() {
        for (var i = 0; i <= 2; i++) {
            if ((this.grid[i * 3].state && this.grid[i * 3].state === this.grid[i * 3 + 1].state) && (this.grid[i * 3].state && this.grid[i * 3].state === this.grid[i * 3 + 2].state)) {
                return true;
            }
            if ((this.grid[i].state && this.grid[i].state === this.grid[i + 3].state) && (this.grid[i].state && this.grid[i].state === this.grid[i + 6].state)) {
                return true;
            }
            if ((this.grid[0].state && this.grid[0].state === this.grid[4].state) && (this.grid[0].state && this.grid[0].state === this.grid[8].state)) {
                return true;
            }
            if ((this.grid[2].state && this.grid[2].state === this.grid[4].state) && (this.grid[2].state && this.grid[2].state === this.grid[6].state)) {
                return true;
            }
        }
        return false;
    }
}