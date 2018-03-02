// app/modules/ParserGameLog.js

const fs = require('fs');
const facts = require('./Facts');

function ParserGameLog(nameFile) {
  if (nameFile != undefined) {
    try {
      this._fileLine = fs.readFileSync('./storage/logs/'+nameFile, 'utf8')
        .split('\n').filter(Boolean);
    } catch (e) {
      this._fileLine = undefined;
    }
  }
}

/**
 * Method to return _fileLine
 */
ParserGameLog.prototype.getFileLine = function() {
  return this._fileLine;
}

/**
 * Method to return totalGames
 */
ParserGameLog.prototype.getTotalGames = function() {
  var games = 0;
  if (this._fileLine) {
    this._fileLine.forEach(function(element, index, array) {
      if (/InitGame/.test(element)) {
        games += 1;
      }
    });
  }
  return games;
}

/**
 * Method to return a valid game
 */
ParserGameLog.prototype.getGame = function(numGame, callback) {
  var totalKills = 0,
    index = {},
    players = [],
    playerKills = {},
    string = "",
    dead = "";

  this.getGameIndex(numGame, function returnGame(indexGames) {
    index = indexGames;
  });

  if (index.initGame != -1 && index.shutdownGame != -1) {
    for (i = index.initGame; i < index.shutdownGame; i++) {
      if (/Kill:/.test(this._fileLine[i])) {
        totalKills += 1;

        // Get players killers
        string = this._fileLine[i].match("(?=[0-9]: ).*(?= killed)");
        string = string[0].substr(3);
        if (string != '<world>') {
          if (!players.includes(string)) {
            players.push(string);
            playerKills[string] = 0;
          }
        }
        // Get players dead
        dead = this._fileLine[i].match("(?=killed).*(?= by)");
        dead = dead[0].match("(?= ).*");
        dead = dead[0].substr(1);
        if (!players.includes(dead)) {
          players.push(dead);
          playerKills[dead] = 0;
        }

        if (string != '<world>') {
          playerKills[string] += 1;
        } else {
          if (playerKills[dead] < 1) {
            playerKills[dead] = 0;
          } else {
            playerKills[dead] -= 1;
          }
        }
      }
    }
  }

  callback({
    numGame: numGame,
    totalKills: totalKills,
    players: players,
    playerKills: playerKills
  });
}

/**
 * Return a review of a game
 * param numGame expects an integer
 * param callback expects a function
 */
ParserGameLog.prototype.getGameInfo = function(numGame, callback) {
  var data = {},
    string = [],
    index = {},
    killer = "",
    dead = "",
    fact = "",
    j = 0;

    this.getGameIndex(numGame, function (indexGames) {
      index = indexGames;
    });

    if (index.initGame != -1 && index.shutdownGame != -1) {
      for (i = index.initGame; i < index.shutdownGame; i++) {
        if (/Kill:/.test(this._fileLine[i])) {

          // Get players killers
          killer = this._fileLine[i].match("(?=[0-9]: ).*(?= killed)");
          killer = killer[0].substr(3);

          // Get players dead
          dead = this._fileLine[i].match("(?=killed).*(?= by)");
          dead = dead[0].match("(?= ).*");
          dead = dead[0].substr(1);

          fact = this._fileLine[i].match("(?=by ).*");
          fact = fact[0].substr(3);

          if (killer != '<world>' && killer != dead) {
            string[j++] = `O player \"` +killer+ `\" matou o player `+ dead + ` ` + facts(fact);
          } else {
            string[j++] = `O player \"` + dead + `\" morreu ` + facts(fact);
          }
        }
      }
    }
    callback(string);
}

/**
 * Return the rows index of a game
 * param numGame expects an integer
 * param callback expects a function
 */
ParserGameLog.prototype.getGameIndex = function(numGame, callback) {
  var indexInitGame = -1,
    indexShutdownGame = -1,
    countGame = -1,
    returnIndexInitGame = -1,
    returnIndexShutdownGame = -1,
    gameDown = false;

  if (this._fileLine) {
    this._fileLine.forEach(function(line, index) {
      // Check if Initial Game
      if (/InitGame:/.test(line)) {
        // Check if the game has not crached
        if (indexInitGame == -1) {
          indexInitGame = index;
        } else {
          // if crached, mark new initGame as shutdownGame of previous game
          indexShutdownGame = index;
          gameDown = true;
        }
      }
      // Check if End Game
      if (/ShutdownGame:/.test(line)) {
        indexShutdownGame = index;
      }
      if (indexInitGame != -1 && indexShutdownGame != -1) {
        countGame += 1;
        if (countGame == numGame) {
          returnIndexInitGame = indexInitGame;
          returnIndexShutdownGame = indexShutdownGame;
        } else {
          if (gameDown) {
            indexInitGame = indexShutdownGame;
            indexShutdownGame = -1;
            gameDown = false;
          } else {
            indexInitGame = -1;
            indexShutdownGame = -1;
          }
        }
      }
    });
  }
  return callback({
    initGame: returnIndexInitGame,
    shutdownGame: returnIndexShutdownGame
  });
}

module.exports = ParserGameLog;
