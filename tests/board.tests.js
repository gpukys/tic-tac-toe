console.log('-> board.tests.js');

describe('board tests', function () {
    it('sukurus lenta turi buti 9 langeliai', function () {
        var board = new Board();
        chai.expect(board.grid.length).to.equal(9);
    });
    it('patikrinam ar gride sukurti objektai turi empty state', function () {
        var board = new Board();
        for (var i = 0; i<board.grid.length; i++) {
            chai.expect(board.grid[i]['state']).to.equal('');
        }
        
    });
});