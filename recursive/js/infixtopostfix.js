
function isOperator(c) {
	return c == '+' || c == '-' || c == '*' || c == '/' || c == '^';
}

function leftAssoc(c) {
	return c != '^';
}

function priority(c) {
	if (c == '^') return 3;
	if (c == '*') return 2;
	if (c == '/') return 2;
	if (c == '+') return 1;
	if (c == '-') return 1;
	return 0;
}

function rightPriority(c) {
	if (c == '+') return 1;
	if (c == '-') return 2;
	if (c == '*') return 3;
	if (c == '/') return 4;
	if (c == '^') return 5;
	return 0;
}

function infixToPostfix(expr) {

	var i = 0;
	if (typeof expr !== 'string') {
		if (expr instanceof String) {
			expr = expr.toString();
		} else {
			return 'Invalid expression.';
		}
    }
	
	var tokens = expr.match(/(-?[\.\w]+)|[\^()+\-*/]/gi);
	
	var S = [], O = [], tok;

	while (tok = tokens.shift()) {						
		if (tok == '(') S.push(tok);
		else if (tok == ')') {
			while (S.length > 0 && S[S.length - 1] != '(') O.push(S.pop());
			if (S.length == 0) return 'Mismatched parenthesis.';
			S.pop();
		} else if (isOperator(tok)) {			
			while (S.length > 0 && isOperator(S[S.length - 1]) && ((leftAssoc(tok) && priority(tok) <= priority(S[S.length - 1])) || (!leftAssoc(tok) && priority(tok) < priority(S[S.length - 1])))) O.push(S.pop());
			S.push(tok);
		} else {
			O.push(tok);
		}
	}

	while (S.length > 0) {
		if (!isOperator(S[S.length - 1])) return 'Mismatched parenthesis.';
		O.push(S.pop());
	}

	if (O.length == 0) return 'Invalid expression.'

	var s = '';
	for (var i = 0; i < O.length; i++) {
		if (i != 0) s += ' ';
		s += O[i];
	}

	return s;
}

function postfixToInfix(expr) {

	var i = 0;
	var nextToken = function() {
			while (i < expr.length && expr[i] == ' ') i++;
			if (i == expr.length) return '';
			var b = '';
			while (i < expr.length && expr[i] != ' ') b += expr[i++];
			return b;
		};
	var print = function(x) {
			if (typeof(x) == 'string') return x;

			
			var l = print(x.l),
				r = print(x.r);

			if (typeof(x.l) != 'string' && (priority(x.l.op) < priority(x.op) || (x.l.op == x.op && x.op == '^')))
				l = '(' + l + ')';

			if (typeof(x.r) != 'string' && (rightPriority(x.r.op) <= rightPriority(x.op) || (x.l.op == x.op && (x.op == '-' || x.op == '/'))))
				r = '(' + r + ')';

			return l + ' ' + x.op + ' ' + r;
		};

	var S = [], tok;
		
	//while ((tok = nextToken(expr)) != '') {
	while ((tok = nextToken(expr)) != '') {
		if (isOperator(tok)) {
			if (S.length < 2) return 'Invalid expression.';
			S.push({ op: tok, r: S.pop(), l: S.pop() });
		} else {
			S.push(tok);
		}
	}

	if (S.length != 1) return 'Invalid expression.';
	return print(S.pop());
}