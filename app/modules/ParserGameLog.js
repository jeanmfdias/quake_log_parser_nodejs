// app/modules/ParserGameLog.js

const fs = require('fs')
const readline = require('readline')

function ParserGameLog(name_file) {
  this._file = name_file
  this._local = './storage/logs/'
}

/**
 * Method to return log file in array
 */
ParserGameLog.prototype.loadLog = function() {
  var lineReader = fs.readFileSync(this._local+this._file, 'utf8').split('\n').filter(Boolean)
  return lineReader
}

/**
 * Method to return totalGames
 */
ParserGameLog.prototype.totalGames = function() {
  var lineReader = this.loadLog()
  var games = 0

  lineReader.forEach(function(element, index, array) {
    if (/InitGame/.test(element)) {
      games += 1
    }
  })
  return games
}

/**
 * Method to return a valid game
 */
ParserGameLog.prototype.getGame = function(numGame) {
  var lineReader = this.loadLog()
  var index = this.getGameIndex(numGame)
  var totalKill = 0

  for (i = index.initGame; i < index.shutdownGame; i++) {
    if (/Kill:/.test(lineReader[i])) {
      totalKill += 1;
    }
  }
  return {totalKill: totalKill}
}

/**
 * Return the index of lines of a game
 * param numGame
 */
ParserGameLog.prototype.getGameIndex = function(numGame) {
  var lineReader = this.loadLog()
  var indexInitGame, indexShutdownGame = -1
  var countGame = -1
  var returnIndexInitGame, returnIndexShutdownGame = -1
  var gameDown = false

  lineReader.forEach(function(line, index) {
    if (/InitGame:/.test(line)) {
      if (indexInitGame == -1) {
        indexInitGame = index
      } else {
        indexShutdownGame = index
        gameDown = true
      }
      console.log('init ',index, ' init ', indexInitGame, ' shut ', indexShutdownGame)
    }
    if (/ShutdownGame:/.test(line)) {
      indexShutdownGame = index
      console.log('shut ', index, ' init ', indexInitGame, ' shut ', indexShutdownGame)
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
  return {initGame: returnIndexInitGame, shutdownGame: returnIndexShutdownGame}
}

module.exports = ParserGameLog
