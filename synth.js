function Mixer(){
    this.ax = new webkitAudioContext();
    this.jsnode = this.ax.createJavaScriptNode(1024,1,2);

    this.note_number = 0;
    this.velocity = 0;
    this.t = 0;

    var that = this;
    this.jsnode.onaudioprocess = function(e){that.process(e);};

    this.process = function(e){

        var datal = e.outputBuffer.getChannelData(0);
        var datar = e.outputBuffer.getChannelData(1);
        var rate = 44110;
        var play_forward_trigger = 0;
        for(var i=0;i<datal.length;i++){
            play_forward_trigger++;
            if(play_forward_trigger == 44){
                midi.play_forward(1);
                play_forward_trigger = 0;
            }
            datal[i] = 0;
            for(var j=0;j<this.instruments.length;j++){
                datal[i] += this.instruments[j].generate(this.t);
                //datal[i] += Math.random()*0.01;
            }
            datar[i] = datal[i];
            this.t++;
        }

    };


    this.instruments = [];
    for(var i=0;i<16;i++){
        this.instruments[i] = new Instrument(i);
        this.instruments[i].generate = instruments(i); //setter ulike synthfunksjoner p� ulike midikanaler
    }

    this.handle_event = function(e){
        if(e.type == 0x9){
            this.instruments[e.midi_channel].note_on(e.note_number, e.velocity);
        }else if(e.type == 0x8){
            this.instruments[e.midi_channel].note_off(e.note_number, e.velocity);
        }
    };


    this.analyser = this.ax.createAnalyser();
    this.convolver = this.ax.createConvolver();
    this.gainNode = this.ax.createGainNode();
    var buffer = this.ax.createBuffer(2,44110*3,44110);
    var channeldatal = buffer.getChannelData(0);
    var channeldatar = buffer.getChannelData(1);
    for(var i=0;i<10000;i++){
        channeldatal[i] = (2*Math.random()-1);
        channeldatar[i] = (2*Math.random()-1);
    }
    for(var i=10000;i<buffer.length;i++){
        channeldatal[i] = (2*Math.random()-1)/(i/10000);
        channeldatar[i] = (2*Math.random()-1)/(i/10000);
    }
    this.convolver.buffer = buffer;
    
    this.jsnode.connect(this.gainNode);
    this.jsnode.connect(this.convolver);
    this.jsnode.connect(this.analyser);
    this.convolver.connect(this.analyser);
    this.analyser.connect(this.gainNode);
    this.gainNode.connect(this.ax.destination);
    this.gainNode.gain.value = 0.05;

    this.setVolume = function(v) {
        this.gainNode.gain.value = v;
    };
}

function Instrument(channel){
	this.channel = channel;	//midi channel
    this.note_pool = [];
    this.num_active_notes = 0;
    for(var i=0;i<16;i++){
        this.note_pool[i] = {note_number:0,velocity:0};
    }

    this.note_on = function(note_number, velocity){
        this.note_pool[this.num_active_notes].note_number = note_number;
        this.note_pool[this.num_active_notes].velocity = velocity;
        this.num_active_notes++;
    };

    this.note_off = function(note_number, velocity){
        for(var i=0;i<this.num_active_notes;i++){
            if(note_number == this.note_pool[i].note_number){
                this._note_off(i);
                i--;
            }
        }
    };

    this.generate = function(t){	//blir endret dynamisk
        return 0;
    };

    this._note_off = function(i){
        this.num_active_notes--;
        this.note_pool[i].note_number = this.note_pool[this.num_active_notes].note_number;
        this.note_pool[i].velocity = this.note_pool[this.num_active_notes].velocity;
    };
}

RATE = 44100;	//samples per second
A = 0.3 / 127;	//default amplitude
note2freq = [8.175798915643707,8.661957218027252,9.177023997418988,9.722718241315029,10.300861153527183,10.913382232281373,11.562325709738575,12.249857374429663,12.978271799373287,13.75,14.56761754744031,15.433853164253875,16.351597831287414,17.323914436054505,18.35404799483797,19.445436482630058,20.601722307054374,21.826764464562743,23.12465141947715,24.499714748859333,25.95654359874657,27.5,29.13523509488062,30.86770632850775,32.70319566257483,34.64782887210901,36.70809598967594,38.890872965260115,41.20344461410875,43.653528929125486,46.2493028389543,48.999429497718666,51.91308719749314,55,58.27047018976124,61.735412657015516,65.40639132514966,69.29565774421802,73.4161919793519,77.78174593052023,82.40688922821748,87.30705785825097,92.4986056779086,97.99885899543732,103.82617439498628,110,116.54094037952248,123.47082531403103,130.8127826502993,138.59131548843604,146.8323839587038,155.56349186104043,164.81377845643496,174.61411571650194,184.9972113558172,195.99771799087463,207.65234878997256,220,233.08188075904496,246.94165062806206,261.6255653005986,277.1826309768721,293.6647679174076,311.1269837220809,329.6275569128699,349.2282314330039,369.9944227116344,391.99543598174927,415.3046975799451,440,466.1637615180899,493.8833012561241,523.2511306011972,554.3652619537442,587.3295358348151,622.2539674441618,659.2551138257398,698.4564628660078,739.9888454232688,783.9908719634985,830.6093951598903,880,932.3275230361799,987.766602512248,1046.5022612023945,1108.7305239074883,1174.65907166963,1244.5079348883237,1318.51022765148,1396.9129257320155,1479.9776908465376,1567.9817439269973,1661.2187903197805,1760,1864.6550460723597,1975.533205024496,2093.004522404789,2217.4610478149766,2349.31814333926,2489.0158697766474,2637.02045530296,2793.825851464031,2959.955381693075,3135.9634878539946,3322.437580639561,3520,3729.3100921447185,3951.066410048994,4186.009044809578,4434.922095629953,4698.636286678522,4978.031739553295,5274.040910605918,5587.651702928063,5919.91076338615,6271.926975707987,6644.875161279123,7040,7458.620184289437,7902.132820097988,8372.018089619156,8869.844191259906,9397.272573357044,9956.06347910659,10548.081821211836,11175.303405856126,11839.8215267723,12543.853951415975];
sin_table = [0,0.049067674327418015,0.0980171403295606,0.14673047445536175,0.19509032201612825,0.24298017990326387,0.29028467725446233,0.33688985339222005,0.3826834323650898,0.4275550934302821,0.47139673682599764,0.5141027441932217,0.5555702330196022,0.5956993044924334,0.6343932841636455,0.6715589548470183,0.7071067811865475,0.7409511253549591,0.773010453362737,0.8032075314806448,0.8314696123025452,0.8577286100002721,0.8819212643483549,0.9039892931234433,0.9238795325112867,0.9415440651830208,0.9569403357322089,0.970031253194544,0.9807852804032304,0.989176509964781,0.9951847266721968,0.9987954562051724,1,0.9987954562051724,0.9951847266721969,0.989176509964781,0.9807852804032304,0.970031253194544,0.9569403357322089,0.9415440651830208,0.9238795325112867,0.9039892931234434,0.881921264348355,0.8577286100002721,0.8314696123025455,0.8032075314806449,0.7730104533627371,0.740951125354959,0.7071067811865476,0.6715589548470186,0.6343932841636455,0.5956993044924335,0.5555702330196022,0.5141027441932218,0.47139673682599786,0.42755509343028203,0.3826834323650899,0.33688985339222033,0.2902846772544624,0.24298017990326407,0.1950903220161286,0.1467304744553618,0.09801714032956083,0.049067674327417966,1.2246467991473532e-16,-0.049067674327417724,-0.09801714032956059,-0.14673047445536158,-0.19509032201612836,-0.24298017990326382,-0.2902846772544621,-0.3368898533922201,-0.38268343236508967,-0.4275550934302818,-0.47139673682599764,-0.5141027441932216,-0.555570233019602,-0.5956993044924332,-0.6343932841636453,-0.6715589548470184,-0.7071067811865475,-0.7409511253549589,-0.7730104533627367,-0.803207531480645,-0.8314696123025452,-0.857728610000272,-0.8819212643483549,-0.9039892931234431,-0.9238795325112865,-0.9415440651830208,-0.9569403357322088,-0.970031253194544,-0.9807852804032303,-0.9891765099647809,-0.9951847266721969,-0.9987954562051724,-1,-0.9987954562051724,-0.9951847266721969,-0.9891765099647809,-0.9807852804032304,-0.970031253194544,-0.9569403357322089,-0.9415440651830209,-0.9238795325112866,-0.9039892931234433,-0.881921264348355,-0.8577286100002722,-0.8314696123025455,-0.8032075314806453,-0.7730104533627369,-0.7409511253549591,-0.7071067811865477,-0.6715589548470187,-0.6343932841636459,-0.5956993044924332,-0.5555702330196022,-0.5141027441932219,-0.4713967368259979,-0.42755509343028253,-0.3826834323650904,-0.33688985339222,-0.2902846772544625,-0.24298017990326418,-0.19509032201612872,-0.1467304744553624,-0.0980171403295605,-0.04906767432741809];
saw_table = [1,0.984375,0.96875,0.953125,0.9375,0.921875,0.90625,0.890625,0.875,0.859375,0.84375,0.828125,0.8125,0.796875,0.78125,0.765625,0.75,0.734375,0.71875,0.703125,0.6875,0.671875,0.65625,0.640625,0.625,0.609375,0.59375,0.578125,0.5625,0.546875,0.53125,0.515625,0.5,0.484375,0.46875,0.453125,0.4375,0.421875,0.40625,0.390625,0.375,0.359375,0.34375,0.328125,0.3125,0.296875,0.28125,0.265625,0.25,0.234375,0.21875,0.203125,0.1875,0.171875,0.15625,0.140625,0.125,0.109375,0.09375,0.078125,0.0625,0.046875,0.03125,0.015625,0,-0.015625,-0.03125,-0.046875,-0.0625,-0.078125,-0.09375,-0.109375,-0.125,-0.140625,-0.15625,-0.171875,-0.1875,-0.203125,-0.21875,-0.234375,-0.25,-0.265625,-0.28125,-0.296875,-0.3125,-0.328125,-0.34375,-0.359375,-0.375,-0.390625,-0.40625,-0.421875,-0.4375,-0.453125,-0.46875,-0.484375,-0.5,-0.515625,-0.53125,-0.546875,-0.5625,-0.578125,-0.59375,-0.609375,-0.625,-0.640625,-0.65625,-0.671875,-0.6875,-0.703125,-0.71875,-0.734375,-0.75,-0.765625,-0.78125,-0.796875,-0.8125,-0.828125,-0.84375,-0.859375,-0.875,-0.890625,-0.90625,-0.921875,-0.9375,-0.953125,-0.96875,-0.984375];

function sin(x) {
	return sin_table[Math.floor(x%128)];
}

function saw(x) {
	return saw_table[Math.floor(x%128)];
}

function instruments(instrument) {
	switch(instrument) {
	case 0:
		return function(t) {	//Square
		    this.out = 0;
		    for(var i=0;i<this.num_active_notes;i++){
		        this.out += this.note_pool[i].velocity * (sin(
		        		(note2freq[this.note_pool[i].note_number]*t*128/RATE))>0?A:-A);
		    };
		    return this.out;
		};
	case 1:
		return function(t) {	//Saw
		this.out = 0;
		for(var i=0;i<this.num_active_notes;i++){
			this.out += A*this.note_pool[i].velocity*saw(
					(note2freq[this.note_pool[i].note_number]*t*128/RATE));
		};
		return this.out;
	};
	case 2:
		return function(t) {	//Sine
		this.out = 0;
		for(var i=0;i<this.num_active_notes;i++){
			this.out += A*this.note_pool[i].velocity*sin(
					(note2freq[this.note_pool[i].note_number]*t*128/RATE));
		};
		return this.out;
	};
	case 3:
		return function(t) {	//White noise
			this.out = 0;
			for(var i=0;i<this.num_active_notes;i++){
				this.out += (Math.random()-0.5)*2*A*this.note_pool[i].velocity;	//regnestykket kan kanskje forenkles litt...
			}
			return this.out;
		};
	case 4:
		return function(t) {	//Etc....
		this.out = 0;
		//magic goes here
		return this.out;
	};
	default:
		return function(t) {	//Silence
			return 0;
		};
	}
}