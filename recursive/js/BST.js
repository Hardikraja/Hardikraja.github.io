// Constructor for BST
function BST() {
    this.root = null;
    this.size = 0;
}


// Constructor for Node
function TreeNode(e) {
    this.element = e;
    this.left = null;
    this.right = null;
}

var flag=0;
var t1 = null;
var t2 = null;
var stack = [];
var stacknode = [];
var current1;
// Insert a new element e
BST.prototype.insert = function(e) {
	if(isLetter(e))
	{
		console.log("Yes");
		stack.push(e);
		stacknode.push(this.createNewNode(e));
		console.log(stack);
		console.log("Stacknode "+stacknode);
	}
	else
	{
		console.log("no");
		t1=stacknode.pop();
		t2=stacknode.pop();
		console.log(t1);
		console.log(t2);
		this.root=this.createNewNode(e);
		var current = this.root;
		current.left = t2;
		current.right = t1;
		stacknode.push(current);
		console.log(stack);
		console.log("Stacknode "+stacknode);
	}
    this.size++;
    return true; // Element inserted
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

BST.prototype.createNewNode = function(e) {
    return new TreeNode(e);
}


// Return true if the tree is empty 
BST.prototype.isEmpty = function() {
    return this.root == null;
}
