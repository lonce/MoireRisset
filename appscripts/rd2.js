/* 
Great resource for Dynamnic SVG:
           http://svgdiscovery.com/
*/

require.config({
	paths: {"jsaSound": "https://animatedsoundworks.com"}
});
require(
	["require", "utils", "specularBall", "myRissetBeats"],

	function (require, utils, specBall, sndFactory) {
		// System parameters ---------------------------
		var line_width = 8;
		var line_spacing = 16; 
		var degreesPerS = 4;
		var copacity = 1;
		var lopacity = .75;


		var numDots=1;
		var maxMoveRate=0;

		rbSnd=sndFactory();
		rbSnd.setParam("Spacing", degreesPerS/360);

		var xmlns = "http://www.w3.org/2000/svg";
		var svgelmt = document.getElementById("svg_area");
		
		var m_width = svgelmt.width.baseVal.value;
		var m_height = svgelmt.height.baseVal.value;
		console.log("svgelmet width is  " + m_width);
		console.log("svgelmet height is  " + m_height);

        var myrequestAnimationFrame = utils.getRequestAnimationFrameFunc();
		myID=0;
		console.log("main is loaded");

		//-------------------------------------------
		/*
		var defs = document.createElementNS(xmlns, 'defs');
		
		var myMask = document.createElementNS(xmlns,"mask");
		myMask.setAttribute("id", "myMask");
		myMask.setAttribute("x", 0);
		myMask.setAttribute("y", 0);
		myMask.setAttribute("width", m_width);
		myMask.setAttribute("height", m_height);
		defs.appendChild(myMask);

		var maskrect = document.createElementNS(xmlns, "rect");
		maskrect.setAttribute("x", 0);
		maskrect.setAttribute("y", 0);
		maskrect.setAttribute("width", m_width);
		maskrect.setAttribute("height", m_height);
		maskrect.setAttribute("fill", "black");
		myMask.appendChild(maskrect);

		var unmaskCircle = document.createElementNS(xmlns, "circle");
		unmaskCircle.setAttribute("cx", m_width/2);
		unmaskCircle.setAttribute("cy", m_height/2);
		unmaskCircle.setAttribute("r", m_height/2);
		unmaskCircle.setAttribute("fill", "white");
		myMask.appendChild(unmaskCircle);


		//--------------------------------------------
		var wierdo = document.createElementNS(xmlns, "path");
		wierdo.setAttribute("fill", "orange");
		wierdo.setAttribute("fill-rule", "evenodd");
		wierdo.setAttribute("d", "M50 50 L100 100 L0 100 A50 50 0 0 1 100 100  A50 50 0 0 1 0 100 z")
		//svgelmt.appendChild(wierdo);
		*/
		//--------------------------------------------


		var dots=[];

		svgelmt.onresize = function(e){
			m_width = svgelmt.width.baseVal.value;
			m_height = svgelmt.height.baseVal.value;
		}


		var init = function(){
			for (var i=0;i<numDots;i++){
					//dots[i] = specBall(m_width*Math.random(), m_height*Math.random(), 10+Math.random()*m_width/10, 3, 6);
					dots[i] = specBall(m_width/2, m_height/2, .95*Math.min(m_height/2, m_width/2), line_width, line_spacing, copacity, lopacity);
					dots[i].setDegreesPerS(degreesPerS);
					svgelmt.appendChild(dots[i]);

					// add properties to each element to keep track of rate
					dots[i].xrate= -maxMoveRate+2*maxMoveRate*Math.random();
            		dots[i].yrate= -maxMoveRate+2*maxMoveRate*Math.random();
 				}
		}



		init();
		rbSnd.setParam("play", 1);
		//svgelmt.appendChild(wierdo);

		var j=0;
		var xpos, ypos;
		
		var animate=function(){
			myrequestAnimationFrame(animate);
			//console.log("animate " + j++);
			for (var i=0;i<numDots;i++){
				dots[i].setProp("cx", dots[i].getProp("cx") + dots[i].xrate);
				dots[i].setProp("cy",  dots[i].getProp("cy") + dots[i].yrate);

				xpos = dots[i].getProp("cx");
				ypos = dots[i].getProp("cy");
                // assign6.9: keep the object on the paper
                if (xpos >= m_width+dots[i].getProp("r")) {dots[i].setProp("cx",  -dots[i].getProp("r"))};
                if (ypos >= m_height+dots[i].getProp("r")) {dots[i].setProp("cy",  -dots[i].getProp("r"))};
                if (xpos < -dots[i].getProp("r")) {dots[i].setProp("cx", m_width+dots[i].getProp("r"))};
                if (ypos < -dots[i].getProp("r")) {dots[i].setProp("cy", m_height+dots[i].getProp("r"))};
			}
		}

		//--------------------------------------------

		myrequestAnimationFrame(animate);

	}
);