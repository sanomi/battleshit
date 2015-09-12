'use strict';
var ref1 = new Firebase('https://qnbattleship.firebaseio.com/player1');
var player2Choices = [];
var maxShip = 0;
$(document).ready(init);
function init() {
  var status = 'not ready';
	ref1.remove();
	$('button').click(function() {ref1.remove();});
	$('#placeBoats td').click(player1Chooser);
  $('#placeBoats td').on('click', selectShips);
  ref1.on('child_added', player1CoOrdSend);
  console.log(player2Choices);
  player2CoOrd();
}
function player1CoOrdSend(snapshot) {
  var message = snapshot.val();
  console.log(message.co);
}

function player1Chooser() {
	var co = $(this).attr('class') + $(this).parent().attr('class');
    $(this).addClass('ship');
	ref1.push( {co: co });    
}
function player2CoOrd() {
  var ref2 = new Firebase('https://qnbattleship.firebaseio.com/player2');
  ref2.on('child_added', function(snapshot) {
    var message = snapshot.val();
    console.log(message.co);
    player2Choices.push(message.co);
    console.log(player2Choices);
    if ( player2Choices.length === 15 ) {
    checkP2Match(player2Choices);
    }
});
};
  function selectShips(){
  if (maxShip >=15) {
  alert("Out of Ships");
  var status = 'ready'
  return status;
  }
    maxShip++
    $(this).css('background-color', 'blue');
    $(this).off()
}
function checkP2Match(player2Choices) {
  $('#guesses td').click( function() {
    var guessCoOrd = $(this).attr('class') + $(this).parent().attr('class');
    if ( player2Choices.indexOf(guessCoOrd) !== -1 ) {
      $(this).css('background-color', 'red')
    } else {
      $(this).css('background-color', 'green')
    }
  })
}
