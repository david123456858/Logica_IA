
const sigmoide = (suma:number):number =>{
    return 1/(1+Math.exp(-suma))
}
const tanh = (suma:number):number =>{
    // estoy esperando que me ayudes con la tangente hipérbolica 
    return Math.tanh(suma)
}
const seno = (suma:number):number =>{
    suma = suma * (Math.PI/180)
    return Math.sin(suma)
}
const lineal = (suma:number):number =>{
    return suma
}
export const funcion_d = (funcion:number,suma:number):number=>{

    if(funcion === 1){
        return sigmoide(suma)
    }else if(funcion === 2){
        return tanh(suma)
    }else if(funcion === 3){ 
        return seno(suma)
    }else{
        return lineal(suma)
    }
}