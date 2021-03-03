"use strict";  
var gEngine = gEngine || { };

// El objecto VertexBuffer
gEngine.VertexBuffer = (function () {
    // referencia las posiciones de los vertices para el cuadrado en el contexto de gl
    var mSquareVertexBuffer = null;

    // Primeramente: definicion de los vertices de cuadrado
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];

    var initialize = function () {
        var gl = gEngine.Core.getGL();

        // Paso A: Crea un buffer en el contexto de gGl para las posiciones de nuestro vertice
        mSquareVertexBuffer = gl.createBuffer();

        // Paso B: Activar vertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);

        // Paso C: Carga verticesOfSquare dentro de la variable vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
    };

    var getGLVertexRef = function () { return mSquareVertexBuffer; };

    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef
    };

    return mPublic;
}());