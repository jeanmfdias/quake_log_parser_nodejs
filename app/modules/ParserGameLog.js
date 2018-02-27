// app/modules/ParserGameLog.js

const fs = require('fs')

function ParserGameLog(nameFile) {
  this._fileLine = fs.readFileSync('./storage/logs/'+nameFile, 'utf8')
    .split('\n').filter(Boolean)
}

/**
 * Method to return totalGames
 */
ParserGameLog.prototype.totalGames = function(callback) {
  var games = 0
  this._fileLine.forEach(function(element, index, array) {
    if (/InitGame/.test(element)) {
      games += 1
    }
  })
  callback(games)
}

/**
 * Method to return a valid game
 */
ParserGameLog.prototype.getGame = function(numGame, callback) {
  var totalKills = 0
  var index = {}

  this.getGameIndex(numGame, function returnGame(indexGames) {
    index = indexGames
  })

  this.getKills(index, function(totalKills) {
    callback({numGame: numGame, totalKill: totalKills})
  })

}

ParserGameLog.prototype.getKills = function(index, callback) {
  var totalKills = 0

  for (i = index.initGame; i < index.shutdownGame; i++) {
    if (/Kill:/.test(this._fileLine[i])) {
      totalKills += 1;
    }
  }
  callback(totalKills)
}

/**
 *
 */
ParserGameLog.prototype.getGames = function() {
  var total = this.totalGames()
  var games = {}
  for (i = 1; i <= total; i++) {
    games[i] = this.getGame(i, function(data) {
      return data
    })
  }
  return games
}

/**
 * Return the rows index of a game
 * param numGame
 */
ParserGameLog.prototype.getGameIndex = function(numGame, callback) {
  var indexInitGame, indexShutdownGame = -1
  var countGame = -1
  var returnIndexInitGame, returnIndexShutdownGame = -1
  var gameDown = false

  this._fileLine.forEach(function(line, index) {
    // Check if Initial Game
    if (/InitGame:/.test(line)) {
      // Check if the game has not crached
      if (indexInitGame == -1) {
        indexInitGame = index
      } else {
        // if crached, mark new initGame as shutdownGame of previous game
        indexShutdownGame = index
        gameDown = true
      }
    }
    // Check if End Game
    if (/ShutdownGame:/.test(line)) {
      indexShutdownGame = index
    }
    if (indexInitGame != -1 && indexShutdownGame != -1) {
      countGame += 1
      if (countGame == numGame) {
        returnIndexInitGame = indexInitGame
        returnIndexShutdownGame = indexShutdownGame
      } else {
        if (gameDown) {
          indexInitGame = indexShutdownGame
          indexShutdownGame = -1
          gameDown = false
        } else {
          indexInitGame = -1
          indexShutdownGame = -1
        }
      }
    }
  })
  return callback({initGame: returnIndexInitGame, shutdownGame: returnIndexShutdownGame})
}

module.exports = ParserGameLog
