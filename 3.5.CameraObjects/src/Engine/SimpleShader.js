"use strict"; 


function SimpleShader(vertexShaderPath, fragmentShaderPath) {
    // instanciacion de las variables
    this.mCompiledShader = null;  // referencia al sombreador compilado en el contexto webgl 
    this.mShaderVertexPositionAttribute = null; // referencia a SquareVertexPosition dentro del sombreador 
    this.mPixelColor = null;                    // referencia pixelColor uniforme dentro del fragmento sombra
    this.mModelTransform = null;                // referencia a la matriz de transformación del modelo en el sombreador de vértices
    this.mViewProjTransform = null;             // referencia a la matriz Vista / Proyección en el sombreador de vértices 

    var gl = gEngine.Core.getGL();

    // Paso A: cargar y compilar sombreadores de vértices y fragmentos 
    var vertexShader = this._loadAndCompileShader(vertexShaderPath, gl.VERTEX_SHADER);
    var fragmentShader = this._loadAndCompileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);

    // Paso B: Crea y vincula los sombreadores en un programa.
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, vertexShader);
    gl.attachShader(this.mCompiledShader, fragmentShader);
    gl.linkProgram(this.mCompiledShader);

    // Paso C: chekear si ocurre un error
    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error al vincular el sombreador");
        return null;
    }

    // Paso D: Obtiene una referencia al atributo aSquareVertexPosition dentro de los sombreadores. 
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(
        this.mCompiledShader, "aSquareVertexPosition");

    // Paso E: Activa el búfer de vértice cargado en EngineCore_VertexBuffer.js 
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());

    // Paso F: Describe la caracteristica del atributo de posicion del vertice
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
        3,              // cada elemento es un 3-float (x,y.z)
        gl.FLOAT,       // el tipo de dato es un FLOAT
        false,          // si el contenido de los vectores son normalizados
        0,              // numero de bytes para saltar entre elementos
        0);             // compensaciones al primer elemento 

    // Paso G: Se obtiene la referencia de las variables uniformes: uPixelColor, uModelTransform, and uViewProjTransform
    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
    this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
    this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
}

SimpleShader.prototype.getShader = function () { return this.mCompiledShader; };

// Se activan los shaders para ser referenciados
SimpleShader.prototype.activateShader = function (pixelColor, vpMatrix) {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.uniformMatrix4fv(this.mViewProjTransform, false, vpMatrix);
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
        3,              // cada elemento es un 3-float (x,y.z)
        gl.FLOAT,       // el tipo de dato es un FLOAT
        false,          // si el contenido de los vectores son normalizados
        0,              // numero de bytes para saltar entre elementos
        0);             // compensaciones al primer elemento 
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    gl.uniform4fv(this.mPixelColor, pixelColor);
};
// Carga la transformacion del modelo por objeto en el sombreado del vertice
SimpleShader.prototype.loadObjectTransform = function (modelTransform) {
    var gl = gEngine.Core.getGL();
        // carga la matrix modelTransform dentro de webGL para ser usado en el sombreador de vertice
    gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
};



// Retorna un sombreador compilado de un sombreador en el dom
// The id is the id of the script in the html tag.
SimpleShader.prototype._loadAndCompileShader = function (filePath, shaderType) {
    var gl = gEngine.Core.getGL();
    var xmlReq, shaderSource = null, compiledShader = null;

    // Step A: Request the text from the given file location.
    xmlReq = new XMLHttpRequest();
    xmlReq.open('GET', filePath, false);
    try {
        xmlReq.send();
    } catch (error) {
        alert("Falla al cargar el sombreador: " + filePath + " [Advertencia: No se puede correr este proyecto dando doble click en el index.html. " +
                "El index.html debe ser cargado dentro de un servidor web.]");
        return null;
    }
    shaderSource = xmlReq.responseText;

    if (shaderSource === null) {
        alert("ADVERTENCIA: Cargando el:" + filePath + " Fallido!");
        return null;
    }

    // Paso B: Crea el sombreador basado en el tipo de sombreador: vertice o fragmento
    compiledShader = gl.createShader(shaderType);

    // Paso C: Compila el sombreador creado
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);

      // Paso D: verificar errores y devolver resultados (nulo si hay error)
     // La información de registro es cómo se muestran normalmente los errores de compilación del sombreador.
     // Esto es útil para depurar los sombreadores. 
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader));
    }

    return compiledShader;
};
