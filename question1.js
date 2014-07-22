
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
		'dependencies': {
			'getUserFriends': undefined,
			'getUserInfo': undefined
		}, 
		'dependenciesLeft': 2,
		'callback': function(){
			userData = [this.dependencies.getUserInfo, this.dependencies.getUserFriends]			
		}
	});

	//listen for tasks in our framework to get completed
	document.addEventListener('taskcomplete', function (e) {	
		//when task is complete, we want to
		//gather its return data and
		//decrement the task's counter
		for (var i = 0; i < tasks.length; i++){			
			if (e.detail.name in tasks[i].dependencies) { 
				tasks[i].dependencies[e.detail.name] = e.detail.value;
				tasks[i].dependenciesLeft--;
			}
		}
		
		//remove tasks we have completed
		//and trigger their callbacks
		var t = 0;
		while (tasks.length && t < tasks.length){
			if (tasks[t].dependenciesLeft === 0) {
				tasks[t].callback();
				tasks.splice(t, 1);
			}
			else {
				t++;
			}
		}
	}, false);	
	
	//utility function for creating custom
	//browser-level events
	var markComplete = function(taskName, returnVal){
		var event;
		event = document.createEvent("CustomEvent");
		//last param allows us to pass arbitrary objects
		event.initCustomEvent('taskcomplete', true, true, {'name': taskName, 'value': returnVal});	
		document.dispatchEvent(event);	
	};
	
	//make both api calls
	api.getUserInfo(function(info){
		markComplete('getUserInfo', info);
	});
	api.getUserFriends(function(friends){
		markComplete('getUserFriends', friends);		
	});	
}
