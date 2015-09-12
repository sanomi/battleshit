'use strict';
var ref1 = new Firebase('https://qnbattleship.firebaseio.com/player1');
var ref2 = new Firebase('https://qnbattleship.firebaseio.com/player2');
var refC = new Firebase('https://qnbattleship.firebaseio.com/counter');
var player2Choices = [];
var maxShip = 0;
var counter = 0;
$(document).ready(init);
function init() {
	ref1.remove();
	$('button').click(function() {ref1.remove();});
  $('#placeBoats td').on('click', selectShips);
  ref1.on('child_added', player1CoOrdSend);
  console.log(player2Choices);
  player2CoOrd();
}
function player1CoOrdSend(snapshot) {
  var message = snapshot.val();
  console.log(message.co);
}
function player2CoOrd() {
  ref2.on('child_added', function(snapshot) {
    var message = snapshot.val();
    console.log(message.co);
    player2Choices.push(message.co);
    console.log(player2Choices);
    if ( player2Choices.length === 2 ) {
    checkP2Match(player2Choices);
    }
});
};
  function selectShips(){
  if (maxShip === 2) {
  alert("Out of Ships");
  $(this).off()
  return;
  }
    var co = $(this).attr('class') + $(this).parent().attr('class');
    $(this).addClass('ship');
    ref1.push( {co: co }); 

    maxShip++
    $(this).css('background-color', 'blue');
    $(this).off()
}
function checkP2Match(player2Choices) {
  $('#guesses td').click( function() {
    counter++;
    refC.remove();
    refC.set({counter: counter});
    refC.on('value', function(snapshot) {
    var message = snapshot.val();
    return message;
  });
    var guessCoOrd = $(this).attr('class') + $(this).parent().attr('class');
    if ( player2Choices.indexOf(guessCoOrd) !== -1 ) {
      $(this).css('background-color', 'red')
    } else {
      $(this).css('background-color', 'green')
    }
  })
}
