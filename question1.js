
/**
 *   api.getUserInfo(callback) - callback will take a user info object
 *
 *	 api.getUserFriends(callback) - callback will take a user friends array
 */
var api = (function() {

	function randResponseFn(data, maxWaitSecs) {
		return function(callback) {
			var waitTime = maxWaitSecs * Math.random();
			setTimeout(function() {
				callback(data);
			}, waitTime);
		}
	}

	return {
		getUserInfo: randResponseFn({name: "Prismatic Applicant", id: 42}, 5 * 1000),

		getUserFriends: randResponseFn([{name: "IP Freely", id:43}, {name: "Plato", id:44}],2 * 1000)		
	}
	
})();



window.onload = function() {
	// Question 1 YOUR CODE HERE
	// Populate userData var as array with responses from
	// api.getUserInfo then api.getUserFriends then popup an alert 
	// with the user's name (the userInfo.name property).
	// NOTE: Do not make serial nested calls to api.getUserInfo
	// and api.getUserFriends, both calls needs to be going 
	// in parallel.	
	var userData = [null, null];
	api.getUserInfo(function(info){
		api.getUserFriends(function(friends){
			console.log(info, friends);
		});
	});	

	
}
