"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const funtions_activation_1 = require("./src/services/funtions_activation");
const m = 3;
const n = 2;
const WE_C1 = [[0.5, -1, 0.7], [0.3, 0.2, 0.8], [1, 0.1, 0.9]];
const U1 = [0.5, 0.6, 1];
const NumC1 = 3;
/*
   WEC1=[[0.5, 1, 0.7],
   [0.3, 0.2, W0.5],
   [1, 0.1, 0.9]]
 */
const WC1_C2 = [[0.2, 0.1], [0.3, 0.4], [1, -1]];
const U2 = [0.1, -0.1];
const NumC2 = 2;
/**
 * wc1c2= [[0.2, 0.1],
    [0.3, 0.4],
    [1, -1]]
 *
 * wc2S[[0.9, 0.4],
   [0.1, 0.5]]
 *
 */
const WC2_S = [[0.9, 0.4], [0.1, 0.5]];
const U3 = [-0.7, 1];
const NumS = 2;
const patrones = [1, 0, 1];
// estoy construyenfo el algoritmo de backPropagation ayudame en la logica
const funcio_Act = {
    "sigmoide": 1,
    "tanh": 2,
    "seno": 3,
    "lineal": 4,
};
const Hi = (X, U1, Pesos, entrada, capa_Act, funcion) => {
    let U2 = [];
    for (let i = 0; i < capa_Act; i++) {
        let h1 = 0;
        for (let j = 0; j < entrada; j++) {
            h1 += (X[j] * (Pesos[j][i]));
        }
        h1 = h1 - U1[i];
        h1 = (0, funtions_activation_1.funcion_d)(funcion, h1);
        U2.push(h1);
    }
    return U2;
};
const error_lineal = (yd, yr) => {
    let error = [];
    for (let i = 0; i < yd.length; i++) {
        error.push(yd[i] - yr[i]);
    }
    return error;
};
// 1 , -1.5 , 0.6
const result = Hi(patrones, U1, WE_C1, 3, 3, 1);
console.log(result);
const result2 = Hi(result, U2, WC1_C2, 3, 2, 2);
console.log(result2);
const result3 = Hi(result2, U3, WC2_S, 2, 2, 3);
console.log(result3);
const error = error_lineal([0, 0], result3);
console.log("El error lineal: ", error);
