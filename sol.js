DEBUG = false;
ORIGO = new THREE.Vector3(0, 0, 0);
cameraMovementDone = true;

TEXTS = [
        "HONEYCOMB BY NINJADEV",
        "(OUR FIRST DEMO EVER :3)",
        "SOME TEXT HERE, YO",
        "SOFTWARE-RENDERED 3D CUBE ON A 2D GRID OF 3D HEXAGONS :P"
         ];

active_scene = 0;
/* please specify these in chrono order! */
/* yes, because i am lazy */
SCENES = [
          /* introduction */
         new Scene(0,266240, function(){
			updateHexagonGrid();
			lyte.update();
			osd.update();
			if(cameratarget != ORIGO) cameratarget = ORIGO;
         },
         function(){
         },
         function(){
         }),
         
         /* follow the lyte */
         new Scene(266240, 608256, function(){
			updateHexagonGrid();
			lyte.update();
			osd.update();
         },
         function(){
         },
         function(){
        	 cameratarget = lyte.lyte.position;
        	 osd.show(TEXTS[1]);
         }),
         
         /* some other scene */
         new Scene(608256, 1300480, function(){
			updateHexagonGrid();
			camera.position.x = 200*Math.sin(t/40000);
			camera.position.z = 200*Math.cos(t/40000);
			camera.position.y-= 0.2;
			lyte.update();
			osd.update();
         },
         function(){
         },
         function(){
        	 cameratarget = ORIGO;
         }),
         
         /* need some content here */
         new Scene(1300480,1998848,function(){
			updateHexagonGrid();
			lyte.update();
			osd.update();
         },
         function(){
         },
         function(){
        	 cameratarget = ORIGO;
        	 newCameraMovement(100000,0,300,0);
        	 osd.show(TEXTS[2]);
         }),
         
         /* 3d2d3d */
         new Scene(1998848, 2686976, function(){
			updateHexagonGrid();
			kewbe.update();
			osd.update();
			lyte.update();
         },function(){
        	kewbe.render();
         },function(){
        	 cameratarget = ORIGO;
        	 osd.show(TEXTS[3]);
         }),
         
         /* 2686976 */
         
         /* our names or something */
        new Scene(2686976 ,4071424,function(){
        	someRandomHexagonGridEffect();
			camera.position.y-= 0.2;
			osd.update();
			lyte.update();
        },function(){
        	
        },function(){
        	 cameratarget = ORIGO;
        }),
        
        /* fade to black and exit or whatever */
        new Scene(4071424,6000000,function(){
        	
        },function(){
        	
        },function(){
        	fadeOut(44100);
        })
          ];
		

STIAJE = {data:"RBYDXCDBCDCCBCBCBCBCBJBCBCBCBCBCBCBCCCBCBCBCBCBCBDCEBCBCBFBCBDBDCDBCBCBCBCBCCCBBBDECBCEICFBFBCCDCBFDDBDCF",w:25,h:11};
IVERJO= {data:"TB\\D[CLBFBDBBCBCDBCCBFBEBCBCBCBHBCBCBCBBBCBCBCBCBEBCBCBDCCBCBCBCBEBCBCBDCECCBCBEBCBCBCDCBCECBEBCBCBEBCBCBCBHBCBCCDBFBCCDRBL",w:28,h:12};


/* smoothstep interpolaties between a and b, at time t from 0 to 1 */
function smoothstep(a, b, t) {
	var v = t * t * (3 - 2 * t);
	return b * v + a * (1 - v);
};

function lerp(a, b, t) {
	return b * t + a * (1 - t);
}

function drawImage(img,startx,starty){
	var x = startx+1;
	var y = starty;
	var on = false;
	for(var i=0;i<img.data.length;i++){
		var num = img.data.charCodeAt(i)-65;
		while(num-->0){
			if(on) cubes[(side-x-1)*side+y].mesh.position.y = 25+5*Math.sin(x/4+t/4000);
			cubes[(side-x-1)*side+y].mesh.material = materials[+on];
			x++;
			if(x>startx+img.w){
				x = startx+1;
				y++;
			}
		}
		on = !on;
	}
}

function newRandomCameraMovement(movementTime){
	newCameraMovement(movementTime,
		600*(Math.random()-0.5),
		600*(Math.random()-0.5),
		600*(Math.random()-0.5),
		600*(Math.random()-0.5),
		600*(Math.random()-0.5),
		600*(Math.random()-0.5)
	);
}

function newCameraMovement(movementTime, posx, posy, posz, rotx, roty, rotz, tarx,tary,tarz){
	cameraMovementDone = false;
	deepCopy3DObject(camera, startcamera);
	startcamera.time = t;
	
	goalcamera.position.x = posx;
	goalcamera.position.y = posy;
	goalcamera.position.z = posz;
	
	goalcamera.rotation.x = rotx;
	goalcamera.rotation.y = roty;
	goalcamera.rotation.z = rotz;
	
	cameratarget.x = tarx || 0;
	cameratarget.y = tary || 0;
	cameratarget.z = tarz || 0;
	
	//var samples_per_quaver = midi.ticks_per_beat / midi.ticks_per_second * 44100;
	goalcamera.time = t+movementTime;
	
}

function deepCopy3DObject(from, to){
	to.position.x = from.position.x;
	to.position.y = from.position.y;
	to.position.z = from.position.z;
	
	to.rotation.x = from.rotation.x;
	to.rotation.y = from.rotation.y;
	to.rotation.z = from.rotation.z;
}

function update() {
	/* interpolate camera movement */
	if(!cameraMovementDone){
		var interpolt = (t-startcamera.time)/(goalcamera.time-startcamera.time);
		if(interpolt >=0 && interpolt < 1){
			camera.position.x = smoothstep(startcamera.position.x, goalcamera.position.x, interpolt);
			camera.position.y = smoothstep(startcamera.position.y, goalcamera.position.y, interpolt);
			camera.position.z = smoothstep(startcamera.position.z, goalcamera.position.z, interpolt);
			
			camera.rotation.x = smoothstep(startcamera.rotation.x, goalcamera.rotation.x, interpolt);
			camera.rotation.y = smoothstep(startcamera.rotation.y, goalcamera.rotation.y, interpolt);
			camera.rotation.z = smoothstep(startcamera.rotation.z, goalcamera.rotation.z, interpolt);
		}else{
			deepCopy3DObject(goalcamera, camera);
			cameraMovementDone = true;
		}
	}
	
	/* set the position of the global ambient light */
	light.position.x = -camera.position.x;
	light.position.y = camera.position.y;
	light.position.z = -camera.position.z;

	if(t < SCENES[active_scene].endtime){
		SCENES[active_scene].update();
	}else{
		active_scene++;
		SCENES[active_scene].onenter();
		console.log("active scene is now",active_scene);
	}
	

}


function updateHexagonGrid(){
	for ( var i = 0; i < side * side; i++) {
		cubes[i].update();
	}
	
	/* waves */
	var timeoffset = t/10000;
	for(var x=0;x<side;x++){
		for(var y=0;y<side;y++){
			cubes[x*side+y].mesh.position.x= (x-side/2)*x_spacing;
			cubes[x*side+y].mesh.position.y= 10*+(Math.sin(timeoffset+x/3) + Math.cos(timeoffset+y/5)); 
			cubes[x*side+y].mesh.position.z= (x % 2) * z_spacing / 2 + (y-side/2)*z_spacing;
		}
	}
}

function someRandomHexagonGridEffect(){
	for ( var i = 0; i < side * side; i++) {
		cubes[i].update();
	}
	
	/* random whatever */
	var timeoffset = t/10000;
	for(var x=0;x<side;x++){
		for(var y=0;y<side;y++){
			cubes[x*side+y].mesh.position.x=Math.cos(y)*x*2*(Math.sin(x+timeoffset)+Math.cos(y));
			cubes[x*side+y].mesh.position.z=Math.sin(x)*y*2*(Math.cos(y)+Math.sin(x+timeoffset));
			cubes[x*side+y].mesh.position.y=Math.cos(x)*y*2*(Math.cos(y)+Math.sin(x+timeoffset));
		}
	}
	
	camera.position.x = Math.cos(t/100000)+Math.sin(t/10000);
	camera.position.z = Math.cos(t/100000)-Math.sin(t/10000);
	
	drawImage(STIAJE, 2, 15);
}

function OSD(){
	this.text = "Honeycomb by Ninjadev";
	this.boxstart = GU;
	this.boxwidth = 4*GU;
	this.t = 0;
	this.textlength = 0;
	this.opacity = 1;
	this.idealtextlength = 21;
}

OSD.prototype.render = function(){
	tdx.fillStyle = "rgba(0,0,0,"+(this.opacity/2)+")";
	tdx.fillRect(this.boxstart, 7*GU, this.boxwidth*Math.sqrt(this.text.length/this.idealtextlength), GU);
	tdx.fillStyle = "rgba(255,255,255,"+this.opacity+")";
	tdx.fillText(this.text.substring(0, this.textlength),this.boxstart+.25*GU, 7.25*GU);
}

OSD.prototype.show = function(text){
	this.text = text;
	this.t = 0;
	this.boxstart = GU;
	this.boxwidth = 4*GU;
	this.textlength = 0;
	this.opacity = 1;
}

OSD.prototype.update = function(){
	
	if(this.t <= 100){
		this.boxstart = smoothstep(0, GU, this.t/100);
		this.boxwidth = smoothstep(0, 4*GU*Math.sqrt(this.text.length/this.idealtextlength), Math.min(this.t/50,1));
	}
	if(this.t > 50 && this.t <= 150){
		this.textlength = 0|smoothstep(0, this.text.length, Math.min((this.t-50)/10,1))+1;
	}else if(this.t > 200){
		this.opacity = smoothstep(1,0,Math.min((this.t-200)/50,1));
	}
	
	
	this.t++;
}

function render() {
	
	
	/* render the 2d canvas */
	tdx.clearRect(0,0,twoDCanvas.width, twoDCanvas.height);
	osd.render(); //yah, we just always render the osd
	if(t < fadeGoalTime){
		tdx.fillStyle = "rgba(0,0,0,"+lerp(fadeStart,fadeGoal, (t-fadeStartTime)/(fadeGoalTime-fadeStartTime))+")";
		tdx.fillRect(0,0,16*GU,9*GU);
	}else if(fadeGoalTime != 0){
		tdx.fillStyle = "rgba(0,0,0,"+fadeGoal+")";
		tdx.fillRect(0,0,16*GU,9*GU);
		fadeGoalTime = 0;
	}
	
	SCENES[active_scene].render();
	
	camera.lookAt(cameratarget);
	renderer.render(scene, camera);
	
}

function Scene(starttime,endtime,update,render, onenter){
	this.starttime = starttime;
	this.endtime = endtime;
	this.update = update;
	this.render = render;
	this.onenter = onenter;
}

function vtv(a, b) {
	for ( var i = 0; i <= 1; i += 0.1) {
		var intensity = lerp(a.intensity, b.intensity, i);
		var x = 0 | lerp(a.hexx, b.hexx, i);
		var y = 0 | lerp(a.hexy, b.hexy, i);
		if (x < side && x >= 0 && y < side && y >= 0) {
			cubes[x*side+y].punch(intensity);
		}
	}
}

function init() {
	setLoadingBar(0,function(){
		var data = "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kB9/MIAfQACQK38wgCtAAJAffzCAH0AAkCt/MIArQACQH38wgB9AAJArfzCAK0AAkB9/MIAfQACQK38wgCtAAJAdfzCAHUAAkCl/MIApQACQFn8wgBZAAJAifzCAIkAAkBZ/MIAWQACQIn8wgCJAAJAWfzCAFkAAkCJ/MIAiQACQFn8wgBZAAJAifzCAIkAAkBp/MIAaQACQJn8wgCZAAJAafzCAGkAAkCZ/MIAmQACQGn8wgBpAAJAmfzCAJkAAkBp/MIAaQACQJn8wgCZAAJAYfzCAGEAAkCR/MIAkQACQGH8wgBhAAJAkfzCAJEAAkBh/MIAYQACQJH8wgCRAAJAYfzCAGEAAkCR/MIAkQACQFX8wgBVAAJAhfzCAIUAAkBV/MIAVQACQIX8wgCFAAJAVfzCAFUAAkCF/MIAhQACQFX8wgBVAAJAhfzCAIUAAkCZkgwCAJkAAkBpkgwCAGkAAkCRkgwCAJEAAkB9kgwCAH0AAkCZkgwCAJkAAkBpkgwCAGkAAkCRkgwCAJEAAkB9kgwCAH0AAkCZkgwCAJkAAkBpkgwCAGkAAkCRkgwCAJEAAkB9kgwCAH0AAkCZkgwCAJkAAkBpkgwCAGkAAkCRkgwCAJEAAkB9kgwCAH0AAkBp/MIAaQACQJn8wgCZAAJAafzCAGkAAkCZ/MIAmQACQGn8wgBpAAJAmfzCAJkAAkBp/MIAaQACQJn8wgCZAAJAdfzCAHUAAkCl/MIApQACQHX8wgB1AAJApfzCAKUAAkB1/MIAdQACQKX8wgClAAJAdfzCAHUAAkCl/MIApQACQH38wgB9AAJArfzCAK0AAkB9/MIAfQACQK38wgCtAAJAffzCAH0AAkCt/MIArQACQH38wgB9AAJArfzCAK0AAkB9/MIAfQACQK38wgCtAAJAffzCAH0AAkCt/MIArQACQH38wgB9AAJArfzCAK0AAkB1/MIAdQACQKX8wgClAAJAWfzCAFkAAkCJ/MIAiQACQFn8wgBZAAJAifzCAIkAAkBZ/MIAWQACQIn8wgCJAAJAWfzCAFkAAkCJ/MIAiQACQGn8wgBpAAJAmfzCAJkAAkBp/MIAaQACQJn8wgCZAAJAafzCAGkAAkCZ/MIAmQACQGn8wgBpAAJAmfzCAJkAAkBh/MIAYQACQJH8wgCRAAJAYfzCAGEAAkCR/MIAkQACQGH8w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PGIAkUFiAJFFYjCBRUAAgTxAAIFBQACRPmIAkUFiAJFGYjCBRkAAgUFAAIE+QIIgkUZiAJFBYgCRPmIwgUZAAIFBQACBPkAAkUViAJE+YgCRQWIwgUFAAIE+QACBRUAwkUZiAJFBYgCRPmIwgUZAAIFBQACBPkAwkUZiAJFIYgCRQWIwgUFAAIFGQACBSEAwkUZiAJFKYgCRQWIwgUZAAIFKQACBQUAwkUhiAJFBYgCRRmIwgUZAAIFIQACBQUAAkT5iAJFBYgCRRmIwgUZAAIFBQACBPkCBcJFGYgCRQWIAkT5iMIE+QACBRkAAgUFAAJFFYgCRPmIAkUFiMIFBQACBPkAAgUVAMJFBYgCRRWIAkUpiMIFBQACBRUAAgUpAMJE+YgCRQWIAkUViMIE+QACBQUAAgUVAYJE5YgCRPmIAkUFiMIE5QACBPkAAgUFAAJE8YgCRQGIAkUNiMIFDQACBQEAAgTxAgiCRPGIAkUBiAJFDYjCBPEAAgUBAAIFDQACRRWIAkUBiAJE9YjCBPUAAgUBAAIFFQIIgkUViAJFAYgCRPWIwgT1AAIFFQACBQEAwkUFiAJFFYgCRSmIwgUpAAIFBQACBRUCBcJFKYgCRRWIAkUFiMIFKQACBRUAAgUFAAJFBYgCRRWIAkUhiMIFIQACBRUAAgUFAMJFFYgCRSGIAkU1iMIFFQACBSEAAgU1AMJFIYgCRQWIAkUViMIFFQACBSEAAgUFAYJE8YgCRQWIAkUViMIFFQACBPEAAgUFAAJE+YgCRQWIAkUZiMIFGQACBQUAAgT5AgiCRRmIAkUFiAJE+YjCBRkAAgUFAAIE+QACRRWIAkT5iAJFBYjCBQUAAgT5AAIFFQDCRRmIAkUFiAJE+YjCBRkAAgUFAAIE+QDCRRmIAkUhiAJFBYjCBQUAAgUZAAIFIQDCRRmIAkUpiAJFBYjCBRkAAgUpAAIFBQDCRSGIAkUFiAJFGYjCBRkAAgUhAAIFBQACRPmIAkUFiAJFGYjCBRkAAgUFAAIE+QIFwkUZiAJFBYgCRPmIwgT5AAIFGQACBQUAAkUViAJE+YgCRQWIwgUFAAIE+QACBRUAwkUFiAJFFYgCRSmIwgUFAAIFFQACBSkAwkT5iAJFBYgCRRWIwgT5AAIFBQACBRUBgkTliAJE+YgCRQWIwgTlAAIE+QACBQUAAkTxiAJFAYgCRQ2IwgUNAAIFAQACBPECCIJE8YgCRQGIAkUNiMIE8QACBQEAAgUNAAJFFYgCRQGIAkT1iMIE9QACBQEAAgUVAgiCRRWIAkUBiAJE9YjCBPUAAgUVAAIFAQDCxZQAAsWQAALEGDACxCkAAsQdkAOEAQADBAAKxZQAAsWQAALEGDACxCkAAsQdkAOEAQADBAACxZQAAsWQAALEGDACxCkAAsQdkAOEAQADBAAD/LwBNVHJrAAAKMQD/Aw8zeE9zYyAjMyAoTUlESSkAsgpAALIHZADiAEAAsmUAALJkAACyBgwAsgpAALIHZADiAEAAwgAAsmUAALJkAACyBgwAsgpAALIHZADiAEAAwgAAsmUAALJkAACyBgwAsgpAALIHZADiAEAAwgCMAJI5f4FAgjlAYJI5fzCCOUAAkkB/gRCCQEAAkj5/YII+QACSOX9ggjlAAJI1fzCCNUAAkjd/gXCCN0Bgkjl/MII5QACSOn9ggjpAAJI8fzCCPEAAkj5/MII+QACSQX9ggkFAAJJDfzCCQ0AAkkF/MIJBQACSRX+BcIJFQIEQkkh/gRCCSEAAkkV/YIJFQDCSQ38wgkNAAJJBfzCCQUAAkkh/YIJIQACSQ3+BEIJDQGCSRX8wgkVAAJJMf2CCTEAAkkp/MIJKQACSRX8wgkVAAJJDfzCCQ0AAkkF/MIJBQACSQH8YgkBAAJI8fxiCPEAAkjl/GII5QACSN38YgjdAAJI5fzCCOUAAkjl/gUCCOUBgkjl/MII5QACSQH+BEIJAQACSPn9ggj5AAJI5f2CCOUAAkjV/MII1QACSN3+BcII3QGCSOX8wgjlAAJI6f2CCOkAAkjx/MII8QACSPn8wgj5AAJJBf2CCQUAAkkN/MIJDQACSQX8wgkFAAJJFf4FwgkVAgRCSSH+BEIJIQACSRX9ggkVAMJJDfzCCQ0AAkkF/MIJBQACSSH9ggkhAAJJDf4EQgkNAYJJFfzCCRUAAkkx/YIJMQACSSn8wgkpAAJJFfzCCRUAAkkN/MIJDQACSQX8wgkFAAJJAfxiCQEAAkjx/GII8QACSOX8YgjlAAJI3fxiCN0AAkjl/MII5QACSOX+BQII5QGCSOX8wgjlAAJJAf4EQgkBAAJI+f2CCPkAAkjl/YII5QACSNX8wgjVAAJI3f4FwgjdAYJI5fzCCOUAAkjp/YII6QACSPH8wgjxAAJI+fzCCPkAAkkF/YIJBQACSQ38wgkNAAJJBfzCCQUAAkkV/gXCCRUCBEJJIf4EQgkhAAJJFf2CCRUAwkkN/MIJDQACSQX8wgkFAAJJIf2CCSEAAkkN/gRCCQ0BgkkV/MIJFQACSTH9ggkxAAJJNf2CCTUAAkk9/MJI5ZBiCOUAYgk9AAJJRfwCSMmQYgjJAGJI3ZRiCN0AAkjlkGIJRQACCOUAAklZ/AJIyZBiCMkAAkj5kGII+QACSNWQYgjVAGIJWQACSMGQYgjBAGJI1ZBiCNUAYkjBkGIIwQBiSN2QYgjdAGJIwZBiCMEAYkjdkGII3QBiSMGQYgjBAGJI5ZBiCOUAYkjJkGIIyQDCSOWQYgjlAAJIyZBiCMkAYkjlkGII5QBiSMmQYgjJAGJI5ZBiCOUAYkjJkGIIyQBiSNWQYgjVAGJIwZBiCMEAYkjVkGII1QBiSMGQYgjBAGJI3ZBiCN0AYkjBkGIIwQBiSN2QYgjdAGJIwZBiCMEAYkjdkGII3QBiSMmQYgjJAMJI5ZBiCOUAAkjJkGIIyQBiSOWQYgjlAGJIyZBiCMkAYkjdlGII3QACSOWQYgjlAAJIyZBiCMkAAkjxkGII8QACSNWQYgjVAGJIwZBiCMEAYkjVkGII1QBiSMGQYgjBAGJI3ZBiCN0AYkjBkGIIwQBiSN2QYgjdAGJIwZBiCMEAYkjlkGII5QBiSMmQYgjJAMJI5ZBiCOUAAkjJkGIIyQBiSOWQYgjlAGJIyZBiCMkAYkjlkGII5QBiSMmQYgjJAGJI1ZBiCNUAYkjBkGIIwQBiSNWQYgjVAGJIwZBiCMEAYkjdkGII3QBiSMGQYgjBAGJI3ZBiCN0AYkjBkGIIwQBiSOWQYgjlAGJIyZBiCMkAwkjlkGII5QACSMmQYgjJAGJI5ZBiCOUAYkjJkGIIyQBiSN2UYgjdAAJI5ZBiCOUAAkjJkGIIyQACSPmQYgj5AAJI1ZBiCNUAYkjBkGIIwQBiSNWQYgjVAGJIwZBiCMEAYkjdkGII3QBiSMGQYgjBAGJI3ZBiCN0AYkjBkGIIwQBiSOWQYgjlAGJIyZBiCMkAwkjlkGII5QACSMmQYgjJAGJI5ZBiCOUAYkjJkGIIyQBiSOWQYgjlAGJIyZBiCMkAYkjVkGII1QBiSMGQYgjBAGJI1ZBiCNUAYkjBkGIIwQBiSN2QYgjdAGJIwZBiCMEAYkjdkGII3QBiSMGQYgjBAGJI3ZBiCN0AYkjJkGIIyQDCSOWQYgjlAAJIyZBiCMkAYkjlkGII5QBiSMmQYgjJAGJI3ZRiCN0AAkjlkGII5QACSMmQYgjJAAJI8ZBiCPEAAkjVkGII1QBiSMGQYgjBAGJI1ZBiCNUAYkjBkGIIwQBiSN2QYgjdAGJIwZBiCMEAYkjdkGII3QBiSMGQYgjBAGJI5ZBiCOUAYkjJkGIIyQDCSOWQYgjlAAJIyZBiCMkAYkjlkGII5QBiSMmQYgjJAGJI5ZBiCOUAYkjJkGIIyQBiSNWQYgjVAGJIwZBiCMEAYkjVkGII1QBiSMGQYgjBAGJI3ZBiCN0AYkjBkGIIwQBiSN2QYgjdAGJIwZBiCMEAYkjlkGII5QBiSMmQYgjJAMJI5ZBiCOUAAkjJkGIIyQBiSOWQYgjlAGJIyZBiCMkAYkjdlGII3QACSOWQYgjlAAJIyZBiCMkAAkj5kGII+QACSOX+BQII5QGCSOX8wgjlAAJJAf4EQgkBAAJI+f2CCPkAAkjl/YII5QACSNX8wgjVAAJI3f4FwgjdAYJI5fzCCOUAAkjp/YII6QACSPH8wgjxAAJI+fzCCPkAAkkF/YIJBQACSQ38wgkNAAJJBfzCCQUAAkkV/gXCCRUCBEJJIf4EQgkhAAJJFf2CCRUAwkkN/MIJDQACSQX8wgkFAAJJIf2CCSEAAkkN/gRCCQ0BgkkV/MIJFQACSTH9ggkxAAJJKfzCCSkAAkkV/MIJFQACSQ38wgkNAAJJBfzCCQUAAkkB/GIJAQACSPH8YgjxAAJI5fxiCOUAAkjd/GII3QACSOX8wgjlAAJI5f4FAgjlAYJI5fzCCOUAAkkB/gRCCQEAAkj5/YII+QACSOX9ggjlAAJI1fzCCNUAAkjd/gXCCN0Bgkjl/MII5QACSOn9ggjpAAJI8fzCCPEAAkj5/MII+QACSQX9ggkFAAJJDfzCCQ0AAkkF/MIJBQACSRX+BcIJFQIEQkkh/gRCCSEAAkkV/YIJFQDCSQ38wgkNAAJJBfzCCQUAAkkh/YIJIQACSQ3+BEIJDQGCSRX8wgkVAAJJMf2CCTEAAkkp/MIJKQACSRX8wgkVAAJJDfzCCQ0AAkkF/MIJBQACSQH8YgkBAAJI8fxiCPEAAkjl/GII5QACSN38YgjdAAJI5fzCCOUAAsmUAALJkAACyBgwAsgpAALIHZADiAEAAwgACsmUAALJkAACyBgwAsgpAALIHZADiAEAAwgAAsmUAALJkAACyBgwAsgpAALIHZADiAEAAwgAA/y8ATVRyawAAANEA/wMPM3hPc2MgIzUgKE1JREkpALMKQACzB2QA4wBAALNlAACzZAAAswYMALMKQACzB2QA4wBAAMMAALNlAACzZAAAswYMALMKQACzB2QA4wBAAMMAALNlAACzZAAAswYMALMKQACzB2QA4wBAAMMAiTCTPACCUIM8QIGoALNlAACzZAAAswYMALMKQACzB2QA4wBAAMMAArNlAACzZAAAswYMALMKQACzB2QA4wBAAMMAALNlAACzZAAAswYMALMKQACzB2QA4wBAAMMAAP8vAA==";
		data = atob(data);
		midi = new Midi(data);
	
	setLoadingBar(0.2,function(){
	mixer = new Mixer();

	setLoadingBar(0.4,function(){
		
		
	setLoadingBar(0.4,function(){
	camera = new THREE.PerspectiveCamera(45, 16 / 9, 0.1, 10000);
	camera.position.y = 200;
	startcamera = new THREE.PerspectiveCamera(45, 16 / 9, 0.1, 10000);
	startcamera.time = 0;
	goalcamera = new THREE.PerspectiveCamera(45, 16 / 9, 0.1, 10000);
	goalcamera.time = 0;
	cameratarget = new THREE.Vector3(0,0,0);

	setLoadingBar(0.5,function(){
		
	scene = new THREE.Scene();
	
	/*
	num_particles = 300;
	particles = new THREE.Geometry();
	particleMaterial = new THREE.ParticleBasicMaterial({color:0xFFFFFF,size:20,map:THREE.ImageUtils.loadTexture("bee.png")});
	
	for(var i=0;i<num_particles;i++){
		var particle = new THREE.Vector3(
				(Math.random()-0.5)*1000,
				(Math.random()-0.5)*1000,
				(Math.random()-0.5)*1000
		);
		particle.dx = 0;
		particle.dy = 0;
		particle.dz = 0;
		particles.vertices.push(particle);
	}
	
	particleSystem = new THREE.ParticleSystem(particles,particleMaterial);
	scene.add(particleSystem);
	*/
		
	setLoadingBar(0.6,function(){

	scene.add(camera);
	cubes = [];
	side = 32;

	x_spacing = 5 + 2.545 + 0.5;
	z_spacing = 4.363 * 2 + 0.5;
	
	osd = new OSD();


	setLoadingBar(0.7,function(){
	
	materials = [
	             new THREE.MeshLambertMaterial({
		color : 0xE8B86F, blending : THREE.AdditiveBlending, transparent:true
	}), 
	             new THREE.MeshLambertMaterial({
		color : 0xE8B86F, blending : THREE.AdditiveBlending, transparent:false})
	];

	geometry = createHexagonGeometry(10, -10);
	for ( var i = 0; i < side; i++) {
		for ( var j = 0; j < side; j++) {
			cubes[i * side + j] = new Hexagon((i - side / 2) * x_spacing, 0,
					(i % 2) * z_spacing / 2 + (j - side / 2) * z_spacing);
			scene.add(cubes[i * side + j].mesh);
		}
	}
	light = new THREE.SpotLight();
	light.intensity = 0.5;
	scene.add(light);

	setLoadingBar(0.8,function(){
		
	kewbe = new Kewbe();
	lyte = new Lyte(0, 200, 0);

	
	setLoadingBar(0.9,function(){
	skybox = createSkybox("");
	scene.add(skybox);
		
	
	setLoadingBar(1,function(){
		cameraskip = false;
	midi.add_callback(function(e) {
		mixer.handle_event(e);
	});
	midi.add_callback(function(e){
		if(!cameraskip){
		if(e.note_number == 39 && e.midi_channel == 9){
			cameraskip = Math.random()>0.3?true:false;
			movementtime = e.time_to_next_sameevent / midi.ticks_per_second * 44100;
			if(cameraskip) movementtime*=2;
			newRandomCameraMovement(movementtime);
		}
		}
		else if(e.note_number == 39 && e.midi_channel == 9){
			cameraskip = false;
		}
	});
	midi.add_callback(function(e){
		/* text event, or something! */
		/* and number 15 is reserved for META events :D */
		if(e.midi_channel == 14){
			osd.show(TEXTS[e.midi_number]);
			}
	})
	fadeStartTime = 0;
	fadeGoalTime = 0;
	fadeStart = 0;
	fadeGoal = 0;
	fadeIn(100000);
	/* for good measure */
	resize();
	mixer.start();
	})})})})})})})})})});
}

function fadeIn(duration){
	fadeStartTime = t;
	fadeGoalTime = t+duration;
	fadeStart = 1;
	fadeGoal = 0;
}

function fadeOut(duration){
	fadeStartTime = t;
	fadeGoalTime = t+duration;
	fadeStart = 0;
	fadeGoal = 1;
}

function createSkybox(url){
	var urls = [
	            url+"posx.png", url+"posx.png", url+"posx.png",
	            url+"posx.png", url+"posx.png", url+"posx.png"
	            ];
	var textureCube = THREE.ImageUtils.loadTextureCube(urls);
	var shader = THREE.ShaderUtils.lib.cube;
	shader.uniforms.tCube.texture = textureCube;
	var material = new THREE.ShaderMaterial({
		fragmentShader : shader.fragmentShader,
		vertexShader : shader.vertexShader,
		uniforms: shader.uniforms
	});
	var skybox = new THREE.Mesh( new THREE.CubeGeometry(10000, 10000, 10000), material);
	skybox.flipSided = true;
	return skybox;
}

function Hexagon(x, y, z) {
	this.mesh = new THREE.Mesh(geometry, materials[0]);
	this.mesh.position.x = x;
	this.mesh.position.y = y;
	this.mesh.position.z = z;
}


Hexagon.prototype.punch = function(height) {
	//this.mesh.material = materials[(height * materials.length) | 0];
	this.mesh.position.y = 10 * height;
	this.mesh.material = materials[+!!height];
}

Hexagon.prototype.update = function() {
	this.mesh.material = materials[0];
}

function createHexagonGeometry(hy, ly) {
	var geometry = new THREE.Geometry();

	geometry.vertices.push(new THREE.Vector3(-5.000, hy, 0));
	geometry.vertices.push(new THREE.Vector3(-2.545, hy, -4.363));
	geometry.vertices.push(new THREE.Vector3(2.545, hy, -4.363));
	geometry.vertices.push(new THREE.Vector3(5.000, hy, 0));
	geometry.vertices.push(new THREE.Vector3(2.545, hy, 4.363));
	geometry.vertices.push(new THREE.Vector3(-2.545, hy, 4.363));
	geometry.vertices.push(new THREE.Vector3(-5.000, ly, 0));
	geometry.vertices.push(new THREE.Vector3(-2.545, ly, -4.363));
	geometry.vertices.push(new THREE.Vector3(2.545, ly, -4.363));
	geometry.vertices.push(new THREE.Vector3(5.000, ly, 0));
	geometry.vertices.push(new THREE.Vector3(2.545, ly, 4.363));
	geometry.vertices.push(new THREE.Vector3(-2.545, ly, 4.363));

	geometry.faces.push(new THREE.Face3(0, 5, 1));
	geometry.faces.push(new THREE.Face4(1, 5, 4, 2));
	geometry.faces.push(new THREE.Face3(2, 4, 3));
	geometry.faces.push(new THREE.Face3(6, 7, 11));
	geometry.faces.push(new THREE.Face4(7, 8, 10, 11));
	geometry.faces.push(new THREE.Face3(8, 9, 10));
	geometry.faces.push(new THREE.Face4(0, 1, 7, 6));
	geometry.faces.push(new THREE.Face4(1, 2, 8, 7));
	geometry.faces.push(new THREE.Face4(2, 3, 9, 8));
	geometry.faces.push(new THREE.Face4(3, 4, 10, 9));
	geometry.faces.push(new THREE.Face4(4, 5, 11, 10));
	geometry.faces.push(new THREE.Face4(5, 0, 6, 11));

	geometry.computeFaceNormals(false);
	return geometry;
}

function Kewbe() {

	this.scaler = 256;
	this.points = [ {
		x : 100,
		y : 100,
		z : 100
	}, {
		x : 100,
		y : 100,
		z : -100
	}, {
		x : 100,
		y : -100,
		z : 100
	}, {
		x : 100,
		y : -100,
		z : -100
	}, {
		x : -100,
		y : 100,
		z : 100
	}, {
		x : -100,
		y : 100,
		z : -100
	}, {
		x : -100,
		y : -100,
		z : 100
	}, {
		x : -100,
		y : -100,
		z : -100
	} ];
	this.flat = [ {
		x : 0,
		y : 0
	}, {
		x : 0,
		y : 0
	}, {
		x : 0,
		y : 0
	}, {
		x : 0,
		y : 0
	}, {
		x : 0,
		y : 0
	}, {
		x : 0,
		y : 0
	}, {
		x : 0,
		y : 0
	}, {
		x : 0,
		y : 0
	}, ];
}

Kewbe.prototype.update = function() {
	for ( var i = 0; i < this.points.length; i++) {
		this.points[i] = this.rotate({
			axis : "y",
			point : this.points[i],
			angle : 0.017
		});
		this.points[i] = this.rotate({
			axis : "z",
			point : this.points[i],
			angle : 0.01
		});
		this.points[i] = this.rotate({
			axis : "x",
			point : this.points[i],
			angle : 0.004
		});
	}
};

Kewbe.prototype.rotate = function(args) {
	var ans = {
		x : 0,
		y : 0,
		z : 0
	};
	if (args.axis == "x") {
		ans.x = args.point.x;
		ans.y = Math.cos(args.angle) * args.point.y - Math.sin(args.angle)
				* args.point.z;
		ans.z = Math.sin(args.angle) * args.point.y + Math.cos(args.angle)
				* args.point.z;
	} else if (args.axis == "y") {
		ans.x = Math.cos(args.angle) * args.point.x + Math.sin(args.angle)
				* args.point.z;
		ans.y = args.point.y;
		ans.z = -Math.sin(args.angle) * args.point.x + Math.cos(args.angle)
				* args.point.z;
	} else if (args.axis == "z") {
		ans.x = Math.cos(args.angle) * args.point.x - Math.sin(args.angle)
				* args.point.y;
		ans.y = Math.sin(args.angle) * args.point.x + Math.cos(args.angle)
				* args.point.y;
		ans.z = args.point.z;
	}
	return ans;
};

Kewbe.prototype.render = function() {
	for ( var i = 0; i < this.points.length; i++) {
		var multiplier = -300 / (this.points[i].z - 250);
		this.flat[i].x = this.points[i].x * multiplier;
		this.flat[i].y = this.points[i].y * multiplier;

		this.flat[i].hexx = (0 | (side * (this.scaler + this.flat[i].x) / (2 * this.scaler)));
		this.flat[i].hexy = (0 | (side * (this.scaler + this.flat[i].y) / (2 * this.scaler)));
		this.flat[i].intensity = (this.points[i].z + this.scaler)
				/ (2 * this.scaler);
	}

	vtv(this.flat[0], this.flat[1]);
	vtv(this.flat[0], this.flat[2]);
	vtv(this.flat[0], this.flat[4]);
	vtv(this.flat[1], this.flat[5]);
	vtv(this.flat[1], this.flat[3]);
	vtv(this.flat[2], this.flat[3]);
	vtv(this.flat[2], this.flat[6]);
	vtv(this.flat[3], this.flat[7]);
	vtv(this.flat[4], this.flat[5]);
	vtv(this.flat[4], this.flat[6]);
	vtv(this.flat[5], this.flat[7]);
	vtv(this.flat[6], this.flat[7]);
};

function Lyte(x, y, z) {
	this.planes = [];
	this.w = 80*2;
	this.h = 8*2;

	this.x = +(x || 0);
	this.y = +(y || 0);
	this.z = +(z || 0);

	this.number_of_planes = 6;
	this.number_of_rays = 3;
	this.rotation = new THREE.Vector3(0, 0, 0);
	this.lyte = new THREE.Object3D(0,0,0);
	this.lyte.position.set(this.x,this.y,this.z);
	this.rays = [];
	for ( var j = 0; j < this.number_of_rays; j++) {
		this.rays[j] = new THREE.Object3D(0, 0, 0);
		this.rays[j].planes = [];
		for ( var i = 0; i < this.number_of_planes; i++) {
			this.rays[j].planes.push(new THREE.Mesh(new THREE.PlaneGeometry(
					this.w, this.h, 1, 1), new THREE.MeshBasicMaterial({
				map : this.get_texture(this.w, this.h, this.number_of_planes),
				transparent : true,
				blending: THREE.AdditiveBlending,
				overdraw : false})));
			this.rays[j].planes[i].rotation.x = i * Math.PI * 2
					/ this.number_of_planes;
			this.rays[j].planes[i].position.x = 0;
			this.rays[j].planes[i].position.y = -0.5 * this.h
					* Math.sin(i * Math.PI * 2 / this.number_of_planes);
			this.rays[j].planes[i].position.z = 0.5 * this.h
					* Math.cos(i * Math.PI * 2 / this.number_of_planes);
			this.rays[j].planes[i].doubleSided = true;
			this.rays[j].add(this.rays[j].planes[i]);
			this.lyte.add(this.rays[i]);
		}
		this.rays[j].lightanchor = new THREE.Object3D();
		this.rays[j].lightanchor2 = new THREE.Object3D();
		this.rays[j].lightanchor.position.set(1, 1, 0);
		this.rays[j].lightanchor2.position.set(-1, 1, 0);
		this.rays[j].add(this.rays[j].lightanchor);
		this.rays[j].add(this.rays[j].lightanchor2);

		this.rays[j].light = new THREE.SpotLight(0xFFFF88);
		this.rays[j].light.castShadow = true;
		this.rays[j].add(this.rays[j].light);

		this.rays[j].light2 = new THREE.SpotLight(0xFFFFF88);
		this.rays[j].light2.castShadow = true;
		this.rays[j].add(this.rays[j].light2);
	}
	this.rays[0].rotation.y = 0;
	this.rays[0].rotation.x = 0;
	this.rays[0].rotation.z = 0;

	this.rays[1].rotation.y = Math.PI / 2;
	this.rays[1].rotation.x = 0;
	this.rays[1].rotation.z = 0;

	this.rays[2].rotation.y = 0;
	this.rays[2].rotation.x = 0;
	this.rays[2].rotation.z = Math.PI / 2;

	this.ballGeometry = new THREE.SphereGeometry(this.h / 2, 32, 16);
	this.ball = new THREE.Mesh(this.ballGeometry, new THREE.MeshBasicMaterial(
			0xFFFFFF));
	this.lyte.add(this.ball);

	var cube_geometry = new THREE.CubeGeometry(this.h * 2, this.h * 2,
			this.h * 2);
	var cube_mesh = new THREE.Mesh(cube_geometry);
	var cube_bsp = new ThreeBSP(cube_mesh);

	var sphere_geometry = new THREE.SphereGeometry(this.h * 1.15, 32, 32);
	var sphere_mesh = new THREE.Mesh(sphere_geometry);
	var sphere_bsp = new ThreeBSP(sphere_mesh);

	var ring_inner_g = new THREE.SphereGeometry(this.h * 1.3, 32, 32);
	var ring_inner_m = new THREE.Mesh(ring_inner_g);
	var ring_outer_g = new THREE.SphereGeometry(this.h * 2.2, 32, 32);
	var ring_outer_m = new THREE.Mesh(ring_outer_g);
	var ring_bsp = new ThreeBSP(ring_outer_m).subtract(new ThreeBSP(
			ring_inner_m));

	var subtract_bsp = cube_bsp.subtract(sphere_bsp);

	lyte_shell = subtract_bsp.subtract(ring_bsp);
	var lyte_shell_g = lyte_shell.toGeometry();

	this.lyte.add(new THREE.Mesh(lyte_shell_g, new THREE.MeshLambertMaterial({
		color:0xCCCCCC
	}
			)));
	scene.add(this.lyte);
}

Lyte.prototype.setIntensity = function(intensity) {
	for ( var i = 0; i < this.number_of_rays; i++) {
		this.rays[i].light.intensity = intensity;
		this.rays[i].light2.intensity = intensity;
		for ( var j = 0; j < this.number_of_planes; j++) {
			this.rays[i].planes[j].material.color.r = intensity;
			this.rays[i].planes[j].material.color.g = intensity;
			this.rays[i].planes[j].material.color.b = intensity;
		}
	}
	this.ball.material.color.r = intensity;
	this.ball.material.color.g = intensity;
	this.ball.material.color.b = intensity;
};

Lyte.prototype.update = function() {

	var samples_per_quaver = midi.ticks_per_beat / midi.ticks_per_second * 44100;

	this.setIntensity(1 - (t % samples_per_quaver) / samples_per_quaver);

	
	this.lyte.position.x = Math.sin(t / (30000)) * side * 2*6;
	this.lyte.position.y = Math.cos(t / (40000)) * side * 2*6;
	this.lyte.position.z = Math.cos(t / (50000)) * side * 2*6;

	this.lyte.rotation.x += 0.017 * 2;
	this.lyte.rotation.z += 0.019 * 2;
	this.lyte.rotation.y += 0.023 * 2;

	for ( var i = 0; i < this.number_of_rays; i++) {
		this.rays[i].light.target = this.rays[i].lightanchor;
		this.rays[i].light2.target = this.rays[i].lightanchor2;
	}
};

Lyte.prototype.render = function() {
};

Lyte.prototype.get_texture = function(w, h, count) {
	return Lyte.prototype._texture = Lyte.prototype._texture ||
			   (function() {
				var canvas = document.createElement("canvas");
				canvas.width = w;
				canvas.height = h;
				var ctx = canvas.getContext("2d");
				var imgdata = ctx.getImageData(0, 0, canvas.width,
						canvas.height);
				var d = imgdata.data;
				var x = 0, y = 0;
				for ( var i = 0; i < d.length; i += 4) {
					d[i] = 255;
					d[i + 1] = 255;
					d[i + 2] = 192;
					d[i + 3] = (255 * ((h - (y + 1)) / h)
							* (w - Math.abs(w - 2 * (1 + x))) / w)
							/ count;
					x++;
					if (x >= w) {
						x = 0;
						y++;
					}
				}
				ctx.putImageData(imgdata, 0, 0);
				var texture = new THREE.Texture(canvas);
				texture.needsUpdate = true;
				return texture;
			})();
};
