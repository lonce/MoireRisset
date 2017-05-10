define(
    ["utils"],
    function(utils){
    	var xmlns = "http://www.w3.org/2000/svg";
    		
    	return function (cx, cy, r, line_width, line_spacing, copacity, lopacity, initAngle){  // ball factory
	        if (initAngle === undefined) initAngle=0;

	        var ball = {
	        };

	        var myrequestAnimationFrame = utils.getRequestAnimationFrameFunc();


	        var strokeWidth=1;

	        var svgCont = document.createElementNS(xmlns,"svg");
	        svgCont.setAttribute("x", cx-r);
	        svgCont.setAttribute("y", cy-r);
	        svgCont.setAttribute("width", 2*r);
	        svgCont.setAttribute("height", 2*r);

	        var ball=document.createElementNS(xmlns,"circle");

			ball.style.fill="white";
			ball.style.stroke="black";
			ball.r.baseVal.value = r-strokeWidth;
			ball.cx.baseVal.value = r;
			ball.cy.baseVal.value = r;
			ball.setAttribute("stroke-width", strokeWidth);
			ball.setAttribute("fill-opacity", copacity);
			svgCont.appendChild(ball);

			mkgridon(svgCont, ball, 0,  0,  2*r, 2*r, line_width, line_spacing, lopacity);

			// grouped so that we can animate them together
			var g   = document.createElementNS(xmlns, "g"); 
			g.setAttribute('id', 'group');
			g.setAttribute('shape-rendering', 'inherit');
	        g.setAttribute('pointer-events', 'all');
	        svgCont.appendChild(g);

			mkgridon(g, ball, 0,  0,  2*r, 2*r, line_width, line_spacing, lopacity);

			//-------------------------------------------
			// give our svg element "circle properties"
	        svgCont.cx = cx;
	        svgCont.cy = cy;
	        svgCont.r = r;
	        svgCont.setProp = function(p, val) {
	        	
	        	if (p==="cx"){
	        		svgCont.setAttribute("x", val-ball.getAttribute("r"));
	        		svgCont[p] = val;
	        		return;
	        	}
	        	if (p==="cy"){
	        		svgCont.setAttribute("y", val-ball.getAttribute("r"));
	        		svgCont[p] = val;
	        		return;
	        	}
	        	if (p==="r"){
	        		svgCont.setAttribute("width", 2*r);
	        		svgCont.setAttribute("height", 2*r);
	        		svgCont[p] = val;
	        		return;
	        	}
	        	// otherwise assume they are trying to set an actaul svg property
				svgCont.setAttribute(p, val);
	        }

	        svgCont.getProp = function(p){
	        	if (p==="cx"){
	        		return svgCont.cx;
	        	}
	        	if (p==="cy"){
	        		return svgCont.cy;
	        	}
	        	if (p==="r"){
	        		return svgCont.r;
	        	}
	        	return svgCont.getAttribute(p)

	        }
			// ------------------------------------------
			// Animation
			var initAngle = initAngle; 
			var angle=initAngle;
			var start=null;
			var tms = 0;
			var rotDegPerMs = .02;

			svgCont.setDegreesPerS = function(dps){
				rotDegPerMs=dps/1000;
			}


			var animate=function(timestamp){
				if (!start) start = timestamp; // first time through
				tms = timestamp-start;
				myrequestAnimationFrame(animate);
				g.setAttribute("transform"," rotate(" + angle + " " +  r + "," + r + " )")

				angle = initAngle + tms*rotDegPerMs;
			}

			myrequestAnimationFrame(animate);

		return svgCont;
		}

		function mkgridon(app_obj, cir, minx, miny, width, height, line_width, line_spacing, gopacity){
			if (gopacity === undefined) gopacity=1;

			var vy, hx;
			var line;
			var tempd;

			var vnumLines = Math.ceil(width/line_spacing);
			var hnumLines = Math.ceil(height/line_spacing);

			var intercept = [];

			//console.log("in mkgridon, will make " + numLines + " lines");

			for (var i=0;i<vnumLines;i++){
				
					vy= minx + i*line_spacing;
 					intercept = utils.circleLineIntersection(cir.cx.baseVal.value, cir.cy.baseVal.value, cir.r.baseVal.value, vy, miny, vy, (miny + height) );
 					if (intercept.length <=0) continue;
 					line=document.createElementNS(xmlns,"path");
 					tempd = "M"+ intercept[0].x + "," + intercept[0].y + " L" + intercept[1].x + "," + intercept[1].y;
 					//tempd = "M"+ vy + "," + miny + " L" + vy + "," + (miny + height);
 					//console.log("make V line: " + tempd);
 					//console.log("...circle intersections : " + circleLineIntersection(cir.cx.baseVal.value, cir.cy.baseVal.value, cir.r.baseVal.value, vy, miny, vy, (miny + height) ))
					line.setAttribute("d", tempd)
					line.setAttribute("stroke", "black");
					line.setAttribute("stroke-width", line_width);
					line.setAttribute("opacity", gopacity);

            		app_obj.appendChild(line);
            	}

			for (var i=0;i<hnumLines;i++){
					hx= miny + i*line_spacing;
					intercept = utils.circleLineIntersection(cir.cx.baseVal.value, cir.cy.baseVal.value, cir.r.baseVal.value, minx, hx, (minx+width), hx );
 					if (intercept.length <=0) continue;
 					line=document.createElementNS(xmlns,"path");
 					tempd = "M"+ intercept[0].x + "," + intercept[0].y + " L" + intercept[1].x + "," + intercept[1].y;
 					//console.log(" make H line: " + tempd);
					line.setAttribute("d", tempd )
					line.setAttribute("stroke", "black");
					line.setAttribute("stroke-width", line_width);
					line.setAttribute("opacity", gopacity);

            		app_obj.appendChild(line);
 				}
		}

	}
);