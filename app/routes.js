// app/routes.js

const ParserGameLog = require('./modules/ParserGameLog')

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.send({"app": "Quake Log Parser"})
  })

  app.get('/games/total', function(req, res) {
    var pgl = new ParserGameLog('games.log')
    res.send({"total_games": pgl.totalGames()})
  })

  app.get('/games', function (req, res) {
    var pgl = new ParserGameLog('games.log')
    res.send(pgl.getGames())
  })

  app.get('/games/:num', function(req, res) {
    var pgl = new ParserGameLog('games.log')
    res.send(pgl.getGame(req.params.num))
  })

}
