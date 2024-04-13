"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcion_d = void 0;
const sigmoide = (suma) => {
    return 1 / (1 + Math.exp(-suma));
};
const tanh = (suma) => {
    // estoy esperando que me ayudes con la tangente hipérbolica 
    return Math.tanh(suma);
};
const seno = (suma) => {
    suma = suma * (Math.PI / 180);
    return Math.sin(suma);
};
const lineal = (suma) => {
    return suma;
};
const funcion_d = (funcion, suma) => {
    // hacer lo de la derivada
    if (funcion === 1) {
        return sigmoide(suma);
    }
    else if (funcion === 2) {
        return tanh(suma);
    }
    else if (funcion === 3) {
        return seno(suma);
    }
    else {
        return lineal(suma); //falta definir esta formula
    }
};
exports.funcion_d = funcion_d;
