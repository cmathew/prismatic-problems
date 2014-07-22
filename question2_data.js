var _dataGenerator = (function() {
	var _friends = [];
	for (var idx=0; idx < 25; ++idx) {
		var f = {id: idx, name: ('Friend ' + (idx+1)), strength: (idx/25)};
		_friends.push(f);		
	}
	var _added = {};
	return {
		getFriendUpdates: function() {			
			var actions = [];
			var n = Math.ceil(Math.random() / 0.33);
			for (var r=0; r < n; ++r) {
				var randIdx = Math.floor(Math.random() * _friends.length);
				var f = _friends[randIdx];
				var act = _added[f.id] ? 'remove' : 'add';
				actions.push({action:act, friend:f});
				if (act == 'add') _added[f.id] = true;
				else delete _added[f.id];
			}
			return actions;
		}	
	}	
})();
