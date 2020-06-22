var index = require('./apiTest.js');
var expect = require("chai").expect;
var fetch = require('node-fetch');
var assert = require('assert');

describe('Deck API Request', function() {
  var deckRep =   {
      "remaining": 52,
      "success": true,
      "deck_id": "zb1yqcuvtmbs",
      "shuffled": true
    }; 
	

    it('should get response as success', function () {
         fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
            .then((res) => {
                return res.json()
            })
            .then((res) => {
               
                assert.equal(res.success, true);	
							
            })
			
			
    })
	
	it('should get remaining card  ', function (){
         fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=5')
            .then((res) => {
                return res.json()
            })
            .then((res) => {               
                assert.equal(res.remaining, 47);				
				
            })
			
    })
	
  });