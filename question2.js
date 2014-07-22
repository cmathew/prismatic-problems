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

    // Part 2 YOUR CODE HERE
});