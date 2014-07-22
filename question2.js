var api = {

	submitUserChanges: function(updated) {

	},

	listenForFriendChanges: function(listener) {
		setInterval(function() {
			listener(_dataGenerator.getFriendUpdates());
		}, 5000);
	}
}

$(document).ready(function() {
    // Part 1 YOUR CODE HERE
		
	var $friendsList = $('#friends-list').empty();
	var selectedFriends = [];
	var $deleteFriendButton = $('#delete-friends');

	$friendsList.on('click', '.friend-listing', function(e){
		var $friend = $(this);		
		$friend.toggleClass('pending');
		if ($friend.hasClass('pending')){
			$friend.css('color', 'red');
			selectedFriends.push($friend);
		}
		else {
			$friend.css('color', '');
			selectedFriends.splice(selectedFriends.indexOf($friend), 1);
		}
		
		if (selectedFriends.length) {
			$deleteFriendButton.show();
		}
		else {
			$deleteFriendButton.hide();		
		}
	});

	api.listenForFriendChanges(function(data){
		for (var i in data) {
			var friend = data[i].friend;
			switch (data[i].action) {
				case 'add':
					var $newLI = $("<li class='friend-listing'></li>");
					$newLI.attr('id', 'friend_' + friend.id)
						.text(friend.name)
						.data('strength', friend.strength);
					$friendsList.append($newLI);
					break;
				case 'remove':
					$('#friend_' + friend.id).remove();
					break;
				default:
					console.log('api action not implemented' + data[i].action)
					break;
			}	
		}
	});

    // Part 2 YOUR CODE HERE
});