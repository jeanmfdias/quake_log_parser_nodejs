// app/modules/ParserGameLog.js

const fs = require('fs')
const readline = require('readline')

function ParserGameLog(name_file) {
  this._file = name_file
  this._local = './storage/logs/'
}

ParserGameLog.prototype.loadLog = function() {
  var lineReader = fs.readFileSync(this._local+this._file, 'utf8').split('\n').filter(Boolean)
  return lineReader
}

ParserGameLog.prototype.totalGames = function() {
  var lineReader = this.loadLog()
  var games = 0
  var regex = new RegExp("ShutdownGame")

  lineReader.forEach(function(element, index, array) {
    if (regex.test(element)) {
      games = games + 1
    }
  })
  return games
}

module.exports = ParserGameLog
