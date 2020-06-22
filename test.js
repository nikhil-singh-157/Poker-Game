var index = require('./apiTest.js');
var expect = require("chai").expect;
var fetch = require('node-fetch');
//var request = require("request");
var assert = require('assert');

describe('Deck API Request', function() {
  var deckRep =   {
      "remaining": 52,
      "success": true,
      "deck_id": "zb1yqcuvtmbs",
      "shuffled": true
    };
    
	


    it('should get 1', function () {
         fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                //console.log(res);
                assert.equal(res.success, true);		
							
            })
			.catch((error) => {
            console.log(error)
});
			
    })
	
	it('should ', function (){
         fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=5')
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                //console.log(res);
                assert.equal(res.remaining, 47);
				//res.should.have.status(200);
				;
            })
			
    })
	
  });