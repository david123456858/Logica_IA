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
const n = 2;
let errorNo: number[] = [];
interface error {
  errorNo: number[];
}
interface h {
  h: number[];
}
const errorsNo: error[] = []; //errores lineales capa 1 y capa 2
const arrayH: h[] = [];

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
      h1 += X[j] * Pesos[j][i];
    }
    h1 = h1 - U1[i];
    h1 = funcion_d(funcion, h1);
    result.push(parseFloat(h1.toFixed(5)));
  }

  return result;
};
// Funcion que hace encuentra el error lineal
const error_lineal = (yd: number[], yr: number[]): number[] => {
  errorV = [];
  for (let i = 0; i < yd.length; i++) {
    let result: number = yd[i] - yr[i];
    errorV.push(parseFloat(result.toFixed(3)));
  }
  return errorV;
};

const main = (capas: { pesos: number[][]; umbrales: number[] }[]) => {
  let vector: number[] = [];
  let vectorYd: number[] = [];
  let x = vector;
  let errorLineal: number[] = [];
  const patrones: number[][] = [
    [1, 0, 1],
    // [0, 1, 1],
    // [1, 0, 1],
    // [0, 1, 0],
  ];
  const yd: number[][] = [
    [0, 0],
    // [0, 1],
    // [1, 0],
    // [1, 1],
  ];
  for (let i = 0; i < patrones.length; i++) {
    errorLineal = [];
    for (let j = 0; j < m; j++) {
      vector[j] = patrones[i][j]; // presentar patron por patron
    }
    for (let k = 0; k < n; k++) {
      vectorYd[k] = yd[i][k]; // salidas esperadas
    }
    console.log("patron presentado: ", vector);
    console.log("Salida esperada", vectorYd);

    let x = vector;
    let y = 0;
    // progreso entre las capas
    capas.forEach((capa) => {
      console.log("x: ", capa.pesos);
      console.log("u: ", capa.umbrales);
      const salida = Hi(
        x,
        capa.umbrales,
        capa.pesos,
        x.length,
        capa.umbrales.length,
        vectorFuncio[y]
      );
      console.log("salida: ", salida);
      arrayH.push({ h: salida });
      console.log("entradas: ", x.length);
      x = salida;
      y++;
    });
    errorLineal = error_lineal(vectorYd, x);
    console.log("error patron: ", erroPatron(errorLineal, vectorYd.length));
    // console.log("Este es el error lineal", errorLineal);
    capas.reverse();
    let e = errorLineal;
    let cont = 0;
    capas.forEach((capa) => {
      if (cont == capas.length - 1) return;
      errorNo = regresion(e, capa.pesos);
      // console.log("Este es el error no lineal", errorNo);
      errorsNo.push({ errorNo: errorNo });
      e = errorNo;
      cont++;
    });

    // guardar error linal pensado para utilizarlo mas adelante errorLineales = []
  }
  console.log("error lineal ", errorLineal);
  console.log("error nol", errorsNo);
  console.log("las H", arrayH);
};
const nuevosW = (
  w: number[][],
  rata: number,
  numeroCapa: number,
  numeroSalida: number,
  patrones:number[]
) => {
  // const w = [
  //   [0.5, -1, 0.7],
  //   [0.3, 0.2, 0.8],
  //   [1, 0.1, 0.9],
  // ];
  console.log(w);

  // const patrones: number[][] = [
  //   [1, 0, 1],
  // ];
  let pesosNuevos: number[][]=w;
  for (let j = 0; j < w[0].length; j++) {
    for (let i = 0; i < w.length; i++) {
      // console.log("W:", w[i][j]);
      console.log(
        `W:= ${w[i][j]} + ${2} * ${rata} * ${
          errorsNo[numeroCapa].errorNo[j]
        }  * ${arrayH[numeroSalida].h[j]} * ${patrones[i]} `
      );
      // pesosNuevos[i][j] =
      //   w[i][j] +
      //   2 *
      //     rata *
      //     errorsNo[numeroCapa].errorNo[j] *
      //     arrayH[numeroSalida].h[j] *
      //     patrones[0][i];
    }
  }
  return pesosNuevos
};

const erroPatron = (errorLineal: number[], n: number) => {
  let suma = 0;
  for (let i = 0; i < errorLineal.length; i++) {
    suma += Math.abs(errorLineal[i]);
  }

  return +(suma / n).toFixed(5);
};
let capas = Object.values(datosRedNeuronal);

main(capas);
console.log(nuevosW(capas[2].pesos, 0.7, 1, 0,[1,0,1]));


/*las H [
  { h: [ 0.73106, 0.18243, 0.64566 ] },
  { h: [ 0.63312, -0.37959 ] },
  { h: [ 0.0215, -0.01635 ] }
] */
