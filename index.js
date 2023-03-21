const form = document.querySelector("form");
const tareaVacia = document.querySelector("#vacio");
const date = document.getElementById("fecha");
const dia = document.getElementById("dia");
const tareasNodo = document.querySelector(".tareas");

const borrarTarea = document.querySelector(".tareas");
const tareaCompletada = document.querySelector(".tareas");
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
let tareas = [];

function eventos() {
  form.addEventListener("submit", validarForm);
  borrarTarea.addEventListener("click", eliminarTarea);
  tareaCompletada.addEventListener("click", completarTarea);

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
    estado:false,
    id: Date.now(), // es el tiempo (milisegundos) que pasan desde 1970 hasta el momento donde se agregue la tarea
  };

  tareas.push(objTarea)
  form.reset();
  mostrarDatos();
}

function mostrarDatos() {
  limpiarDatos();

  tareas.forEach((element) => {
    const listaTareas = document.createElement("div");
    listaTareas.classList.add("item-tarea");
    listaTareas.innerHTML = `
    ${element.estado ? ( // if item.estado es true (true = tarea completada)
        `<p class ="completar">${element.tarea}</p>`
    ) : (
        `<p class = "Ctarea">${element.tarea}</p>`
    )}
        <div class="btns">
            <button data-id="${element.id}" class="eliminar">X</button>
            <button data-id="${element.id}" class="completada">✔</button>
        </div>`

    tareasNodo.appendChild(listaTareas);
  });
    localStorage.setItem('tareas', JSON.stringify(tareas))
}

function limpiarDatos() {
  tareasNodo.innerHTML = "";
}


function eliminarTarea(e) {
  if(e.target.classList.contains("eliminar")){
    var element = e.target
    const tareaID = (element.getAttribute("data-id"));
    console.log(tareaID)
    const tareaBorrar = tareas.filter((element) => element.id !== Number(tareaID))
    tareas = tareaBorrar
    mostrarDatos()
  }
}

function completarTarea(e) {
  if(e.target.classList.contains("completada")){
    const tareaID = Number(e.target.getAttribute("data-id"));
    console.log(tareaID)

    const newTask = tareas.map((element) => {   
      if(element.id === tareaID){
        element.estado = !element.estado;
        return element;
        
      } else {
        return element
      }
    })

    mostrarDatos()
  }
}

