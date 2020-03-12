let app1 = angular.module('app1', []);

app1.controller('ctrl1', ($scope)=> {

	log = ()=> {
		for($card of $scope.cards)
			console.log($card);
	}

	$scope.flip = (card) =>
		card.flipped = !card.flipped;

	$scope.remove = (card)=> 
		$scope.cards = $scope.cards.filter(obj=> obj.front!=card.front || obj.back!=card.back);
	

	$scope.new = ()=> {
		$scope.cards.push({front: '', back: '', flipped: false});

		if(! $('#sort-drag-switch').is(':checked') )
			setTimeout( ()=> $('.flashcard').draggable({grid:[40,40]}), 100);
	}

	$scope.removeAll = ()=>
		$scope.cards = [];

});

let positions = {};


$( ()=> {
	$('#flashcards').sortable();

	$('#sort-drag-switch').change( ()=> {
		if($('#sort-drag-switch').is(':checked') ) {
			$('label[for=sort-drag-switch]').html('Sort');
			$('#flashcards').sortable();
			$('.flashcard').draggable('disable');
			// revertPositions();
			setupSort();
		}
		else {
			$('label[for=sort-drag-switch]').html('Drag');
			$('#flashcards').sortable('disable');
			$('.flashcard').draggable({grid:[40,40]});
			// rememberPositions();
		}
	});



});

// make new script for drag/sort stuff
// and new script for download/upload (file format is key:value\n)

function setupSort() {
	$('.flashcard').each(function(idx,el) {
		$(el).animate({position: 'relative'}, 500);
	});
}

function rememberPositions() {
	$('.flashcard').each(function(idx,el) {
		console.log($(el).css('left') );
		positions[$(el).attr('id')] = {position:'absolute', left: $(el).css('left'), top: $(el).css('top')};
		$(el).css(positions[$(el).attr('id')]);
	});
}

function revertPositions() {
	$('.flashcard').each(function(idx,el) {
		$(el).animate(positions[$(el).attr('id')], 500);
	});
}

