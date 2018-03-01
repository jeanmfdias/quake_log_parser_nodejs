const assert = require('assert');
const ParserGameLog = require('../app/modules/ParserGameLog')

describe('ParserGameLog', function() {
  describe('loadLog', function() {
    it('if var is a object', function() {
      var pgl = new ParserGameLog('games.log')
      assert.equal(typeof pgl, 'object')
    })
  })
})

describe('ParserGameLog', function() {
  describe('loadLog', function() {
    it('if load file', function() {
      var pgl = new ParserGameLog('games.log')
    })
  })
})

describe('ParserGameLog', function() {
  describe('loadLog', function() {
    it('if don\'t load file', function() {
      var pgl = new ParserGameLog()
      assert.equal(pgl.getFileLine())
    })
  })
})
