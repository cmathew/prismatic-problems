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
					//append representation of friend
					var $newLI = $("<li class='friend-listing'></li>");
					$newLI.attr('id', 'friend_' + friend.id)
						.text(friend.name)
						.data('strength', friend.strength); //seemingly does not need to be in DOM
					$friendsList.append($newLI);
					break;
				case 'remove':
					$('#friend_' + friend.id).remove(); //no representation in memory to update, so just change DOM
					break;
				default:
					console.log('api action not implemented' + data[i].action)
					break;
			}	
		}
	});

    // Part 2 YOUR CODE HERE
	var selectedFriends = 0;
	var $deleteFriendButton = $('#delete-friends');

	//when user clicks delete button
	//remove all selected friends
	$friendsList.on('click', '.friend-listing', function(e){
		var $friend = $(this);		
		//toggle a state class to indicate
		//element is marked for delete
		$friend.toggleClass('pending');
		if ($friend.hasClass('pending')){
			$friend.css('color', 'red');
			selectedFriends++;
		}
		else {
			//don't have access to css
			//so modify inline style
			$friend.css('color', '');
			selectedFriends--;
		}
		
		//button only appears if at least one friend
		//is marked for deletion
		if (selectedFriends) {
			$deleteFriendButton.show();
		}
		else {
			$deleteFriendButton.hide();		
		}
	});
	
	$deleteFriendButton.click(function(){
		var changes = [];
		//batch all changes into one API call
		$('.pending').each(function(index) {
			var $el = $(this);
			changes.push({action: 'remove', friend: {
				'id': $el.attr('id'),
				'strength': $el.data('strength'),
				'name': $el.text()}});
				
			//DOM removes will be done synchronously,
			//rather than awaiting response from API
			$el.remove();
		});
		
		api.submitUserChanges(changes);
	});	
});