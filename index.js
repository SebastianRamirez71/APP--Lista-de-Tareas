const form = document.querySelector("form");
const tareaVacia = document.querySelector("#vacio");

const date = document.getElementById("fecha");
const dia = document.getElementById("dia");

let tareas = []; // array donde se guardaran las tareas ingresadas

//      Contenido de fechas
    var today = new Date();
    var fecha = today.toLocaleDateString({weekday: 'long', month: 'numeric', day:'numeric',year:'numeric'})
    diaFecha = today.toLocaleDateString('es-MX',{weekday:'long'})
    date.textContent = fecha
    dia.textContent = diaFecha
//


// LocalStorage 




//




function eventos() {
    form.addEventListener("submit", validarForm);
    
    
}

eventos();

function validarForm(e) {
    e.preventDefault();
    const tareaIngresada = document.getElementById("tarea").value;
    
    if (tareaIngresada === "") {
        tareaVacia.textContent = 'Tarea Vacia'
        setTimeout(() => {
            tareaVacia.textContent = ''
            
        }, 3000);
        return
    }

        const objTarea = {
        tarea:tareaIngresada,
        estado:false,
        }
        
        tareas = [objTarea]
        
        form.reset();
        mostrarDatos();

}



function mostrarDatos() {

    tareas.forEach((element) =>{
        const listaTareas = document.createElement("div");
        listaTareas.classList.add("item-tarea");

            listaTareas.innerHTML = 
            `<p class="ctarea">${element.tarea}</p>`
        
        

        const tareasNodo = document.querySelector(".tareas")       
        tareasNodo.appendChild(listaTareas);
        
    })
    
}