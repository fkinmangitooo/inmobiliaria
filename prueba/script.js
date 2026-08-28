const propiedades = [

    {
        id: 1,
        operacion: "comprar",
        tipo: "casa",

        precio: 2500000,

        ubicacion: "Zona 15, Ciudad de Guatemala",

        habitaciones: 4,
        banos: 3,
        area: 320,

        imagen: "./casa1.png"
    },


    {
        id: 2,
        operacion: "rentar",
        tipo: "apartamento",

        precio: 8500,

        ubicacion: "Zona 10, Ciudad de Guatemala",

        habitaciones: 2,
        banos: 2,
        area: 120,

        imagen: "./casa2.png"
    },


    {
        id: 3,
        operacion: "comprar",
        tipo: "casa",

        precio: 3800000,

        ubicacion: "Carretera a El Salvador",

        habitaciones: 4,
        banos: 4,
        area: 480,

        imagen: "./casa3.png"
    }

];

const contenedor =
    document.getElementById("contenedorPropiedades");

const paginacion =
    document.getElementById("paginacion");

const cantidadResultados =
    document.getElementById("cantidadResultados");


const PROPIEDADES_POR_PAGINA = 10;

let paginaActual = 1;

let propiedadesFiltradas = [...propiedades];

function mostrarPropiedades() {

    contenedor.innerHTML = "";


    const inicio =
        (paginaActual - 1) * PROPIEDADES_POR_PAGINA;


    const final =
        inicio + PROPIEDADES_POR_PAGINA;


    const propiedadesPagina =
        propiedadesFiltradas.slice(inicio, final);


    cantidadResultados.textContent =
        `${propiedadesFiltradas.length} propiedades encontradas`;


    propiedadesPagina.forEach(propiedad => {

        const card =
            document.createElement("article");


        card.classList.add("catalogo-card");


        let precioTexto;


        if (propiedad.operacion === "rentar") {

            precioTexto =
                `Q${propiedad.precio.toLocaleString()} / mes`;

        } else {

            precioTexto =
                `Q${propiedad.precio.toLocaleString()}`;
        }


        card.innerHTML = `

            <div class="catalogo-imagen">

                <span class="catalogo-etiqueta">

                    ${
                        propiedad.operacion === "comprar"
                        ? "VENTA"
                        : "RENTA"
                    }

                </span>


                <img
                    src="${propiedad.imagen}"
                    alt="${propiedad.tipo} en ${propiedad.ubicacion}"
                >

            </div>


            <div class="catalogo-info">

                <h3>
                    ${precioTexto}
                </h3>


                <p class="catalogo-ubicacion">
                    ${propiedad.ubicacion}
                </p>


                <div class="catalogo-datos">

                    <span>
                        🛏
                        ${propiedad.habitaciones}
                    </span>

                    <span>
                        🛁
                        ${propiedad.banos}
                    </span>

                    <span>
                        📐
                        ${propiedad.area} m²
                    </span>

                </div>

            </div>
        `;


        contenedor.appendChild(card);

    });


    crearPaginacion();
}

function crearPaginacion() {

    paginacion.innerHTML = "";


    const totalPaginas =
        Math.ceil(
            propiedadesFiltradas.length /
            PROPIEDADES_POR_PAGINA
        );


    /* Si solo existe una página,
       no mostramos paginación */

    if (totalPaginas <= 1) {
        return;
    }


    /* ANTERIOR */

    const anterior =
        document.createElement("button");

    anterior.textContent = "←";

    anterior.disabled =
        paginaActual === 1;


    anterior.addEventListener("click", () => {

        if (paginaActual > 1) {

            paginaActual--;

            mostrarPropiedades();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    });


    paginacion.appendChild(anterior);



    /* NÚMEROS */

    for (
        let i = 1;
        i <= totalPaginas;
        i++
    ) {

        const boton =
            document.createElement("button");


        boton.textContent = i;


        if (i === paginaActual) {

            boton.classList.add("activa");

        }


        boton.addEventListener("click", () => {

            paginaActual = i;

            mostrarPropiedades();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });


        paginacion.appendChild(boton);

    }



    /* SIGUIENTE */

    const siguiente =
        document.createElement("button");


    siguiente.textContent = "→";


    siguiente.disabled =
        paginaActual === totalPaginas;


    siguiente.addEventListener("click", () => {

        if (paginaActual < totalPaginas) {

            paginaActual++;

            mostrarPropiedades();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    });


    paginacion.appendChild(siguiente);

}

mostrarPropiedades();