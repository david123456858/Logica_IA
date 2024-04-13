/**const Hi = (X: number[], U1: number[], Pesos: number[][], entrada: number, capa_Act: number, funcion: number): number[] => {
    let result: number[] = [];
    for (let i = 0; i < capa_Act; i++) {
        let h1 = 0;
        for (let j = 0; j < entrada; j++) {
            h1 += (X[j] * (Pesos[j][i]));
        }
        h1 = h1 - U1[i];   
        h1 = funcion_d(funcion, h1); // Suponiendo que funcion_d es una función que aplica la función de activación
        result.push(parseFloat(h1.toFixed(5)));
    }
    
    return result;
};

// Función para realizar la propagación hacia adelante en la red neuronal
const main = (capas: { pesos: number[][], umbrales: number[] }[], patrones: number[][], funcion: number) => {
    // Iterar sobre cada patrón de entrada
    patrones.forEach((patron, index) => {
        console.log(`Patrón de entrada ${index + 1}:`, patron);
        
        // Iterar sobre cada capa de la red neuronal
        let x = patron;
        capas.forEach((capa, index) => {
            // Calcular la salida de la capa actual utilizando la función Hi
            const salida = Hi(x, capa.umbrales, capa.pesos, patron.length, capa.pesos[0].length, funcion);
            console.log(`Salida de la capa ${index + 1}:`, salida);
            
            // La salida de esta capa se convierte en la entrada para la siguiente capa
            x = salida;
        });
        console.log("-------------------");
    });
};

// Ejemplo de datos
const capas: { pesos: number[][], umbrales: number[] }[] = [
    {
        pesos: [
            [0.1, 0.2, 0.3],
            [0.4, 0.5, 0.6]
        ],
        umbrales: [0.7, 0.8, 0.9]
    },
    {
        pesos: [
            [0.1, 0.2],
            [0.3, 0.4],
            [0.5, 0.6]
        ],
        umbrales: [0.7, 0.8]
    }
];

const patrones: number[][] = [
    [1, 0],
    [0, 1],
    [1, 1]
];

// Función de activación sigmoide
const funcion_activacion_sigmoide = (x: number): number => {
    return 1 / (1 + Math.exp(-x));
};

// Función de activación para derivada de la sigmoide
const funcion_d = (funcion: number, x: number): number => {
    if (funcion === 0) {
        return funcion_activacion_sigmoide(x);
    }
    // Otras funciones de activación aquí
    return x;
};

// Llamar a la función main para calcular las salidas de las capas para cada patrón de entrada
main(capas, patrones, 0); // 0 para función de activación sigmoide */