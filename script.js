// ==============================
// BIM PROJECT MANAGER DASHBOARD
// ==============================

let proyectos = [];

// ==============================
// CARGAR PROYECTOS
// ==============================

window.onload = function () {

    actualizarReloj();

    setInterval(actualizarReloj,1000);

    if(localStorage.getItem("proyectos")){

        proyectos = JSON.parse(localStorage.getItem("proyectos"));

        mostrarProyectos();

    }

}

// ==============================
// AGREGAR PROYECTO
// ==============================

function agregarProyecto(){

    const nombre=document.getElementById("nombreProyecto").value.trim();

    const responsable=document.getElementById("responsable").value.trim();

    const estado=document.getElementById("estado").value;

    if(nombre=="" || responsable==""){

        alert("Complete todos los campos.");

        return;

    }

    const fecha=new Date().toLocaleDateString("es-CO");

    let progreso=25;

    if(estado=="En proceso"){

        progreso=60;

    }

    if(estado=="Finalizado"){

        progreso=100;

    }

    proyectos.push({

        nombre,

        responsable,

        estado,

        fecha,

        progreso

    });

    guardarDatos();

    mostrarProyectos();

    document.getElementById("nombreProyecto").value="";

    document.getElementById("responsable").value="";

    document.getElementById("estado").selectedIndex=0;

    document.getElementById("mensaje").innerHTML="✅ Proyecto agregado correctamente";

    setTimeout(()=>{

        document.getElementById("mensaje").innerHTML="";

    },2000);

}

// ==============================
// MOSTRAR PROYECTOS
// ==============================

function mostrarProyectos(){

    const lista=document.getElementById("listaProyectos");

    lista.innerHTML="";

    proyectos.forEach((proyecto,index)=>{

        let icono="🟡";

        if(proyecto.estado=="En proceso"){

            icono="🔵";

        }

        if(proyecto.estado=="Finalizado"){

            icono="🟢";

        }

        lista.innerHTML+=`

        <div class="card">

        <h2>🏗️ ${proyecto.nombre}</h2>

        <p><strong>👤 Responsable:</strong> ${proyecto.responsable}</p>

        <p><strong>📅 Fecha:</strong> ${proyecto.fecha}</p>

        <p><strong>Estado:</strong> ${icono} ${proyecto.estado}</p>

        <div class="progreso">

            <div class="barra"

            style="width:${proyecto.progreso}%">

            ${proyecto.progreso}%

            </div>

        </div>

        <button

        class="eliminar"

        onclick="eliminarProyecto(${index})">

        🗑️ Eliminar

        </button>

        </div>

        `;

    });

    actualizarDashboard();

}

// ==============================
// ELIMINAR
// ==============================

function eliminarProyecto(index){

    proyectos.splice(index,1);

    guardarDatos();

    mostrarProyectos();

}

// ==============================
// GUARDAR
// ==============================

function guardarDatos(){

    localStorage.setItem(

        "proyectos",

        JSON.stringify(proyectos)

    );

}

// ==============================
// DASHBOARD
// ==============================

function actualizarDashboard(){

    document.getElementById("total").innerHTML=proyectos.length;

    let pendientes=0;

    let proceso=0;

    let finalizados=0;

    proyectos.forEach(p=>{

        if(p.estado=="Pendiente") pendientes++;

        if(p.estado=="En proceso") proceso++;

        if(p.estado=="Finalizado") finalizados++;

    });

    document.getElementById("pendientes").innerHTML=pendientes;

    document.getElementById("proceso").innerHTML=proceso;

    document.getElementById("finalizados").innerHTML=finalizados;

}

// ==============================
// BUSCADOR
// ==============================

function buscarProyecto(){

    const texto=document.getElementById("buscar").value.toLowerCase();

    const tarjetas=document.querySelectorAll(".card");

    tarjetas.forEach(card=>{

        if(card.innerText.toLowerCase().includes(texto)){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

}

// ==============================
// RELOJ
// ==============================

function actualizarReloj(){

    const ahora=new Date();

    document.getElementById("reloj").innerHTML=

    ahora.toLocaleDateString("es-CO")

    +" | "+

    ahora.toLocaleTimeString("es-CO");

}function limpiarTodo(){

    if(confirm("¿Desea eliminar todos los proyectos?")){

        proyectos=[];

        guardarDatos();

        mostrarProyectos();

    }

}