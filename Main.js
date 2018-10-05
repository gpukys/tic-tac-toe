/* This class is used mainly to handle the UI click's */
var game;
$('#singleplayer').click(function (e){
    game = new Game('singleplayer'); //start a singleplayer game
})
$('#multiplayer').click(function (e){
    game = new Game('multiplayer'); //start a multiplayer game
})
$('#quit').click(function (e){
    game.restart(); //reset all the game objects to their original state
})
$('#again').click(function (e){
    game.restart(); //reset all the game objects to their original state
})
$('.square').click(function (e){
    game.squareClick(e.currentTarget.id); //UI click handler for the selected square
})

