"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regresion = void 0;
const regresion = (error_lineal, W) => {
    let regres = [];
    const numSalidas = W.length; // Número de salidas
    const numEntradas = W[0].length; // Número de entradas
    // ayudame hallar el error no lineal  
    for (let i = 0; i < numSalidas; i++) {
        let suma = 0;
        for (let j = 0; j < numEntradas; j++) {
            suma += error_lineal[j] * W[i][j];
        }
        regres.push(parseFloat(suma.toFixed(5)));
    }
    return regres;
};
exports.regresion = regresion;
/*
    for(let j=0; j<error_lineal.length; j++){
        console.log(error_lineal.length);
        let suma:number = 0;
        for(let i=0; i<W.length; i++){
            console.log(error_lineal[j], W[i][j]);
            suma += (error_lineal[j])*W[i][j];
            console.log("Esto es suma ",parseFloat(suma.toFixed(5)))
        }
        regres.push(parseFloat(suma.toFixed(5)));
    } */ 
