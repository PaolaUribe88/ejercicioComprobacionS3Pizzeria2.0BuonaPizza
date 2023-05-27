//VARIABLES GLOBALES
//va vacio porque se rellena con la logica con chekbox
var arregloIngredientes = [];
var arregloPropina=[];

const enviarArreglo= (ingrediente)=>{
    arregloIngredientes.push(ingrediente);
};

const eliminarElemento=(ingrediente)=>{
    // recorremos el arreglo de ingredientes con el ciclo for
        for(let i=0; i<arregloIngredientes.length; i++){
    // si el ingrediente a eliminar solicitado coincide con algun elemento del arreglo
            if(arregloIngredientes[i]==ingrediente){
            // identificamos ese indice
                let indEliminar = i;
    // eliminamos del arreglo ese elemento identificado con ese indice con la instrucción splice
                arregloIngredientes.splice(indEliminar,1);
            }//fin if
        }//fin for
};

const pintarElementos=()=>{
    let parrafoBase = document.getElementById('txtIngredientesBase');

    let ingredientesBaseString ='';
    //recorremos el arreglo con un for of
    for( let ingrediente of arregloIngredientes){
      // acumulo en la variable ingredientesString cada ingrediente separado por coma    
        ingredientesBaseString+= ingrediente+',';
    }//fin for
    parrafoBase.innerText= ingredientesBaseString;

};

const calculoIngredientesExtras=()=>{
    // encontramos la longitud total
    let cantIngredientes = arregloIngredientes.length;
    // restamos los tres ingredientes de base del total para hallar la cantidad extra
    let totatIngredientesExtras = cantIngredientes-3;
    // multiplicamos por 800 la cantidad de ingredientes extra
    let valorTotalIngredientesExtras= totatIngredientesExtras*800;
    // identificamos el parrafo en el dom
    let elValorTotalIngredientesExtras = document.getElementById('valorTotalIngredientesExtras');
    // enviamos el valor
    elValorTotalIngredientesExtras.innerText= valorTotalIngredientesExtras;
};

const pintarElementosExtra=()=>{
    let ingredienteExtra = document.getElementById('txtIngredientesExtras');
    let cantIngredientesExtra = arregloIngredientes.length;
    let ingredientesBaseString='';
    if(cantIngredientesExtra>3){
        for(let i=3; i<arregloIngredientes.length;i++){
            // acumulo en la variable ingredientesString cada ingrediente separado por coma
            ingredientesBaseString+=arregloIngredientes[i]+',';

        }
        ingredienteExtra.innerText=ingredientesBaseString;
    }
};

//VERIFICAMOS LOS ELEMENTOS INGREDIENTES
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
        enviarArreglo(ingredienteSeleccionado);
    }
    else if(estadoCheck == false){
        eliminarElemento(ingredienteSeleccionado);
    }
    else{
        console.log('Error en la matrix');
    }
    pintarElementos();
    pintarElementosExtra();
    calculoIngredientesExtras();
};

const procesarArregloPropina=()=>{
// Método para obtener el valor de la propina
    let numConcat = '';
    for(elemento in arregloPropina){
        numConcat+= arregloPropina[elemento];
    }
    return numConcat;
} 
const procesarPropina=(evento)=>{
    let elParrafoPropina = document.getElementById('parrafoPropina');
    let teclaPresionada = evento.key;
    if(teclaPresionada == 'Backspace'){
        console.log('borroNumero');
        arregloPropina.pop();
    }
    else{
        arregloPropina.push(evento.key);
        console.log(arregloPropina);
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

}  
const calcularTotal = ()=>{
    let elPrecioBasePizza = Number(document.getElementById('precioBasePizza').innerText);
    let precioTotalIngredientesExtras = Number(document.getElementById('txtIngredientesExtras').innerText);
    let precioTotalPropina = Number(document.getElementById('parrafoPropina').innerText);

    let totalAPagar = elPrecioBasePizza+precioTotalIngredientesExtras+precioTotalPropina;

    let elParrafoTotales = document.getElementById('totalCompra');

    let mensaje = `El valor total a pagar por su pizza es ${totalAPagar}`;
    elParrafoTotales.innerText = mensaje;
};
const andarPizzeria =()=>{
    //CREAMOS LLAMADO AL DOM
    let checkArreglo = document.getElementsByClassName('form-check-input');
    for  (let cajaCheckbox of checkArreglo){
        cajaCheckbox.addEventListener('click',procesarCheckBox);
    }
    let laPropina = document.getElementById('totalPropinas');
    laPropina.addEventListener('keydown', procesarPropina);

    let elBotonEnviar = document.getElementById('btnPedido');
    elBotonEnviar.addEventListener('click', calcularTotal);

}