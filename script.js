function agregarProyecto(){

    let input=document.getElementById("nombreProyecto");

    let nombre=input.value.trim();

    if(nombre===""){
        alert("Ingrese un proyecto");
        return;
    }

    let lista=document.getElementById("listaProyectos");

    let li=document.createElement("li");

    li.innerHTML=`
        ${nombre}
        <button class="eliminar" onclick="eliminarProyecto(this)">
            Eliminar
        </button>
    `;

    lista.appendChild(li);

    input.value="";
}

function eliminarProyecto(boton){

    boton.parentElement.remove();

}