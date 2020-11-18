//Variables globales
const formularioUI = document.querySelector('#formulario');
const listaEmpresasUI = document.getElementById('listaEmpresas');
let arrayEmpresas = [];

//Funciones
const CrearEmpresa = (id, nombre, nit, fecha, direccion) => {
    let empresas = {
        id: id,
        nombre: nombre,
        NIT: nit,
        fecha: fecha,
        direccion: direccion
    }

    arrayEmpresas.push(empresas);

    return empresas;
}

const GuardarDB = () => {

    localStorage.setItem('empresa', JSON.stringify(arrayEmpresas));

    PintarDB();

}

const PintarDB = () =>{
    listaEmpresasUI.innerHTML = '';

    arrayEmpresas = JSON.parse(localStorage.getItem('empresa'));

    if (arrayEmpresas === null) {
        arrayEmpresas = [];
    } else {
        arrayEmpresas.forEach(element => {
            listaEmpresasUI.innerHTML += 
                `<div class="alert alert-success" role="alert">
                    <i class="material-icons float-left mr-3">location_city</i>
                    <b>${element.nombre}</b> - ${element.NIT} - ${element.fecha} - ${element.direccion}
                    <span class="float-right">
                        <i class="material-icons">done</i>
                        <i class="material-icons">delete</i>
                    </span>
                </div>`;
        });
    }
}

const EliminarDB = (empresa) =>{

    let indexArray;
    
    arrayEmpresas.forEach((elemento, index) =>{
        if (elemento.empresa === empresa) {
            indexArray = index;
        }
    })

    arrayEmpresas.splice(indexArray,1)
    GuardarDB();

}

const EditarDB = (actividad) =>{
    let indexArray = arrayActividades.findIndex((elemento) =>elemento.actividad === actividad)

    arrayActividades[indexArray].estado = true

    GuardarDB();
}

//EvenListener

formularioUI.addEventListener('submit', (e) =>{
    e.preventDefault();
    let empresaId = document.querySelector('#id').value;
    let empresaNam = document.querySelector('#nombre').value;
    let empresaNit = document.querySelector('#nit').value;
    let empresaFech = document.querySelector('#fecha').value;
    let empresaDic = document.querySelector('#direccion').value;

    CrearEmpresa(empresaId, empresaNam, empresaNit, empresaFech, empresaDic);
    GuardarDB();

    formularioUI.reset();
})

document.addEventListener('DOMContentLoaded', PintarDB);

listaEmpresasUI.addEventListener('click', (e) => {

    e.preventDefault();

    if (e.target.innerHTML === 'done' || e.target.innerHTML === 'delete') {
        let texto = e.path[2].childNodes[3].innerHTML;
        if (e.target.innerHTML === 'delete') {
            //Accion eliminar
            EliminarDB(texto);
        }
        if (e.target.innerHTML === 'done') {
            //Acccion de editar
            EditarDB(texto);
        }
    } else {
        
    }

})