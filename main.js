

(function deck(){
    //create  a deck of cards
     fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            let deckID = myJson.deck_id;            
            
			 return fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=5`);
           
        })
        .then((response2) => {
            return response2.json();
        })
        .then((showDeck) => {
            
            let rank = topPokerHand(showDeck.cards);
            // display highest poker hand to page
            for(let i in showDeck.cards) {               
                    document.getElementById("pokerhands").innerHTML += "<img src=" + showDeck.cards[i].image+ ">";					
                }             
            document.getElementsByTagName("h1")[0].innerHTML += "<span>" + rank + "</span>";			
			console.log(rank);
			
			}); 

   
    // declare sequence of cards
    let seq = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "JACK", "QUEEN", "KING"];  	


    //  sort the cards
    var sortCards = ((cards) => {
        // sort the cards according to their indexes in seq
        return cards.sort((a,b) => {
            return seq.indexOf(a.value) - seq.indexOf(b.value);
        });
    });
	
    // determining if four of a kind, full house, 3 of a kind, 2 pair or pair
    var dupliCount = ((cards) => {
        let count = 0;
        let dupli = [], duplicates = [];		
        sortCards(cards);   // sort cards
        // Count start from index
        for(let i = 1; i < cards.length; i++) {            		
            if(cards[i-1].value == cards[i].value) {
                if(dupli.length == 0) {
                    // push to the temporary array
                    dupli.push(cards[i-1].value);                    
                }
                dupli.push(cards[i].value);             

                if(i == cards.length-1) {
                    duplicates.push(dupli);
                }
            }
            else {
                // if it doesn't match
                if(dupli.length !== 0) {                   
                    // push this array of numbers to another array
                    duplicates.push(dupli);
                    dupli = []; // reset
                }
                
            }
        }

        // to check if there are fullhouse or two pairs
        if(duplicates.length === 2) {
            for(let i in duplicates) {
                if(duplicates[i].length === 3) {
                    return ;  // full house
                } 
            }
            count = 16; // two pairs
        }
        else if(duplicates.length === 1) {
            for(let i in duplicates) {
                switch(duplicates[i].length) {
                    case 2:
                        count = 2; break;   // pair
                    case 3:
                        count = 3; break;   // 3 of a kind
                    case 4:
                        count = 4; break;   // 4 of a card
                }
            }
        }

        // return the number of duplicates
        return count;
    }); // dupliCount
	
	 // All four cards of the same rank.
    var fourof_Kind = ((cards) => {
        if(dupliCount(cards) === 4) {
            return true;
        }
        return false;
    });    

    // Three cards of the same rank.
    var threeof_Kind = ((cards) => {
        if(dupliCount(cards) === 3) {
            return true;
        }
        return false;
    });    

    // Two cards of the same rank.
    var pair = ((cards) => {
        if(dupliCount(cards) === 2) {
            return true;
        }
        return false;
    });

    // A, K, Q, J, 10, all the same suit.
    var royal_Flush = ((cards) => {
        const royals = ["9", "10", "11", "12", "13"];
        sortCards(cards);
        if(Flush(cards)) {    // will check if all same suit
            for(let i = 0; i < cards.length; i++) {
                if(royals.indexOf(cards[i].value) === -1) { // checks if the card is in the royals array
                    return false;
                }
            }
            return true;
        }    
        return false;
    });

    // Any five cards of the same suit, but not in a sequence.    
    var Flush = ((cards) => {
        // let same = false;
        return cards.every(function(el,i,arr) {           
            if(i === 0) {
                return true;
            }
            else {
                return (el.suit === arr[i - 1].suit);
            }
        });
        // return same;
    });  

    // Five cards in a sequence, all in the same suit.
    var straight_Flush = ((cards) => {
        if(Flush(cards) && isStraight(cards)) {
            return true;
        }
        return false;
    });   
       
    var topPokerHand = ((cards) => {
        let rank = "";
        if(royal_Flush(cards)) {
            rank = "Royal Flush 00";
        } 
        else if(straight_Flush(cards)) {
            rank = "StraightFlush 01";
        }		
        else if(fourof_Kind(cards)) {
            rank = "Four of a kind 02";
        }        
        else if(Flush(cards)) {
            rank = "Flush 04 ";
        }        
        else if(threeof_Kind(cards)) {
            rank = "Three of a kind 06";
        }       
        else if(pair(cards)) {
            rank = "Pair 08";
        }
        else {            
            sortCards(cards);
            rank = "High card 09 ";
            
        }
        return rank;
		
    }); 
})();  
