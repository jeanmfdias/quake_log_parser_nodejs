const server = require('./config/server');
const routes = require('./app/routes')(server);

server.listen(3000, () => {
  console.log('It\'s works!');
});
