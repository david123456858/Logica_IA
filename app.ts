import { funcion_D, funcion_d } from "./src/services/funtions_activation";
import { regresion } from "./src/services/regresiom";
import { errorNoLineal } from "./src/services/erroresNoLineales";
import { error, table } from "console";
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
}; //Se va

let errorV: number[] = []; //Se va
const m = 3; //Se va
const n = 2; //Se va
let errorNo: number[] = []; //Se va
let EntradasT: number[][] = [] //Se va
interface error {
  errorNo: number[];
}
interface h {
  h: number[];
}
let errorsNo: error[] = []; //errores lineales capa 1 y capa 2
let arrayH: h[] = [];

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
    errorV.push(parseFloat(result.toFixed(5)));
  }
  return errorV;
};
let Ep: number[] = []
let errorLineal: number[] = [];
let tError:number[] = []
const main = (capas: { pesos: number[][]; umbrales: number[] }[],numiteraciones:number,erroPermitido:number) => {
  let vector: number[] = [];
  let vectorYd: number[] = [];
  let EntradasT: number[] = []
  let errorIte: number = 0
  let x = vector;
  errorLineal = [];
  const patrones: number[][] = [
    [1, 0, 1],
    [0, 1, 1],
    [1, 0, 1],
    [0, 1, 0],
  ];
  const yd: number[][] = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ];
  for (let index = 0; index < numiteraciones; index++) {
    Ep = []

    
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
        //console.log("salida: ", salida);
        arrayH.push({ h: salida });
        //console.log("entradas: ", x.length);
        x = salida;
  
        y++;
      });
      errorLineal = error_lineal(vectorYd, x);
  
      //console.log("error patron: ", erroPatron(errorLineal, vectorYd.length));
      Ep.push(erroPatron(errorLineal, vectorYd.length))
      // console.log("Este es el error lineal", errorLineal);
      capas.reverse()
      let e = errorLineal
      let cont = 0;
      capas.forEach((capa) => {
        if (cont == capas.length - 1) return;
        errorNo = regresion(e, capa.pesos);
        //console.log("Este es el error no lineal", errorNo);
        errorsNo.push({ errorNo: errorNo });
        e = errorNo;
        cont++;
      });
      errorsNo.reverse()
      capas.reverse()
      // EntrdasT = [[1,0,0],[hi],[hl]]
      let newSalidas = [
  
        [patrones[0]],
        [arrayH]
  
      ]
      y = 0
      let contW = 0
      let contH = 0
      //CAMBIOS DE PESOS
      capas.forEach((capa) => {
        if (contH === capas.length - 1) {
          console.log("Entre en la ultima capa")
          const nuevWs = nuevosWS(capa.pesos, 0.7, contW);//C2S
          const O = nuevosU(capa.umbrales, 0.7, contW, "s", vectorFuncio[contH])//Us
          console.log("nuevos umbrales salida", O)
        }
        if (y === 0) {
          console.log("Entre en la primer peso")
          const wNew = nuevosW(capa.pesos, 0.7, y, vector, vectorFuncio[y]);//CEC1
          const uNew = nuevosU(capa.umbrales, 0.7, y, "n", vectorFuncio[y]);//U1
          console.table(uNew)
        } else if (contH <= errorsNo.length - 1) {
          console.log("tamañp", errorsNo.length - 1)
          console.log("Entre mas del primer peso")
          const s = nuevosW(capa.pesos, 0.7, y, arrayH[contW].h, vectorFuncio[y])//C1C2
          const u = nuevosU(capa.umbrales, 0.7, y, "n", vectorFuncio[y])//U2
          console.log("nuevos umbrales capa", u)
          contW++
        }
        y++
        contH++
        console.log(y)
      })
      //console.log("error lineal ",i, errorLineal);
      //console.log("error nol",i, errorsNo);
      //console.log("las H",i, arrayH);
      //console.log("pesos nuevos",i, capas[0].pesos);
      errorsNo = []
      arrayH = []
    }
    console.table(Ep)
    errorIte = calculateErrorI(Ep)
    //console.log("errorIte", errorIte)
    let j = 0
    capas.forEach((capa)=>{
      j++
      console.log("pesos nuevos capa",j, capa.pesos);
      console.log("umbrales nuevos capa",j, capa.umbrales);
    })
    
    tError.push(+errorIte.toFixed(1))
    if (errorIte<=erroPermitido){
      console.log("Termino el entrenamiento :",errorIte)
      break
    }
    
    console.log("iteracion ",index, "error iteracion :",tError);
  }
  
};
const calculateErrorI = (ep:number[])=>{
  let suma=0
  for (let i = 0; i < ep.length; i++) {
    suma+=ep[i]
    
  }
  return suma/ep.length
}
const nuevosW = (
  w: number[][],
  rata: number,
  numeroCapa: number,//0,1,//0,1
  patrones: number[],
  funcion: number
) => {
  console.log(errorNo)
  let pesosNuevos: number[][] = w;
  for (let j = 0; j < w[0].length; j++) {
    for (let i = 0; i < w.length; i++) {
      console.log(
        `W:= ${w[i][j]} + ${2} * ${rata} * ${errorsNo[numeroCapa].errorNo[j]
        }  * ${arrayH[numeroCapa].h[j]} * ${patrones[i]} `
      );
      console.log("salida HQ", numeroCapa);
      console.log("salida hi", funcion_D(funcion, arrayH[numeroCapa].h[j]));

      pesosNuevos[i][j] =
        +(w[i][j] +
          2 *
          rata *
          errorsNo[numeroCapa].errorNo[j] *
          funcion_D(funcion, arrayH[numeroCapa].h[j]) *
          patrones[i]).toFixed(5)
    }
  }
  w = pesosNuevos;
  return w
};
const nuevosU = (u: number[], rata: number, numeroCapa: number, op: string, funcion: number) => {
  console.log("FUNCION U", funcion);

  let nuevoUmbrales: number[] = u;
  if (op === "n") {

    for (let i = 0; i < u.length; i++) {
      console.log(
        `U:= ${u[i]} + ${2} * ${rata} * ${errorsNo[numeroCapa].errorNo[i]
        }  * ${arrayH[numeroCapa].h[i]} * ${1} `
      );

      nuevoUmbrales[i] = +(u[i] + 2 * rata * errorsNo[numeroCapa].errorNo[i] * funcion_D(arrayH[numeroCapa].h[i], funcion) * 1).toFixed(5)
    }
    u = nuevoUmbrales;
    return u
  } else {
    for (let i = 0; i < u.length; i++) {
      console.log(
        `Us:= ${u[i]} + ${2} * ${rata} * ${errorLineal[i]}  * ${arrayH[numeroCapa].h[i]} * ${1} `
      );

      nuevoUmbrales[i] = +(u[i] + 2 * rata * errorLineal[i] * arrayH[numeroCapa].h[i] * 1).toFixed(5)
    }
    u = nuevoUmbrales;
    return u
  }
}
const nuevosWS = (
  w: number[][],
  rata: number,
  numeroSalida: number
) => {
  let pesosNuevos: number[][] = w;
  for (let j = 0; j < w[0].length; j++) {
    for (let i = 0; i < w.length; i++) {
      // console.log("W:", w[i][j]);
      console.log(
        `W:= ${w[i][j]} + ${2} * ${rata} * ${errorLineal[i]
        }  * ${arrayH[numeroSalida].h[j]}`
      );
      pesosNuevos[i][j] =
        +(w[i][j] +
          2 *
          rata *
          errorLineal[i] *
          arrayH[numeroSalida].h[j])

    }
  }
  w = pesosNuevos;
  return w
}
const erroPatron = (errorLineal: number[], n: number) => {
  let suma = 0;
  for (let i = 0; i < errorLineal.length; i++) {
    suma += Math.abs(errorLineal[i]);
  }

  return +(suma / n).toFixed(5);
};
let capas = Object.values(datosRedNeuronal);
main(capas,15,0.6);