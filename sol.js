DEBUG = false;
ORIGO = new THREE.Vector3(0, 0, 0);

//STIAJE = {data:"RBYDXCDBCDCCBCBCBCBCBEJBCBCBCBCBCBCBCCCBCBCBCBCBCBCDEBCBCBFBCBDBDCDBCBCBCBCBCCCBBBDECBCEICFBFBCCDCBFDDBDCF",w:25,h:11};
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
			cubes[(side-x-1)*side+y].mesh.material = materials[+on*2];
			x++;
			if(x>startx+img.w){
				x = startx+1;
				y++;
			}
		}
		on = !on;
	}
}

function update() {
	
	camera.position.x = lyte.x + Math.sin(t / 44100) * side * 8;
	camera.position.z = lyte.z + Math.cos(t / 44100) * side * 8;
	
	light.position.x = -camera.position.x;
	light.position.y = camera.position.y;
	light.position.z = -camera.position.z;

	var samples_per_quaver = midi.ticks_per_beat / midi.ticks_per_second * 44100;
	/*
	for ( var i = 0; i < side * side; i++) {
		cubes[i].update();
	}
	*/
	drawImage(STIAJE,2,15);
	drawImage(IVERJO,2,1);

	//kewbe.update();
	lyte.update();
}

function render() {
	camera.lookAt(ORIGO);
	//kewbe.render();
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
	var data = "TVRoZAAAAAYAAQAGAGBNVHJrAAAADAD/WAQEAhgIAP8vAE1UcmsAAAAZAP9RAwehIAD/UQMHoSAA/1EDB6EgAP8vAE1UcmsAAAmHAP8DE1BpYW5vIE1vZHVsZSAoTUlESSkAsApAALAHZADgAEAAsGUAALBkAACwBgwAsApAALAHZADgAEAAwAAAsGUAALBkAACwBgwAsApAALAHZADgAEAAwAAAsApAALAHZADgAEAAwAAAsGUAALBkAACwBgwAsApAALAHZADgAEAAwAAAsApAALAHZADgAEAAwAAwkDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDx/DIA8AAyQOX8MgDkADJA8fwyAPAAkkEF/DIBBACSQPn8MgD4ADJBBfwyAQQA8kEF/DIBBACSQPn8MgD4ADJBBfwyAQQA8kEF/DIBBAAyQPn8MgD4ADJA3fwyANwAkkDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7AAyQN38MgDcAPJBAfwyAQAAkkDx/DIA8AAyQQH8MgEAAPJBAfwyAQAAkkDx/DIA8AAyQQH8MgEAAPJBAfwyAQAAMkDx/DIA8ADyQOX8MgDkAJJA1fwyANQAMkDl/DIA5ADyQOX8MgDkAJJA1fwyANQAMkDl/DIA5ADyQOX8MgDkADJA1fwyANQAMkDd/DIA3ACSQO38MgDsAJJA3fwyANwAMkDt/DIA7ADyQO38MgDsAJJA3fwyANwAMkDt/DIA7ADyQO38MgDsADJA3fwyANwAMkDl/DIA5ACSQPH8MgDwAJJA5fwyAOQAMkDx/DIA8ADyQO38MgDsAJJA7fwyAOwAMkD5/DIA+ADyQPn8MgD4ADJA7fwyAOwAMkDx/DIA8ACSQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAADJA8fwyAPAA8kDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDx/DIA8AAyQOX8MgDkADJA8fwyAPAAkkEF/DIBBACSQPn8MgD4ADJBBfwyAQQA8kEF/DIBBACSQPn8MgD4ADJBBfwyAQQA8kEF/DIBBAAyQPn8MgD4ADJA3fwyANwAkkDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7AAyQN38MgDcAPJBAfwyAQAAkkDx/DIA8AAyQQH8MgEAAPJBAfwyAQAAkkDx/DIA8AAyQQH8MgEAAPJBAfwyAQAAMkDx/DIA8ADyQOX8MgDkAJJA1fwyANQAMkDl/DIA5ADyQOX8MgDkAJJA1fwyANQAMkDl/DIA5ADyQOX8MgDkADJA1fwyANQAMkDd/DIA3ACSQO38MgDsAJJA3fwyANwAMkDt/DIA7ADyQO38MgDsAJJA3fwyANwAMkDt/DIA7ADyQO38MgDsADJA3fwyANwAMkDl/DIA5ACSQPH8MgDwAJJA5fwyAOQAMkDx/DIA8ADyQO38MgDsAJJA7fwyAOwAMkD5/DIA+ADyQPn8MgD4ADJA7fwyAOwAMkDx/DIA8ACSQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAADJA8fwyAPAA8kDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDx/DIA8AAyQOX8MgDkADJA8fwyAPAAkkEF/DIBBACSQPn8MgD4ADJBBfwyAQQA8kEF/DIBBACSQPn8MgD4ADJBBfwyAQQA8kEF/DIBBAAyQPn8MgD4ADJA3fwyANwAkkDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7AAyQN38MgDcAPJBAfwyAQAAkkDx/DIA8AAyQQH8MgEAAPJBAfwyAQAAkkDx/DIA8AAyQQH8MgEAAPJBAfwyAQAAMkDx/DIA8ADyQOX8MgDkAJJA1fwyANQAMkDl/DIA5ADyQOX8MgDkAJJA1fwyANQAMkDl/DIA5ADyQOX8MgDkADJA1fwyANQAMkDd/DIA3ACSQO38MgDsAJJA3fwyANwAMkDt/DIA7ADyQO38MgDsAJJA3fwyANwAMkDt/DIA7ADyQO38MgDsADJA3fwyANwAMkDl/DIA5ACSQPH8MgDwAJJA5fwyAOQAMkDx/DIA8ADyQO38MgDsAJJA7fwyAOwAMkD5/DIA+ADyQPn8MgD4ADJA7fwyAOwAMkDx/DIA8ACSQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAADJA8fwyAPAA8kDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDx/DIA8AAyQOX8MgDkADJA8fwyAPAAkkEF/DIBBACSQPn8MgD4ADJBBfwyAQQA8kEF/DIBBACSQPn8MgD4ADJBBfwyAQQA8kEF/DIBBAAyQPn8MgD4ADJA3fwyANwAkkDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7AAyQN38MgDcAPJBAfwyAQAAkkDx/DIA8AAyQQH8MgEAAPJBAfwyAQAAkkDx/DIA8AAyQQH8MgEAAPJBAfwyAQAAMkDx/DIA8ADyQOX8MgDkAJJA1fwyANQAMkDl/DIA5ADyQOX8MgDkAJJA1fwyANQAMkDl/DIA5ADyQOX8MgDkADJA1fwyANQAMkDd/DIA3ACSQO38MgDsAJJA3fwyANwAMkDt/DIA7ADyQO38MgDsAJJA3fwyANwAMkDt/DIA7ADyQO38MgDsADJA3fwyANwAMkDl/DIA5ACSQPH8MgDwAJJA5fwyAOQAMkDx/DIA8ADyQO38MgDsAJJA7fwyAOwAMkD5/DIA+ADyQPn8MgD4ADJA7fwyAOwAMkDx/DIA8ACSQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAADJA8fwyAPAAMsGUAALBkAACwBgwAsApAALAHZADgAEAAwAACsGUAALBkAACwBgwAsApAALAHZADgAEAAwAAAsGUAALBkAACwBgwAsApAALAHZADgAEAAwAAA/y8ATVRyawAACEoA/wMWUGlhbm8gTW9kdWxlICMyIChNSURJKQCxCkAAsQdkAOEAQACxZQAAsWQAALEGDACxCkAAsQdkAOEAQADBAACxZQAAsWQAALEGDACxCkAAsQdkAOEAQADBAACxCkAAsQdkAOEAQADBAACxZQAAsWQAALEGDACxCkAAsQdkAOEAQADBAACxCkAAsQdkAOEAQADBAACRLX8MgS0ADJEtfwyBLQAkkS1/DIEtADyRLX8MgS0ADJEtfwyBLQAkkS1/DIEtADyRLX8MgS0ADJEtfxiBLQBIkTJ/DIEyACSRMn8MgTIAPJEyfwyBMgAMkTJ/DIEyACSRMn8MgTIAPJEyfwyBMgAMkTJ/GIEyAEiRK38MgSsAJJErfwyBKwA8kSt/DIErAAyRK38MgSsAJJErfwyBKwA8kSt/DIErAAyRK38YgSsAMJEwfwyBMAAMkTB/DIEwACSRMH8MgTAAPJEwfwyBMAAMkTB/DIEwACSRMH8MgTAAPJEwfwyBMAAMkTB/GIEwADCRKX8MgSkADJEpfwyBKQAkkSl/DIEpADyRKX8MgSkADJEpfwyBKQAkkSl/DIEpADyRKX8MgSkADJEpfxiBKQBIkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/GIErAEiRLX8MgS0AJJEtfwyBLQA8kS1/DIEtAAyRLX8MgS0AJJEvfwyBLwA8kS9/DIEvAAyRL38YgS8ASJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfxiBMAAwkS1/DIEtAAyRLX8MgS0AJJEtfwyBLQA8kS1/DIEtAAyRLX8MgS0AJJEtfwyBLQA8kS1/DIEtAAyRLX8YgS0ASJEyfwyBMgAkkTJ/DIEyADyRMn8MgTIADJEyfwyBMgAkkTJ/DIEyADyRMn8MgTIADJEyfxiBMgBIkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/GIErADCRMH8MgTAADJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfxiBMAAwkSl/DIEpAAyRKX8MgSkAJJEpfwyBKQA8kSl/DIEpAAyRKX8MgSkAJJEpfwyBKQA8kSl/DIEpAAyRKX8YgSkASJErfwyBKwAkkSt/DIErADyRK38MgSsADJErfwyBKwAkkSt/DIErADyRK38MgSsADJErfxiBKwBIkS1/DIEtACSRLX8MgS0APJEtfwyBLQAMkS1/DIEtACSRL38MgS8APJEvfwyBLwAMkS9/GIEvAEiRMH8MgTAAJJEwfwyBMAA8kTB/DIEwAAyRMH8MgTAAJJEwfwyBMAA8kTB/DIEwAAyRMH8YgTAAMJEtfwyBLQAMkS1/DIEtACSRLX8MgS0APJEtfwyBLQAMkS1/DIEtACSRLX8MgS0APJEtfwyBLQAMkS1/GIEtAEiRMn8MgTIAJJEyfwyBMgA8kTJ/DIEyAAyRMn8MgTIAJJEyfwyBMgA8kTJ/DIEyAAyRMn8YgTIASJErfwyBKwAkkSt/DIErADyRK38MgSsADJErfwyBKwAkkSt/DIErADyRK38MgSsADJErfxiBKwAwkTB/DIEwAAyRMH8MgTAAJJEwfwyBMAA8kTB/DIEwAAyRMH8MgTAAJJEwfwyBMAA8kTB/DIEwAAyRMH8YgTAAMJEpfwyBKQAMkSl/DIEpACSRKX8MgSkAPJEpfwyBKQAMkSl/DIEpACSRKX8MgSkAPJEpfwyBKQAMkSl/GIEpAEiRK38MgSsAJJErfwyBKwA8kSt/DIErAAyRK38MgSsAJJErfwyBKwA8kSt/DIErAAyRK38YgSsASJEtfwyBLQAkkS1/DIEtADyRLX8MgS0ADJEtfwyBLQAkkS9/DIEvADyRL38MgS8ADJEvfxiBLwBIkTB/DIEwACSRMH8MgTAAPJEwfwyBMAAMkTB/DIEwACSRMH8MgTAAPJEwfwyBMAAMkTB/GIEwADCRLX8MgS0ADJEtfwyBLQAkkS1/DIEtADyRLX8MgS0ADJEtfwyBLQAkkS1/DIEtADyRLX8MgS0ADJEtfxiBLQBIkTJ/DIEyACSRMn8MgTIAPJEyfwyBMgAMkTJ/DIEyACSRMn8MgTIAPJEyfwyBMgAMkTJ/GIEyAEiRK38MgSsAJJErfwyBKwA8kSt/DIErAAyRK38MgSsAJJErfwyBKwA8kSt/DIErAAyRK38YgSsAMJEwfwyBMAAMkTB/DIEwACSRMH8MgTAAPJEwfwyBMAAMkTB/DIEwACSRMH8MgTAAPJEwfwyBMAAMkTB/GIEwADCRKX8MgSkADJEpfwyBKQAkkSl/DIEpADyRKX8MgSkADJEpfwyBKQAkkSl/DIEpADyRKX8MgSkADJEpfxiBKQBIkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/GIErAEiRLX8MgS0AJJEtfwyBLQA8kS1/DIEtAAyRLX8MgS0AJJEvfwyBLwA8kS9/DIEvAAyRL38YgS8ASJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfxiBMAAwsWUAALFkAACxBgwAsQpAALEHZADhAEAAwQACsWUAALFkAACxBgwAsQpAALEHZADhAEAAwQAAsWUAALFkAACxBgwAsQpAALEHZADhAEAAwQAA/y8ATVRyawAAIogA/wMITUlESSBvdXQAsgpAALIHZADiAEAAsmUAALJkAACyBgwAsgpAALIHZADiAEAAwgAAsmUAALJkAACyBgwAsgpAALIHZADiAEAAwgAAsmUAALJkAACyBgwAsgpAALIHZADiAEAAwgCYAJJIZACSQGQAkkVkAJJDZIMAgkNAAIJIQACCQEAAgkVAAJJIZACSRWQAkkFkAJI+ZIMAgj5AAIJBQACCRUAAgkhAAJI+ZACSQ2QAkkdkAJJFZIMAgj5AAIJFQACCR0AAgkNAAJJHZACSQ2QAkkBkAJI8ZIMAgjxAAIJAQACCQ0AAgkdAAJJAZACSQWQAkkhkAJJFZIMAgkVAAIJIQACCQUAAgkBAAJJFZACSR2QAkj5kAJJDZIMAgkVAAIJDQACCPkAAgkdAAJI+ZACSQ2QAkkdkAJJFZIEQgj5AAIJFQACCR0AAgkNAAJJAZACSQ2QAkkVkAJJIZGCCQEAAgkhAAIJFQACCQ0AAkkdkAJJDZACSRWQAkj5kgRCCPkAAgkVAAIJDQACCR0AAkj5kAJJAZACSQ2QAkkhkgwCCSEAAgkNAAIJAQACCPkAAkkhiAJJAYgCSRWIAkkNiGIJDQACCRUAAgkBAAIJIQACSQzcAkkU3AJJANwCSSDcWgkhAAIJAQACCRUAAgkNAAJJIdwCSQHcAkkV3AJJDdxqCQ0AAgkVAAIJAQACCSEAAkkNMAJJFTACSQEwAkkhMGIJIQACCQEAAgkVAAIJDQACSQ2IAkkViAJJAYgCSSGIZgkhAAIJAQACCRUAAgkNAAJJIdwCSQHcAkkV3AJJDdxiCQ0AAgkVAAIJAQACCSEAAkkg2AJJANgCSRTYAkkM2F4JDQACCRUAAgkBAAIJIQACSQzcAkkU3AJJANwCSSDcZgkhAAIJAQACCRUAAgkNAAJJIdwCSQHcAkkV3AJJDdxiCSEAAgkNAAIJFQACCQEAAkkhLAJJASwCSRUsAkkNLGIJDQACCRUAAgkBAAIJIQACSQ2IAkkViAJJAYgCSSGIXgkhAAIJAQACCRUAAgkNAAJJDdwCSRXcAkkB3AJJIdxiCSEAAgkBAAIJFQACCQ0AAkkM3AJJFNwCSQDcAkkg3F5JIYgCSQGIAkkViAJJDYgKCSEAAgkBAAIJFQACCQ0AXgkNAAIJFQACCQEAAgkhAAJJIdwCSQHcAkkV3AJJDdxiCSEAAgkNAAIJFQACCQEAAkkhiAJJAYgCSRWIAkkNiGIJIQACCQ0AAgkVAAIJAQACSPmIAkkFiAJJFYgCSSGIYgkhAAIJFQACCQUAAgj5AAJI+NgCSQTYAkkU2AJJINhaCSEAAgkVAAIJBQACCPkAAkkh3AJJFdwCSQXcAkj53GoI+QACCQUAAgkVAAIJIQACSPk0AkkFNAJJFTQCSSE0YgkhAAIJFQACCQUAAgj5AAJJIYgCSRWIAkkFiAJI+YhmCSEAAgj5AAIJBQACCRUAAkkh3AJJFdwCSQXcAkj53GII+QACCQUAAgkVAAIJIQACSPjcAkkE3AJJFNwCSSDcXgkhAAIJFQACCQUAAgj5AAJI+NwCSQTcAkkU3AJJINxmCSEAAgkVAAIJBQACCPkAAkj53AJJBdwCSRXcAkkh3F4JIQACCRUAAgkFAAII+QACSPk0AkkFNAJJFTQCSSE0WgkhAAIJFQACCQUAAgj5AAJJIYwCSRWMAkkFjAJI+YxqCPkAAgkFAAIJFQACCSEAAkj53AJJBdwCSRXcAkkh3GIJIQACCRUAAgkFAAII+QACSSDcAkkU3AJJBNwCSPjcXkkhiAJJFYgCSQWIAkj5iAoI+QACCQUAAgkVAAIJIQBeCPkAAgkFAAIJFQACCSEAAkj53AJJBdwCSRXcAkkh3GIJIQACCRUAAgkFAAII+QACSSGIAkkViAJJBYgCSPmIYgkhAAII+QACCQUAAgkVAAJI+YgCSQ2IAkkdiAJJFYhiCPkAAgkVAAIJHQACCQ0AAkkU3AJJHNwCSQzcAkj43FoI+QACCQ0AAgkdAAIJFQACSRXcAkkd3AJJDdwCSPncagj5AAIJDQACCR0AAgkVAAJI+TACSQ0wAkkdMAJJFTBiCPkAAgkVAAIJHQACCQ0AAkkViAJJHYgCSQ2IAkj5iGYI+QACCQ0AAgkdAAIJFQACSPncAkkN3AJJHdwCSRXcYgkVAAIJHQACCQ0AAgj5AAJI+NgCSQzYAkkc2AJJFNheCRUAAgkdAAIJDQACCPkAAkj43AJJDNwCSRzcAkkU3GYI+QACCRUAAgkdAAIJDQACSRXcAkkd3AJJDdwCSPncYgj5AAIJDQACCR0AAgkVAAJJFSwCSR0sAkkNLAJI+SxiCPkAAgkNAAIJHQACCRUAAkj5iAJJDYgCSR2IAkkViF4JFQACCR0AAgkNAAII+QACSRXcAkkd3AJJDdwCSPncYgj5AAIJDQACCR0AAgkVAAJJFNwCSRzcAkkM3AJI+NxeSPmIAkkNiAJJHYgCSRWICgj5AAIJDQACCR0AAgkVAF4JFQACCR0AAgkNAAII+QACSPncAkkN3AJJHdwCSRXcYgkVAAIJHQACCQ0AAgj5AAJI+YgCSQ2IAkkdiAJJFYhiCRUAAgkdAAIJDQACCPkAAkjxiAJJAYgCSQ2IAkkdiGIJHQACCQ0AAgkBAAII8QACSPDYAkkA2AJJDNgCSRzYWgkdAAIJDQACCQEAAgjxAAJJHdwCSQ3cAkkB3AJI8dxqCPEAAgkBAAIJDQACCR0AAkjxNAJJATQCSQ00AkkdNGIJHQACCQ0AAgkBAAII8QACSR2IAkkNiAJJAYgCSPGIZgkdAAII8QACCQEAAgkNAAJJHdwCSQ3cAkkB3AJI8dxiCPEAAgkBAAIJDQACCR0AAkjw3AJJANwCSQzcAkkc3F4JHQACCQ0AAgkBAAII8QACSPDcAkkA3AJJDNwCSRzcZgkdAAIJDQACCQEAAgjxAAJI8dwCSQHcAkkN3AJJHdxeCPEAAgkdAAIJDQACCQEAAkkdNAJJDTQCSQE0AkjxNFoJHQACCPEAAgkBAAIJDQACSR2MAkkNjAJJAYwCSPGMagjxAAIJAQACCQ0AAgkdAAJJHdwCSQ3cAkkB3AJI8dxiCR0AAgjxAAIJAQACCQ0AAkkc3AJJDNwCSQDcAkjw3F5I8YgCSQGIAkkNiAJJHYgKCQ0AAgjxAAIJAQACCR0AXgkdAAIJDQACCQEAAgjxAAJI8dwCSQHcAkkN3AJJHdxiCR0AAgkNAAIJAQACCPEAAkkdiAJJDYgCSQGIAkjxiGIJHQACCPEAAgkBAAIJDQACSQGIAkkFiAJJIYgCSRWIYgkVAAIJIQACCQUAAgkBAAJJANwCSQTcAkkg3AJJFNxaCQEAAgkVAAIJIQACCQUAAkkV3AJJIdwCSQXcAkkB3GoJAQACCQUAAgkhAAIJFQACSRUwAkkhMAJJBTACSQEwYgkBAAIJBQACCSEAAgkVAAJJAYgCSQWIAkkhiAJJFYhmCQEAAgkVAAIJIQACCQUAAkkB3AJJBdwCSSHcAkkV3GIJFQACCSEAAgkFAAIJAQACSQDYAkkE2AJJINgCSRTYXgkVAAIJIQACCQUAAgkBAAJJFNwCSSDcAkkE3AJJANxmCQEAAgkFAAIJIQACCRUAAkkV3AJJIdwCSQXcAkkB3GIJFQACCQEAAgkFAAIJIQACSRUsAkkhLAJJBSwCSQEsYgkBAAIJBQACCSEAAgkVAAJJAYgCSQWIAkkhiAJJFYheCRUAAgkhAAIJBQACCQEAAkkB3AJJBdwCSSHcAkkV3GIJAQACCRUAAgkhAAIJBQACSQDcAkkE3AJJINwCSRTcXkkViAJJIYgCSQWIAkkBiAoJAQACCRUAAgkhAAIJBQBeCQEAAgkFAAIJIQACCRUAAkkV3AJJIdwCSQXcAkkB3GIJAQACCQUAAgkhAAIJFQACSRWIAkkhiAJJBYgCSQGIYgkBAAIJBQACCSEAAgkVAAJJFYgCSR2IAkj5iAJJDYhiCRUAAgkNAAII+QACCR0AAkkU2AJJHNgCSPjYAkkM2FoJFQACCQ0AAgj5AAIJHQACSRXcAkkd3AJI+dwCSQ3cagkNAAII+QACCR0AAgkVAAJJDTQCSPk0AkkdNAJJFTRiCRUAAgkdAAII+QACCQ0AAkkViAJJHYgCSPmIAkkNiGYJFQACCQ0AAgj5AAIJHQACSQ3cAkj53AJJHdwCSRXcYgkVAAIJHQACCPkAAgkNAAJJFNwCSRzcAkj43AJJDNxeCQ0AAgj5AAIJHQACCRUAAkkM3AJI+NwCSRzcAkkU3GYJFQACCR0AAgj5AAIJDQACSRXcAkkd3AJI+dwCSQ3cXgkNAAII+QACCR0AAgkVAAJJFTQCSR00Akj5NAJJDTRaCRUAAgkNAAII+QACCR0AAkkNjAJI+YwCSR2MAkkVjGoJFQACCR0AAgj5AAIJDQACSRXcAkkd3AJI+dwCSQ3cYgkVAAIJDQACCPkAAgkdAAJJDNwCSPjcAkkc3AJJFNxeSQ2IAkj5iAJJHYgCSRWICgkVAAIJHQACCPkAAgkNAF4JFQACCR0AAgj5AAIJDQACSRXcAkkd3AJI+dwCSQ3cYgkVAAIJDQACCPkAAgkdAAJJDYgCSPmIAkkdiAJJFYhiCRUAAgkdAAII+QACCQ0AAkkViAJJHYgCSQ2IAkj5iGII+QACCQ0AAgkdAAIJFQACSRTcAkkc3AJJDNwCSPjcWgj5AAIJDQACCR0AAgkVAAJJFdwCSR3cAkkN3AJI+dxqCPkAAgkNAAIJHQACCRUAAkkVMAJJHTACSQ0wAkj5MGII+QACCQ0AAgkdAAIJFQACSRWIAkkdiAJJDYgCSPmIZgj5AAIJDQACCR0AAgkVAAJI+dwCSQ3cAkkd3AJJFdxeCRUAAgkdAAIJDQACCPkAAkkB3AJJDdwCSRXcAkkh3AYJIQACCRUAAgkNAAIJAQACSQDYAkkM2AJJFNgCSSDYXgkBAAIJIQACCRUAAgkNAAJJANwCSQzcAkkU3AJJINxmCQEAAgkhAAIJFQACCQ0AAkkh3AJJFdwCSQ3cAkkB3GIJAQACCQ0AAgkVAAIJIQACSSEsAkkVLAJJDSwCSQEsXgkBAAIJDQACCRUAAgkhAAJI+SwCSRUsAkkNLAJJHSwGCR0AAgkNAAIJFQACCPkAAkj5iAJJFYgCSQ2IAkkdiF4JHQACCQ0AAgkVAAII+QACSPncAkkV3AJJDdwCSR3cYgkdAAIJDQACCRUAAgj5AAJI+NwCSRTcAkkM3AJJHNxeSPmIAkkViAJJDYgCSR2ICgkdAAIJDQACCRUAAgj5AF4JHQACCQ0AAgkVAAII+QACSR3cAkkN3AJJFdwCSPncYgkdAAII+QACCRUAAgkNAAJJHYgCSQ2IAkkViAJI+YhiCR0AAgj5AAIJFQACCQ0AAkkhiAJJDYgCSQGIAkj5iGII+QACCQEAAgkNAAIJIQACSSDYAkkM2AJJANgCSPjYWgj5AAIJAQACCQ0AAgkhAAJI+dwCSQHcAkkN3AJJIdxqCSEAAgkNAAIJAQACCPkAAkkhNAJJDTQCSQE0Akj5NGII+QACCQEAAgkNAAIJIQACSPmIAkkBiAJJDYgCSSGIZgj5AAIJIQACCQ0AAgkBAAJJIdwCSQ3cAkkB3AJI+dxiCPkAAgkBAAIJDQACCSEAAkkg3AJJDNwCSQDcAkj43F4I+QACCQEAAgkNAAIJIQACSSDcAkkM3AJJANwCSPjcZgj5AAIJAQACCQ0AAgkhAAJJIdwCSQ3cAkkB3AJI+dxeCPkAAgkBAAIJDQACCSEAAkj5NAJJATQCSQ00AkkhNFoI+QACCSEAAgkNAAIJAQACSPmMAkkBjAJJDYwCSSGMagkhAAIJDQACCQEAAgj5AAJI+dwCSQHcAkkN3AJJIdxiCPkAAgkhAAIJDQACCQEAAkkg3AJJDNwCSQDcAkj43F5JIYgCSQ2IAkkBiAJI+YgKCPkAAgkBAAIJDQACCSEAXgj5AAIJAQACCQ0AAgkhAAJJIdwCSQ3cAkkB3AJI+dxiCPkAAgkBAAIJDQACCSEAAkkhiAJJDYgCSQGIAkj5iGII+QACCQEAAgkNAAIJIQACSSGIAkkBiAJJFYgCSQ2IYgkNAAIJFQACCQEAAgkhAAJJINwCSQDcAkkU3AJJDNxaCQ0AAgkVAAIJAQACCSEAAkkh3AJJAdwCSRXcAkkN3GoJDQACCRUAAgkBAAIJIQACSSEwAkkBMAJJFTACSQ0wYgkNAAIJFQACCQEAAgkhAAJJIYgCSQGIAkkViAJJDYhmCSEAAgkNAAIJFQACCQEAAkkh3AJJAdwCSRXcAkkN3GIJDQACCRUAAgkBAAIJIQACSSDYAkkA2AJJFNgCSQzYXgkNAAIJFQACCQEAAgkhAAJJINwCSQDcAkkU3AJJDNxmCSEAAgkNAAIJFQACCQEAAkkh3AJJAdwCSRXcAkkN3GIJIQACCQ0AAgkVAAIJAQACSSEsAkkBLAJJFSwCSQ0sYgkNAAIJFQACCQEAAgkhAAJJIYgCSQGIAkkViAJJDYheCQ0AAgkVAAIJAQACCSEAAkkh3AJJAdwCSRXcAkkN3GIJIQACCQ0AAgkVAAIJAQACSSDcAkkA3AJJFNwCSQzcXkkhiAJJAYgCSRWIAkkNiAoJDQACCRUAAgkBAAIJIQBeCQ0AAgkVAAIJAQACCSEAAkkh3AJJAdwCSRXcAkkN3GIJIQACCQ0AAgkVAAIJAQACSSGIAkkBiAJJFYgCSQ2IYgkNAAIJFQACCQEAAgkhAAJJIYgCSRWIAkkFiAJI+YhiCPkAAgkFAAIJFQACCSEAAkkg2AJJFNgCSQTYAkj42FoI+QACCQUAAgkVAAIJIQACSSHcAkkV3AJJBdwCSPncagj5AAIJBQACCRUAAgkhAAJJITQCSRU0AkkFNAJI+TRiCPkAAgkFAAIJFQACCSEAAkkhiAJJFYgCSQWIAkj5iGYI+QACCQUAAgkVAAIJIQACSSHcAkkV3AJJBdwCSPncYgj5AAIJBQACCRUAAgkhAAJJINwCSRTcAkkE3AJI+NxeCPkAAgkFAAIJFQACCSEAAkkg3AJJFNwCSQTcAkj43GYI+QACCQUAAgkVAAIJIQACSSHcAkkV3AJJBdwCSPncXgj5AAIJBQACCRUAAgkhAAJJITQCSRU0AkkFNAJI+TRaCPkAAgkFAAIJFQACCSEAAkkhjAJJFYwCSQWMAkj5jGoI+QACCQUAAgkVAAIJIQACSSHcAkkV3AJJBdwCSPncYgkhAAII+QACCQUAAgkVAAJJINwCSRTcAkkE3AJI+NxeSSGIAkkViAJJBYgCSPmICgj5AAIJBQACCRUAAgkhAF4I+QACCQUAAgkVAAIJIQACSSHcAkkV3AJJBdwCSPncYgj5AAIJBQACCRUAAgkhAAJJIYgCSRWIAkkFiAJI+YhiCPkAAgkFAAIJFQACCSEAAkj5iAJJDYgCSR2IAkkViGIJFQACCR0AAgkNAAII+QACSPjcAkkM3AJJHNwCSRTcWgkVAAIJHQACCQ0AAgj5AAJI+dwCSQ3cAkkd3AJJFdxqCRUAAgkdAAIJDQACCPkAAkj5MAJJDTACSR0wAkkVMGIJFQACCR0AAgkNAAII+QACSPmIAkkNiAJJHYgCSRWIZgkVAAIJHQACCQ0AAgj5AAJI+dwCSQ3cAkkd3AJJFdxiCRUAAgkdAAIJDQACCPkAAkj42AJJDNgCSRzYAkkU2F4JFQACCR0AAgkNAAII+QACSPjcAkkM3AJJHNwCSRTcZgj5AAIJFQACCR0AAgkNAAJI+dwCSQ3cAkkd3AJJFdxiCRUAAgkdAAIJDQACCPkAAkj5LAJJDSwCSR0sAkkVLGIJFQACCR0AAgkNAAII+QACSPmIAkkNiAJJHYgCSRWIXgkVAAIJHQACCQ0AAgj5AAJI+dwCSQ3cAkkd3AJJFdxiCRUAAgkdAAIJDQACCPkAAkj43AJJDNwCSRzcAkkU3F5I+YgCSQ2IAkkdiAJJFYgKCRUAAgkdAAIJDQACCPkAXgkVAAIJHQACCQ0AAgj5AAJI+dwCSQ3cAkkd3AJJFdxiCRUAAgkdAAIJDQACCPkAAkj5iAJJDYgCSR2IAkkViGIJFQACCR0AAgkNAAII+QACSR2IAkkNiAJJAYgCSPGIYgkdAAII8QACCQEAAgkNAAJJHNgCSQzYAkkA2AJI8NhaCPEAAgkBAAIJDQACCR0AAkkd3AJJDdwCSQHcAkjx3GoI8QACCQEAAgkNAAIJHQACSR00AkkNNAJJATQCSPE0YgjxAAIJAQACCQ0AAgkdAAJJHYgCSQ2IAkkBiAJI8YhmCR0AAgjxAAIJAQACCQ0AAkkd3AJJDdwCSQHcAkjx3GII8QACCQEAAgkNAAIJHQACSRzcAkkM3AJJANwCSPDcXgjxAAIJAQACCQ0AAgkdAAJJHNwCSQzcAkkA3AJI8NxmCR0AAgjxAAIJAQACCQ0AAkkd3AJJDdwCSQHcAkjx3F4I8QACCQEAAgkNAAIJHQACSR00AkkNNAJJATQCSPE0WgjxAAIJAQACCQ0AAgkdAAJJHYwCSQ2MAkkBjAJI8YxqCPEAAgkBAAIJDQACCR0AAkkd3AJJDdwCSQHcAkjx3GIJHQACCPEAAgkBAAIJDQACSRzcAkkM3AJJANwCSPDcXkkdiAJJDYgCSQGIAkjxiAoI8QACCQEAAgkNAAIJHQBeCPEAAgkBAAIJDQACCR0AAkkd3AJJDdwCSQHcAkjx3GII8QACCQEAAgkNAAIJHQACSR2IAkkNiAJJAYgCSPGIYgjxAAIJAQACCQ0AAgkdAAJJAYgCSQWIAkkhiAJJFYhiCRUAAgkhAAIJBQACCQEAAkkA3AJJBNwCSSDcAkkU3FoJFQACCSEAAgkFAAIJAQACSQHcAkkF3AJJIdwCSRXcagkVAAIJIQACCQUAAgkBAAJJATACSQUwAkkhMAJJFTBiCRUAAgkhAAIJBQACCQEAAkkBiAJJBYgCSSGIAkkViGYJAQACCRUAAgkhAAIJBQACSQHcAkkF3AJJIdwCSRXcYgkVAAIJIQACCQUAAgkBAAJJANgCSQTYAkkg2AJJFNheCRUAAgkhAAIJBQACCQEAAkkA3AJJBNwCSSDcAkkU3GYJAQACCRUAAgkhAAIJBQACSQHcAkkF3AJJIdwCSRXcYgkBAAIJFQACCSEAAgkFAAJJASwCSQUsAkkhLAJJFSxiCRUAAgkhAAIJBQACCQEAAkkBiAJJBYgCSSGIAkkViF4JFQACCSEAAgkFAAIJAQACSQHcAkkF3AJJIdwCSRXcYgkBAAIJFQACCSEAAgkFAAJJANwCSQTcAkkg3AJJFNxeSQGIAkkFiAJJIYgCSRWICgkVAAIJIQACCQUAAgkBAF4JFQACCSEAAgkFAAIJAQACSQHcAkkF3AJJIdwCSRXcYgkVAAIJIQACCQUAAgkBAAJJAYgCSQWIAkkhiAJJFYhiCRUAAgkhAAIJBQACCQEAAkkViAJJHYgCSPmIAkkNiGIJFQACCQ0AAgj5AAIJHQACSRTYAkkc2AJI+NgCSQzYWgkNAAII+QACCR0AAgkVAAJJFdwCSR3cAkj53AJJDdxqCQ0AAgj5AAIJHQACCRUAAkkVNAJJHTQCSPk0AkkNNGIJDQACCPkAAgkdAAIJFQACSRWIAkkdiAJI+YgCSQ2IZgkVAAIJDQACCPkAAgkdAAJJFdwCSR3cAkj53AJJDdxiCQ0AAgj5AAIJHQACCRUAAkkU3AJJHNwCSPjcAkkM3F4JDQACCPkAAgkdAAIJFQACSRTcAkkc3AJI+NwCSQzcZgkVAAIJDQACCPkAAgkdAAJJFdwCSR3cAkj53AJJDdxeCQ0AAgj5AAIJHQACCRUAAkkVNAJJHTQCSPk0AkkNNFoJDQACCPkAAgkdAAIJFQACSRWMAkkdjAJI+YwCSQ2MagkNAAII+QACCR0AAgkVAAJJFdwCSR3cAkj53AJJDdxiCRUAAgkNAAII+QACCR0AAkkU3AJJHNwCSPjcAkkM3F5JFYgCSR2IAkj5iAJJDYgKCQ0AAgj5AAIJHQACCRUAXgkNAAII+QACCR0AAgkVAAJJFdwCSR3cAkj53AJJDdxiCQ0AAgj5AAIJHQACCRUAAkkViAJJHYgCSPmIAkkNiGIJDQACCPkAAgkdAAIJFQACSPmIAkkNiAJJHYgCSRWIYgkVAAIJHQACCQ0AAgj5AAJI+NwCSQzcAkkc3AJJFNxaCRUAAgkdAAIJDQACCPkAAkj53AJJDdwCSR3cAkkV3GoJFQACCR0AAgkNAAII+QACSPkwAkkNMAJJHTACSRUwYgkVAAIJHQACCQ0AAgj5AAJI+YgCSQ2IAkkdiAJJFYhmCPkAAgkVAAIJHQACCQ0AAkj53AJJDdwCSR3cAkkV3F4JFQACCR0AAgkNAAII+QACSQHcAkkN3AJJFdwCSSHcBgkhAAIJFQACCQ0AAgkBAAJJANgCSQzYAkkU2AJJINheCSEAAgkVAAIJDQACCQEAAkkA3AJJDNwCSRTcAkkg3GYJAQACCSEAAgkVAAIJDQACSQHcAkkN3AJJFdwCSSHcYgkBAAIJIQACCRUAAgkNAAJJASwCSQ0sAkkVLAJJISxeCSEAAgkVAAIJDQACCQEAAkkdLAJJDSwCSRUsAkj5LAYI+QACCRUAAgkNAAIJHQACSR2IAkkNiAJJFYgCSPmIXgj5AAIJFQACCQ0AAgkdAAJJHdwCSQ3cAkkV3AJI+dxiCR0AAgj5AAIJFQACCQ0AAkkc3AJJDNwCSRTcAkj43F5JHYgCSQ2IAkkViAJI+YgKCPkAAgkVAAIJDQACCR0AXgj5AAIJFQACCQ0AAgkdAAJJHdwCSQ3cAkkV3AJI+dxiCR0AAgj5AAIJFQACCQ0AAkkdiAJJDYgCSRWIAkj5iGII+QACCRUAAgkNAAIJHQACSPmIAkkBiAJJDYgCSSGIYgj5AAIJIQACCQ0AAgkBAAJI+NgCSQDYAkkM2AJJINhaCSEAAgkNAAIJAQACCPkAAkj53AJJAdwCSQ3cAkkh3GoJIQACCQ0AAgkBAAII+QACSPk0AkkBNAJJDTQCSSE0YgkhAAIJDQACCQEAAgj5AAJI+YgCSQGIAkkNiAJJIYhmCPkAAgkhAAIJDQACCQEAAkj53AJJAdwCSQ3cAkkh3GIJIQACCQ0AAgkBAAII+QACSPjcAkkA3AJJDNwCSSDcXgkhAAIJDQACCQEAAgj5AAJI+NwCSQDcAkkM3AJJINxmCPkAAgkhAAIJDQACCQEAAkj53AJJAdwCSQ3cAkkh3F4JIQACCQ0AAgkBAAII+QACSPk0AkkBNAJJDTQCSSE0WgkhAAIJDQACCQEAAgj5AAJI+YwCSQGMAkkNjAJJIYxqCSEAAgkNAAIJAQACCPkAAkj53AJJAdwCSQ3cAkkh3GII+QACCSEAAgkNAAIJAQACSPjcAkkA3AJJDNwCSSDcXkj5iAJJAYgCSQ2IAkkhiAoJIQACCQ0AAgkBAAII+QBeCSEAAgkNAAIJAQACCPkAAkkh3AJJDdwCSQHcAkj53GII+QACCQEAAgkNAAIJIQACSSGIAkkNiAJJAYgCSPmIYgkhAAII+QACCQEAAgkNAALJlAACyZAAAsgYMALIKQACyB2QA4gBAAMIAArJlAACyZAAAsgYMALIKQACyB2QA4gBAAMIAALJlAACyZAAAsgYMALIKQACyB2QA4gBAAMIAAP8vAE1UcmsAAAUMAP8DC01JREkgb3V0ICMyALMKQACzB2QA4wBAALNlAACzZAAAswYMALMKQACzB2QA4wBAALNlAACzZAAAswYMALMKQACzB2QA4wBAALNlAACzZAAAswYMALMKQACzB2QA4wBAryCTQ2wFg0NAAJNEbAeDREAAk0VsCYNFQACTRm0Jg0ZAAJNHbgmDR0AAk0hwCYNIQACTSXEIg0lAAJNKcgmDSkAAk0tzCYNLQACTTHQJg0xAAJNNdgmDTUAAk053BINOQACTT3eBQINPQGCTUXRgg1FAAJNUeWCDVEAAk1Z5MINWQACTUXkYg1FAAJNUeXiDVEAAk0NsBYNDQACTRGwHg0RAAJNFbAmDRUAAk0ZtCYNGQACTR24Jg0dAAJNIcAmDSEAAk0lxCINJQACTSnIJg0pAAJNLcwmDS0AAk0x0CYNMQACTTXYJg01AAJNOdwSDTkAAk093MINPQACTUXcwg1FAAJNUdzCDVEAAk1Z3MINWQACTWHcwg1hAAJNRdxiDUUAAk1R3SINUQACTVncYg1ZAAJNYd4FYg1hAYJNFbAWDRUAAk0ZsB4NGQACTR2wJg0dAAJNIbQmDSEAAk0luCYNJQACTSnAJg0pAAJNLcQiDS0AAk0xyCYNMQACTTXMJg01AAJNOdAmDTkAAk092CYNPQACTUHcEg1BAAJNRd4FAg1FAYJNUdzCDVEAAk1Z3GINWQACTUXeBWINRQACTT3dgg09AAJNFbAWDRUAAk0ZsB4NGQACTR2wJg0dAAJNIbQmDSEAAk0luCYNJQACTSnAJg0pAAJNLcQiDS0AAk0xyCYNMQACTTXMJg01AAJNOdAmDTkAAk092CYNPQACTUHcEg1BAAJNRd4FAg1FAg2CTQ2wFg0NAAJNEbAeDREAAk0VsCYNFQACTRm0Jg0ZAAJNHbgmDR0AAk0hwCYNIQACTSXEIg0lAAJNKcgmDSkAAk0tzCYNLQACTTHQJg0xAAJNNdgmDTUAAk053BINOQACTT3eBQINPQGCTUXRgg1FAAJNUeWCDVEAAk1Z5MINWQACTUXkYg1FAAJNUeXiDVEAAk0NsBYNDQACTRGwHg0RAAJNFbAmDRUAAk0ZtCYNGQACTR24Jg0dAAJNIcAmDSEAAk0lxCINJQACTSnIJg0pAAJNLcwmDS0AAk0x0CYNMQACTTXYJg01AAJNOdwSDTkAAk093MINPQACTUXcwg1FAAJNUdzCDVEAAk1Z3MINWQACTWHcwg1hAAJNRdxiDUUAAk1R3SINUQACTVncYg1ZAAJNYd4FYg1hAYJNFbAWDRUAAk0ZsB4NGQACTR2wJg0dAAJNIbQmDSEAAk0luCYNJQACTSnAJg0pAAJNLcQiDS0AAk0xyCYNMQACTTXMJg01AAJNOdAmDTkAAk092CYNPQACTUHcEg1BAAJNRd4FAg1FAYJNUdzCDVEAAk1Z3GINWQACTUXeBWINRQACTT3dgg09AAJNFbAWDRUAAk0ZsB4NGQACTR2wJg0dAAJNIbQmDSEAAk0luCYNJQACTSnAJg0pAAJNLcQiDS0AAk0xyCYNMQACTTXMJg01AAJNOdAmDTkAAk092CYNPQACTUHcEg1BAAJNRd4FAg1FAhECzZQAAs2QAALMGDACzCkAAswdkAOMAQAKzZQAAs2QAALMGDACzCkAAswdkAOMAQACzZQAAs2QAALMGDACzCkAAswdkAOMAQAD/LwA=";
	data = atob(data);
	midi = new Midi(data);
	mixer = new Mixer();
	midi.add_callback(function(e) {
		mixer.handle_event(e);
	});
	camera = new THREE.PerspectiveCamera(45, 16 / 9, 0.1, 10000);
	camera.position.y = 220;

	scene = new THREE.Scene();
	scene.add(camera);
	cubes = [];
	side = 32;

	x_spacing = 5 + 2.545 + 0.5;
	z_spacing = 4.363 * 2 + 0.5;

	materials = [ new THREE.MeshLambertMaterial({
		color : 0xE8B86F
	}), new THREE.MeshLambertMaterial({
		color : 0xFFBD0D
	}), new THREE.MeshLambertMaterial({
		color : 0xFF7F00
	}), new THREE.MeshLambertMaterial({
		color : 0xE85700
	}), new THREE.MeshLambertMaterial({
		color : 0x4A0808
	}) ];

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

	kewbe = new Kewbe();
	lyte = new Lyte(0, 40, 0);
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
}

Hexagon.prototype.update = function() {
	if(this.mesh.position.y > 0){
		this.mesh.position.y -= 1;
	}else if(this.mesh.position.y < 0){
		this.mesh.position.y=0;
	}
	//this.mesh.material = materials[(this.mesh.position.y / 10 * materials.length) | 0];
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

	var samples_per_hemiquaver = midi.ticks_per_beat / midi.ticks_per_second
			* 44100 * 0.5;
	var samples_per_quaver = samples_per_hemiquaver * 2;

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
