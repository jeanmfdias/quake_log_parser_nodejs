// app/routes.js

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.send("Quake Log Parser")
  })

  app.get('/game', function(req, res) {
    res.send("Game found")
  })

}
