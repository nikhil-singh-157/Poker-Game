(function(){    
     fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            let deckID = myJson.deck_id;
            // req-002 request 5 cards from the deck
            return fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52`);
            
        })
        .then((response2) => {
            return response2.json();
        })
        .then((myDeck) => {
            

            // display highest poker hand to page
            for(let i in myDeck.cards) {
                if(myDeck.cards[i]) {
                    document.getElementById("pokerhands").innerHTML += "<img class='transparent' src=" + myDeck.cards[i].image+ ">";
                } else {
                    document.getElementById("pokerhands").innerHTML += "<img src=" + myDeck.cards[i].image+ ">";
                }
            }
            
        }); 


})(); 


