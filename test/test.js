const assert = require('chai').assert;
const ParserGameLog = require('../app/modules/ParserGameLog');

describe('ParserGameLog', function() {
  describe('loadLog', function() {
    it('if don\'t load file', function() {
      var pgl = new ParserGameLog();

      assert.equal(pgl.getFileLine());
    });

    it('if var is a object', function() {
      var pgl = new ParserGameLog('games.log');

      assert.isObject(pgl);
    });

    it('if load file', function() {
      var pgl = new ParserGameLog('games.log');

      assert.notEqual(pgl.getFileLine());
    });
  });

});
