'use strict';

var ref1 = new Firebase('https://qnbattleship.firebaseio.com/player1');
// var ref2 = new Firebase('https://qnbattleship.firebaseio.com/player2');
var player2Choices = []
$(document).ready(init);

function init() {
	ref1.remove();
	$('button').click(function() {ref1.remove();});
	$('td').click(player1Chooser);
  player2CoOrd();

    ref1.on('child_added', function(snapshot) {
    var message = snapshot.val();
    console.log(message.co);
  });

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
});
};

var maxShip = 0;
$('table').on('click', 'td', function(){
  if (maxShip >=15) {
  alert("Out of Ships");
  return;
  }
  
  
  var addShip = $(this).addClass('active');
    maxShip++
    
    $("td").addClass(addShip);
    });

