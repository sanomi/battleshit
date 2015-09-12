'use strict';
var ref1 = new Firebase('https://qnbattleship.firebaseio.com/player1');
var ref2 = new Firebase('https://qnbattleship.firebaseio.com/player2');
var ref1G = new Firebase('https://qnbattleship.firebaseio.com/player1Guess');
var ref2G = new Firebase('https://qnbattleship.firebaseio.com/player2Guess');
var player1Choices = [];
var maxShip = 0;
var counter = 0;
var myTurn = false;

$(document).ready(init);

function init() {
    var status = 'not ready';
    player1CoOrd();
    ref2.remove();
    ref1G.remove();
    ref2G.remove();
    ref1G.on('child_added', function(guessCoOrd) {
    console.log("It's your turn");
    myTurn = true;
  })
    
    $('button').click(function() {ref2.remove();});
    $('#placeBoats td').on('click', selectShips);
  ref2.on('child_added', player2CoOrdSend);
        
}
function player2CoOrdSend(snapshot) {
    var message = snapshot.val();
  };
function player1CoOrd() {

  ref1.on('child_added', function(snapshot) {
    var message = snapshot.val();
    console.log(message.co);
    player1Choices.push(message.co);
    console.log(player1Choices);
    if (player1Choices.length === 15){
     checkP1Match(player1Choices);

    }
});
};
function selectShips(){
  if (maxShip === 15) {
    alert("Out of Ships");
    $(this).off(); 
    return;}
  
    var co = $(this).attr('class') + $(this).parent().attr('class');
    $(this).addClass('ship');
    ref2.push( {co: co });
  
    maxShip++
    $(this).css("background-color", "blue");
    $(this).off(); 
};

function checkP1Match(player1Choices) {
    $('#guesses td').click( function() {
      if (!myTurn) {return;}
      var guessCoOrd = $(this).attr('class') + $(this).parent().attr('class');
      if ( player1Choices.indexOf(guessCoOrd) !== -1 ) {
        $(this).css('background-color', 'red');
      } else {
        $(this).css('background-color', 'green');
      }
      $(this).off();
    
      myTurn = false;
      ref2G.push( {p2: guessCoOrd} );
    })
    };