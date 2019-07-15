function checkvalid() {
	var a = document.frm.tnames.value;
	var b = document.frm.dateselecttx.value;
	var c = document.frm.priority.value;
	
	console.log(a);
	console.log(b);
	console.log(c);
	if( a==='' || b==='' || c==='select an option')
		{
			alert("Please enter value");
			return false;
		}
	else{
		return true;
	}
}

function alertford(){
	alert("Your text file is ready (E:\Tasks)");
}

function generaterema(){
	alert("Your text file is ready (E:\Tasks)");
}