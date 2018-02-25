// app/routes.js

const parserGameLog = require('./modules/ParserGameLog')

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.send("Quake Log Parser")
  })

  app.get('/games/log', function(req, res) {
    var pgl = new parserGameLog('games.log')
    pgl.loadLog()
    res.send('Read log on console')
  })

}
