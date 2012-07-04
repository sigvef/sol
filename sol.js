DEBUG = false;
ORIGO = new THREE.Vector3(0,0,0);

/* smoothstep interpolaties between a and b, at time t from 0 to 1 */
function smoothstep(a, b, t){
    var v = t*t*(3-2*t);
    return b*v + a*(1-v);
};

function lerp(a,b,t){
    return b*t + a*(1-t);
}


function update(){
	camera.position.x = Math.sin(time/10000)*side*8;
	camera.position.z = Math.cos(time/10000)*side*8;
	light.position.x = camera.position.x;
	light.position.y = camera.position.y;
	light.position.z = camera.position.z;
	
	for(var i=0;i<side*side;i++){
		cubes[i].mesh.position.y += 0.1*(0.5-Math.random());
		cubes[i].update();
	}
	
    camera.lookAt(ORIGO);
}

function render(){
	renderer.render(scene, camera);
}


function init(){
	debug("entering init");
    //var data = "TVRoZAAAAAYAAQAGAGBNVHJrAAAADAD/WAQEAhgIAP8vAE1UcmsAAAALAP9RAwb9HwD/LwBNVHJrAAA2TgD/AwwzeE9zYyAoTUlESSkAsApAALAHZADgAEAAsGUAALBkAACwBgwAsApAALAHZADgAEAAwAAAsGUAALBkAACwBgwAsApAALAHZADgAEAAwAAAsGUAALBkAACwBgwAsApAALAHZADgAEAAwAAAkCF/hgCAIUAAkCF/hgCAIUAAkCF/hgCAIUAAkCF/hgCAIUAAkCF/hgCAIUAAkCF/hgCAIUAAkCF/hgCAIUAAkCF/hgCAIUAAkCF/AJArfxiAK0AYkCt/GIArQBiQK38YgCtAGJArfxiAK0AYkCt/GIArQBiQK38YgCtAGJArfxiAK0AYkCt/GIArQBiQIX8AkCZ/GIAmQBiQJn8YgCZAGJAmfxiAJkAYkCZ/GIAmQBiQJn8YgCZAGJAmfxiAJkAYkCZ/GIAmQBiQJn8YgCZAGIAhQACQIX8AkC1/GIAtQBiQLX8YgC1AGJAtfxiALUAYkC1/GIAtQBiQLX8YgC1AGJAtfxiALUAYkC1/GIAtQBiQLX8YgC1AGIAhQACQIX8AkCl/GIApQBiQKX8YgClAGJApfxiAKUAYkCl/GIApQBiQKX8YgClAGJApfxiAKUAYkCl/GIApQBiQKX8YgClAGIAhQACQIX8AkCt/GIArQBiQK38YgCtAGJArfxiAK0AYkCt/GIArQBiQK38YgCtAGJArfxiAK0AYkCt/GIArQBiQK38YgCtAGIAhQACQIX8AkCZ/GIAmQBiQJn8YgCZAGJAmfxiAJkAYkCZ/GIAmQBiQJn8YgCZAGJAmfxiAJkAYkCZ/GIAmQBiQJn8YgCZAGIAhQACQIX8AkC1/GIAtQBiQLX8YgC1AGJAtfxiALUAYkC1/GIAtQBiQLX8YgC1AGJAtfxiALUAYkC1/GIAtQBiQLX8YgC1AGIAhQACQIX8AkCl/GIApQBiQKX8YgClAGJApfxiAKUAYkCl/GIApQBiQKX8YgClAGJApfxiAKUAYkCl/GIApQBiQKX8YgClAGIAhQACQIX8AkCt/GIArQBiQK38YgCtAGJArfxiAK0AYkCt/GIArQBiQK38YgCtAGJArfxiAK0AYkCt/GIArQBiQK38YgCtAGIAhQACQIX8AkCZ/GIAmQBiQJn8YgCZAGJAmfxiAJkAYkCZ/GIAmQBiQJn8YgCZAGJAmfxiAJkAYkCZ/GIAmQBiQJn8YgCZAGIAhQACQIX8AkC1/GIAtQBiQLX8YgC1AGJAtfxiALUAYkC1/GIAtQBiQLX8YgC1AGJAtfxiALUAYkC1/GIAtQBiQLX8YgC1AGIAhQACQIX8AkCl/GIApQBiQKX8YgClAGJApfxiAKUAYkCl/GIApQBiQKX8YgClAGJApfxiAKUAYkCl/GIApQBiQKX8YgClAGIAhQACQIX8AkCt/GIArQBiQK38YgCtAGJArfxiAK0AYkCt/GIArQBiQK38YgCtAGJArfxiAK0AYkCt/GIArQBiQK38YgCtAGIAhQACQIX8AkCZ/GIAmQBiQJn8YgCZAGJAmfxiAJkAYkCZ/GIAmQBiQJn8YgCZAGJAmfxiAJkAYkCZ/GIAmQBiQJn8YgCZAGIAhQACQIX8AkC1/GIAtQBiQLX8YgC1AGJAtfxiALUAYkC1/GIAtQBiQLX8YgC1AGJAtfxiALUAYkC1/GIAtQBiQLX8YgC1AGIAhQACQIX8AkCl/GIApQBiQKX8YgClAGJApfxiAKUAYkCl/GIApQBiQKX8YgClAGJApfxiAKUAYkCl/GIApQBiQKX8YgClAGIAhQACQIX8AkCt/GIArQBiQK38YgCtAGJArfxiAK0AYkCt/GIArQBiQK38YgCtAGJArfxiAK0AYkCt/GIArQBiQK38YgCtAGIAhQACQIX8AkCZ/GIAmQBiQJn8YgCZAGJAmfxiAJkAYkCZ/GIAmQBiQJn8YgCZAGJAmfxiAJkAYkCZ/GIAmQBiQJn8YgCZAGIAhQACQIX8AkC1/GIAtQBiQLX8YgC1AGJAtfxiALUAYkC1/GIAtQBiQLX8YgC1AGJAtfxiALUAYkC1/GIAtQBiQLX8YgC1AGIAhQACQIX8AkCl/GIApQBiQKX8YgClAGJApfxiAKUAYkCl/GIApQBiQKX8YgClAGJApfxiAKUAYkCl/GIApQBiQKX8YgClAGIAhQACQIX8AkCt/GIArQBiQK38YgCtAGJArfxiAK0AYkCt/GIArQBiQK38YgCtAGJArfxiAK0AYkCt/GIArQBiQK38YgCtAGIAhQACQIX8AkCZ/GIAmQBiQJn8YgCZAGJAmfxiAJkAYkCZ/GIAmQBiQJn8YgCZAGJAmfxiAJkAYkCZ/GIAmQBiQJn8YgCZAGIAhQACQIX8AkC1/GIAtQBiQLX8YgC1AGJAtfxiALUAYkC1/GIAtQBiQLX8YgC1AGJAtfxiALUAYkC1/GIAtQBiQLX8YgC1AGIAhQACQIX8AkCl/GIApQBiQKX8YgClAGJApfxiAKUAYkCl/GIApQBiQKX8YgClAGJApfxiAKUAYkCl/GIApQBiQKX8YgClAGIAhQACQIX8AkCt/GIArQBiQK38YgCtAGJArfxiAK0AYkCt/GIArQBiQK38YgCtAGJArfxiAK0AYkCt/GIArQBiQK38YgCtAGIAhQACQIX8AkCZ/GIAmQBiQJn8YgCZAGJAmfxiAJkAYkCZ/GIAmQBiQJn8YgCZAGJAmfxiAJkAYkCZ/GIAmQBiQJn8YgCZAGIAhQACQIX8AkC1/GIAtQBiQLX8YgC1AGJAtfxiALUAYkC1/GIAtQBiQLX8YgC1AGJAtfxiALUAYkC1/GIAtQBiQLX8YgC1AGIAhQACQIX8AkCl/GIApQBiQKX8YgClAGJApfxiAKUAYkCl/GIApQBiQKX8YgClAGJApfxiAKUAYkCl/GIApQBiQKX8YgClAGIAhQACQIX8AkCt/GIArQBiQK38YgCtAGJArfxiAK0AYkCt/GIArQBiQK38YgCtAGJArfxiAK0AYkCt/GIArQBiQK38YgCtAGIAhQACQIX8AkCZ/GIAmQBiQJn8YgCZAGJAmfxiAJkAYkCZ/GIAmQBiQJn8YgCZAGJAmfxiAJkAYkCZ/GIAmQBiQJn8YgCZAGIAhQACQIX8AkC1/GIAtQBiQLX8YgC1AGJAtfxiALUAYkC1/GIAtQIFYgCFAgwCAIUAAkCt/AJA0fwCQMH8wgDBAAIA0QACAK0AAkCR/GJAwfwCQNH8AkCt/GIAkQBiAK0AAgDBAAIA0QBiQMH8AkDR/AJArfwCQJH8YgDBAAIA0QACAK0AYgCRAAJAyfwCQL38AkCt/MIArQACAMkAAgC9AAJAffxiQMn8AkC9/AJArfxiAH0AYgCtAAIAvQACAMkAYkCt/AJAvfwCQMn8AkB9/GIArQACAL0AAgDJAGIAfQACQNH8AkDB/AJAtfzCALUAAgDBAAIA0QACQIX8YkDR/AJAwfwCQLX8YgCFAGIAtQACANEAAgDBAGJA0fwCQMH8AkC1/AJAhfxiANEAAgDBAAIAtQBiAIUAAkDV/AJAtfwCQMH8wgDBAAIA1QACALUAAkB1/GJA1fwCQLX8AkDB/GIAdQBiANUAAgC1AAIAwQBiQNX8AkC1/AJAwfwCQHX8YgDVAAIAtQACAMEAYgB1AAJArfwCQNH8AkDB/MIAwQACANEAAgCtAAJAkfxiQMH8AkDR/AJArfxiAJEAYgDRAAIArQACAMEAYkDB/AJA0fwCQK38AkCR/GIAwQACANEAAgCtAGIAkQACQN38AkDJ/AJAvfzCAL0AAgDJAAIA3QACQH38YkDd/AJAyfwCQL38YgB9AGIAvQACAN0AAgDJAGJA3fwCQMn8AkC9/AJAffxiAN0AAgDJAAIAvQBiAH0AAkC1/AJA0fwCQMH8wgDBAAIA0QACALUAAkCF/GJAtfwCQNH8AkDB/GIAhQBiANEAAgDBAAIAtQBiQLX8AkDR/AJAwfwCQIX8YgC1AAIA0QACAMEAYgCFAAJAtfwCQNn8AkDJ/MIAyQACANkAAgC1AAJAmfxiQLX8AkDZ/AJAyfxiAJkAYgDJAAIAtQACANkAYkDJ/AJA2fwCQLX8AkCZ/GIAtQACANkAAgDJAGIAmQACQNX8AkDB/AJAtfzCALUAAgDVAAIAwQACQHX8YkC1/AJAwfwCQNX8YgB1AGIA1QACALUAAgDBAGJA1fwCQMH8AkC1/AJAdfxiANUAAgDBAAIAtQBiAHUAAkDB/AJA0fwCQLX8wgC1AAIA0QACAMEAAkCF/GJA0fwCQMH8AkC1/GIAhQBiAMEAAgC1AAIA0QBiQLX8AkDB/AJA0fwCQIX8YgC1AAIAwQACANEAYgCFAAJA1fwCQLX8AkDB/MIAwQACALUAAgDVAAJAdfxiQMH8AkC1/AJA1fxiAHUAYgDVAAIAwQACALUAYkDV/AJAtfwCQMH8AkB1/GIA1QACALUAAgDBAGIAdQACQMn8AkDZ/AJAtfzCALUAAgDZAAIAyQACQHn8YkDJ/AJA2fwCQLX8YgB5AGIA2QACALUAAgDJAGJAtfwCQNn8AkDJ/AJAefxiALUAAgDZAAIAyQBiAHkAAkDJ/AJAvfwCQN38wgDdAAIAvQACAMkAAkB9/GJA3fwCQL38AkDJ/GIAfQBiAMkAAgDdAAIAvQBiQN38AkC9/AJAyfwCQH38YgDdAAIAvQACAMkAYgB9AAJArfwCQL38AkDJ/MIAyQACAK0AAgC9AAJAffxiQMn8AkC9/AJArfxiAH0AYgDJAAIAvQACAK0AYkDJ/AJAvfwCQK38AkB9/GIAyQACAL0AAgCtAGIAfQACQN38AkDJ/AJAvfzCAL0AAgDdAAIAyQACQK38YkDd/AJAyfwCQL38YgCtAGIAvQACAN0AAgDJAGJArfwCQL38AkDJ/AJA3fxiAL0AAgDJAAIA3QBiAK0AAkCt/AJAvfwCQMn8wgDJAAIArQACAL0AAkCt/GJArfwCQL38AkDJ/GIArQBiAK0AAgDJAAIAvQBiQK38AkDJ/AJAvfwCQK38YgCtAAIAyQACAL0AYgCtAAJArfwCQNH8AkDB/MIAwQACANEAAgCtAAJAkfxiQMH8AkDR/AJArfxiAJEAYgCtAAIAwQACANEAYkCR/AJAwfwCQNH8AkCt/GIAwQACANEAAgCtAGIAkQACQMn8AkC9/AJArfzCAK0AAgDJAAIAvQACQH38YkDJ/AJAvfwCQK38YgB9AGIArQACAL0AAgDJAGJAffwCQK38AkC9/AJAyfxiAMkAAgCtAAIAvQBiAH0AAkDR/AJAwfwCQLX8wgC1AAIAwQACANEAAkCF/GJA0fwCQMH8AkC1/GIAhQBiALUAAgDRAAIAwQBiQIX8AkDR/AJAwfwCQLX8YgDRAAIAwQACALUAYgCFAAJA1fwCQLX8AkDB/MIAwQACANUAAgC1AAJAdfxiQNX8AkC1/AJAwfxiAHUAYgDVAAIAtQACAMEAYkB1/AJA1fwCQLX8AkDB/GIAwQACANUAAgC1AGIAdQACQK38AkDR/AJAwfzCAMEAAgDRAAIArQACQJH8YkDB/AJA0fwCQK38YgCRAGIA0QACAK0AAgDBAGJAkfwCQMH8AkDR/AJArfxiAK0AAgDBAAIA0QBiAJEAAkDd/AJAyfwCQL38wgC9AAIAyQACAN0AAkB9/GJA3fwCQMn8AkC9/GIAfQBiAL0AAgDdAAIAyQBiQH38AkDd/AJAyfwCQL38YgC9AAIA3QACAMkAYgB9AAJAtfwCQNH8AkDB/MIAwQACANEAAgC1AAJAhfxiQLX8AkDR/AJAwfxiAIUAYgDRAAIAwQACALUAYkCF/AJAtfwCQNH8AkDB/GIAwQACALUAAgDRAGIAhQACQLX8AkDZ/AJAyfzCAMkAAgDZAAIAtQACQJn8YkC1/AJA2fwCQMn8YgCZAGIAyQACALUAAgDZAGJAmfwCQMn8AkDZ/AJAtfxiANkAAgDJAAIAtQBiAJkAAkDV/AJAwfwCQLX8wgC1AAIA1QACAMEAAkB1/GJAtfwCQMH8AkDV/GIAdQBiANUAAgC1AAIAwQBiQHX8AkDV/AJAwfwCQLX8YgDVAAIAwQACALUAYgB1AAJAwfwCQNH8AkC1/MIAtQACANEAAgDBAAJAhfxiQNH8AkDB/AJAtfxiAIUAYgDBAAIAtQACANEAYkCF/AJAtfwCQMH8AkDR/GIA0QACALUAAgDBAGIAhQACQNX8AkC1/AJAwfzCAMEAAgC1AAIA1QACQHX8YkDB/AJAtfwCQNX8YgB1AGIA1QACAMEAAgC1AGJAdfwCQNX8AkC1/AJAwfxiANUAAgC1AAIAwQBiAHUAAkDJ/AJA2fwCQLX8wgC1AAIA2QACAMkAAkB5/GJAyfwCQNn8AkC1/GIAeQBiANkAAgC1AAIAyQBiQHn8AkC1/AJA2fwCQMn8YgDJAAIAtQACANkAYgB5AAJAyfwCQL38AkDd/MIA3QACAL0AAgDJAAJAffxiQN38AkC9/AJAyfxiAH0AYgDJAAIA3QACAL0AYkB9/AJA3fwCQL38AkDJ/GIA3QACAL0AAgDJAGIAfQACQK38AkC9/AJAyfzCAMkAAgCtAAIAvQACQH38YkDJ/AJAvfwCQK38YgB9AGIAyQACAL0AAgCtAGJAffwCQMn8AkC9/AJArfxiAK0AAgDJAAIAvQBiAH0AAkDd/AJAyfwCQL38wgC9AAIA3QACAMkAAkCt/GJA3fwCQMn8AkC9/GIArQBiAL0AAgDdAAIAyQBiQL38AkDJ/AJA3fwCQK38YgC9AAIAyQACAN0AYgCtAAJArfwCQL38AkDJ/MIAvQACAMkAAgCtAAJArfxiQK38AkC9/AJAyfxiAK0AYgCtAAIAvQACAMkAYkDJ/AJAvfwCQK38AkCt/GIAyQACAL0AAgCtAGIArQDCQMH8AkC1/AJA1fwCQHX8wgB1AAIAwQACALUAAgDVAMJAdfwCQMH8AkC1/AJA1fzCAHUAAgDBAAIAtQACANUAwkCR/AJAwfwCQK38AkDR/MIA0QACAJEAAgDBAAIArQDCQMH8AkCt/AJA0fwCQJH8wgCRAAIAwQACAK0AAgDRAMJAsfwCQL38AkDR/AJAcfzCALEAAgC9AAIA0QACAHEAwkBx/AJAvfwCQLH8AkDR/MIAcQACAL0AAgCxAAIA0QDCQNH8AkC1/AJAwfwCQIX8wgCFAAIA0QACALUAAgDBAMJAhfwCQMH8AkC1/AJA0fzCAIUAAgDBAAIAtQACANEAAkB1/MIAdQACQMH8AkC1/AJA1fzCANUAAgC1AAIAwQACQHX8wgB1AAJA1fwCQLX8AkDB/MIAwQACALUAAgDVAAJAkfzCAJEAAkDB/AJArfwCQNH8wgDRAAIArQACAMEAAkCR/MIAkQACQNH8AkCt/AJAwfzCAMEAAgDRAAIArQACQHH8wgBxAAJAsfwCQL38AkDR/MIA0QACAL0AAgCxAAJAcfzCAHEAAkDR/AJAsfwCQL38wgC9AAIAsQACANEAAkCF/MIAhQACQNH8AkC1/AJAwfzCAMEAAgC1AAIA0QACQIX8wgCFAAJA0fwCQLX8AkDB/MIAwQACALUAAgDRAMJAwfwCQLX8AkDV/AJAdfzCAHUAAgDBAAIAtQACANUAwkDV/AJAtfwCQMH8AkB1/MIA1QACALUAAgDBAAIAdQDCQJH8AkDB/AJArfwCQNH8wgDRAAIAkQACAMEAAgCtAMJAkfwCQNH8AkCt/AJAwfzCAMEAAgCRAAIA0QACAK0AwkCx/AJAvfwCQNH8AkBx/MIAsQACAL0AAgDRAAIAcQDCQHH8AkC9/AJAsfwCQNH8wgBxAAIAvQACALEAAgDRAMJA0fwCQLX8AkDB/AJAhfzCAIUAAgDRAAIAtQACAMEAwkCF/AJAwfwCQLX8AkDR/MIAhQACAMEAAgC1AAIA0QDCQMH8AkC1/AJA1fwCQHX8wgB1AAIAwQACALUAAgDVAMJAdfwCQMH8AkC1/AJA1fzCANUAAgB1AAIAwQACALUAwkCR/AJAwfwCQK38AkDR/MIA0QACAJEAAgDBAAIArQDCQMH8AkCt/AJA0fwCQJH8wgDBAAIArQACANEAAgCRAAJAdfwCQMH8AkC1/AJA1fxiANUAAgC1AAIAwQACAHUAwkC9/AJAsfwCQNH8AkBx/GIAvQACALEAAgDRAAIAcQDCQG38AkC5/AJArfwCQM38YgBtAAIAuQACAK0AAgDNAGJAafwCQLX8AkCp/AJAyfxiAGkAAgC1AAIAqQACAMkAwkBl/AJAxfwCQKX8AkCx/GIAZQACAMUAAgClAAIAsQDCQGH8AkCt/AJAofwCQMH8YgBhAAIArQACAKEAAgDBASJAwfwCQLX8AkDV/AJAdfzCAHUAAgDBAAIAtQACANUAwkB1/AJAwfwCQLX8AkDV/MIAdQACAMEAAgC1AAIA1QDCQJH8AkDB/AJArfwCQNH8wgCRAAIAwQACAK0AAgDRAMJAwfwCQK38AkDR/AJAkfzCAMEAAgCtAAIA0QACAJEAwkCx/AJAvfwCQNH8AkBx/MIAsQACAL0AAgDRAAIAcQDCQHH8AkC9/AJAsfwCQNH8wgBxAAIAvQACALEAAgDRAMJA0fwCQLX8AkDB/AJAhfzCANEAAgC1AAIAwQACAIUAwkCF/AJAwfwCQLX8AkDR/MIAhQACAMEAAgC1AAIA0QACQHX8wgB1AAJAwfwCQLX8AkDV/MIA1QACAMEAAgC1AAJAdfzCAHUAAkDV/AJAtfwCQMH8wgDBAAIA1QACALUAAkCR/MIAkQACQMH8AkCt/AJA0fzCAK0AAgDRAAIAwQACQJH8wgCRAAJA0fwCQK38AkDB/MIA0QACAK0AAgDBAAJAcfzCAHEAAkCx/AJAvfwCQNH8wgDRAAIAvQACALEAAkBx/MIAcQACQNH8AkCx/AJAvfzCAL0AAgDRAAIAsQACQIX8wgCFAAJA0fwCQLX8AkDB/MIAtQACAMEAAgDRAAJAhfzCAIUAAkDR/AJAtfwCQMH8wgDBAAIA0QACALUAwkDB/AJAtfwCQNX8AkB1/MIAdQACAMEAAgC1AAIA1QDCQNX8AkC1/AJAwfwCQHX8wgDVAAIAtQACAMEAAgB1AMJAkfwCQMH8AkCt/AJA0fzCAJEAAgDBAAIArQACANEAwkCR/AJA0fwCQK38AkDB/MIAkQACANEAAgCtAAIAwQDCQLH8AkC9/AJA0fwCQHH8wgCxAAIAvQACANEAAgBxAMJAcfwCQL38AkCx/AJA0fzCAHEAAgC9AAIAsQACANEAwkDR/AJAtfwCQMH8AkCF/MIA0QACALUAAgDBAAIAhQDCQIX8AkDB/AJAtfwCQNH8wgCFAAIAwQACALUAAgDRAMJAwfwCQLX8AkDV/AJAdfzCAMEAAgC1AAIA1QACAHUAwkB1/AJAwfwCQLX8AkDV/MIAdQACAMEAAgC1AAIA1QDCQJH8AkDB/AJArfwCQNH8wgDRAAIAkQACAMEAAgCtAMJAwfwCQK38AkDR/AJAkfzCAMEAAgCtAAIA0QACAJEAAkB1/AJAwfwCQLX8AkDV/GIA1QACALUAAgDBAAIAdQDCQL38AkCx/AJA0fwCQHH8YgC9AAIAsQACANEAAgBxAMJAbfwCQLn8AkCt/AJAzfxiAG0AAgC5AAIArQACAM0AYkBp/AJAtfwCQKn8AkDJ/GIAaQACALUAAgCpAAIAyQDCQGX8AkDF/AJApfwCQLH8YgBlAAIAxQACAKUAAgCxAMJAYfwCQK38AkCh/AJAwfxiAGEAAgCtAAIAoQACAMEAYkCt/AJA0fwCQMH8wgDBAAIArQACANEAAkCR/GJAwfwCQNH8AkCt/GIAkQBiAK0AAgDBAAIA0QBiQMH8AkDR/AJArfwCQJH8YgDBAAIA0QACAK0AYgCRAAJAyfwCQL38AkCt/MIArQACAMkAAgC9AAJAffxiQMn8AkC9/AJArfxiAH0AYgCtAAIAvQACAMkAYkCt/AJAvfwCQMn8AkB9/GIArQACAL0AAgDJAGIAfQACQNH8AkDB/AJAtfzCALUAAgDBAAIA0QACQIX8YkDR/AJAwfwCQLX8YgCFAGIAtQACANEAAgDBAGJA0fwCQMH8AkC1/AJAhfxiANEAAgDBAAIAtQBiAIUAAkDV/AJAtfwCQMH8wgDBAAIA1QACALUAAkB1/GJA1fwCQLX8AkDB/GIAdQBiANUAAgC1AAIAwQBiQNX8AkC1/AJAwfwCQHX8YgDVAAIAtQACAMEAYgB1AAJArfwCQNH8AkDB/MIAwQACANEAAgCtAAJAkfxiQMH8AkDR/AJArfxiAJEAYgDRAAIArQACAMEAYkDB/AJA0fwCQK38AkCR/GIAwQACANEAAgCtAGIAkQACQN38AkDJ/AJAvfzCAL0AAgDJAAIA3QACQH38YkDd/AJAyfwCQL38YgB9AGIAvQACAN0AAgDJAGJA3fwCQMn8AkC9/AJAffxiAN0AAgDJAAIAvQBiAH0AAkC1/AJA0fwCQMH8wgDBAAIA0QACALUAAkCF/GJAtfwCQNH8AkDB/GIAhQBiANEAAgDBAAIAtQBiQLX8AkDR/AJAwfwCQIX8YgC1AAIA0QACAMEAYgCFAAJAtfwCQNn8AkDJ/MIAyQACANkAAgC1AAJAmfxiQLX8AkDZ/AJAyfxiAJkAYgDJAAIAtQACANkAYkDJ/AJA2fwCQLX8AkCZ/GIAtQACANkAAgDJAGIAmQACQNX8AkDB/AJAtfzCALUAAgDVAAIAwQACQHX8YkC1/AJAwfwCQNX8YgB1AGIA1QACALUAAgDBAGJA1fwCQMH8AkC1/AJAdfxiANUAAgDBAAIAtQBiAHUAAkDB/AJA0fwCQLX8wgC1AAIA0QACAMEAAkCF/GJA0fwCQMH8AkC1/GIAhQBiAMEAAgC1AAIA0QBiQLX8AkDB/AJA0fwCQIX8YgC1AAIAwQACANEAYgCFAAJA1fwCQLX8AkDB/MIAwQACALUAAgDVAAJAdfxiQMH8AkC1/AJA1fxiAHUAYgDVAAIAwQACALUAYkDV/AJAtfwCQMH8AkB1/GIA1QACALUAAgDBAGIAdQACQMn8AkDZ/AJAtfzCALUAAgDZAAIAyQACQHn8YkDJ/AJA2fwCQLX8YgB5AGIA2QACALUAAgDJAGJAtfwCQNn8AkDJ/AJAefxiALUAAgDZAAIAyQBiAHkAAkDJ/AJAvfwCQN38wgDdAAIAvQACAMkAAkB9/GJA3fwCQL38AkDJ/GIAfQBiAMkAAgDdAAIAvQBiQN38AkC9/AJAyfwCQH38YgDdAAIAvQACAMkAYgB9AAJArfwCQL38AkDJ/MIAyQACAK0AAgC9AAJAffxiQMn8AkC9/AJArfxiAH0AYgDJAAIAvQACAK0AYkDJ/AJAvfwCQK38AkB9/GIAyQACAL0AAgCtAGIAfQACQN38AkDJ/AJAvfzCAL0AAgDdAAIAyQACQK38YkDd/AJAyfwCQL38YgCtAGIAvQACAN0AAgDJAGJArfwCQL38AkDJ/AJA3fxiAL0AAgDJAAIA3QBiAK0AAkCt/AJAvfwCQMn8wgDJAAIArQACAL0AAkCt/GJArfwCQL38AkDJ/GIArQBiAK0AAgDJAAIAvQBiQK38AkDJ/AJAvfwCQK38YgCtAAIAyQACAL0AYgCtAAJArfwCQNH8AkDB/MIAwQACANEAAgCtAAJAkfxiQMH8AkDR/AJArfxiAJEAYgCtAAIAwQACANEAYkCR/AJAwfwCQNH8AkCt/GIAwQACANEAAgCtAGIAkQACQMn8AkC9/AJArfzCAK0AAgDJAAIAvQACQH38YkDJ/AJAvfwCQK38YgB9AGIArQACAL0AAgDJAGJAffwCQK38AkC9/AJAyfxiAMkAAgCtAAIAvQBiAH0AAkDR/AJAwfwCQLX8wgC1AAIAwQACANEAAkCF/GJA0fwCQMH8AkC1/GIAhQBiALUAAgDRAAIAwQBiQIX8AkDR/AJAwfwCQLX8YgDRAAIAwQACALUAYgCFAAJA1fwCQLX8AkDB/MIAwQACANUAAgC1AAJAdfxiQNX8AkC1/AJAwfxiAHUAYgDVAAIAtQACAMEAYkB1/AJA1fwCQLX8AkDB/GIAwQACANUAAgC1AGIAdQACQK38AkDR/AJAwfzCAMEAAgDRAAIArQACQJH8YkDB/AJA0fwCQK38YgCRAGIA0QACAK0AAgDBAGJAkfwCQMH8AkDR/AJArfxiAK0AAgDBAAIA0QBiAJEAAkDd/AJAyfwCQL38wgC9AAIAyQACAN0AAkB9/GJA3fwCQMn8AkC9/GIAfQBiAL0AAgDdAAIAyQBiQH38AkDd/AJAyfwCQL38YgC9AAIA3QACAMkAYgB9AAJAtfwCQNH8AkDB/MIAwQACANEAAgC1AAJAhfxiQLX8AkDR/AJAwfxiAIUAYgDRAAIAwQACALUAYkCF/AJAtfwCQNH8AkDB/GIAwQACALUAAgDRAGIAhQACQLX8AkDZ/AJAyfzCAMkAAgDZAAIAtQACQJn8YkC1/AJA2fwCQMn8YgCZAGIAyQACALUAAgDZAGJAmfwCQMn8AkDZ/AJAtfxiANkAAgDJAAIAtQBiAJkAAkDV/AJAwfwCQLX8wgC1AAIA1QACAMEAAkB1/GJAtfwCQMH8AkDV/GIAdQBiANUAAgC1AAIAwQBiQHX8AkDV/AJAwfwCQLX8YgDVAAIAwQACALUAYgB1AAJAwfwCQNH8AkC1/MIAtQACANEAAgDBAAJAhfxiQNH8AkDB/AJAtfxiAIUAYgDBAAIAtQACANEAYkCF/AJAtfwCQMH8AkDR/GIA0QACALUAAgDBAGIAhQACQNX8AkC1/AJAwfzCAMEAAgC1AAIA1QACQHX8YkDB/AJAtfwCQNX8YgB1AGIA1QACAMEAAgC1AGJAdfwCQNX8AkC1/AJAwfxiANUAAgC1AAIAwQBiAHUAAkDJ/AJA2fwCQLX8wgC1AAIA2QACAMkAAkB5/GJAyfwCQNn8AkC1/GIAeQBiANkAAgC1AAIAyQBiQHn8AkC1/AJA2fwCQMn8YgDJAAIAtQACANkAYgB5AAJAyfwCQL38AkDd/MIA3QACAL0AAgDJAAJAffxiQN38AkC9/AJAyfxiAH0AYgDJAAIA3QACAL0AYkDd/AJAvfwCQMn8YgDdAAIAvQACAMkAYkCt/AJAvfwCQMn8wgCtAAIAvQACAMkAYkDJ/AJAvfwCQK38wgDJAAIAvQACAK0AYkDJ/AJAvfwCQK38YgDJAAIAvQACAK0AYkDV/AJAwfwCQLX+BQIA1QACAMEAAgC1AAJA3fwCQL38AkDJ/MJAffzCAH0AwkB9/MIAyQACAL0AAgDdAAIAfQACQIX8AkDR/AJAxfwCQOX8wgCFAMJAhfzCAIUBggDlAAIAxQACANEAAkCF/AJAxfwCQOX8AkDR/MIAhQDCQIX8YgDFAAIA5QBiAIUAAkC9/AJA3fwCQHH8wgBxAMJAcfzCAHEBIgDdAGIAvQACANEAAkBx/AJA0fwCQN38AkDt/MIAcQDCQHH8wgDtAAIA3QACAHEAAkDl/AJAxfwCQIX8wgCFAMJAhfzCAIUBggDFAAIA5QACANEAAkCF/AJAxfwCQOX8AkDR/MIAhQDCQIX8wgDFAAIA0QACAOUAAgCFAAJA3fwCQH38AkC9/AJAyfzCAH0AwkB9/MIAfQGCAN0AAgDJAAIAvQACQH38AkDt/AJA3fwCQMn8wgB9AMJAffzCAN0AAgDtAAIAfQACQGn8AkDl/AJA2fzCAGkAwkBp/MIAaQGCAMkAAgDZAAIA5QACQGn8AkDZ/AJAyfwCQOX8wgBpAMJAafzCAOUAAgDJAAIA2QACAGkAAkDR/AJAcfwCQN38AkC9/MIAcQDCQHH8wgBxASIA3QBiANEAAgC9AAJAcfwCQNH8AkDd/AJA7fzCAHEAwkBx/MIA7QACAN0AAgBxAAJAhfwCQMX8AkDl/MIAhQDCQIX8wgCFAYIA5QACAMUAAgDRAAJAhfwCQMX8AkDl/AJA0fzCAIUAwkCF/MIA0QACAMUAAgCFAAJAdfwCQNX8AkDB/MIAdQDCQHX8wgB1AYIAwQACAOUAAgDVAAJAdfwCQMH8AkDl/AJA1fzCAHUAwkB1/MIA1QACAHUAAgDlAAIAwQACQIX8AkDR/AJAxfwCQOX8wgCFAMJAhfzCAIUBggDlAAIAxQACANEAAkCF/AJAxfwCQOX8AkDR/MIAhQDCQIX8YgDlAAIAxQBiAIUAAkC9/AJA3fwCQHH8wgBxAMJAcfzCAHEBIgDdAGIA0QACAL0AAkBx/AJA0fwCQN38AkDt/MIAcQDCQHH8wgDtAAIA3QACAHEAAkDl/AJAxfwCQIX8wgCFAMJAhfzCAIUBggDlAAIAxQACANEAAkCF/AJAxfwCQOX8AkDR/MIAhQDCQIX8wgDRAAIA5QACAMUAAgCFAAJA3fwCQH38AkC9/AJAyfzCAH0AwkB9/MIAfQGCAMkAAgC9AAIA3QACQH38AkDt/AJA3fwCQMn8wgB9AMJAffzCAN0AAgDtAAIAfQACQGn8AkDl/AJA2fzCAGkAwkBp/MIAaQGCAMkAAgDlAAIA2QACQGn8AkDZ/AJAyfwCQOX8wgBpAMJAafzCAMkAAgDZAAIA5QACAGkAAkDR/AJAcfwCQN38AkC9/MIAcQDCQHH8wgBxASIA3QBiANEAAgC9AAJAcfwCQNH8AkDd/AJA7fzCAHEAwkBx/MIA3QACAO0AAgBxAAJAhfwCQMX8AkDl/MIAhQDCQIX8wgCFAYIAxQACAOUAAgDRAAJAhfwCQMX8AkDl/AJA0fzCAIUAwkCF/MIAxQACANEAAgCFAAJAdfwCQNX8AkDB/MIAdQDCQHX8wgB1AYIAwQACAOUAAgDVAAJAdfwCQMH8AkDl/AJA1fzCAHUAwkB1/MIA1QACAOUAAgDBAAIAdQACQK38AkDR/AJAwfzCAMEAAgDRAAIArQBiQMH8AkDR/AJArfzCAMEAAgDRAAIArQBiQMH8AkDR/AJArfxiAMEAAgDRAAIArQBiQMn8AkC9/AJArfzCAMkAAgC9AAIArQBiQMn8AkC9/AJArfzCAK0AAgDJAAIAvQBiQK38AkC9/AJAyfxiAMkAAgCtAAIAvQBiQNH8AkDB/AJAtfzCALUAAgDRAAIAwQBiQNH8AkDB/AJAtfzCANEAAgDBAAIAtQBiQNH8AkDB/AJAtfxiANEAAgDBAAIAtQBiQNX8AkC1/AJAwfzCANUAAgC1AAIAwQBiQNX8AkC1/AJAwfzCANUAAgC1AAIAwQBiQNX8AkC1/AJAwfxiAMEAAgDVAAIAtQBiQK38AkDR/AJAwfzCAMEAAgCtAAIA0QBiQMH8AkDR/AJArfzCAK0AAgDBAAIA0QBiQMH8AkDR/AJArfxiAK0AAgDBAAIA0QBiQN38AkDJ/AJAvfzCAL0AAgDdAAIAyQBiQN38AkDJ/AJAvfzCAN0AAgDJAAIAvQBiQN38AkDJ/AJAvfxiAL0AAgDdAAIAyQBiQLX8AkDR/AJAwfzCAMEAAgC1AAIA0QBiQLX8AkDR/AJAwfzCAMEAAgC1AAIA0QBiQLX8AkDR/AJAwfxiAMEAAgC1AAIA0QBiQLX8AkDZ/AJAyfzCAMkAAgC1AAIA2QBiQLX8AkDZ/AJAyfzCALUAAgDZAAIAyQBiQMn8AkDZ/AJAtfxiAMkAAgC1AAIA2QBiQNX8AkDB/AJAtfzCANUAAgDBAAIAtQBiQLX8AkDB/AJA1fzCALUAAgDBAAIA1QBiQNX8AkDB/AJAtfxiANUAAgDBAAIAtQBiQMH8AkDR/AJAtfzCALUAAgDBAAIA0QBiQNH8AkDB/AJAtfzCALUAAgDRAAIAwQBiQLX8AkDB/AJA0fxiANEAAgC1AAIAwQBiQNX8AkC1/AJAwfzCAMEAAgDVAAIAtQBiQMH8AkC1/AJA1fzCAMEAAgC1AAIA1QBiQNX8AkC1/AJAwfxiANUAAgC1AAIAwQBiQMn8AkDZ/AJAtfzCALUAAgDJAAIA2QBiQMn8AkDZ/AJAtfzCALUAAgDJAAIA2QBiQLX8AkDZ/AJAyfxiAMkAAgC1AAIA2QBiQMn8AkC9/AJA3fzCAN0AAgC9AAIAyQBiQN38AkC9/AJAyfzCAN0AAgC9AAIAyQBiQN38AkC9/AJAyfxiAN0AAgC9AAIAyQBiQK38AkC9/AJAyfzCAK0AAgC9AAIAyQBiQMn8AkC9/AJArfzCAMkAAgC9AAIArQBiQMn8AkC9/AJArfxiAK0AAgDJAAIAvQBiQN38AkDJ/AJAvfzCAN0AAgDJAAIAvQBiQN38AkDJ/AJAvfzCAN0AAgDJAAIAvQBiQL38AkDJ/AJA3fxiAL0AAgDJAAIA3QBiQK38AkC9/AJAyfzCAK0AAgC9AAIAyQBiQK38AkC9/AJAyfzCAMkAAgC9AAIArQBiQMn8AkC9/AJArfxiAMkAAgC9AAIArQBiQK38AkDR/AJAwfzCAMEAAgCtAAIA0QACQJH8YkDB/AJA0fwCQK38YgCRAGIArQACAMEAAgDRAGJAwfwCQNH8AkCt/AJAkfxiAMEAAgDRAAIArQBiAJEAAkDJ/AJAvfwCQK38wgCtAAIAyQACAL0AAkB9/GJAyfwCQL38AkCt/GIAfQBiAK0AAgC9AAIAyQBiQK38AkC9/AJAyfwCQH38YgCtAAIAvQACAMkAYgB9AAJA0fwCQMH8AkC1/MIAtQACAMEAAgDRAAJAhfxiQNH8AkDB/AJAtfxiAIUAYgC1AAIA0QACAMEAYkDR/AJAwfwCQLX8AkCF/GIA0QACAMEAAgC1AGIAhQACQNX8AkC1/AJAwfzCAMEAAgDVAAIAtQACQHX8YkDV/AJAtfwCQMH8YgB1AGIA1QACALUAAgDBAGJA1fwCQLX8AkDB/AJAdfxiANUAAgC1AAIAwQBiAHUAAkCt/AJA0fwCQMH8wgDBAAIA0QACAK0AAkCR/GJAwfwCQNH8AkCt/GIAkQBiANEAAgCtAAIAwQBiQMH8AkDR/AJArfwCQJH8YgDBAAIA0QACAK0AYgCRAAJA3fwCQMn8AkC9/MIAvQACAMkAAgDdAAJAffxiQN38AkDJ/AJAvfxiAH0AYgC9AAIA3QACAMkAYkDd/AJAyfwCQL38AkB9/GIA3QACAMkAAgC9AGIAfQACQLX8AkDR/AJAwfzCAMEAAgDRAAIAtQACQIX8YkC1/AJA0fwCQMH8YgCFAGIA0QACAMEAAgC1AGJAtfwCQNH8AkDB/AJAhfxiALUAAgDRAAIAwQBiAIUAAkC1/AJA2fwCQMn8wgDJAAIA2QACALUAAkCZ/GJAtfwCQNn8AkDJ/GIAmQBiAMkAAgC1AAIA2QBiQMn8AkDZ/AJAtfwCQJn8YgC1AAIA2QACAMkAYgCZAAJA1fwCQMH8AkC1/MIAtQACANUAAgDBAAJAdfxiQLX8AkDB/AJA1fxiAHUAYgDVAAIAtQACAMEAYkDV/AJAwfwCQLX8AkB1/GIA1QACAMEAAgC1AGIAdQACQMH8AkDR/AJAtfzCALUAAgDRAAIAwQACQIX8YkDR/AJAwfwCQLX8YgCFAGIAwQACALUAAgDRAGJAtfwCQMH8AkDR/AJAhfxiALUAAgDBAAIA0QBiAIUAAkDV/AJAtfwCQMH8wgDBAAIAtQACANUAAkB1/GJAwfwCQLX8AkDV/GIAdQBiANUAAgDBAAIAtQBiQNX8AkC1/AJAwfwCQHX8YgDVAAIAtQACAMEAYgB1AAJAyfwCQNn8AkC1/MIAtQACANkAAgDJAAJAefxiQMn8AkDZ/AJAtfxiAHkAYgDZAAIAtQACAMkAYkC1/AJA2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RUAAkUxWLYFFQAGRTHQBgUlAAJFJagGBTEAAkUVWLYFMQAGRQ3QBgUlAAJFHagGBRUAAkUpWLYFDQAGRSnQBgUdAAJFHagGBSkAAkUNWLYFKQAGRQ3QBgUdAAJFHagGBQ0AAkUpWLYFDQAGRSnQBgUdAAJFHagGBSkAAkUNWLYFKQAGRQ3QBgUdAAJFHagGBQ0AAkUpWF4FHQBeBQ0AAkUp0AZFHagGBSkAAkUNWF4FHQBeBSkAAkUN0AZFHagGBQ0AAkUpWLYFDQAGRSnQBgUdAAJFHagGBSkAAkUNWLYFKQAGRRXQBgUdAAJFKagGBQ0AAkUJWLYFFQAGRQnQBgUpAAJFKagGBQkAAkUVWLYFCQAGRRXQBgUpAAJFKagGBRUAAkUJWLYFFQAGRQnQBgUpAAJFKagGBQkAAkUVWLYFCQAGRRXQBgUpAAJFKagGBRUAAkUJWLYFFQAGRQnQBgUpAAJFKagGBQkAAkUVWLYFCQAGRRXQBgUpAAJFKagGBRUAAkUJWLYFFQAGRQnQBgUpAAJFKagGBQkAAkUVWLYFCQAGRQ3QBgUpAAJFHagGBRUAAkUxWLYFDQAGRTHQBgUdAAJFHagGBTEAAkUNWLYFMQAGRQ3QBgUdAAJFHagGBQ0AAkUxWLYFDQAGRTHQBgUdAAJFHagGBTEAAkUNWLYFMQAGRQ3QBgUdAAJFHagGBQ0AAkUxWF4FHQBeBQ0AAkUx0AZFHagGBTEAAkUNWF4FHQBeBTEAAkUN0AZFHagGBQ0AAkUxWLYFDQAGRTHQBgUdAAJFHagGBTEAAkUNWLYFMQAGRRXQBgUdAAJFJagGBQ0AAkUxWLYFFQAGRTHQBgUlAAJFJagGBTEAAkUVWLYFMQAGRRXQBgUlAAJFJagGBRUAAkUxWLYFFQAGRTHQBgUlAAJFJagGBTEAAkUVWLYFMQAGRRXQBgUlAAJFJagGBRUAAkUxWLYFFQAGRTHQBgUlAAJFJagGBTEAAkUVWLYFMQAGRRXQBgUlAAJFJagGBRUAAkUxWLYFFQAGRTHQBgUlAAJFJagGBTEAAkUVWLYFMQAGRRXQBgUlAAJFIagGBRUAAkU1WLYFFQAGRTXQBgUhAAJFIagGBTUAAkUVWLYFNQAGRRXQBgUhAAJFIagGBRUAAkU1WLYFFQAGRTXQBgUhAAJFIagGBTUAAkUVWLYFNQAGRRXQBgUhAAJFIagGBRUAAkU1WLYFFQAGRTXQBgUhAAJFIagGBTUAAkUVWLYFNQAGRRXQBgUhAAJFIagGBRUAAkU1WFYFFQAKBSEABgU1AFpFNdAGRSGoBkUVWFYFNQAKBSEABgUVAFpFFdAGRSWoBkUxWLYFFQAGRTHQBgUlAAJFJagGBTEAAkUVWLYFMQAGRRXQBgUlAAJFJagGBRUAAkUxWLYFFQAGRTHQBgUlAAJFJagGBTEAAkUVWLYFMQAGRRXQBgUlAAJFJagGBRUAAkUxWLYFFQAGRTHQBgUlAAJFJagGBTEAAkUVWLYFMQAGRRXQBgUlAAJFJagGBRUAAkUxWLYFFQAGRTHQBgUlAAJFJagGBTEAAkUVWLYFMQAGRQ3QBgUlAAJFHagGBRUAAkUxWLYFDQAGRTHQBgUdAAJFHagGBTEAAkUNWLYFMQAGRQ3QBgUdAAJFHagGBQ0AAkUxWLYFDQAGRTHQBgUdAAJFHagGBTEAAkUNWLYFMQAGRQ3QBgUdAAJFHagGBQ0AAkUxWF4FHQBeBQ0AAkUx0AZFHagGBTEAAkUNWF4FHQBeBTEAAkUN0AZFHagGBQ0AAkUxWLYFDQAGRTHQBgUdAAJFHagGBTEAAkUNWLYFMQAGRRXQBgUdAAJFJagGBQ0AAkUxWLYFFQAGRTHQBgUlAAJFJagGBTEAAkUVWLYFMQAGRRXQBgUlAAJFJagGBRUAAkUxWLYFFQAGRTHQBgUlAAJFJagGBTEAAkUVWLYFMQAGRRXQBgUlAAJFJagGBRUAAkUxWLYFFQAGRTHQBgUlAAJFJagGBTEAAkUVWLYFMQAGRRXQBgUlAAJFJagGBRUAAkUxWLYFFQAGRTHQBgUlAAJFJagGBTEAAkUVWLYFMQAGRQ3QBgUlAAJFHagGBRUAAkUpWLYFDQAGRSnQBgUdAAJFHagGBSkAAkUNWLYFKQAGRQ3QBgUdAAJFHagGBQ0AAkUpWLYFDQAGRSnQBgUdAAJFHagGBSkAAkUNWLYFKQAGRQ3QBgUdAAJFHagGBQ0AAkUpWF4FHQBeBQ0AAkUp0AZFHagGBSkAAkUNWF4FHQBeBSkAAkUN0AZFHagGBQ0AAkUpWLYFDQAGRSnQBgUdAAJFHagGBSkAAkUNWLYFKQAGRRXQBgUdAAJFKagGBQ0AAkUJWLYFFQAGRQnQBgUpAAJFKagGB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";
	var data = "TVRoZAAAAAYAAQAEAGBNVHJrAAAADAD/WAQEAhgIAP8vAE1UcmsAAAALAP9RAwehIAD/LwBNVHJrAAAJaQD/AxNQaWFubyBNb2R1bGUgKE1JREkpALAKQACwB2QA4ABAALBlAACwZAAAsAYMALAKQACwB2QA4ABAAMAAALBlAACwZAAAsAYMALAKQACwB2QA4ABAAMAAALBlAACwZAAAsAYMALAKQACwB2QA4ABAAMAAMJA8fwyAPAAkkDl/DIA5AAyQPH8MgDwAPJA8fwyAPAAkkDl/DIA5AAyQPH8MgDwAPJA8fwyAPAAMkDl/DIA5AAyQPH8MgDwAJJBBfwyAQQAkkD5/DIA+AAyQQX8MgEEAPJBBfwyAQQAkkD5/DIA+AAyQQX8MgEEAPJBBfwyAQQAMkD5/DIA+AAyQN38MgDcAJJA7fwyAOwAkkDd/DIA3AAyQO38MgDsAPJA7fwyAOwAkkDd/DIA3AAyQO38MgDsAPJA7fwyAOwAMkDd/DIA3ADyQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAADJA8fwyAPAA8kDl/DIA5ACSQNX8MgDUADJA5fwyAOQA8kDl/DIA5ACSQNX8MgDUADJA5fwyAOQA8kDl/DIA5AAyQNX8MgDUADJA3fwyANwAkkDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7AAyQN38MgDcADJA5fwyAOQAkkDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDt/DIA7ACSQO38MgDsADJA+fwyAPgA8kD5/DIA+AAyQO38MgDsADJA8fwyAPAAkkEB/DIBAACSQPH8MgDwADJBAfwyAQAA8kEB/DIBAACSQPH8MgDwADJBAfwyAQAA8kEB/DIBAAAyQPH8MgDwAPJA8fwyAPAAkkDl/DIA5AAyQPH8MgDwAPJA8fwyAPAAkkDl/DIA5AAyQPH8MgDwAPJA8fwyAPAAMkDl/DIA5AAyQPH8MgDwAJJBBfwyAQQAkkD5/DIA+AAyQQX8MgEEAPJBBfwyAQQAkkD5/DIA+AAyQQX8MgEEAPJBBfwyAQQAMkD5/DIA+AAyQN38MgDcAJJA7fwyAOwAkkDd/DIA3AAyQO38MgDsAPJA7fwyAOwAkkDd/DIA3AAyQO38MgDsAPJA7fwyAOwAMkDd/DIA3ADyQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAADJA8fwyAPAA8kDl/DIA5ACSQNX8MgDUADJA5fwyAOQA8kDl/DIA5ACSQNX8MgDUADJA5fwyAOQA8kDl/DIA5AAyQNX8MgDUADJA3fwyANwAkkDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7AAyQN38MgDcADJA5fwyAOQAkkDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDt/DIA7ACSQO38MgDsADJA+fwyAPgA8kD5/DIA+AAyQO38MgDsADJA8fwyAPAAkkEB/DIBAACSQPH8MgDwADJBAfwyAQAA8kEB/DIBAACSQPH8MgDwADJBAfwyAQAA8kEB/DIBAAAyQPH8MgDwAPJA8fwyAPAAkkDl/DIA5AAyQPH8MgDwAPJA8fwyAPAAkkDl/DIA5AAyQPH8MgDwAPJA8fwyAPAAMkDl/DIA5AAyQPH8MgDwAJJBBfwyAQQAkkD5/DIA+AAyQQX8MgEEAPJBBfwyAQQAkkD5/DIA+AAyQQX8MgEEAPJBBfwyAQQAMkD5/DIA+AAyQN38MgDcAJJA7fwyAOwAkkDd/DIA3AAyQO38MgDsAPJA7fwyAOwAkkDd/DIA3AAyQO38MgDsAPJA7fwyAOwAMkDd/DIA3ADyQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAADJA8fwyAPAA8kDl/DIA5ACSQNX8MgDUADJA5fwyAOQA8kDl/DIA5ACSQNX8MgDUADJA5fwyAOQA8kDl/DIA5AAyQNX8MgDUADJA3fwyANwAkkDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7AAyQN38MgDcADJA5fwyAOQAkkDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDt/DIA7ACSQO38MgDsADJA+fwyAPgA8kD5/DIA+AAyQO38MgDsADJA8fwyAPAAkkEB/DIBAACSQPH8MgDwADJBAfwyAQAA8kEB/DIBAACSQPH8MgDwADJBAfwyAQAA8kEB/DIBAAAyQPH8MgDwAPJA8fwyAPAAkkDl/DIA5AAyQPH8MgDwAPJA8fwyAPAAkkDl/DIA5AAyQPH8MgDwAPJA8fwyAPAAMkDl/DIA5AAyQPH8MgDwAJJBBfwyAQQAkkD5/DIA+AAyQQX8MgEEAPJBBfwyAQQAkkD5/DIA+AAyQQX8MgEEAPJBBfwyAQQAMkD5/DIA+AAyQN38MgDcAJJA7fwyAOwAkkDd/DIA3AAyQO38MgDsAPJA7fwyAOwAkkDd/DIA3AAyQO38MgDsAPJA7fwyAOwAMkDd/DIA3ADyQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAAJJA8fwyAPAAMkEB/DIBAADyQQH8MgEAADJA8fwyAPAA8kDl/DIA5ACSQNX8MgDUADJA5fwyAOQA8kDl/DIA5ACSQNX8MgDUADJA5fwyAOQA8kDl/DIA5AAyQNX8MgDUADJA3fwyANwAkkDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7ACSQN38MgDcADJA7fwyAOwA8kDt/DIA7AAyQN38MgDcADJA5fwyAOQAkkDx/DIA8ACSQOX8MgDkADJA8fwyAPAA8kDt/DIA7ACSQO38MgDsADJA+fwyAPgA8kD5/DIA+AAyQO38MgDsADJA8fwyAPAAkkEB/DIBAACSQPH8MgDwADJBAfwyAQAA8kEB/DIBAACSQPH8MgDwADJBAfwyAQAA8kEB/DIBAAAyQPH8MgDwADLBlAACwZAAAsAYMALAKQACwB2QA4ABAAMAAAbBlAACwZAAAsAYMALAKQACwB2QA4ABAAMAAALBlAACwZAAAsAYMALAKQACwB2QA4ABAAMAAAP8vAE1UcmsAAAgsAP8DFlBpYW5vIE1vZHVsZSAjMiAoTUlESSkAsQpAALEHZADhAEAAsWUAALFkAACxBgwAsQpAALEHZADhAEAAwQAAsWUAALFkAACxBgwAsQpAALEHZADhAEAAwQAAsWUAALFkAACxBgwAsQpAALEHZADhAEAAwQAAkS1/DIEtAAyRLX8MgS0AJJEtfwyBLQA8kS1/DIEtAAyRLX8MgS0AJJEtfwyBLQA8kS1/DIEtAAyRLX8YgS0ASJEyfwyBMgAkkTJ/DIEyADyRMn8MgTIADJEyfwyBMgAkkTJ/DIEyADyRMn8MgTIADJEyfxiBMgBIkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/GIErADCRMH8MgTAADJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfxiBMAAwkSl/DIEpAAyRKX8MgSkAJJEpfwyBKQA8kSl/DIEpAAyRKX8MgSkAJJEpfwyBKQA8kSl/DIEpAAyRKX8YgSkASJErfwyBKwAkkSt/DIErADyRK38MgSsADJErfwyBKwAkkSt/DIErADyRK38MgSsADJErfxiBKwBIkS1/DIEtACSRLX8MgS0APJEtfwyBLQAMkS1/DIEtACSRL38MgS8APJEvfwyBLwAMkS9/GIEvAEiRMH8MgTAAJJEwfwyBMAA8kTB/DIEwAAyRMH8MgTAAJJEwfwyBMAA8kTB/DIEwAAyRMH8YgTAAMJEtfwyBLQAMkS1/DIEtACSRLX8MgS0APJEtfwyBLQAMkS1/DIEtACSRLX8MgS0APJEtfwyBLQAMkS1/GIEtAEiRMn8MgTIAJJEyfwyBMgA8kTJ/DIEyAAyRMn8MgTIAJJEyfwyBMgA8kTJ/DIEyAAyRMn8YgTIASJErfwyBKwAkkSt/DIErADyRK38MgSsADJErfwyBKwAkkSt/DIErADyRK38MgSsADJErfxiBKwAwkTB/DIEwAAyRMH8MgTAAJJEwfwyBMAA8kTB/DIEwAAyRMH8MgTAAJJEwfwyBMAA8kTB/DIEwAAyRMH8YgTAAMJEpfwyBKQAMkSl/DIEpACSRKX8MgSkAPJEpfwyBKQAMkSl/DIEpACSRKX8MgSkAPJEpfwyBKQAMkSl/GIEpAEiRK38MgSsAJJErfwyBKwA8kSt/DIErAAyRK38MgSsAJJErfwyBKwA8kSt/DIErAAyRK38YgSsASJEtfwyBLQAkkS1/DIEtADyRLX8MgS0ADJEtfwyBLQAkkS9/DIEvADyRL38MgS8ADJEvfxiBLwBIkTB/DIEwACSRMH8MgTAAPJEwfwyBMAAMkTB/DIEwACSRMH8MgTAAPJEwfwyBMAAMkTB/GIEwADCRLX8MgS0ADJEtfwyBLQAkkS1/DIEtADyRLX8MgS0ADJEtfwyBLQAkkS1/DIEtADyRLX8MgS0ADJEtfxiBLQBIkTJ/DIEyACSRMn8MgTIAPJEyfwyBMgAMkTJ/DIEyACSRMn8MgTIAPJEyfwyBMgAMkTJ/GIEyAEiRK38MgSsAJJErfwyBKwA8kSt/DIErAAyRK38MgSsAJJErfwyBKwA8kSt/DIErAAyRK38YgSsAMJEwfwyBMAAMkTB/DIEwACSRMH8MgTAAPJEwfwyBMAAMkTB/DIEwACSRMH8MgTAAPJEwfwyBMAAMkTB/GIEwADCRKX8MgSkADJEpfwyBKQAkkSl/DIEpADyRKX8MgSkADJEpfwyBKQAkkSl/DIEpADyRKX8MgSkADJEpfxiBKQBIkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/GIErAEiRLX8MgS0AJJEtfwyBLQA8kS1/DIEtAAyRLX8MgS0AJJEvfwyBLwA8kS9/DIEvAAyRL38YgS8ASJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfxiBMAAwkS1/DIEtAAyRLX8MgS0AJJEtfwyBLQA8kS1/DIEtAAyRLX8MgS0AJJEtfwyBLQA8kS1/DIEtAAyRLX8YgS0ASJEyfwyBMgAkkTJ/DIEyADyRMn8MgTIADJEyfwyBMgAkkTJ/DIEyADyRMn8MgTIADJEyfxiBMgBIkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/DIErACSRK38MgSsAPJErfwyBKwAMkSt/GIErADCRMH8MgTAADJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfwyBMAAkkTB/DIEwADyRMH8MgTAADJEwfxiBMAAwkSl/DIEpAAyRKX8MgSkAJJEpfwyBKQA8kSl/DIEpAAyRKX8MgSkAJJEpfwyBKQA8kSl/DIEpAAyRKX8YgSkASJErfwyBKwAkkSt/DIErADyRK38MgSsADJErfwyBKwAkkSt/DIErADyRK38MgSsADJErfxiBKwBIkS1/DIEtACSRLX8MgS0APJEtfwyBLQAMkS1/DIEtACSRL38MgS8APJEvfwyBLwAMkS9/GIEvAEiRMH8MgTAAJJEwfwyBMAA8kTB/DIEwAAyRMH8MgTAAJJEwfwyBMAA8kTB/DIEwAAyRMH8YgTAAMLFlAACxZAAAsQYMALEKQACxB2QA4QBAAMEAAbFlAACxZAAAsQYMALEKQACxB2QA4QBAAMEAALFlAACxZAAAsQYMALEKQACxB2QA4QBAAMEAAP8vAA==";
    //useful base64-encoder: http://www.opinionatedgeek.com/dotnet/tools/base64encode/
	data = atob(data);
    midi = new Midi(data);
    mixer = new Mixer();
    midi.add_callback(function(e){mixer.handle_event(e);});
    midi.add_callback(function(e){
    	if(e.type == 0x9){
    		cubes[e.note_number].blink();
    	}
    });
    camera = new THREE.PerspectiveCamera(45, 16/9, 0.1, 10000);
    camera.position.y = 100;
    
    scene = new THREE.Scene();
    scene.add(camera);
    cubes = [];
    side = 12;
    x_spacing = 5+2.545;
    z_spacing = 4.363*2;
    geometry = createHexagonGeometry(10,-10);
    for(var i=0;i<side;i++){
	    for(var j=0;j<side;j++){
	    	cubes[i*side+j] = new Hexagon();
	    	var material = new THREE.MeshLambertMaterial({color:0xFF0000});
		    cubes[i*side+j].mesh = new THREE.Mesh(geometry, material);
		    cubes[i*side+j].mesh.position.x = (i-side/2)*x_spacing;
		    cubes[i*side+j].mesh.position.z = (i%2)*z_spacing/2+(j-side/2)*z_spacing;
		    scene.add(cubes[i*side+j].mesh);
	    }
    }
    light = new THREE.PointLight(0xFFFFFF);
    scene.add(light);
}

function Hexagon(){
}

Hexagon.prototype.blink = function(){
	this.mesh.material.color.r = 1;
	this.mesh.material.color.g = 1;
	this.mesh.material.color.b = 1;
}

Hexagon.prototype.update = function(){
	if(this.mesh.material.color.r > 0.5){
		this.mesh.material.color.r -= 0.1;
	}
	if(this.mesh.material.color.g > 0.5){
		this.mesh.material.color.g -= 0.1;
	}
	if(this.mesh.material.color.b > 0.5){
		this.mesh.material.color.b -= 0.1;
	}
}

function createHexagonGeometry(hy,ly){
	var geometry = new THREE.Geometry();
	
	/* Hexagon geometry from zynaps.com */
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

