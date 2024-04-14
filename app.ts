import { funcion_d } from "./src/services/funtions_activation";
import { regresion } from "./src/services/regresiom";
import { errorNoLineal } from "./src/services/erroresNoLineales";
const datosRedNeuronal = {
  capa0: {
    pesos: [
      [0.5, -1, 0.7],
      [0.3, 0.2, 0.8],
      [1, 0.1, 0.9],
    ],
    umbrales: [0.5, 0.6, 1],
  },
  capa1: {
    pesos: [
      [0.2, 0.1],
      [0.3, 0.4],
      [1, -1],
    ],
    umbrales: [0.1, -0.1],
  },
  capa2: {
    pesos: [
      [0.9, 0.4],
      [0.1, 0.5],
    ],
    umbrales: [-0.7, 1],
  },
};
let errorV: number[] = [];
const m = 3;
const n = 2
let errorNo: number[] = [];
/*
   WEC1=[[0.5, 1, 0.7],
   [0.3, 0.2, W0.5],
   [1, 0.1, 0.9]]
 */
const WC1_C2: number[][] = [
  [0.2, 0.1],
  [0.3, 0.4],
  [1, -1],
];
const U2: number[] = [0.1, -0.1];
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
const WC2_S: number[][] = [
  [0.9, 0.4],
  [0.1, 0.5],
];
const U3: number[] = [-0.7, 1];
const NumS = 2;

// estoy construyenfo el algoritmo de backPropagation ayudame en la logica
const funcio_Act = {
  sigmoide: 1,
  tanh: 2,
  seno: 3,
  lineal: 4,
};
const vectorFuncio: number[] = [1, 2, 3];
// Funcion que hace el calculo de la funcion de activacion
const Hi = (
  X: number[],
  U1: number[],
  Pesos: number[][],
  entrada: number,
  capa_Act: number,
  funcion: number
): number[] => {
  let result: number[] = [];
  for (let i = 0; i < capa_Act; i++) {
    let h1 = 0;
    for (let j = 0; j < entrada; j++) {
      h1 += X[j] * Pesos[j][i]
    }
    h1 = h1 - U1[i]
    h1 = funcion_d(funcion, h1)
    result.push(parseFloat(h1.toFixed(5)))
  }

  return result
};
// Funcion que hace encuentra el error lineal
const error_lineal = (yd: number[], yr: number[]): number[] => {
  errorV = [];
  for (let i = 0; i < yd.length; i++) {
    let result: number = yd[i] - yr[i]
    errorV.push(parseFloat(result.toFixed(3)));
  }
  return errorV
};

const main = (capas: { pesos: number[][]; umbrales: number[] }[]) => {
  let vector: number[] = []
  let vectorYd: number[] = []
  let x = vector;
  let errorLineal: number[] = []
  const patrones: number[][] = [
    [1, 0, 1]
    // [0, 1, 1],
    // [1, 0, 1],
    // [0, 1, 0],
  ];
  const yd: number[][] = [
    [0, 0]
    // [0, 1],
    // [1, 0],
    // [1, 1],
  ];
  for (let i = 0; i < patrones.length; i++) {
    errorLineal = [];
    for (let j = 0; j < m; j++) {
      vector[j] = patrones[i][j] // presentar patron por patron
    }
    for (let k = 0; k < n; k++) {
      vectorYd[k] = yd[i][k]// salidas esperadas
    }
    console.log("patron presentado: ", vector)
    console.log("Salida esperada", vectorYd)

    let x = vector;
    let y = 0;
    // progreso entre las capas
    capas.forEach((capa) => {
      console.log("x: ", capa.pesos)
      console.log("u: ", capa.umbrales)
      const salida = Hi(
        x,
        capa.umbrales,
        capa.pesos,
        x.length,
        capa.umbrales.length,
        vectorFuncio[y]
      );
      console.log("salida: ", salida)
      console.log("entradas: ", x.length)
      x = salida;
      y++;
    });
    errorLineal = error_lineal(vectorYd, x);
    let errorPa = erroPatron(errorLineal, vectorYd.length)
    console.log("Este es el error lineal", errorLineal);
    capas.reverse()
    console.log(capas);
    let e= errorLineal
    let cont = 0
    capas.forEach((capa) => {
      if(cont == capas.length -1) return
      errorNo = regresion(e, capa.pesos)
      console.log("Este es el error no lineal", errorNo);
      e = errorNo
      cont++
    })
    

    // guardar error linal pensado para utilizarlo mas adelante errorLineales = []
  }
};

const erroPatron = (errorLineal:number[],n:number)=>{

  let suma = 0
  for (let i = 0; i < errorLineal.length; i++) {
    suma += Math.abs(errorLineal[i]) 
  }
  console.log("Error por patron",+(suma/n).toFixed(5));
  
  return +(suma/n).toFixed(5)
}
let capas = Object.values(datosRedNeuronal);
main(capas);

// 1 ,- -1.5 , 0.6
// const result = Hi(patrones, U1, WE_C1,3,3,1)
// console.log(result);
// const result2 = Hi(result, U2, WC1_C2, 3, 2,2)
// console.log(result2);
// const result3 = Hi(result2, U3, WC2_S, 2, 2,3)
// console.log(result3);
// const error = error_lineal([0, 0], result3)
// console.log("El error lineal: ",errorV);
// errorNo = regresion(errorV,WC2_S)
// console.log(errorNo);
