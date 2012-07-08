FRAME_LENGTH = 882;
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
                dt += (t-old_time);
                old_time = t;
                while(dt> FRAME_LENGTH){
                    update();
                    dt-= FRAME_LENGTH;
                }
                render();
                requestAnimFrame(loop);
            }


            function start(){
                time = 0;
                old_time = time;
                dt = 0;
                init();
                requestAnimFrame(loop);
            }

            function bootstrap(){
                renderer = new THREE.WebGLRenderer({ maxLights: 10,antialias:true });
                resize();
                document.body.appendChild(renderer.domElement);
                setTimeout(start,0);
            }


            function resize(){
                if(window.innerWidth/window.innerHeight > 16/9){
                    GU = (window.innerHeight/9);
                    }else{
                    GU = (window.innerWidth/16);
                }
                renderer.setSize(16*GU, 9*GU);
                renderer.domElement.style.margin = ((window.innerHeight - 9*GU) /2)+"px 0 0 "+((window.innerWidth-16*GU)/2)+"px";
            }
            
            window.onresize = resize;
