define(
    [],
        function(){
            var utils = {};
    		// utilities
		    // Until requestAnimationFrame comes standard in all browsers, test
            // for the prefixed names as well.

            utils.getRequestAnimationFrameFunc = function() {
                try {
                    return (window.requestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.msRequestAnimationFrame ||
                            (function (cb) {
                                setTimeout(cb, 1000/60);
                            }));
                } catch (e) {
                    return undefined;
                }
            };


            utils.getCanvasMousePosition = function (canvas, evt) {
                var rect = canvas.getBoundingClientRect();
                //context.scale(1, 0.5);
                var bbox = canvas.getBoundingClientRect();
                return {
                x: (evt.clientX - rect.left)*(canvas.width/bbox.width),
                y: (evt.clientY - rect.top)*(canvas.height/bbox.height)
                };
            }

        utils.circleLineIntersection = function(cx, cy, r, x1, y1, x2, y2){
            // shift so circle is at (0,0)
            var sx1=x1-cx;
            var sy1=y1-cy;
            var sx2=x2-cx;
            var sy2=y2-cy;

            var r_squared=r*r;
            var dx = sx2-sx1;
            var dy = sy2-sy1;
            var dr_squared = dx*dx + dy*dy;
            var dr = Math.sqrt(dr_squared);
            var D = sx1*sy2-sx2*sy1;
            var D_squared=D*D;
            var delta = r_squared*dr_squared-D_squared;
            var temp;

            if (delta < 0) {
                return [];
            }

            temp = Math.sqrt(delta);

            /* for debugging 
            var p1 = {
                    x:  (D*dy + sgn(dy)*dx*temp)/dr_squared + cx, 
                    y:  (-D*dx + Math.abs(dy)*temp)/dr_squared + cy};
            var p2 = {
                    x:  (D*dy - sgn(dy)*dx*temp)/dr_squared + cx,
                    y:  (-D*dx - Math.abs(dy)*temp)/dr_squared + cy};
            */

            return [
                {
                    x:  (D*dy + utils.sgn(dy)*dx*temp)/dr_squared + cx, 
                    y:  (-D*dx + Math.abs(dy)*temp)/dr_squared + cy},
                {
                    x:  (D*dy - utils.sgn(dy)*dx*temp)/dr_squared + cx,
                    y:  (-D*dx - Math.abs(dy)*temp)/dr_squared + cy}
                    ];
        }

        utils.sgn = function (x) {return x < 0 ? -1 : 1}
            return utils;
});
