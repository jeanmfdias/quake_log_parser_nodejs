const assert = require('chai').assert;
const ParserGameLog = require('../app/modules/ParserGameLog');

describe('ParserGameLog', function() {

  /**
   * Test for loadLog a.k.a constructor
   */
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

  /**
   * Test for getTotalGames
   */
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

  /**
   * Test for getGameIndex
   */
  describe('getGameIndex', function() {
    it('the index initGame in the game file is -1 because it not load the correct file', function() {
      var pgl = new ParserGameLog('gamesNotExists.log'),
        index = undefined;

      pgl.getGameIndex(1, function(data) {
        index = data;
      });
      assert.equal(index.initGame, -1);
    });

    it('the index shutdownGame in the game file is -1 because it not load the correct file', function() {
      var pgl = new ParserGameLog('gamesNotExists.log'),
        index = undefined;

      pgl.getGameIndex(1, function(data) {
        index = data;
      });
      assert.equal(index.shutdownGame, -1);
    });

    it(`the index initGame in the game file is -1 with loading the correct file,
        but specified an game what don\'t exists`, function() {
      var pgl = new ParserGameLog('games.log'),
        index = undefined;

      pgl.getGameIndex(100, function(data) {
        index = data;
      });
      assert.equal(index.initGame, -1);
    });

    it(`the index shutdownGame in the game file is -1 with loading the correct file,
        but specified an game what don\'t exists`, function() {
      var pgl = new ParserGameLog('games.log'),
        index = undefined;

      pgl.getGameIndex(100, function(data) {
        index = data;
      });
      assert.equal(index.shutdownGame, -1);
    });

    it('the index initGame in the game file not is -1', function() {
      var pgl = new ParserGameLog('games.log'),
        index = undefined;

      pgl.getGameIndex(1, function(data) {
        index = data;
      });
      assert.notEqual(index.initGame, -1);
    });

    it('the index shutdownGame in the game file not is -1', function() {
      var pgl = new ParserGameLog('games.log'),
        index = undefined;

      pgl.getGameIndex(1, function(data) {
        index = data;
      });
      assert.notEqual(index.shutdownGame, -1);
    });
  });

  /**
   * Test for getGame
   */
  describe('getGame', function() {
    it('return numGame even if it not load the correct file', function() {
      var pgl = new ParserGameLog('gamesNotExists.log'),
        game = {};

      pgl.getGame(1, function(data) {
        game.numGame = data.numGame;
      });
      assert.equal(game.numGame, 1);
    });

    it('return numGame even if it games don\'t exists, but loading the correct file', function() {
      var pgl = new ParserGameLog('games.log'),
        game = {};

      pgl.getGame(100, function(data) {
        game.numGame = data.numGame;
      });
      assert.equal(game.numGame, 100);
    });

    it('return numGame even if it loading the correct file', function() {
      var pgl = new ParserGameLog('games.log'),
        game = {};

      pgl.getGame(1, function(data) {
        game.numGame = data.numGame;
      });
      assert.equal(game.numGame, 1);
    });

    it('return totalKills as zero because it not load the correct file', function() {
      var pgl = new ParserGameLog('gamesNotExists.log'),
        game = {};

      pgl.getGame(1, function(data) {
        game.totalKill = data.totalKills;
      });
      assert.equal(game.totalKill, 0);
    });

    it('return totalKills as zero because it game don\'t exists, but loading the correct file', function() {
      var pgl = new ParserGameLog('games.log'),
        game = {};

      pgl.getGame(100, function(data) {
        game.totalKill = data.totalKills;
      });
      assert.equal(game.totalKill, 0);
    });

    it('return totalKills with loading the correct file', function() {
      var pgl = new ParserGameLog('gamesNotExists.log'),
        game = {};

      pgl.getGame(1, function(data) {
        game.totalKill = data.totalKills;
      });
      assert.isAtLeast(game.totalKill, 0);
    });

    it('return players as empty array because it not load the correct file', function() {
      var pgl = new ParserGameLog('gamesNotExists.log'),
        game = {};

      pgl.getGame(1, function(data) {
        game.players = data.players;
      });
      assert.isEmpty(game.players);
    });

    it('return players as empty array if it games don\'t exists, but loading the correct file', function() {
      var pgl = new ParserGameLog('games.log'),
        game = {};

      pgl.getGame(100, function(data) {
        game.players = data.players;
      });
      assert.isEmpty(game.players);
    });

    it('return players as array with loading the correct file', function() {
      var pgl = new ParserGameLog('games.log'),
        game = {};

      pgl.getGame(1, function(data) {
        game.players = data.players;
      });
      assert.isArray(game.players);
    });

    it('return playerKills as empty object because it not load the correct file', function() {
      var pgl = new ParserGameLog('gamesNotExists.log'),
        game = {};

      pgl.getGame(1, function(data) {
        game.playerKills = data.playerKills;
      });
      assert.isEmpty(game.playerKills);
    });

    it('return playerKills as empty object if it game don\'t exists , but loading the correct file', function() {
      var pgl = new ParserGameLog('games.log'),
        game = {};

      pgl.getGame(100, function(data) {
        game.playerKills = data.playerKills;
      });
      assert.isEmpty(game.playerKills);
    });

    it('return playerKills as object with loading the correct file', function() {
      var pgl = new ParserGameLog('games.log'),
        game = {};

      pgl.getGame(1, function(data) {
        game.playerKills = data.playerKills;
      });
      assert.isObject(game.playerKills);
    });
  });

  /**
   * Test for getGameInfo
   */
  describe('getGameInfo', function() {
    it('return infos game as empty array because not load the correct file', function() {
      var pgl = new ParserGameLog('gamesNotExists.log'),
        info = [];

      pgl.getGameInfo(1, function(data) {
        info = data;
      });
      assert.isEmpty(info);
    });

    it('return infos game as empty array because game don\'t exists, but loading the correct file', function() {
      var pgl = new ParserGameLog('games.log'),
        info = [];

      pgl.getGameInfo(100, function(data) {
        info = data;
      });
      assert.isEmpty(info);
    });

    it('return infos game as array with loading the correct file', function() {
      var pgl = new ParserGameLog('games.log'),
      info = [];

      pgl.getGameInfo(1, function(data) {
        info = data;
      });
      assert.isArray(info);
    });
  });

});
