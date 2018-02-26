// app/routes.js

const ParserGameLog = require('./modules/ParserGameLog')

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.send({"app": "Quake Log Parser"})
  })

  app.get('/games/total', function(req, res) {
    var pgl = new ParserGameLog('games.log')
    var count = pgl.totalGames()
    res.send({"total_games": count})
  })

  app.get('/games/:num', function(req, res) {
    var pgl = new ParserGameLog('games.log')
    var numGame = req.params.num
    var detailGame = pgl.getGame(req.params.num)

    res.send({
      "game": numGame,
      "total_kills": detailGame.totalKill
    })
  })

}
