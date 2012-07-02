
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
                datal[i] += this.instruments[j].generate(this.t,rate);
                //datal[i] += Math.random()*0.01;
            }
            datar[i] = datal[i];
            this.t++;

        }

    };


    this.instruments = [];
    for(var i=0;i<16;i++){
        this.instruments[i] = new Instrument();
    }

    this.handle_event = function(e){
        if(e.type == 0x9){
            this.instruments[e.midi_channel].note_on(e.note_number, e.velocity);
        }else if(e.type == 0x8){
            this.instruments[e.midi_channel].note_off(e.note_number, e.velocity);
        }
    }


    this.analyser = this.ax.createAnalyser();
    this.convolver = this.ax.createConvolver();
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
    this.jsnode.connect(this.convolver);
    this.jsnode.connect(this.analyser);
    this.convolver.connect(this.analyser);
    this.analyser.connect(this.ax.destination);
}

function Instrument(){
    this.note_pool = [];
    this.num_active_notes = 0;
    for(var i=0;i<16;i++){
        this.note_pool[i] = {note_number:0,velocity:0};
    }

    this.note_on = function(note_number, velocity){
        this.note_pool[this.num_active_notes].note_number = note_number;
        this.note_pool[this.num_active_notes].velocity = velocity;
        this.num_active_notes++;
    }

    this.note_off = function(note_number, velocity){
        for(var i=0;i<this.num_active_notes;i++){
            if(note_number == this.note_pool[i].note_number){
                this._note_off(i);
                i--;
            }
        }
    }

    this.generate = function(t,rate){
        var out = 0;
        for(var i=0;i<this.num_active_notes;i++){
            out += 0.001*this.note_pool[i].velocity*Math.sin((
                        440*Math.pow(2,(this.note_pool[i].note_number-57)/12)*
                        t*Math.PI*2/rate))>0?0.05:-0.05;
        };
        return out;
    }

    this._note_off = function(i){
        this.num_active_notes--;
        this.note_pool[i].note_number = this.note_pool[this.num_active_notes].note_number;
        this.note_pool[i].velocity = this.note_pool[this.num_active_notes].velocity;
    }
}
