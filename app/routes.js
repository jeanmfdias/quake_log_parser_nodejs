// app/routes.js

const ParserGameLog = require('./modules/ParserGameLog');

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.send({"app": "Quake Log Parser"});
  });

  app.get('/games/total', function(req, res) {
    var pgl = new ParserGameLog('games.log');
    res.send({
      'total_games': pgl.getTotalGames()
    });
  });

  app.get('/games/:num', function(req, res) {
    var pgl = new ParserGameLog('games.log');
    pgl.getGame(req.params.num, function(data) {
      res.send({
        'game': data.numGame,
        'total_kills': data.totalKills,
        'players': data.players,
        'kills': data.playerKills
      });
    });
  });

  app.get('/games/:num/detail', function(req, res) {
    var pgl = new ParserGameLog('games.log');
    pgl.getGameInfo(req.params.num, function(data) {
      res.send({"infos_game": data});
    });
  });

}
