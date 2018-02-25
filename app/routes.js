// app/routes.js

const parserGameLog = require('./modules/ParserGameLog')

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.send({"app": "Quake Log Parser"})
  })

  app.get('/games', function(req, res) {
    var pgl = new parserGameLog('games.log')
    var count = pgl.totalGames()
    res.send({"total_games": count})
  })

}
