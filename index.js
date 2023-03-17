const form = document.querySelector("form");
const tareaVacia = document.querySelector("#vacio");
const date = document.getElementById("fecha");
const dia = document.getElementById("dia");
const tareasNodo = document.querySelector(".tareas");


//   Contenido de fechas
    var today = new Date();
    var fecha = today.toLocaleDateString({
    weekday: "long",
    month: "numeric",
    day: "numeric",
    year: "numeric",
    });
    diaFecha = today.toLocaleDateString("es-MX", { weekday: "long" });
    date.textContent = fecha;
    dia.textContent = diaFecha;
//
let tareas = [];


function eventos() {
  form.addEventListener("submit", validarForm);
  document.addEventListener('DOMContentLoaded', () => {
    let LS = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas = LS;
    mostrarDatos();
  })

  
}



eventos();


function validarForm(e) {
  e.preventDefault();
  const tarea = document.getElementById("tarea").value;

  if (tarea === "") {
    tareaVacia.textContent = "Tarea Vacia";
    setTimeout(() => {
      tareaVacia.textContent = "";
    }, 3000);
    return;
  }

  const objTarea = {
    tarea: tarea,
    id: Date.now(), // es el tiempo (milisegundos) que pasan desde 1970 hasta el momento donde se agregue la tarea
  };

  tareas.push(objTarea)


  
  form.reset();
  mostrarDatos();
  
}

function mostrarDatos() {
  limpiarDatos();

  if (tareas.length === "") {
    const mensaje = document.createElement("h5");
    mensaje.textContent = "Sin Tareas";
    tareas.appendChild(mensaje);
    return;
  }

  tareas.forEach((element) => {
    const listaTareas = document.createElement("div");
    listaTareas.classList.add("item-tarea");

    listaTareas.innerHTML = `<p class="ctarea" tarea-id="${element.id}">${element.tarea}</p>`;

    tareasNodo.appendChild(listaTareas);
  });


    localStorage.setItem('tareas', JSON.stringify(tareas))
  
}



  


function limpiarDatos() {
  tareasNodo.innerHTML = "";
}
