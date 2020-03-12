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
	

	$scope.new = ()=>
		$scope.cards.push({front: '', back: '', flipped: false});

	$scope.removeAll = ()=>
		$scope.cards = [];

});

$( ()=> {
	$('#flashcards').sortable();
});