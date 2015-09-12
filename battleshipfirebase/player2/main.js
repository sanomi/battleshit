'use strict';

var ref = new Firebase('https://qnbattleship.firebaseio.com/');

$(document).ready(init);

function init() {
	ref.remove();
	$('button').click(function() {ref.remove();});
	$('td').click(coChooser);
	ref.on("value", getData);
	// ...
}

function coChooser() {
	var co = $(this).attr('class') + $(this).parent().attr('class');
    $(this).addClass('ship');
	console.log(co);
	ref.push( {co: co });
    
}

function getData(snapshot) {
	var snapshot = snapshot.val();
  console.log(snapshot);
}


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

