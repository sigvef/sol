Array.prototype.remove = function(from, to) {
      var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
          return this.push.apply(this, rest);
};
            window.requestAnimFrame = (function(){
                return  window.requestAnimationFrame       || 
                window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame    || 
                window.oRequestAnimationFrame      || 
                window.msRequestAnimationFrame     || 
                function( callback ){
                    window.setTimeout(callback, 0);
                };
            })();

            function loop(){
                dt += (time-old_time);
                old_time = time;
                time = new Date();
                dt = dt%1000;
                while(dt>20){
                    update();
                    t++;
                    dt-=20;
                }
                render(x);
                requestAnimFrame(loop);
            }


            function start(){
                time = new Date();
                old_time = time;
                t = 0;
                dt = 0;
                init();
                requestAnimFrame(loop);
            }

            function bootstrap(){
                c = document.createElement("canvas");
                gl = x = c.getContext("2d");
                resize();
                document.body.appendChild(c);
                setTimeout(start,0);
            }



            function resize(){
                if(window.innerWidth/window.innerHeight > 16/9){
                    GU = (window.innerHeight/9);
                    }else{
                    GU = (window.innerWidth/16);
                }
                c.width = 16*GU;
                c.height = 9*GU;
                c.style.margin = ((window.innerHeight - c.height) /2)+"px 0 0 "+((window.innerWidth-c.width)/2)+"px";
            }
            window.onresize = resize;
