"use strict";  

function Renderable(shader) {
    this.mShader = shader;        
    this.mXform = new Transform(); // Transforma lo que mueve este objeto a su alrededor
    this.mColor = [1, 1, 1, 1];    // Color del pixel
}


Renderable.prototype.draw = function (vpMatrix) {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor, vpMatrix);  
    this.mShader.loadObjectTransform(this.mXform.getXform());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype.getXform = function () { return this.mXform; };
Renderable.prototype.setColor = function (color) { this.mColor = color; };
Renderable.prototype.getColor = function () { return this.mColor; };

