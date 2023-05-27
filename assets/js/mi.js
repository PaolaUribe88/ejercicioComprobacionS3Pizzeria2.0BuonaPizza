var arrIngredientes = [];



const enviarAlArreglo = (ingrediente)=>{
    // enviamos al arreglo general el ingrediente
    arrIngredientes.push(ingrediente);
};

const eliminarDelArreglo = (ingrediente)=>{
    // recorremos el arreglo de ingredientes con el ciclo for
    for(let i=0; i<arrIngredientes.length;i++){
        // si el ingrediente a eliminar solicitado coincide con algun elemento del arreglo
        if(arrIngredientes[i]== ingrediente){
            // identificamos ese indice
            let indiceEliminar = i;
            // eliminamos del arreglo ese elemento identificado con ese indice con la instrucción splice
            arrIngredientes.splice(indiceEliminar, 1);
        }// fin if

    }// fin for

};

const pintarArreglo =()=>{
    let elParrafoIngredientesBase = document.getElementById('ingredientesBase');
    //recorremos el arreglo con un for of
    let ingredientesString = '';
    for(let ingrediente of arrIngredientes){
        // acumulo en la variable ingredientesString cada ingrediente separado por coma
        ingredientesString+= ingrediente+' , ';
        // ingredientesString = ingredientesString + ingrediente + ',';
    }
    elParrafoIngredientesBase.innerText = ingredientesString;
};

const calcularValorIngredientesExtras = ()=>{
    // encontramos la longitud total
    let cantidadIngredientes = arrIngredientes.length; 
    // restamos los tres ingredientes de base del total para hallar la cantidad extra
    let totalIngredientesExtras = cantidadIngredientes - 3;
    // multiplicamos por 800 la cantidad de ingredientes extra
    let valorTotalIngredientesExtras = totalIngredientesExtras * 800;
    // identificamos el parrafo en el dom
    let elParrafoTotalIngredientesExtras = document.getElementById('totalIngredientesExtras');
    // enviamos el valor
    elParrafoTotalIngredientesExtras.innerText = valorTotalIngredientesExtras;

};

const pintarIngredientesExtras = ()=>{
    let elParrafoIngredientesExtra = document.getElementById('ingredientesExtra');
    let cantidadIngredientes = arrIngredientes.length;
    let ingredientesString=' ';
    if(cantidadIngredientes>3){
        for(let i=3; i<arrIngredientes.length; i++){
            // acumulo en la variable ingredientesString cada ingrediente separado por coma
            ingredientesString+= arrIngredientes[i]+ ' , ';
            // ingredientesString = ingredientesString + ingrediente + ',';        
        }//fin for
        elParrafoIngredientesExtra.innerText = ingredientesString;
    }//fin if
}

const procesarCheckBox = (evento)=>{
    // analizamos el evento
    // console.log(evento);
    // extraemos el valor del checkbox presionado
    console.log(evento.srcElement.defaultValue);
    // identificamos el ingrediente seleccionado
    let ingredienteSeleccionado = evento.srcElement.defaultValue;
    // identificamos el estado del checkbox
    let estadoCheck = evento.srcElement.checked;

    if(estadoCheck == true){
        enviarAlArreglo(ingredienteSeleccionado);
    }
    else if(estadoCheck == false){
        eliminarDelArreglo(ingredienteSeleccionado);
    }
    else{
        console.log('Error en la matrix');
    }
    // verificamos el arreglo general
    // console.log(arrIngredientes);
    pintarArreglo();
    pintarIngredientesExtras();
    calcularValorIngredientesExtras();
};


var arrPropina=[];

const procesarArregloPropina = ()=>{
    let numeroConcatenado = '';
    for(elemento in arrPropina){
        numeroConcatenado+= arrPropina[elemento];
        // numeroConcatenado = numeroConcatenado + elemento;
    }
    return numeroConcatenado;
}

const procesarPropina = (evento)=>{
    // console.log(evento);
    let elParrafoPropina = document.getElementById('parrafoPropina');
    let teclaPresionada = evento.key;
    if(teclaPresionada == 'Backspace'){
        console.log('borroNumero');
        arrPropina.pop();
    }
    else{
        arrPropina.push(evento.key);
        console.log(arrPropina);
    }

    let valorTxtPropina = procesarArregloPropina();

    // valido si la propina es mayor que mil
    let valorPropinaNumber = Number(valorTxtPropina);
    if(valorPropinaNumber<1000){
        elParrafoPropina.innerText = 1000;
    }
    else{
        elParrafoPropina.innerText = valorTxtPropina;
    }


};


const calcularTotal = ()=>{
    let elPrecioBasePizza = Number(document.getElementById('precioBasePizza').innerText);
    let precioTotalIngredientesExtras = Number(document.getElementById('totalIngredientesExtras').innerText);
    let precioTotalPropina = Number(document.getElementById('parrafoPropina').innerText);

    let totalAPagar = elPrecioBasePizza+precioTotalIngredientesExtras+precioTotalPropina;

    let elParrafoTotales = document.getElementById('totales');
   

    let mensaje = `El valor total a pagar por su pizza es: $ ${totalAPagar}`;
    
    elParrafoTotales.innerText = mensaje;
};

const asignarEventos = ()=>{
    let arrCheckBox = document.getElementsByClassName('form-check-input');
    for(let cajaCheck of arrCheckBox){
        cajaCheck.addEventListener('click', procesarCheckBox);
    }

    let laCajaPropina = document.getElementById('txtPropina');
    laCajaPropina.addEventListener('keydown', procesarPropina);

    let elBotonEnviar = document.getElementById('btnEnviar');
    elBotonEnviar.addEventListener('click', calcularTotal);

};