//const { findBestHand } = require("./categories");
//const { findBestHand } = require("./categories");
//var poker = require('poker-hands');
var fetch = require('node-fetch');
//var fetchUrl = require("fetch").fetchUrl;
var expect = require("chai").expect;

let drawCards = () => {
  fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=5`)
  .then(response => response.json())
  .then((data) => {
    let cards = response.cards.map( data => {
      return(
        new data(data.value, data.suit)		
      )
    })
    return(cards)
  }) .catch(error => console.error(`Error in fetch: ${error.message}`))
}

drawCards();
	  
	  
	  
	  
	  
	  
	  
	  
 
  
  
 