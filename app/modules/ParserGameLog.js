// app/modules/ParserGameLog.js

const fs = require('fs')

function ParserGameLog(nameFile) {
  if (nameFile != undefined) {
    this._fileLine = fs.readFileSync('./storage/logs/'+nameFile, 'utf8')
      .split('\n').filter(Boolean)
  }
}

ParserGameLog.prototype.getFileLine = function() {
  return this._fileLine
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
  var players = []
  var playerKills = {}

  this.getGameIndex(numGame, function returnGame(indexGames) {
    index = indexGames
  })

  for (i = index.initGame; i < index.shutdownGame; i++) {
    if (/Kill:/.test(this._fileLine[i])) {
      totalKills += 1;

      // Get players killers
      string = this._fileLine[i].match("(?=[0-9]: ).*(?= killed)")
      string = string[0].substr(3)
      if (string != '<world>') {
        if (!players.includes(string)) {
          players.push(string)
          playerKills[string] = 0
        }
      }
      // Get players dead
      dead = this._fileLine[i].match("(?=killed).*(?= by)")
      dead = dead[0].match("(?= ).*")
      dead = dead[0].substr(1)
      if (!players.includes(dead)) {
        players.push(dead)
        playerKills[dead] = 0
      }
      // If players kill himself doesn't add
      if (string != dead) {
        if (string != '<world>') {
          playerKills[string] += 1
        } else {
          if (playerKills[dead] < 1) {
            playerKills[dead] = 0
          } else {
            playerKills[dead] -= 1
          }
        }
      }
    }
  }

  callback({
    numGame: numGame,
    totalKill: totalKills,
    players: players,
    playerKills: playerKills
  })
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
