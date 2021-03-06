tree = new BST();
      vGap = 40;
      radius = 20;

      function draw() {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext("2d");

        // Reset size will clear the canvas, but not for IE9
        canvas.width = window.innerWidth - 820 - 20;
        canvas.height = 500; // window.innerHeight - 180;
        context.clearRect(0, 0, canvas.width, canvas.height); // For IE 9

        context.font = "14px sans-serif";
        context.strokeStyle = "#100"; // Set a pen color

        if (tree.isEmpty()) {
          context.fillText("tree is empty", canvas.width / 2 - 50, 15);
        }
        else {
          x = canvas.width / 2;
          y = 30;

          drawTree(context, x, y, radius, tree.root, canvas.width / 4);
        }

        context.stroke();
      }

      function drawTree(context, x, y, radius, root, hGap) {
        context.fillText(root.element + "", x - 5, y + 5);
        context.arc(x, y, radius, 0, Math.PI * 2, false);

        if (root.left != null) {
          connectTwoCircles(context, x, y, x - hGap, y + vGap);
          context.moveTo(x - hGap + radius, y + vGap);
          drawTree(context, x - hGap, y + vGap, radius, root.left, hGap / 2);
        }

        if (root.right != null) {
          connectTwoCircles(context, x, y, x + hGap, y + vGap);
          context.moveTo(x + hGap + radius, y + vGap);
          drawTree(context, x + hGap, y + vGap, radius, root.right, hGap / 2);
        }
      }

      // Connect two circles centered at (x1, y1) and (x2, y2) 
      function connectTwoCircles(context, x1, y1, x2, y2) {
        var d = Math.sqrt(vGap * vGap + (x2 - x1) * (x2 - x1));
        var x11 = x1 - radius * (x1 - x2) / d;
        var y11 = y1 - radius * (y1 - y2) / d;
        var x21 = x2 + radius * (x1 - x2) / d;
        var y21 = y2 + radius * (y1 - y2) / d;
        context.moveTo(x11, y11);
        context.lineTo(x21, y21);
      }

      
      function insert() {
        var value = document.getElementById('input_grammar').value;
        var value1 = value.substr(1).slice(0,-1);
        console.log("Hello git -"+value1);
        var value12 = infixToPostfix(value1+"");
        console.log("postfix value - "+value12);
        value12 = value12.replace(/\s/g,'');
        
        
        console.log("d2 "+value12);

        if (value12 == "") {
          jAlert("no key entered");
        }
        else {
		var len = 0;
		while(len<value12.length)
		{
		   console.log("Hello + "+ value12.charAt(len));
		  tree.insert(value12.charAt(len));
          draw();
		  len++;
		}
		}
      }

      function drawArrowLine(context, x1, y1, x2, y2) {
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);

        // find slope of this line
        var slope = (y1 - y2) / (x1 - x2);

        var arctan = Math.atan(slope);

        // This will flip the arrow 45 off of a
        // perpendicular line at pt x2
        var set45 = 1.57 / 2;

        // arrows should always point towards i, not i+1
        if (x1 < x2) {
          // add 90 degrees to arrow lines
          set45 = -1.57 * 1.5;
        }

        // set length of arrows
        var arrlen = 15;

        // draw arrows on line
        context.moveTo(x2, y2);
        context.lineTo(x2 + Math.cos(arctan + set45) * arrlen,
                y2 + Math.sin(arctan + set45) * arrlen);

        context.moveTo(x2, y2);
        context.lineTo(x2 + Math.cos(arctan - set45) * arrlen,
                y2 + Math.sin(arctan - set45) * arrlen);
      }

      

