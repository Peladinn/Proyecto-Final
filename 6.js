// elementos del HTML
let divPersonajes = document.getElementById('personajes');
    // botones filtro
let botonFiltroTodo = document.getElementById('filtroTodo');
let botonFiltroMujer = document.getElementById('filtroMujer');
let botonFiltroHombre = document.getElementById('filtroHombre');
let botonFiltroUnknown = document.getElementById('filtroUnknown');
let botonFiltroGenderless = document.getElementById('filtroGenderless');
    // botones Paginado
let botonPrimeraPagina = document.getElementById('primeraPagina');
let botonAnteriorPagina = document.getElementById("anterior");
let botonSiguientePagina = document.getElementById("siguiente");
let botonUltimaPagina = document.getElementById('ultimaPagina'); 

let SpanCantPersonajes = document.getElementById('CanPersonajes');

let spanPagActual = document.getElementById('pagActual');

let totalPersonajes;
let paginaActual=1;

// funcion para mostrar los personajes en el html
function mostrarEnElHtml (arrPersonajes) {
    let NumeroPersonajes = arrPersonajes.length
    SpanCantPersonajes.innerText = NumeroPersonajes

    spanPagActual.innerText = paginaActual

    // estamos limpiando lo que habia antes en el div
    divPersonajes.innerHTML='';
    // ahora le agregamos los personajes nuevos que queres mostrar
    arrPersonajes.forEach((itemPersonaje)=>{
        divPersonajes.innerHTML+=` <div class="personaje">
                                        <img src=${itemPersonaje.image}>
                                        <div class="div">
                                        <h3>Nombre: ${itemPersonaje.name}</h3>
                                        <p>Genero: ${itemPersonaje.gender}</p>
                                        <p>Especie: ${itemPersonaje.species}</p>
                                        <p>Estado: ${itemPersonaje.status}</p>
                                        <p>Origen: ${itemPersonaje.origin.name}</p>
                                        <p>Locacion: ${itemPersonaje.location.name}</p>
                                        </div>
                                    </div>`
    })
    disablePageBtns();
}



function pedidoFetch (pagina) {
    fetch('https://rickandmortyapi.com/api/character/?page='+pagina)
    .then((data)=>{
        return data.json();
    }).then((data)=>{
        totalPersonajes = data.results;
        mostrarEnElHtml(totalPersonajes);
    })
};

pedidoFetch(paginaActual);

//FILTROS
function filtroMujer () {
    let mujeres = totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender==='Female';
    });
    mostrarEnElHtml(mujeres);
};

function filtroHombre () {
    let hombres = totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender==='Male'
    });
    mostrarEnElHtml(hombres);
}

function filtroUnknown () {
    let unknown = totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender==='unknown'
    });
    mostrarEnElHtml(unknown);
};

function filtroGenderless () {
    let Genderless = totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender==='genderless'
    });
    mostrarEnElHtml(Genderless);
}

function filtroTodo () {
    mostrarEnElHtml(totalPersonajes);
}

// EVENTOS
botonFiltroMujer.addEventListener('click',filtroMujer);
botonFiltroHombre.addEventListener('click',filtroHombre);
botonFiltroTodo.addEventListener('click',filtroTodo);
botonFiltroUnknown.addEventListener('click',filtroUnknown);
botonFiltroGenderless.addEventListener('click',filtroGenderless);



// PAGINADO
function siguientePagina () {
    paginaActual++;
    pedidoFetch(paginaActual);
};

function anteriorPagina () {
    paginaActual--;
    pedidoFetch(paginaActual);
    // console.log(paginaActual)
};

function primeraPagina () {
    paginaActual=1;
    pedidoFetch(1)
     //console.log(paginaActual)
}

// 42 paginas
function ultimaPagina () {
    paginaActual=42;
    pedidoFetch(paginaActual);
     //console.log(paginaActual)
}
let disablePageBtns = () => {
    if(paginaActual <= 1){
        botonPrimeraPagina.disabled = true
        botonAnteriorPagina.disabled = true
    } else {
        botonPrimeraPagina.disabled = false
        botonAnteriorPagina.disabled = false
    }

    if(paginaActual >= 42){
        botonUltimaPagina.disabled = true
        botonSiguientePagina.disabled = true
    } else {
        botonUltimaPagina.disabled = false
        botonSiguientePagina.disabled = false
    }

}

botonSiguientePagina.addEventListener('click',siguientePagina);
botonAnteriorPagina.addEventListener('click',anteriorPagina);
botonPrimeraPagina.addEventListener('click',primeraPagina);
botonUltimaPagina.addEventListener('click', ultimaPagina)