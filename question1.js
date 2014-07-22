
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
	
	var tasks = [];
	tasks.push({
		'dependencies': [
			'getUserFriends',
			'getUserInfo'
		], 
		'callback': function(){
			alert('hey');
		}
	});

	// Listen for the event.
	document.addEventListener('taskcomplete', function (e) {	
		for (var i = 0; i < tasks.length; i++){
			var taskIndex = tasks[i].dependencies.indexOf(e.detail);
			if (taskIndex !== -1) { 
				tasks[i].dependencies.splice(taskIndex, 1);
			}
		}
		
		var t = 0;
		while (tasks.length && t < tasks.length){
			if (tasks[t].dependencies.length === 0) {
				tasks[t].callback();
				tasks.splice(t, 1);
			}
			else {
				t++;
			}
		}
	}, false);	
	
	var markComplete = function(taskName){
		var event; // The custom event that will be created
		event = document.createEvent("CustomEvent");
		event.initCustomEvent('taskcomplete', true, true, taskName);	
		document.dispatchEvent(event);	
	};
	
	api.getUserInfo(function(info){
		markComplete('getUserInfo');
	});
	api.getUserFriends(function(friends){
		markComplete('getUserFriends');		
	});	
}
