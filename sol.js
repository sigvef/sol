DEBUG = false;
ORIGO = new THREE.Vector3(0, 0, 0);
cameraMovementDone = true;


TEXTS = [
        "HONEYCOMB BY NINJADEV",
        "(OUR FIRST DEMO EVER :3)",
        "IT HAS A SYNTH, SOME 3D OBJECTS, SOME SCANLINES, AND A CRAPPILY CONTROLLED CAMERA",
        "WE REALLY ONLY KNOW 2D, SO WE BUILT A SCREEN FOR 2D EFFECTS",
        "SO WE COULD ROTATE A CUBE",
        "AND ROTATE AROUND THAT CUBE",
        "ANYWAY, THANK YOU FOR A NICE PARTY :)"
         ];


note_midicallback = function(e){};

active_scene = 0;
/* please specify these in chrono order! */
/* yes, because i am lazy */
SCENES = [
          /* introduction */
         new Scene(function(){
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
         new Scene(function(){
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
         new Scene(function(){
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
        	 osd.show(TEXTS[2]);
         }),
         
         /* need some content here */
         new Scene(function(){
			updateHexagonGrid();
			for(var x=0;x<side;x++){
				for(var y=0;y<side;y++){
					var toffset = t;
					var on = Math.sin(x/2+toffset) + Math.cos(y/2+2*toffset) > 0;
					cubes[x*side+y].mesh.material = materials[+on];
				}
			}
			
			lyte.update();
			osd.update();
         },
         function(){
         },
         function(){
        	 cameratarget = ORIGO;
        	 newCameraMovement(400000,1,300,0);
        	 osd.show(TEXTS[3]);
         }),
         
         
         /* 3d2d3d */
         new Scene(function(){
			updateHexagonGrid();
			kewbe.update();
			osd.update();
			lyte.update();
         },function(){
        	kewbe.render();
         },function(){
        	 cameratarget = ORIGO;
        	 osd.show(TEXTS[4]);
         }),
         
         /* more 3d2d3d */
         new Scene(function(){
			updateHexagonGrid();
			kewbe.update();
			osd.update();
			lyte.update();
			camera.position.x = 440*Math.sin(t/30000);
			camera.position.y = 440*Math.cos(t/40000);
			camera.position.z = 440*Math.sin(t/50000);
         },function(){
        	kewbe.render();
         },function(){
        	 cameratarget = ORIGO;
        	 osd.show(TEXTS[5]);
        	 note_midicallback = function(){};
         }),
         
         
         /* our names or something */
        new Scene(function(){
        	someRandomHexagonGridEffect();
			camera.position.y-= 0.2;
			osd.update();
			lyte.update();
        },function(){
        	
        },function(){
        	 cameratarget = ORIGO;
        	 osd.show(TEXTS[6]);
        	fadeOut(44100*4,function(){
        		now.we.crash.the.demo.because.it.is.the.fastest.way.to.stop(":D");
        	});
        }),
        
        /* fade to black and exit or whatever */
        new Scene(function(){
        	
        },function(){
        	
        },function(){
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


function newCameraMovement(movementTime, posx, posy, posz, rotx, roty, rotz, tarx,tary,tarz){
	console.log("CAMERA STARTED");
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
			console.log("CAMERA DONE!");
		}
	}
	
	/* set the position of the global ambient light */
	light.position.x = -camera.position.x;
	light.position.y = camera.position.y;
	light.position.z = -camera.position.z;

	SCENES[active_scene].update();
	

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
	tdx.fillRect(this.boxstart*GU, 7*GU, GU*this.boxwidth*Math.sqrt(this.text.length/this.idealtextlength), GU);
	tdx.fillStyle = "rgba(255,255,255,"+this.opacity+")";
	tdx.fillText(this.text.substring(0, this.textlength),GU*(this.boxstart+.25), 7.25*GU);
}

OSD.prototype.show = function(text){
	this.text = text;
	this.t = 0;
	this.boxstart = 1;
	this.boxwidth = 4;
	this.textlength = 0;
	this.opacity = 1;
}

OSD.prototype.update = function(){
	
	if(this.t <= 100){
		this.boxstart = smoothstep(0, 1, this.t/100);
		this.boxwidth = smoothstep(0, 4*Math.sqrt(this.text.length/this.idealtextlength), Math.min(this.t/50,1));
	}
	if(this.t > 50 && this.t <= 150){
		this.textlength = 0|smoothstep(0, this.text.length, Math.min((this.t-50)/10,1))+1;
	}else if(this.t > 200*this.text.length/this.idealtextlength){
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
		if(fadeGoal = 1 && fadeFn){
			fadeFn();
		}
	}
	
	SCENES[active_scene].render();
	
	camera.lookAt(cameratarget);
	renderer.render(scene, camera);
	
}

function Scene(update,render, onenter){
	this.update = update;
	this.render = render;
	this.onenter = onenter;
}

function vtv(a, b) {
	for ( var i = 0; i <= 1; i += 0.05) {
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
		var data = "TVRoZAAAAAYAAQAKAGBNVHJrAAAADAD/WAQEAhgIAP8vAE1UcmsAAAALAP9RAwZQYQD/LwBNVHJrAAAEJwD/Aw5DQl9LaWNrIChNSURJKQC5CkAAuQdkAOkAQAC5ZQAAuWQAALkGDAC5CkAAuQdkAOkAQADJAAC5ZQAAuWQAALkGDAC5CkAAuQdkAOkAQADJAAC5ZQAAuWQAALkGDAC5CkAAuQdkAOkAQADJAIwAmSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJECDSJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRAs0iZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQEiZJGQYiSRASJkkZBiJJEBImSRkGIkkQHi5ZQAAuWQAALkGDAC5CkAAuQdkAOkAQADJAAK5ZQAAuWQAALkGDAC5CkAAuQdkAOkAQADJAAC5ZQAAuWQAALkGDAC5CkAAuQdkAOkAQADJAAD/LwBNVHJrAAABpgD/Aw9DQl9TbmFyZSAoTUlESSkAuQpAALkHZADpAEAAuWUAALlkAAC5BgwAuQpAALkHZADpAEAAyQAAuWUAALlkAAC5BgwAuQpAALkHZADpAEAAyQAAuWUAALlkAAC5BgwAuQpAALkHZADpAEAAyQC7IJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkC0KJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkCBKJkmZBiJJkB4uWUAALlkAAC5BgwAuQpAALkHZADpAEAAyQACuWUAALlkAAC5BgwAuQpAALkHZADpAEAAyQAAuWUAALlkAAC5BgwAuQpAALkHZADpAEAAyQAA/y8ATVRyawAAAz4A/wMFaGloYXQAuQpAALkHZADpAEAAuWUAALlkAAC5BgwAuQpAALkHZADpAEAAyQAAuWUAALlkAAC5BgwAuQpAALkHZADpAEAAyQAAuWUAALlkAAC5BgwAuQpAALkHZADpAEAAyQCkMJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkCDAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkCwAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAAJkqTmCJKkAAmSpOYIkqQACZKk5giSpAALllAAC5ZAAAuQYMALkKQAC5B2QA6QBAAMkAArllAAC5ZAAAuQYMALkKQAC5B2QA6QBAAMkAALllAAC5ZAAAuQYMALkKQAC5B2QA6QBAAMkAAP8vAE1UcmsAAAlCAP8DCnNhdy9zcXVhcmUAsApAALAHZADgAEAAsGUAALBkAACwBgwAsApAALAHZADgAEAAwAAAsGUAALBkAACwBgwAsApAALAHZADgAEAAwAAAsGUAALBkAACwBgwAsApAALAHZADgAEAAwAAAkEVkAJAyaxiARUAAgDJASJBFZwCQMn8YgEVAAIAyQEiQRX8AkDJ/GIBFQACAMkBIkEVyAJAyZxiARUAAgDJAMJAyfACQRWcYgDJAAIBFQDCQQ38AkDBzGIBDQACAMEAwkDBjAJBDZBiAMEAAgENAMJBDbgCQMHwYgENAAIAwQEiQQ3MAkDB3GIBDQACAMEAwkENmAJAwcRiAQ0AAgDBAAJA+dACQK3AYgCtAAIA+QEiQPmkAkCt5GIA+QACAK0BIkD5/AJArZhiAPkAAgCtASJArfwCQPmQYgCtAAIA+QDCQK3oAkD5+GIArQACAPkCDAJAafzCAGkAAkCZ8MIAmQACQGngwgBpAAJAmcTCAJkAAkBp/MIAaQACQJnswgCZAAJAafzCAGkAAkCZ/MIAmQACQHX8wgB1AAJApfTCAKUAAkB1/MIAdQACQKXMwgClAAJAdfzCAHUAAkCl/MIApQACQHXwwgB1AAJApdTCAKUAAkB9/MIAfQACQK3gwgCtAAJAfeDCAH0AAkCt9MIArQACQH38wgB9AAJArejCAK0AAkB94MIAfQACQK3UwgCtAAJAffjCAH0AAkCt/MIArQACQH38wgB9AAJArdTCAK0AAkB98MIAfQACQK3cwgCtAAJAdezCAHUAAkCl8MIApQACQFn8wgBZAAJAifzCAIkAAkBZ/MIAWQACQInYwgCJAAJAWfzCAFkAAkCJ3MIAiQACQFnwwgBZAAJAifzCAIkAAkBpyMIAaQACQJnkwgCZAAJAadTCAGkAAkCZ/MIAmQACQGn8wgBpAAJAmfzCAJkAAkBp/MIAaQACQJnUwgCZAAJAYfzCAGEAAkCR1MIAkQACQGH8wgBhAAJAkfzCAJEAAkBhxMIAYQACQJHIwgCRAAJAYfDCAGEAAkCR/MIAkQACQGX8wgBlAAJAlfzCAJUAAkBl0MIAZQACQJX8wgCVAAJAZfzCAGUAAkCV+MIAlQACQGXcwgBlAAJAlfzCAJUAAkBp/MIAaQACQJnwwgCZAAJAaeDCAGkAAkCZxMIAmQACQGn8wgBpAAJAmezCAJkAAkBp/MIAaQACQJn8wgCZAAJAdfzCAHUAAkCl9MIApQACQHX8wgB1AAJApczCAKUAAkB1/MIAdQACQKX8wgClAAJAdfDCAHUAAkCl1MIApQACQH38wgB9AAJAreDCAK0AAkB94MIAfQACQK30wgCtAAJAffzCAH0AAkCt6MIArQACQH3gwgB9AAJArdTCAK0AAkB9+MIAfQACQK38wgCtAAJAffzCAH0AAkCt1MIArQACQH3wwgB9AAJArdzCAK0AAkB17MIAdQACQKXwwgClAAJAWfzCAFkAAkCJ/MIAiQACQFn8wgBZAAJAidjCAIkAAkBZ/MIAWQACQIncwgCJAAJAWfDCAFkAAkCJ/MIAiQACQGnIwgBpAAJAmeTCAJkAAkBp1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ZBiCQ0AYkjxkGII8QBiSRWQYgkVAGJI+ZBiCPkAwkkVkGIJFQACSPmQYgj5AGJJFZBiCRUAYkj5kGII+QBiSRWQYgkVAGJI+ZBiCPkAYkkFkGIJBQBiSPGQYgjxAGJJBZBiCQUAYkjxkGII8QBiSQ2QYgkNAGJI8ZBiCPEAYkkNkGIJDQBiSPGQYgjxAGJJDZBiCQ0AYkj5kGII+QDCSRWQYgkVAAJI+ZBiCPkAYkkVkGIJFQBiSPmQYgj5AGJJDZRiCQ0AAkkVkGIJFQACSPmQYgj5AAJJIZBiCSEAAkkFkGIJBQBiSPGQYgjxAGJJBZBiCQUAYkjxkGII8QBiSQ2QYgkNAGJI8ZBiCPEAYkkNkGIJDQBiSPGQYgjxAGJJFZBiCRUAYkj5kGII+QDCSRWQYgkVAAJI+ZBiCPkAYkkVkGIJFQBiSPmQYgj5AGJJFZBiCRUAYkj5kGII+QBiSQWQYgkFAGJI8ZBiCPEAYkkFkGIJBQBiSPGQYgjxAGJJDZBiCQ0AYkjxkGII8QBiSQ2QYgkNAGJI8ZBiCPEAYkkVkGIJFQBiSPmQYgj5AMJJFZBiCRUAAkj5kGII+QBiSRWQYgkVAGJI+ZBiCPkAYkkNlGIJDQACSRWQYgkVAAJI+ZBiCPkAAkkpkGIJKQACSQWQYgkFAGJI8ZBiCPEAYkkFkGIJBQBiSPGQYgjxAGJJDZBiCQ0AYkjxkGII8QBiSQ2QYgkNAGJI8ZBiCPEAYkkVkGIJFQBiSPmQYgj5AMJJFZBiCRUAAkj5kGII+QBiSRWQYgkVAGJI+ZBiCPkAYkkVkGIJFQBiSPmQYgj5AGJJBZBiCQUAYkjxkGII8QBiSQWQYgkFAGJI8ZBiCPEAYkkNkGIJDQBiSPGQYgjxAGJJDZBiCQ0AYkjxkGII8QBiSQ2QYgkNAGJI+ZBiCPkAwkkVkGIJFQACSPmQYgj5AGJJFZBiCRUAYkj5kGII+QBiSQ2UYgkNAAJJFZBiCRUAAkj5kGII+QACSSGQYgkhAAJJBZBiCQUAYkjxkGII8QBiSQWQYgkFAGJI8ZBiCPEAYkkNkGIJDQBiSPGQYgjxAGJJDZBiCQ0AYkjxkGII8QBiSRWQYgkVAGJI+ZBiCPkAwkkVkGIJFQACSPmQYgj5AGJJFZBiCRUAYkj5kGII+QBiSRWQYgkVAGJI+ZBiCPkAYkkFkGIJBQBiSPGQYgjxAGJJBZBiCQUAYkjxkGII8QBiSQ2QYgkNAGJI8ZBiCPEAYkkNkGIJDQBiSPGQYgjxAGJJFZBiCRUAYkj5kGII+QDCSRWQYgkVAAJI+ZBiCPkAYkkVkGIJFQBiSPmQYgj5AGJJDZRiCQ0AAkkVkGIJFQACSPmQYgj5AAJJKZBiCSkAAkkV/gUCCRUBgkkV8MIJFQACSTHiBEIJMQACSSnFggkpAAJJFf2CCRUAAkkF7MIJBQACSQ3+BcIJDQGCSRX8wgkVAAJJGf2CCRkAAkkh9MIJIQACSSn8wgkpAAJJNc2CCTUAAkk9/MIJPQACSTX8wgk1AAJJRfIFwglFAgRCSVHVgsmUAALJkAACyBgwAsgpAALIHawDiAEAAwgAAglRAArJlAACyZAAAsgYMALIKQACyB2sA4gBAAMIAALJlAACyZAAAsgYMALIKQACyB2sA4gBAAMIAAP8vAE1UcmsAAAEcAP8DC3doaXRlIG5vaXNlALMKQACzB2QA4wBAALNlAACzZAAAswYMALMKQACzB2QA4wBAAMMAALNlAACzZAAAswYMALMKQACzB2QA4wBAAMMAALNlAACzZAAAswYMALMKQACzB2QA4wBAAMMAiTCTPB4YkzwiGJM8JxiTPCsYkzwxGJM8NhiTPDwYkzxCGJM8SBiTPE4YkzxVYIM8QBiDPEAYgzxAGIM8QBiDPEAYgzxAGIM8QBiDPEAYgzxAGIM8QBiDPECBhUCzZQAAs2QAALMGDACzCkAAswdkAOMAQADDAAKzZQAAs2QAALMGDACzCkAAswdkAOMAQADDAACzZQAAs2QAALMGDACzCkAAswdkAOMAQADDAAD/LwBNVHJrAAAA4wD/AwhNSURJIG91dAC9CkAAvQdkAO0AQAC9ZQAAvWQAAL0GDAC9CkAAvQdkAO0AQAC9ZQAAvWQAAL0GDAC9CkAAvQdkAO0AQAC9ZQAAvWQAAL0GDAC9CkAAvQdkAO0AQIwAnTxkmACNPEAAnTxkmACNPEAAnTxkmACNPEAAnTxkmACNPEAAnTxkmACNPEAAnTxkjzC9ZQAAvWQAAL0GDAC9CkAAvQdkAO0AQACNPEACvWUAAL1kAAC9BgwAvQpAAL0HZADtAEAAvWUAAL1kAAC9BgwAvQpAAL0HZADtAEAA/y8A";
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
		if(e.midi_channel == 13 && e.type == 0x9){
			active_scene++;
			SCENES[active_scene].onenter();
			console.log("active scene is now",active_scene,e);
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
	fadeFn = undefined;
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

function fadeOut(duration,fn){
	fadeStartTime = t;
	fadeGoalTime = t+duration;
	fadeStart = 0;
	fadeGoal = 1;
	fadeFn = fn;
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
