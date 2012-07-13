DEBUG = false;
ORIGO = new THREE.Vector3(0, 0, 0);
cameraMovementDone = true;

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
			cubes[(side-x-1)*side+y].mesh.position.y = on?25+5*Math.sin(x/4+t/4000):0;
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
	
	/*
	camera.position.x = lyte.x + Math.sin(t / 44100) * side * 8;
	camera.position.z = lyte.z + Math.cos(t / 44100) * side * 8;
	*/
	
	/* update particle system */
	/*
	for(var i=0;i<num_particles;i++){
		p = particles.vertices[i];
		nextp = particles.vertices[(i+1)%num_particles];
		
		p.dx += nextp.x-p.x<0?-0.1:0.1;
		p.dy += nextp.y-p.y<0?-0.1:0.1;
		p.dz += nextp.z-p.z<0?-0.1:0.1;
		
		p.dx = Math.max(-3, Math.min(p.dx+nextp.dx, 3));
		p.dy = Math.max(-3, Math.min(p.dy+nextp.dy, 3));
		p.dz = Math.max(-3, Math.min(p.dz+nextp.dz, 3));
		
		p.x += p.dx;
		p.y += p.dy;
		p.z += p.dz;
	}
	particles.verticesNeedUpdate = true;
	*/
	
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
	
	light.position.x = -camera.position.x;
	light.position.y = camera.position.y;
	light.position.z = -camera.position.z;

	var samples_per_quaver = midi.ticks_per_beat / midi.ticks_per_second * 44100;
	for ( var i = 0; i < side * side; i++) {
		cubes[i].update();
	}
	/*
	drawImage(STIAJE,2,15);
	drawImage(IVERJO,2,1);
	*/

	//t<2000000?drawImage(STIAJE,2,15):kewbe.update();
	lyte.update();
}

function Toob(){
	this.num_rings = 4;
}

Toob.prototype.render = function(){
	var timeoffset = t/10000;
	for(var x=0;x<side;x++){
		for(var y=0;y<side;y++){
			cubes[x*side+y].mesh.position.y= 10*+(Math.sin(timeoffset+x/3) + Math.cos(timeoffset+y/5)); 
		}
	}
}

Toob.prototype.update = function(){
	
}

function render() {
	tdx.clearRect(0,0,twoDCanvas.width, twoDCanvas.height);
	if(t < fadeGoalTime){
		tdx.fillStyle = "rgba(0,0,0,"+lerp(fadeStart,fadeGoal, (t-fadeStartTime)/(fadeGoalTime-fadeStartTime))+")";
		tdx.fillRect(0,0,16*GU,9*GU);
	}else if(fadeGoalTime != 0){
		tdx.fillStyle = "rgba(0,0,0,"+fadeGoal+")";
		tdx.fillRect(0,0,16*GU,9*GU);
		fadeGoalTime = 0;
	}
	
	camera.lookAt(cameratarget);
	//if(t>2000000)kewbe.render();
	//drawImage(STIAJE,2,15);
	toob.render();
	renderer.render(scene, camera);
	
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
		var data = "TVRoZAAAAAYAAQAHAGBNVHJrAAAADAD/WAQEAhgIAP8vAE1UcmsAAAAZAP9RAwehIAD/UQMHoSAA/1EDB6EgAP8vAE1UcmsAAAmHAP8DE1BpYW5vIE1vZHVsZSAoTUlESSkAsApAALAHZADgAEAAsGUAALBkAACwBgwAsApAALAHZADgAEAAwAAAsGUAALBkAACwBgwAsApAALAHZADgAEAAwAAAsApAALAHZADgAEAAwAAAsGUAALBkAACwBgwAsApAALAHZADgAEAAwAAAsApAALAHZADgAEAAwAAwkDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDx/DIA8AAyQOX8MgDkADJA8fwyAPAAkkEF/DIBBACSQPn8MgD4ADJBBfwyAQQA8kEF/DIBBACSQPn8MgD4ADJBBfwyAQQA8kEF/DIBBAAyQPn8MgD4ADJA3fwyANwAkkDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7AAyQN38MgDcAPJBAfwyAQAAkkDx/DIA8AAyQQH8MgEAAPJBAfwyAQAAkkDx/DIA8AAyQQH8MgEAAPJBAfwyAQAAMkDx/DIA8ADyQOX8MgDkAJJA1fwyANQAMkDl/DIA5ADyQOX8MgDkAJJA1fwyANQAMkDl/DIA5ADyQOX8MgDkADJA1fwyANQAMkDd/DIA3ACSQO38MgDsAJJA3fwyANwAMkDt/DIA7ADyQO38MgDsAJJA3fwyANwAMkDt/DIA7ADyQO38MgDsADJA3fwyANwAMkDl/DIA5ACSQPH8MgDwAJJA5fwyAOQAMkDx/DIA8ADyQO38MgDsAJJA7fwyAOwAMkD5/DIA+ADyQPn8MgD4ADJA7fwyAOwAMkDx/DIA8ACSQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAADJA8fwyAPAA8kDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDx/DIA8AAyQOX8MgDkADJA8fwyAPAAkkEF/DIBBACSQPn8MgD4ADJBBfwyAQQA8kEF/DIBBACSQPn8MgD4ADJBBfwyAQQA8kEF/DIBBAAyQPn8MgD4ADJA3fwyANwAkkDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7AAyQN38MgDcAPJBAfwyAQAAkkDx/DIA8AAyQQH8MgEAAPJBAfwyAQAAkkDx/DIA8AAyQQH8MgEAAPJBAfwyAQAAMkDx/DIA8ADyQOX8MgDkAJJA1fwyANQAMkDl/DIA5ADyQOX8MgDkAJJA1fwyANQAMkDl/DIA5ADyQOX8MgDkADJA1fwyANQAMkDd/DIA3ACSQO38MgDsAJJA3fwyANwAMkDt/DIA7ADyQO38MgDsAJJA3fwyANwAMkDt/DIA7ADyQO38MgDsADJA3fwyANwAMkDl/DIA5ACSQPH8MgDwAJJA5fwyAOQAMkDx/DIA8ADyQO38MgDsAJJA7fwyAOwAMkD5/DIA+ADyQPn8MgD4ADJA7fwyAOwAMkDx/DIA8ACSQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAADJA8fwyAPAA8kDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDx/DIA8AAyQOX8MgDkADJA8fwyAPAAkkEF/DIBBACSQPn8MgD4ADJBBfwyAQQA8kEF/DIBBACSQPn8MgD4ADJBBfwyAQQA8kEF/DIBBAAyQPn8MgD4ADJA3fwyANwAkkDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7AAyQN38MgDcAPJBAfwyAQAAkkDx/DIA8AAyQQH8MgEAAPJBAfwyAQAAkkDx/DIA8AAyQQH8MgEAAPJBAfwyAQAAMkDx/DIA8ADyQOX8MgDkAJJA1fwyANQAMkDl/DIA5ADyQOX8MgDkAJJA1fwyANQAMkDl/DIA5ADyQOX8MgDkADJA1fwyANQAMkDd/DIA3ACSQO38MgDsAJJA3fwyANwAMkDt/DIA7ADyQO38MgDsAJJA3fwyANwAMkDt/DIA7ADyQO38MgDsADJA3fwyANwAMkDl/DIA5ACSQPH8MgDwAJJA5fwyAOQAMkDx/DIA8ADyQO38MgDsAJJA7fwyAOwAMkD5/DIA+ADyQPn8MgD4ADJA7fwyAOwAMkDx/DIA8ACSQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAADJA8fwyAPAA8kDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDx/DIA8AAyQOX8MgDkADJA8fwyAPAAkkEF/DIBBACSQPn8MgD4ADJBBfwyAQQA8kEF/DIBBACSQPn8MgD4ADJBBfwyAQQA8kEF/DIBBAAyQPn8MgD4ADJA3fwyANwAkkDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7AAyQN38MgDcAPJBAfwyAQAAkkDx/DIA8AAyQQH8MgEAAPJBAfwyAQAAkkDx/DIA8AAyQQH8MgEAAPJBAfwyAQAAMkDx/DIA8ADyQOX8MgDkAJJA1fwyANQAMkDl/DIA5ADyQOX8MgDkAJJA1fwyANQAMkDl/DIA5ADyQOX8MgDkADJA1fwyANQAMkDd/DIA3ACSQO38MgDsAJJA3fwyANwAMkDt/DIA7ADyQO38MgDsAJJA3fwyANwAMkDt/DIA7ADyQO38MgDsADJA3fwyANwAMkDl/DIA5ACSQPH8MgDwAJJA5fwyAOQAMkDx/DIA8ADyQO38MgDsAJJA7fwyAOwAMkD5/DIA+ADyQPn8MgD4ADJA7fwyAOwAMkDx/DIA8ACSQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAADJA8fwyAPAAMsGUAALBkAACwBgwAsApAALAHZADgAEAAwAACsGUAALBkAACwBgwAsApAALAHZADgAEAAwAAAsGUAALBkAACwBgwAsApAALAHZADgAEAAwAAA/y8ATVRyawAACEoA/wMWUGlhbm8gTW9kdWxlICMyIChNSURJKQCxCkAAsQdkAOEAQACxZQAAsWQAALEGDACxCkAAsQdkAOEAQADBAACxZQAAsWQAALEGDACxCkAAsQdkAOEAQADBAACxCkAAsQdkAOEAQADBAACxZQAAsWQAALEGDACxCkAAsQdkAOEAQADBAACxCkAAsQdkAOEAQADBAACRLX8MgS0ADJEtfwyBLQAkkS1/DIEtADyRLX8MgS0ADJEtfwyBLQAkkS1/DIEtADyRLX8MgS0ADJEtfxiBLQBIkTJ/DIEyACSRMn8MgTIAPJEyfwyBMgAMkTJ/DIEyACSRMn8MgTIAPJEyfwyBMgAMkTJ/GIEyAEiRK38MgSsAJJErfwyBKwA8kSt/DIErAAyRK38MgSsAJJErfwyBKwA8kSt/DIErAAyRK38YgSsAMJEwfwyBMAAMkTB/DIEwACSRMH8MgTAAPJEwfwyBMAAMkTB/DIEwACSRMH8MgTAAPJEwfwyBMAAMkTB/GIEwADCRKX8MgSkADJEpfwyBKQAkkSl/DIEpADyRKX8MgSkADJEpfwyBKQAkkSl/DIEpADyRKX8MgSkADJEpfxiBKQBIkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/GIErAEiRLX8MgS0AJJEtfwyBLQA8kS1/DIEtAAyRLX8MgS0AJJEvfwyBLwA8kS9/DIEvAAyRL38YgS8ASJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfxiBMAAwkS1/DIEtAAyRLX8MgS0AJJEtfwyBLQA8kS1/DIEtAAyRLX8MgS0AJJEtfwyBLQA8kS1/DIEtAAyRLX8YgS0ASJEyfwyBMgAkkTJ/DIEyADyRMn8MgTIADJEyfwyBMgAkkTJ/DIEyADyRMn8MgTIADJEyfxiBMgBIkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/GIErADCRMH8MgTAADJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfxiBMAAwkSl/DIEpAAyRKX8MgSkAJJEpfwyBKQA8kSl/DIEpAAyRKX8MgSkAJJEpfwyBKQA8kSl/DIEpAAyRKX8YgSkASJErfwyBKwAkkSt/DIErADyRK38MgSsADJErfwyBKwAkkSt/DIErADyRK38MgSsADJErfxiBKwBIkS1/DIEtACSRLX8MgS0APJEtfwyBLQAMkS1/DIEtACSRL38MgS8APJEvfwyBLwAMkS9/GIEvAEiRMH8MgTAAJJEwfwyBMAA8kTB/DIEwAAyRMH8MgTAAJJEwfwyBMAA8kTB/DIEwAAyRMH8YgTAAMJEtfwyBLQAMkS1/DIEtACSRLX8MgS0APJEtfwyBLQAMkS1/DIEtACSRLX8MgS0APJEtfwyBLQAMkS1/GIEtAEiRMn8MgTIAJJEyfwyBMgA8kTJ/DIEyAAyRMn8MgTIAJJEyfwyBMgA8kTJ/DIEyAAyRMn8YgTIASJErfwyBKwAkkSt/DIErADyRK38MgSsADJErfwyBKwAkkSt/DIErADyRK38MgSsADJErfxiBKwAwkTB/DIEwAAyRMH8MgTAAJJEwfwyBMAA8kTB/DIEwAAyRMH8MgTAAJJEwfwyBMAA8kTB/DIEwAAyRMH8YgTAAMJEpfwyBKQAMkSl/DIEpACSRKX8MgSkAPJEpfwyBKQAMkSl/DIEpACSRKX8MgSkAPJEpfwyBKQAMkSl/GIEpAEiRK38MgSsAJJErfwyBKwA8kSt/DIErAAyRK38MgSsAJJErfwyBKwA8kSt/DIErAAyRK38YgSsASJEtfwyBLQAkkS1/DIEtADyRLX8MgS0ADJEtfwyBLQAkkS9/DIEvADyRL38MgS8ADJEvfxiBLwBIkTB/DIEwACSRMH8MgTAAPJEwfwyBMAAMkTB/DIEwACSRMH8MgTAAPJEwfwyBMAAMkTB/GIEwADCRLX8MgS0ADJEtfwyBLQAkkS1/DIEtADyRLX8MgS0ADJEtfwyBLQAkkS1/DIEtADyRLX8MgS0ADJEtfxiBLQBIkTJ/DIEyACSRMn8MgTIAPJEyfwyBMgAMkTJ/DIEyACSRMn8MgTIAPJEyfwyBMgAMkTJ/GIEyAEiRK38MgSsAJJErfwyBKwA8kSt/DIErAAyRK38MgSsAJJErfwyBKwA8kSt/DIErAAyRK38YgSsAMJEwfwyBMAAMkTB/DIEwACSRMH8MgTAAPJEwfwyBMAAMkTB/DIEwACSRMH8MgTAAPJEwfwyBMAAMkTB/GIEwADCRKX8MgSkADJEpfwyBKQAkkSl/DIEpADyRKX8MgSkADJEpfwyBKQAkkSl/DIEpADyRKX8MgSkADJEpfxiBKQBIkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/GIErAEiRLX8MgS0AJJEtfwyBLQA8kS1/DIEtAAyRLX8MgS0AJJEvfwyBLwA8kS9/DIEvAAyRL38YgS8ASJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfxiBMAAwsWUAALFkAACxBgwAsQpAALEHZADhAEAAwQACsWUAALFkAACxBgwAsQpAALEHZADhAEAAwQAAsWUAALFkAACxBgwAsQpAALEHZADhAEAAwQAA/y8ATVRyawAAIqYA/wMITUlESSBvdXQAsgpAALIHZADiAEAAsmUAALJkAACyBgwAsgpAALIHZADiAEAAwgAAsmUAALJkAACyBgwAsgpAALIHZADiAEAAwgAAsgpAALIHZADiAEAAwgAAsmUAALJkAACyBgwAsgpAALIHZADiAEAAwgAAsgpAALIHZADiAEAAwgCYAJJDZACSRWQAkkBkAJJIZIMAgkhAAIJDQACCRUAAgkBAAJI+ZACSQWQAkkVkAJJIZIMAgkhAAIJFQACCQUAAgj5AAJJFZACSR2QAkkNkAJI+ZIMAgj5AAIJDQACCR0AAgkVAAJI8ZACSQGQAkkNkAJJHZIMAgkdAAIJDQACCQEAAgjxAAJJFZACSSGQAkkFkAJJAZIMAgkBAAIJBQACCSEAAgkVAAJJDZACSPmQAkkdkAJJFZIMAgkVAAIJHQACCPkAAgkNAAJJFZACSR2QAkkNkAJI+ZIEQgj5AAIJDQACCR0AAgkVAAJJIZACSRWQAkkNkAJJAZGCCQEAAgkNAAIJFQACCSEAAkj5kAJJFZACSQ2QAkkdkgRCCR0AAgkNAAIJFQACCPkAAkkhkAJJDZACSQGQAkj5kgwCCPkAAgkBAAIJDQACCSEAAkkNiAJJFYgCSQGIAkkhiGIJIQACCQEAAgkVAAIJDQACSSDcAkkA3AJJFNwCSQzcWgkhAAIJDQACCRUAAgkBAAJJDdwCSRXcAkkB3AJJIdxqCSEAAgkBAAIJFQACCQ0AAkkhMAJJATACSRUwAkkNMGIJDQACCRUAAgkBAAIJIQACSSGIAkkBiAJJFYgCSQ2IZgkNAAIJFQACCQEAAgkhAAJJDdwCSRXcAkkB3AJJIdxiCSEAAgkBAAIJFQACCQ0AAkkM2AJJFNgCSQDYAkkg2F4JIQACCQEAAgkVAAIJDQACSSDcAkkA3AJJFNwCSQzcZgkNAAIJFQACCQEAAgkhAAJJDdwCSRXcAkkB3AJJIdxiCSEAAgkBAAIJFQACCQ0AAkkNLAJJFSwCSQEsAkkhLGIJIQACCQEAAgkVAAIJDQACSSGIAkkBiAJJFYgCSQ2IXgkNAAIJFQACCQEAAgkhAAJJIdwCSQHcAkkV3AJJDdxiCQ0AAgkVAAIJAQACCSEAAkkg3AJJANwCSRTcAkkM3F5JDYgCSRWIAkkBiAJJIYgKCQ0AAgkVAAIJAQACCSEAXgkNAAIJFQACCQEAAgkhAAJJDdwCSRXcAkkB3AJJIdxiCSEAAgkBAAIJFQACCQ0AAkkNiAJJFYgCSQGIAkkhiGIJIQACCQEAAgkVAAIJDQACSSGIAkkViAJJBYgCSPmIYgj5AAIJBQACCRUAAgkhAAJJINgCSRTYAkkE2AJI+NhaCSEAAgj5AAIJBQACCRUAAkj53AJJBdwCSRXcAkkh3GoJIQACCRUAAgkFAAII+QACSSE0AkkVNAJJBTQCSPk0Ygj5AAIJBQACCRUAAgkhAAJI+YgCSQWIAkkViAJJIYhmCSEAAgkVAAIJBQACCPkAAkj53AJJBdwCSRXcAkkh3GIJIQACCRUAAgkFAAII+QACSSDcAkkU3AJJBNwCSPjcXgj5AAIJBQACCRUAAgkhAAJJINwCSRTcAkkE3AJI+NxmCPkAAgkFAAIJFQACCSEAAkkh3AJJFdwCSQXcAkj53F4I+QACCQUAAgkVAAIJIQACSSE0AkkVNAJJBTQCSPk0WgkhAAII+QACCQUAAgkVAAJI+YwCSQWMAkkVjAJJIYxqCSEAAgkVAAIJBQACCPkAAkkh3AJJFdwCSQXcAkj53GII+QACCQUAAgkVAAIJIQACSPjcAkkE3AJJFNwCSSDcXkj5iAJJBYgCSRWIAkkhiAoI+QACCQUAAgkVAAIJIQBeCSEAAgkVAAIJBQACCPkAAkkh3AJJFdwCSQXcAkj53GII+QACCQUAAgkVAAIJIQACSPmIAkkFiAJJFYgCSSGIYgkhAAIJFQACCQUAAgj5AAJJFYgCSR2IAkkNiAJI+YhiCPkAAgkNAAIJHQACCRUAAkj43AJJDNwCSRzcAkkU3FoI+QACCRUAAgkdAAIJDQACSPncAkkN3AJJHdwCSRXcagkVAAIJHQACCQ0AAgj5AAJJFTACSR0wAkkNMAJI+TBiCPkAAgkNAAIJHQACCRUAAkj5iAJJDYgCSR2IAkkViGYJFQACCR0AAgkNAAII+QACSRXcAkkd3AJJDdwCSPncYgj5AAIJDQACCR0AAgkVAAJJFNgCSRzYAkkM2AJI+NheCPkAAgkNAAIJHQACCRUAAkkU3AJJHNwCSQzcAkj43GYI+QACCQ0AAgkdAAIJFQACSPncAkkN3AJJHdwCSRXcYgkVAAIJHQACCQ0AAgj5AAJI+SwCSQ0sAkkdLAJJFSxiCRUAAgkdAAIJDQACCPkAAkkViAJJHYgCSQ2IAkj5iF4I+QACCQ0AAgkdAAIJFQACSPncAkkN3AJJHdwCSRXcYgkVAAIJHQACCQ0AAgj5AAJI+NwCSQzcAkkc3AJJFNxeSRWIAkkdiAJJDYgCSPmICgkVAAIJHQACCQ0AAgj5AF4JFQACCR0AAgkNAAII+QACSRXcAkkd3AJJDdwCSPncYgj5AAIJDQACCR0AAgkVAAJJFYgCSR2IAkkNiAJI+YhiCPkAAgkNAAIJHQACCRUAAkkdiAJJDYgCSQGIAkjxiGII8QACCQEAAgkNAAIJHQACSRzYAkkM2AJJANgCSPDYWgkdAAII8QACCQEAAgkNAAJI8dwCSQHcAkkN3AJJHdxqCR0AAgkNAAIJAQACCPEAAkkdNAJJDTQCSQE0AkjxNGII8QACCQEAAgkNAAIJHQACSPGIAkkBiAJJDYgCSR2IZgkdAAIJDQACCQEAAgjxAAJI8dwCSQHcAkkN3AJJHdxiCR0AAgkNAAIJAQACCPEAAkkc3AJJDNwCSQDcAkjw3F4I8QACCQEAAgkNAAIJHQACSRzcAkkM3AJJANwCSPDcZgjxAAIJAQACCQ0AAgkdAAJJHdwCSQ3cAkkB3AJI8dxeCPEAAgkBAAIJDQACCR0AAkjxNAJJATQCSQ00AkkdNFoI8QACCR0AAgkNAAIJAQACSPGMAkkBjAJJDYwCSR2MagkdAAIJDQACCQEAAgjxAAJI8dwCSQHcAkkN3AJJHdxiCR0AAgkNAAIJAQACCPEAAkjw3AJJANwCSQzcAkkc3F5JHYgCSQ2IAkkBiAJI8YgKCR0AAgkNAAIJAQACCPEAXgkdAAIJDQACCQEAAgjxAAJJHdwCSQ3cAkkB3AJI8dxiCPEAAgkBAAIJDQACCR0AAkjxiAJJAYgCSQ2IAkkdiGIJHQACCQ0AAgkBAAII8QACSRWIAkkhiAJJBYgCSQGIYgkBAAIJBQACCSEAAgkVAAJJFNwCSSDcAkkE3AJJANxaCRUAAgkBAAIJBQACCSEAAkkB3AJJBdwCSSHcAkkV3GoJFQACCSEAAgkFAAIJAQACSQEwAkkFMAJJITACSRUwYgkVAAIJIQACCQUAAgkBAAJJFYgCSSGIAkkFiAJJAYhmCQEAAgkFAAIJIQACCRUAAkkV3AJJIdwCSQXcAkkB3GIJAQACCQUAAgkhAAIJFQACSRTYAkkg2AJJBNgCSQDYXgkBAAIJBQACCSEAAgkVAAJJANwCSQTcAkkg3AJJFNxmCRUAAgkhAAIJBQACCQEAAkkB3AJJBdwCSSHcAkkV3GIJFQACCSEAAgkFAAIJAQACSQEsAkkFLAJJISwCSRUsYgkVAAIJIQACCQUAAgkBAAJJFYgCSSGIAkkFiAJJAYheCQEAAgkFAAIJIQACCRUAAkkV3AJJIdwCSQXcAkkB3GIJAQACCQUAAgkhAAIJFQACSRTcAkkg3AJJBNwCSQDcXkkBiAJJBYgCSSGIAkkViAoJAQACCQUAAgkhAAIJFQBeCQEAAgkFAAIJIQACCRUAAkkB3AJJBdwCSSHcAkkV3GIJFQACCSEAAgkFAAIJAQACSQGIAkkFiAJJIYgCSRWIYgkVAAIJIQACCQUAAgkBAAJJDYgCSPmIAkkdiAJJFYhiCRUAAgkdAAII+QACCQ0AAkkM2AJI+NgCSRzYAkkU2FoJDQACCRUAAgkdAAII+QACSQ3cAkj53AJJHdwCSRXcagkVAAIJHQACCPkAAgkNAAJJFTQCSR00Akj5NAJJDTRiCQ0AAgj5AAIJHQACCRUAAkkNiAJI+YgCSR2IAkkViGYJFQACCR0AAgj5AAIJDQACSRXcAkkd3AJI+dwCSQ3cYgkNAAII+QACCR0AAgkVAAJJDNwCSPjcAkkc3AJJFNxeCRUAAgkdAAII+QACCQ0AAkkU3AJJHNwCSPjcAkkM3GYJDQACCPkAAgkdAAIJFQACSQ3cAkj53AJJHdwCSRXcXgkVAAIJHQACCPkAAgkNAAJJDTQCSPk0AkkdNAJJFTRaCQ0AAgkVAAIJHQACCPkAAkkVjAJJHYwCSPmMAkkNjGoJDQACCPkAAgkdAAIJFQACSQ3cAkj53AJJHdwCSRXcYgkVAAIJHQACCPkAAgkNAAJJFNwCSRzcAkj43AJJDNxeSRWIAkkdiAJI+YgCSQ2ICgkVAAIJHQACCPkAAgkNAF4JDQACCPkAAgkdAAIJFQACSQ3cAkj53AJJHdwCSRXcYgkVAAIJHQACCPkAAgkNAAJJFYgCSR2IAkj5iAJJDYhiCQ0AAgj5AAIJHQACCRUAAkj5iAJJDYgCSR2IAkkViGIJFQACCR0AAgkNAAII+QACSPjcAkkM3AJJHNwCSRTcWgj5AAIJFQACCR0AAgkNAAJI+dwCSQ3cAkkd3AJJFdxqCRUAAgkdAAIJDQACCPkAAkj5MAJJDTACSR0wAkkVMGIJFQACCR0AAgkNAAII+QACSPmIAkkNiAJJHYgCSRWIZgkVAAIJHQACCQ0AAgj5AAJJFdwCSR3cAkkN3AJI+dxeCPkAAgkNAAIJHQACCRUAAkkh3AJJFdwCSQ3cAkkB3AYJAQACCQ0AAgkVAAIJIQACSSDYAkkU2AJJDNgCSQDYXgkBAAIJDQACCRUAAgkhAAJJINwCSRTcAkkM3AJJANxmCQEAAgkNAAIJFQACCSEAAkkB3AJJDdwCSRXcAkkh3GIJIQACCRUAAgkNAAIJAQACSQEsAkkNLAJJFSwCSSEsXgkhAAIJFQACCQ0AAgkBAAJJHSwCSQ0sAkkVLAJI+SwGCPkAAgkVAAIJDQACCR0AAkkdiAJJDYgCSRWIAkj5iF4I+QACCRUAAgkNAAIJHQACSR3cAkkN3AJJFdwCSPncYgj5AAIJFQACCQ0AAgkdAAJJHNwCSQzcAkkU3AJI+NxeSR2IAkkNiAJJFYgCSPmICgkdAAIJDQACCRUAAgj5AF4I+QACCRUAAgkNAAIJHQACSPncAkkV3AJJDdwCSR3cYgkdAAIJDQACCRUAAgj5AAJI+YgCSRWIAkkNiAJJHYhiCR0AAgkNAAIJFQACCPkAAkj5iAJJAYgCSQ2IAkkhiGIJIQACCQ0AAgkBAAII+QACSPjYAkkA2AJJDNgCSSDYWgj5AAIJIQACCQ0AAgkBAAJJIdwCSQ3cAkkB3AJI+dxqCPkAAgkBAAIJDQACCSEAAkj5NAJJATQCSQ00AkkhNGIJIQACCQ0AAgkBAAII+QACSSGIAkkNiAJJAYgCSPmIZgj5AAIJAQACCQ0AAgkhAAJI+dwCSQHcAkkN3AJJIdxiCSEAAgkNAAIJAQACCPkAAkj43AJJANwCSQzcAkkg3F4JIQACCQ0AAgkBAAII+QACSPjcAkkA3AJJDNwCSSDcZgkhAAIJDQACCQEAAgj5AAJI+dwCSQHcAkkN3AJJIdxeCSEAAgkNAAIJAQACCPkAAkkhNAJJDTQCSQE0Akj5NFoJIQACCPkAAgkBAAIJDQACSSGMAkkNjAJJAYwCSPmMagj5AAIJAQACCQ0AAgkhAAJJIdwCSQ3cAkkB3AJI+dxiCPkAAgkBAAIJDQACCSEAAkj43AJJANwCSQzcAkkg3F5I+YgCSQGIAkkNiAJJIYgKCPkAAgkBAAIJDQACCSEAXgkhAAIJDQACCQEAAgj5AAJI+dwCSQHcAkkN3AJJIdxiCSEAAgkNAAIJAQACCPkAAkj5iAJJAYgCSQ2IAkkhiGIJIQACCQ0AAgkBAAII+QACSQ2IAkkViAJJAYgCSSGIYgkhAAIJAQACCRUAAgkNAAJJDNwCSRTcAkkA3AJJINxaCQ0AAgkhAAIJAQACCRUAAkkN3AJJFdwCSQHcAkkh3GoJIQACCQEAAgkVAAIJDQACSQ0wAkkVMAJJATACSSEwYgkhAAIJAQACCRUAAgkNAAJJDYgCSRWIAkkBiAJJIYhmCSEAAgkBAAIJFQACCQ0AAkkN3AJJFdwCSQHcAkkh3GIJIQACCQEAAgkVAAIJDQACSQzYAkkU2AJJANgCSSDYXgkhAAIJAQACCRUAAgkNAAJJDNwCSRTcAkkA3AJJINxmCSEAAgkBAAIJFQACCQ0AAkkN3AJJFdwCSQHcAkkh3GIJIQACCQEAAgkVAAIJDQACSQ0sAkkVLAJJASwCSSEsYgkhAAIJAQACCRUAAgkNAAJJDYgCSRWIAkkBiAJJIYheCSEAAgkBAAIJFQACCQ0AAkkN3AJJFdwCSQHcAkkh3GIJIQACCQEAAgkVAAIJDQACSQzcAkkU3AJJANwCSSDcXkkNiAJJFYgCSQGIAkkhiAoJDQACCRUAAgkBAAIJIQBeCSEAAgkBAAIJFQACCQ0AAkkN3AJJFdwCSQHcAkkh3GIJIQACCQEAAgkVAAIJDQACSQ2IAkkViAJJAYgCSSGIYgkhAAIJAQACCRUAAgkNAAJI+YgCSQWIAkkViAJJIYhiCSEAAgkVAAIJBQACCPkAAkj42AJJBNgCSRTYAkkg2FoI+QACCSEAAgkVAAIJBQACSPncAkkF3AJJFdwCSSHcagkhAAIJFQACCQUAAgj5AAJI+TQCSQU0AkkVNAJJITRiCSEAAgkVAAIJBQACCPkAAkj5iAJJBYgCSRWIAkkhiGYJIQACCRUAAgkFAAII+QACSPncAkkF3AJJFdwCSSHcYgkhAAIJFQACCQUAAgj5AAJI+NwCSQTcAkkU3AJJINxeCSEAAgkVAAIJBQACCPkAAkj43AJJBNwCSRTcAkkg3GYJIQACCRUAAgkFAAII+QACSPncAkkF3AJJFdwCSSHcXgkhAAIJFQACCQUAAgj5AAJI+TQCSQU0AkkVNAJJITRaCPkAAgkhAAIJFQACCQUAAkj5jAJJBYwCSRWMAkkhjGoJIQACCRUAAgkFAAII+QACSPncAkkF3AJJFdwCSSHcYgkhAAIJFQACCQUAAgj5AAJI+NwCSQTcAkkU3AJJINxeSPmIAkkFiAJJFYgCSSGICgj5AAIJBQACCRUAAgkhAF4JIQACCRUAAgkFAAII+QACSPncAkkF3AJJFdwCSSHcYgkhAAIJFQACCQUAAgj5AAJI+YgCSQWIAkkViAJJIYhiCSEAAgkVAAIJBQACCPkAAkkViAJJHYgCSQ2IAkj5iGII+QACCQ0AAgkdAAIJFQACSRTcAkkc3AJJDNwCSPjcWgkVAAII+QACCQ0AAgkdAAJJFdwCSR3cAkkN3AJI+dxqCPkAAgkNAAIJHQACCRUAAkkVMAJJHTACSQ0wAkj5MGII+QACCQ0AAgkdAAIJFQACSRWIAkkdiAJJDYgCSPmIZgj5AAIJDQACCR0AAgkVAAJJFdwCSR3cAkkN3AJI+dxiCPkAAgkNAAIJHQACCRUAAkkU2AJJHNgCSQzYAkj42F4I+QACCQ0AAgkdAAIJFQACSRTcAkkc3AJJDNwCSPjcZgj5AAIJDQACCR0AAgkVAAJJFdwCSR3cAkkN3AJI+dxiCPkAAgkNAAIJHQACCRUAAkkVLAJJHSwCSQ0sAkj5LGII+QACCQ0AAgkdAAIJFQACSRWIAkkdiAJJDYgCSPmIXgj5AAIJDQACCR0AAgkVAAJJFdwCSR3cAkkN3AJI+dxiCPkAAgkNAAIJHQACCRUAAkkU3AJJHNwCSQzcAkj43F5JFYgCSR2IAkkNiAJI+YgKCRUAAgkdAAIJDQACCPkAXgj5AAIJDQACCR0AAgkVAAJJFdwCSR3cAkkN3AJI+dxiCPkAAgkNAAIJHQACCRUAAkkViAJJHYgCSQ2IAkj5iGII+QACCQ0AAgkdAAIJFQACSPGIAkkBiAJJDYgCSR2IYgkdAAIJDQACCQEAAgjxAAJI8NgCSQDYAkkM2AJJHNhaCPEAAgkdAAIJDQACCQEAAkjx3AJJAdwCSQ3cAkkd3GoJHQACCQ0AAgkBAAII8QACSPE0AkkBNAJJDTQCSR00YgkdAAIJDQACCQEAAgjxAAJI8YgCSQGIAkkNiAJJHYhmCR0AAgkNAAIJAQACCPEAAkjx3AJJAdwCSQ3cAkkd3GIJHQACCQ0AAgkBAAII8QACSPDcAkkA3AJJDNwCSRzcXgkdAAIJDQACCQEAAgjxAAJI8NwCSQDcAkkM3AJJHNxmCR0AAgkNAAIJAQACCPEAAkjx3AJJAdwCSQ3cAkkd3F4JHQACCQ0AAgkBAAII8QACSPE0AkkBNAJJDTQCSR00WgjxAAIJHQACCQ0AAgkBAAJI8YwCSQGMAkkNjAJJHYxqCR0AAgkNAAIJAQACCPEAAkjx3AJJAdwCSQ3cAkkd3GIJHQACCQ0AAgkBAAII8QACSPDcAkkA3AJJDNwCSRzcXkjxiAJJAYgCSQ2IAkkdiAoI8QACCQEAAgkNAAIJHQBeCR0AAgkNAAIJAQACCPEAAkjx3AJJAdwCSQ3cAkkd3GIJHQACCQ0AAgkBAAII8QACSPGIAkkBiAJJDYgCSR2IYgkdAAIJDQACCQEAAgjxAAJJFYgCSSGIAkkFiAJJAYhiCQEAAgkFAAIJIQACCRUAAkkU3AJJINwCSQTcAkkA3FoJFQACCQEAAgkFAAIJIQACSRXcAkkh3AJJBdwCSQHcagkBAAIJBQACCSEAAgkVAAJJFTACSSEwAkkFMAJJATBiCQEAAgkFAAIJIQACCRUAAkkViAJJIYgCSQWIAkkBiGYJAQACCQUAAgkhAAIJFQACSRXcAkkh3AJJBdwCSQHcYgkBAAIJBQACCSEAAgkVAAJJFNgCSSDYAkkE2AJJANheCQEAAgkFAAIJIQACCRUAAkkU3AJJINwCSQTcAkkA3GYJAQACCQUAAgkhAAIJFQACSRXcAkkh3AJJBdwCSQHcYgkBAAIJBQACCSEAAgkVAAJJFSwCSSEsAkkFLAJJASxiCQEAAgkFAAIJIQACCRUAAkkViAJJIYgCSQWIAkkBiF4JAQACCQUAAgkhAAIJFQACSRXcAkkh3AJJBdwCSQHcYgkBAAIJBQACCSEAAgkVAAJJFNwCSSDcAkkE3AJJANxeSRWIAkkhiAJJBYgCSQGICgkVAAIJIQACCQUAAgkBAF4JAQACCQUAAgkhAAIJFQACSRXcAkkh3AJJBdwCSQHcYgkBAAIJBQACCSEAAgkVAAJJFYgCSSGIAkkFiAJJAYhiCQEAAgkFAAIJIQACCRUAAkkNiAJI+YgCSR2IAkkViGIJFQACCR0AAgj5AAIJDQACSQzYAkj42AJJHNgCSRTYWgkNAAIJFQACCR0AAgj5AAJJDdwCSPncAkkd3AJJFdxqCRUAAgkdAAII+QACCQ0AAkkNNAJI+TQCSR00AkkVNGIJFQACCR0AAgj5AAIJDQACSQ2IAkj5iAJJHYgCSRWIZgkVAAIJHQACCPkAAgkNAAJJDdwCSPncAkkd3AJJFdxiCRUAAgkdAAII+QACCQ0AAkkM3AJI+NwCSRzcAkkU3F4JFQACCR0AAgj5AAIJDQACSQzcAkj43AJJHNwCSRTcZgkVAAIJHQACCPkAAgkNAAJJDdwCSPncAkkd3AJJFdxeCRUAAgkdAAII+QACCQ0AAkkNNAJI+TQCSR00AkkVNFoJDQACCRUAAgkdAAII+QACSQ2MAkj5jAJJHYwCSRWMagkVAAIJHQACCPkAAgkNAAJJDdwCSPncAkkd3AJJFdxiCRUAAgkdAAII+QACCQ0AAkkM3AJI+NwCSRzcAkkU3F5JDYgCSPmIAkkdiAJJFYgKCQ0AAgj5AAIJHQACCRUAXgkVAAIJHQACCPkAAgkNAAJJDdwCSPncAkkd3AJJFdxiCRUAAgkdAAII+QACCQ0AAkkNiAJI+YgCSR2IAkkViGIJFQACCR0AAgj5AAIJDQACSRWIAkkdiAJJDYgCSPmIYgj5AAIJDQACCR0AAgkVAAJJFNwCSRzcAkkM3AJI+NxaCRUAAgj5AAIJDQACCR0AAkkV3AJJHdwCSQ3cAkj53GoI+QACCQ0AAgkdAAIJFQACSRUwAkkdMAJJDTACSPkwYgj5AAIJDQACCR0AAgkVAAJJFYgCSR2IAkkNiAJI+YhmCPkAAgkNAAIJHQACCRUAAkkV3AJJHdwCSQ3cAkj53F4I+QACCQ0AAgkdAAIJFQACSSHcAkkV3AJJDdwCSQHcBgkBAAIJDQACCRUAAgkhAAJJINgCSRTYAkkM2AJJANheCQEAAgkNAAIJFQACCSEAAkkg3AJJFNwCSQzcAkkA3GYJAQACCQ0AAgkVAAIJIQACSSHcAkkV3AJJDdwCSQHcYgkBAAIJDQACCRUAAgkhAAJJISwCSRUsAkkNLAJJASxeCQEAAgkNAAIJFQACCSEAAkj5LAJJFSwCSQ0sAkkdLAYJHQACCQ0AAgkVAAII+QACSPmIAkkViAJJDYgCSR2IXgkdAAIJDQACCRUAAgj5AAJI+dwCSRXcAkkN3AJJHdxiCR0AAgkNAAIJFQACCPkAAkj43AJJFNwCSQzcAkkc3F5I+YgCSRWIAkkNiAJJHYgKCPkAAgkVAAIJDQACCR0AXgkdAAIJDQACCRUAAgj5AAJI+dwCSRXcAkkN3AJJHdxiCR0AAgkNAAIJFQACCPkAAkj5iAJJFYgCSQ2IAkkdiGIJHQACCQ0AAgkVAAII+QACSSGIAkkNiAJJAYgCSPmIYgj5AAIJAQACCQ0AAgkhAAJJINgCSQzYAkkA2AJI+NhaCSEAAgj5AAIJAQACCQ0AAkkh3AJJDdwCSQHcAkj53GoI+QACCQEAAgkNAAIJIQACSSE0AkkNNAJJATQCSPk0Ygj5AAIJAQACCQ0AAgkhAAJJIYgCSQ2IAkkBiAJI+YhmCPkAAgkBAAIJDQACCSEAAkkh3AJJDdwCSQHcAkj53GII+QACCQEAAgkNAAIJIQACSSDcAkkM3AJJANwCSPjcXgj5AAIJAQACCQ0AAgkhAAJJINwCSQzcAkkA3AJI+NxmCPkAAgkBAAIJDQACCSEAAkkh3AJJDdwCSQHcAkj53F4I+QACCQEAAgkNAAIJIQACSSE0AkkNNAJJATQCSPk0WgkhAAII+QACCQEAAgkNAAJJIYwCSQ2MAkkBjAJI+YxqCPkAAgkBAAIJDQACCSEAAkkh3AJJDdwCSQHcAkj53GII+QACCQEAAgkNAAIJIQACSSDcAkkM3AJJANwCSPjcXkkhiAJJDYgCSQGIAkj5iAoJIQACCQ0AAgkBAAII+QBeCPkAAgkBAAIJDQACCSEAAkj53AJJAdwCSQ3cAkkh3GIJIQACCQ0AAgkBAAII+QACSPmIAkkBiAJJDYgCSSGIYgkhAAIJDQACCQEAAgj5AALJlAACyZAAAsgYMALIKQACyB2QA4gBAAMIAArJlAACyZAAAsgYMALIKQACyB2QA4gBAAMIAALJlAACyZAAA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QACZKmcwiSpAAJkqYzCJKkAAmSRkAJkqXzCJKkAAiSRAAJkkZACZKjEYiSpAAJkqKBiJJEAAiSpAAJkqLBiJKkAAmSowGIkqQACZJGQAmSo0GIkqQACZKjkYiSpAAIkkQACZKj0YiSpAAJkqQRiJKkAAmSRkAJkqRRiJKkAAmSpKGIkqQACJJEAAmSpOGIkqQACZKlIYiSpAAJkkZACZKlcYiSpAAJkqWxiJJEAAiSpAAJkqXxiJKkAAmSpjGIkqQACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACZJ2QAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAiSdAAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAJknZACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACJJ0AAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAmSdkAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAIknQACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACZJ2QAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAiSdAAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAJknZACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACJJ0AAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAmSdkAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAIknQACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACZJ2QAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAiSdAAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAJknZACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACJJ0AAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAmSdkAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAIknQACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACZJ2QAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAiSdAAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAJknZACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACJJ0AAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAmSdkAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAIknQACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACZJ2QAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAiSdAAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAJknZACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACJJ0AAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAmSdkAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAIknQACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACZJ2QAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAiSdAAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAJknZACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACJJ0AAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAmSdkAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAIknQACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACZJ2QAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAiSdAAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAJknZACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACJJ0AAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAmSdkAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAIknQACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACZJ2QAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAiSdAAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAJknZACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACJJ0AAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAmSdkAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAIknQACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACZJ2QAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAiSdAAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAJknZACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACJJ0AAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAmSdkAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAIknQACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACZJ2QAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAiSdAAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAJknZACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACJJ0AAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAmSdkAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAIknQACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACZJ2QAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAiSdAAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAJknZACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACJJ0AAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAmSdkAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAIknQACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACZJ2QAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAiSdAAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAJknZACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACJJ0AAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAmSdkAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAIknQACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACZJ2QAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAiSdAAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAJknZACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACJJ0AAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAmSdkAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAIknQACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACZJ2QAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAiSdAAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAJknZACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACJJ0AAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAmSdkAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAIknQACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACZJ2QAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAiSdAAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAJknZACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACJJ0AAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAmSdkAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAIknQACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACZJ2QAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAiSdAAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAJknZACZJGQwiSRAAJkqYxiJKkAAmSpjGIkqQACJJ0AAmSRkMIkkQACZKmMYiSpAAJkqYxiJKkAAmSdkAJkkZDCJJEAAmSpjGIkqQACZKmMYiSpAAIknQAC5ZQAAuWQAALkGDAC5CkAAuQdkAOkAQAK5ZQAAuWQAALkGDAC5CkAAuQdkAOkAQAC5ZQAAuWQAALkGDAC5CkAAuQdkAOkAQAD/LwA="; 
		data = atob(data);
		midi = new Midi(data);
	
	setLoadingBar(0.2,function(){
	mixer = new Mixer();

	setLoadingBar(0.4,function(){
		
	toob = new Toob();
		
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
	lyte = new Lyte(0, 40, 0);

	
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
	fadeStartTime = 0;
	fadeGoalTime = 0;
	fadeStart = 0;
	fadeGoal = 0;
	fadeIn(40000);
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
	if(this.mesh.position.y > 0){
		this.mesh.position.y -= 10;
	}else if(this.mesh.position.y < 0){
		this.mesh.position.y=0;
	}
	//this.mesh.material = materials[((this.mesh.position.y-20) / 10 * materials.length) | 0];
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
	this.w = 40;
	this.h = 4;

	this.x = +(x || 0);
	this.y = +(y || 0);
	this.z = +(z || 0);

	this.number_of_planes = 6;
	this.number_of_rays = 3;
	this.rotation = new THREE.Vector3(0, 0, 0);
	this.lyte = new THREE.Object3D(0, 0, 0);
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
				overdraw : true
			})));
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

	this.lyte.add(new THREE.Mesh(lyte_shell_g, new THREE.MeshLambertMaterial(
			0xCCCCCC)));
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

	this.lyte.position.x = Math.sin(t / (20000)) * side * 2;
	this.lyte.position.y = this.y;
	this.lyte.position.z = Math.cos(t / (20000)) * side * 2;

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
