// app/modules/ParserGameLog.js

var fs = require('fs')
var readline = require('readline')

function ParserGameLog(name_file) {
  this._file = name_file
  this._local = './storage/logs/'
}

ParserGameLog.prototype.loadLog = function() {
  var lineReader = readline.createInterface({
    input: fs.createReadStream(this._local+this._file)
  })
  lineReader.on('line', function(line) {
    console.log('Line: ', line)
  })
}

module.exports = ParserGameLog
