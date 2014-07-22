// You will be given a tree, where each node 
// has a function associated with it. Each function will take a single
// 'callback function' argument that it will call once it's async operation
// has completed. So they look like this:

// function(onComplete) { ... do some stuff and call onComplete() when done ...  }


// The functions at each node are meant to be executed in a particular order:
// a function can only begin execution after each of its children node's 
// function have completed (called the callback function they were executed with). 
// The siblings can be 'executing' at the same time.

// A node will be represented as an array where the first element
// is the function at that node and the rest of the array are children:

//  [f1, [f2, f3], f4, f5]

// So in this example f3 must complete before f2 can start and f2,f4, and f5 
// must complete before f1 can start


// tree is either an array or a function (tree leaf)
// execute the functions in tree and call onComplete
// when the root function has finished
function executeTree(tree, onComplete) {
	// YOUR CODE HERE
	var index = tree.length - 1;
	var current = tree[index];
	if (typeof(current) == 'function') {		
		current(function(){
			if (index >= 1) {
				callTree(tree[index - 1], onComplete); 
			}
			else {
				onComplete();
			}
		}	
	}
	else {
		callTree(current, function(){
			if (index >= 1) {
				callTree(tree[index - 1], onComplete); 
			}
			else {
				onComplete();
			}			
		});
	}
}
