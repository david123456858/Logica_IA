const sigmoide = (suma: number): number => {
  return derivaSigmoide(1 / (1 + Math.exp(-suma)));
};
function derivaSigmoide(x: number) {
  return Math.exp(-x) / Math.pow(1 + Math.exp(-x), 2);
}
const tanh = (suma: number): number => {
  // estoy esperando que me ayudes con la tangente hipérbolica
  const tanH = Math.tanh(suma)
  return tanH; // derivada
};
const derivadaTanH = (suma: number): number => {
  return 1 - Math.tanh(suma) * Math.tanh(suma);
}
const seno = (suma: number): number => {
  suma = suma * (Math.PI / 180);
  return Math.sin(suma)//derivada seno
};
const derivadaSeno = (suma: number): number => {
  suma = suma * (Math.PI / 180);
  return -Math.sin(Math.sin(suma)) * Math.cos(suma);
}
const lineal = (suma: number): number => {
  return suma;
};
export const funcion_d = (funcion: number, suma: number): number => {
  // hacer lo de la derivada
  if (funcion === 1) {
    return sigmoide(suma);
  } else if (funcion === 2) {
    return tanh(suma);
  } else if (funcion === 3) {
    return seno(suma);
  } else {
    return lineal(suma); //falta definir esta formula
  }
};
