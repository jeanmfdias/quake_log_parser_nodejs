const assert = require('chai').assert;
const ParserGameLog = require('../app/modules/ParserGameLog');

describe('ParserGameLog', function() {
  describe('loadLog', function() {
    it('if don\'t load file', function() {
      var pgl = new ParserGameLog();

      assert.equal(pgl.getFileLine());
    });

    it('if var is a object', function() {
      var pgl = new ParserGameLog('games.log');

      assert.isObject(pgl);
    });

    it('if load file', function() {
      var pgl = new ParserGameLog('games.log');

      assert.notEqual(pgl.getFileLine());
    });
  });

  describe('getTotalGames', function() {
    it('total games is zero because it not load the correct file', function() {
      var pgl = new ParserGameLog('gamesNotExists.log');

      assert.equal(pgl.getTotalGames(), 0);
    });

    it('total games is more than or equal zero because it load the correct file', function() {
      var pgl = new ParserGameLog('games.log');

      assert.isAtLeast(pgl.getTotalGames(), 0);
    });
  });

  describe('getGameIndex', function() {
    it('the index in the game file is -1 because it not load the correct file', function() {
      var pgl = new ParserGameLog('gamesNotExists.log'),
        index = undefined;

      pgl.getGameIndex(1, function(data) {
        index = data;
      });
      assert.equal(index.initGame, -1);
      assert.equal(index.shutdownGame, -1);
    });

    it(`the index in the game file is -1 with loading the correct file,
        but specified an game what don\'t exists`, function() {
      var pgl = new ParserGameLog('games.log'),
        index = undefined;

      pgl.getGameIndex(100, function(data) {
        index = data;
      });
      assert.equal(index.initGame, -1);
      assert.equal(index.shutdownGame, -1);
    });

    it('the index in the game file not is -1', function() {
      var pgl = new ParserGameLog('games.log'),
        index = undefined;

      pgl.getGameIndex(1, function(data) {
        index = data;
      });
      assert.notEqual(index.initGame, -1);
      assert.notEqual(index.shutdownGame, -1);
    });
  });

});
