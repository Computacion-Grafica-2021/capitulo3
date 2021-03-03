"use strict"; 

var gEngine = gEngine || { };
    // Inicializacion de la variable asegurandose que no este redefinida

gEngine.Core = (function () {
    // Instancia de variables
    // Contexto grafico para dibujar
    var mGL = null;

    //**----------------------------
    // Metodos publicos:
    //**-----------------------------
    //
    // Accesor del contexto webgl 
    var getGL = function () { return mGL; };

    // inicializar WebGL, el búfer de vértices y compilar los sombreadores 
    var initializeWebGL = function (htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);

        // Se obtiene el webgl estándar o experimental y se vincula al área de Canvas 
        // almacena los resultados a la variable mGL instanciada 
        mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }

        // se inicializa el VertexBuffer
        gEngine.VertexBuffer.initialize();
    };

    // Limpia el área de dibujo y dibuja un cuadrado 
    var clearCanvas = function (color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]);  // se establece el color que se va a borrar
        mGL.clear(mGL.COLOR_BUFFER_BIT);      // limpia el color previamente a ser establecido
    };

    // -- finalizacion de los metodos publicos

    var mPublic = {
        getGL: getGL,
        initializeWebGL: initializeWebGL,
        clearCanvas: clearCanvas
    };

    return mPublic;
}());
