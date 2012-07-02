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
                x.clearColor(0,0,0,1);
                x.enable(x.DEPTH_TEST);
                drawingMode = x.TRIANGLES;
                init();
                requestAnimFrame(loop);
            }

            function bootstrap(){
                c = document.createElement("canvas");
                gl = x = c.getContext("experimental-webgl");
                resize();
                var vertex_shader = document.getElementById('vs').textContent;
                var fragment_shader = document.getElementById('fs').textContent;
                currentProgram = createProgram( vertex_shader, fragment_shader );
                gl.useProgram( currentProgram );
                buffer = gl.createBuffer();
                gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
                gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( [ - 1.0, - 1.0, 1.0, - 1.0, - 1.0, 1.0, 1.0, - 1.0, 1.0, 1.0, - 1.0, 1.0 ] ), gl.STATIC_DRAW );
                document.body.appendChild(c);
                setTimeout(start,0);
            }
            function createProgram( vertex, fragment ) {

                var program = gl.createProgram();

                var vs = createShader( vertex, gl.VERTEX_SHADER );
                var fs = createShader( '#ifdef GL_ES\nprecision highp float;\n#endif\n\n' + fragment, gl.FRAGMENT_SHADER );

                if ( vs == null || fs == null ) return null;

                gl.attachShader( program, vs );
                gl.attachShader( program, fs );

                gl.deleteShader( vs );
                gl.deleteShader( fs );

                gl.linkProgram( program );

                if ( !gl.getProgramParameter( program, gl.LINK_STATUS ) ) {

                    alert( "ERROR:\n" +
                    "VALIDATE_STATUS: " + gl.getProgramParameter( program, gl.VALIDATE_STATUS ) + "\n" +
                    "ERROR: " + gl.getError() + "\n\n" +
                    "- Vertex Shader -\n" + vertex + "\n\n" +
                    "- Fragment Shader -\n" + fragment );

                    return null;

                }

                return program;

            }

            function createShader( src, type ) {

                var shader = gl.createShader( type );

                gl.shaderSource( shader, src );
                gl.compileShader( shader );

                if ( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) {

                    alert( ( type == gl.VERTEX_SHADER ? "VERTEX" : "FRAGMENT" ) + " SHADER:\n" + gl.getShaderInfoLog( shader ) );
                    return null;

                }

                return shader;

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
                gl.viewport( 0, 0, c.width, c.height );
            }
            window.onresize = resize;
