class Square {
    constructor(id) {
        this.id = id;
        this.state = '';
        this.clear();
    }
    /* Function to assign an X or O on this Square object */
    draw(x) {
        if (x) {
            document.getElementById(this.id).appendChild(document.createElement('cross-element', {is: 'cross-element'})) //Purely for UI purposes
            this.state = 'x';
        } else {
            document.getElementById(this.id).appendChild(document.createElement('progress-ring', {is: 'progress-ring'})) //Purely for UI purposes
            this.state = 'o';
        }
    }
    /* Purely for UI, removes all the X and O drawings */
    clear() {
        $('#' + this.id).html('');
    }
}