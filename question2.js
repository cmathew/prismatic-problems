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
	api.listenForFriendChanges(function(data){
		for (var i in data) {
			var friend = data[i].friend;
			switch (data[i].action) {
				case 'add':
					var $newLI = $("<li></li>");
					$newLI.attr('id', 'friend_' + friend.id)
						.text(friend.name);			
					$friendsList.append($newLI);
					break;
				case 'remove':
					break;
				default:
					break;
			}	
		}
	});

    // Part 2 YOUR CODE HERE
});