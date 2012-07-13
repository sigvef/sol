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
            }
            
            function setLoadingBar(completed,fn){
            	tdx.fillStyle = "white";
            	tdx.fillRect(0,0,16*GU,9*GU);
            	tdx.fillStyle = "black";
            	tdx.fillRect(GU, 4.25*GU,14*GU*completed ,GU*0.5);
            	console.log("LOADING",completed);
            	setTimeout(function(){
	            	fn();
	            	if(completed == 1){
	            		tdx.clearRect(0,0,16*GU,9*GU);
		                requestAnimFrame(loop);
	            	}
            	},0);
            }

            function bootstrap(){
            	document.body.webkitRequestFullScreen();
            	document.addEventListener("keydown",function(e){
            		console.log(e.keyCode);
            		if(e.keyCode == /*ESC*/ 27){
            			window.open('', '_self', ''); //bug fix
	            		window.close();	
            		}
            	});
                renderer = new THREE.WebGLRenderer({ maxLights: 10,antialias:true });
				twoDCanvas = document.createElement("canvas");
				twoDCanvas.style.position = "absolute";
				twoDCanvas.style.left = "0";
				twoDCanvas.style.zIndex = "9999";
				twoDCanvas.style.background = "transparent";
				tdx = twoDCanvas.getContext("2d");
                resize();
                document.body.appendChild(renderer.domElement);
                document.body.appendChild(twoDCanvas);
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
                twoDCanvas.width = 16*GU;
                twoDCanvas.height = 9*GU;
                twoDCanvas.style.margin = ((window.innerHeight - 9*GU) /2)+"px 0 0 "+((window.innerWidth-16*GU)/2)+"px";
                tdx.font = (GU/3)+"pt BebasNeue";
                tdx.textBaseline = "top";
            }
            
            window.onresize = resize;
