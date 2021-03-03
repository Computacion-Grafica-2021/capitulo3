"use strict"; 

function MyGame(htmlCanvasID) {
    // variables del sombreador para dibujar: un sombreador para ser compartido por dos renderizables
    this.mConstColorShader = null;

    // variables para los cuadrados
    this.mBlueSq = null;        // estos son los objetos renderizables
    this.mRedSq = null;

    // Paso A: Inicializar el contexto webGL
    gEngine.Core.initializeWebGL(htmlCanvasID);

    // Paso B: Configurar la cámara
    this.mCamera = new Camera(
        vec2.fromValues(20, 60),   // centro de WC
        20,                        // ancho de WC
        [20, 40, 600, 300]         // ventana grafica (orgX, orgY, width, height)
        );

    // Paso C: creacin de los sombreados
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      //Camino al VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");    // camino al FragmentShader

    // Paso D: Crear objetos renderizables:
    this.mBlueSq = new Renderable(this.mConstColorShader);
    this.mBlueSq.setColor([0.25, 0.25, 0.95, 1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1, 0.25, 0.25, 1]);
    this.mTLSq = new Renderable(this.mConstColorShader);
    this.mTLSq.setColor([0.9, 0.1, 0.1, 1]);
    this.mTRSq = new Renderable(this.mConstColorShader);
    this.mTRSq.setColor([0.1, 0.9, 0.1, 1]);
    this.mBRSq = new Renderable(this.mConstColorShader);
    this.mBRSq.setColor([0.1, 0.1, 0.9, 1]);
    this.mBLSq = new Renderable(this.mConstColorShader);
    this.mBLSq.setColor([0.1, 0.1, 0.1, 1]);

    // Paso E: Limpieza del lienzo
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);        // Limpieza del lienzo

    // Paso F: Inicia el dibujo activando la cámara.
    this.mCamera.setupViewProjection();
    var vpMatrix = this.mCamera.getVPMatrix();

    // Paso G: Dibuja el cuadrado azul
    // Centro azul, cuadrado ligeramente girado
    this.mBlueSq.getXform().setPosition(20, 60);
    this.mBlueSq.getXform().setRotationInRad(0.2); // En radianes
    this.mBlueSq.getXform().setSize(5, 5);
    this.mBlueSq.draw(vpMatrix);

    // PAso H: Dibuja el centro y los cuadrados de las esquinas.
    // centro cuadrado rojo
    this.mRedSq.getXform().setPosition(20, 60);
    this.mRedSq.getXform().setSize(2, 2);
    this.mRedSq.draw(vpMatrix);

    // arriba a la izquierda
    this.mTLSq.getXform().setPosition(10, 65);
    this.mTLSq.draw(vpMatrix);

    // arriba a la derecha
    this.mTRSq.getXform().setPosition(30, 65);
    this.mTRSq.draw(vpMatrix);

    // abajo a la derecha
    this.mBRSq.getXform().setPosition(30, 55);
    this.mBRSq.draw(vpMatrix);

    // abajo a la izquierda
    this.mBLSq.getXform().setPosition(10, 55);
    this.mBLSq.draw(vpMatrix);
}