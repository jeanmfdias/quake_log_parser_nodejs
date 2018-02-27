// app/routes.js

const ParserGameLog = require('./modules/ParserGameLog')

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.send({"app": "Quake Log Parser"})
  })

  app.get('/games/total', function(req, res) {
    var pgl = new ParserGameLog('games.log')
    pgl.totalGames(function returnGameTotal(data) {
      res.send({total_games: data})
    })
  })

  app.get('/games', function (req, res) {
    var pgl = new ParserGameLog('games.log')
    res.send(pgl.getGames())
  })

  app.get('/games/:num', function(req, res) {
    var pgl = new ParserGameLog('games.log')
    pgl.getGame(req.params.num, function(data) {
      res.send({
        'game': data.numGame,
        'total_kills': data.totalKill
      })
    })
  })

}
