function chkstring() {
	var flag = 0;
	var expr = document.getElementById('input_grammar').value;
	
	if(expr.charAt(0)=='$' && expr.charAt(expr.length-1)=='$')
	{
	var expr = expr.substr(1).slice(0,-1);
	var n = expr.length-1;
	flag = 1;
	}
	else
	{
		jAlert("please enter valid string $a+b*c$");
	}

	var index;
	if(flag==1)
	{
		if(expr=="")
		{
			jAlert("String is empty! please enter valid string");
		}
		else if(expr.length==1 && isLetter(expr.charAt(0)))
		{
			jAlert("Please enter valid string");
		}
		else{
		while(n>=0)
		{
			if(isLetter(expr.charAt(n))){
				index = expr.indexOf(expr.charAt(n)+"");
				expr = expr.replace(expr.charAt(n)+"", "(1)");
			}
			n--;
		}
		try
		{
		val = parseFloat(eval(expr));
		if(!isNaN(val))
		{
			makeTable();
			//alert("valid string");
		}
		}
		catch (err)
		{
		jAlert("Please enter valid expression");
		}
		}
	}
}


function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}