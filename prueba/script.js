/* =====================================================
   BASE DE DATOS TEMPORAL DE PROPIEDADES
===================================================== */

const propiedades = [

    {
        id: 1,
        operacion: "comprar",
        tipo: "casa",

        precio: 2500000,

        ubicacion: "Zona 15, Ciudad de Guatemala",

        habitaciones: 3,
        banos: 3,
        area: 430,

        imagen: "./casa1.webp"
    },


    {
        id: 2,
        operacion: "rentar",
        tipo: "apartamento",

        precio: 21000,

        ubicacion: "Zona 10, Ciudad de Guatemala",

        habitaciones: 3,
        banos: 3.5,
        area: 340,

        imagen: "./casa2.jpg"
    },


    {
        id: 3,
        operacion: "comprar",
        tipo: "casa",

        precio: 3800000,

        ubicacion: "Carretera a El Salvador",

        habitaciones: 4,
        banos: 4,
        area: 350,

        imagen: "./casa3.jpg"
    }

];



/* =====================================================
   ELEMENTOS DEL HTML
===================================================== */

const contenedor =
    document.getElementById("contenedorPropiedades");

const paginacion =
    document.getElementById("paginacion");

const cantidadResultados =
    document.getElementById("cantidadResultados");


const botonFiltros =
    document.getElementById("aplicarFiltros");

const precioMin =
    document.getElementById("precioMin");

const precioMax =
    document.getElementById("precioMax");

const filtroHabitaciones =
    document.getElementById("filtroHabitaciones");

const filtroBanos =
    document.getElementById("filtroBanos");

const ordenPropiedades =
    document.getElementById("ordenPropiedades");



/* =====================================================
   CONFIGURACIÓN
===================================================== */

const PROPIEDADES_POR_PAGINA = 10;

let paginaActual = 1;

let propiedadesFiltradas = [...propiedades];



/* =====================================================
   MOSTRAR PROPIEDADES
===================================================== */

function mostrarPropiedades() {

    /* Evita errores si script.js se carga
       también en index.html o propiedad.html */

    if (
        !contenedor ||
        !paginacion ||
        !cantidadResultados
    ) {
        return;
    }


    contenedor.innerHTML = "";


    /* -----------------------------------------
       CALCULAR PROPIEDADES DE ESTA PÁGINA
    ----------------------------------------- */

    const inicio =
        (paginaActual - 1) *
        PROPIEDADES_POR_PAGINA;


    const final =
        inicio +
        PROPIEDADES_POR_PAGINA;


    const propiedadesPagina =
        propiedadesFiltradas.slice(
            inicio,
            final
        );


    /* -----------------------------------------
       CANTIDAD DE RESULTADOS
    ----------------------------------------- */

    cantidadResultados.textContent =
        `${propiedadesFiltradas.length} ${
            propiedadesFiltradas.length === 1
                ? "propiedad encontrada"
                : "propiedades encontradas"
        }`;


    /* -----------------------------------------
       SI NO HAY RESULTADOS
    ----------------------------------------- */

    if (propiedadesPagina.length === 0) {

        contenedor.innerHTML = `

            <div class="sin-resultados">

                <h3>
                    No encontramos propiedades
                </h3>

                <p>
                    Intenta cambiar los filtros de búsqueda.
                </p>

            </div>
        `;

        paginacion.innerHTML = "";

        return;
    }



    /* -----------------------------------------
       CREAR CADA TARJETA
    ----------------------------------------- */

    propiedadesPagina.forEach(propiedad => {


        /* CREAR TARJETA */

        const card =
            document.createElement("article");


        card.classList.add(
            "catalogo-card"
        );


        /* -------------------------------------
           CLICK EN TARJETA
        ------------------------------------- */

        card.addEventListener(
            "click",
            () => {

                window.location.href =
                    `propiedad.html?id=${propiedad.id}`;

            }
        );


        /* -------------------------------------
           PRECIO
        ------------------------------------- */

        let precioTexto;


        if (
            propiedad.operacion === "rentar"
        ) {

            precioTexto =
                `Q${propiedad.precio.toLocaleString("es-GT")} / mes`;

        } else {

            precioTexto =
                `Q${propiedad.precio.toLocaleString("es-GT")}`;

        }



        /* -------------------------------------
           HTML DE TARJETA
        ------------------------------------- */

        card.innerHTML = `

            <div class="catalogo-imagen">

                <span class="catalogo-etiqueta">

                    ${
                        propiedad.operacion ===
                        "comprar"

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


                    <!-- HABITACIONES -->

                    <span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >

                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            />

                            <path
                                d="M5 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
                            />

                            <path
                                d="M22 17v-3h-20"
                            />

                            <path
                                d="M2 8v9"
                            />

                            <path
                                d="M12 14h10v-2a3 3 0 0 0 -3 -3h-7v5"
                            />

                        </svg>

                        ${propiedad.habitaciones}

                    </span>



                    <!-- BAÑOS -->

                    <span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >

                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            />

                            <path
                                d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4v-3a1 1 0 0 1 1 -1"
                            />

                            <path
                                d="M6 12v-7a2 2 0 0 1 2 -2h3v2.25"
                            />

                            <path
                                d="M4 21l1 -1.5"
                            />

                            <path
                                d="M20 21l-1 -1.5"
                            />

                        </svg>

                        ${propiedad.banos}

                    </span>



                    <!-- ÁREA -->

                    <span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >

                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            />

                            <path
                                d="M5 4h14a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-7a1 1 0 0 0 -1 1v7a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1"
                            />

                            <path d="M4 8l2 0" />
                            <path d="M4 12l3 0" />
                            <path d="M4 16l2 0" />

                            <path d="M8 4l0 2" />
                            <path d="M12 4l0 3" />
                            <path d="M16 4l0 2" />

                        </svg>

                        ${propiedad.area} m²

                    </span>


                </div>

            </div>

        `;



        /* MOSTRAR TARJETA */

        contenedor.appendChild(card);

    });



    /* CREAR PAGINACIÓN */

    crearPaginacion();

}



/* =====================================================
   PAGINACIÓN
===================================================== */

function crearPaginacion() {

    if (!paginacion) {
        return;
    }


    paginacion.innerHTML = "";


    const totalPaginas =
        Math.ceil(
            propiedadesFiltradas.length /
            PROPIEDADES_POR_PAGINA
        );


    /* Si hay 10 propiedades o menos,
       no necesitamos botones */

    if (totalPaginas <= 1) {
        return;
    }



    /* -----------------------------------------
       BOTÓN ANTERIOR
    ----------------------------------------- */

    const anterior =
        document.createElement("button");


    anterior.textContent = "←";


    anterior.disabled =
        paginaActual === 1;


    anterior.addEventListener(
        "click",
        () => {

            if (paginaActual > 1) {

                paginaActual--;

                mostrarPropiedades();

                subirAlCatalogo();

            }

        }
    );


    paginacion.appendChild(anterior);



    /* -----------------------------------------
       NÚMEROS DE PÁGINA
    ----------------------------------------- */

    for (
        let i = 1;
        i <= totalPaginas;
        i++
    ) {

        const boton =
            document.createElement("button");


        boton.textContent = i;


        if (i === paginaActual) {

            boton.classList.add(
                "activa"
            );

        }


        boton.addEventListener(
            "click",
            () => {

                paginaActual = i;

                mostrarPropiedades();

                subirAlCatalogo();

            }
        );


        paginacion.appendChild(boton);

    }



    /* -----------------------------------------
       BOTÓN SIGUIENTE
    ----------------------------------------- */

    const siguiente =
        document.createElement("button");


    siguiente.textContent = "→";


    siguiente.disabled =
        paginaActual === totalPaginas;


    siguiente.addEventListener(
        "click",
        () => {

            if (
                paginaActual <
                totalPaginas
            ) {

                paginaActual++;

                mostrarPropiedades();

                subirAlCatalogo();

            }

        }
    );


    paginacion.appendChild(siguiente);

}



/* =====================================================
   SUBIR AL LISTADO AL CAMBIAR DE PÁGINA
===================================================== */

function subirAlCatalogo() {

    const listado =
        document.querySelector(
            ".listado-propiedades"
        );


    if (listado) {

        listado.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}



/* =====================================================
   APLICAR FILTROS
===================================================== */

function aplicarFiltros() {

    propiedadesFiltradas =
        propiedades.filter(
            propiedad => {


                /* ------------------------------
                   PRECIO MÍNIMO
                ------------------------------ */

                const minimo =
                    Number(
                        precioMin?.value
                    ) || 0;



                /* ------------------------------
                   PRECIO MÁXIMO
                ------------------------------ */

                const maximo =
                    Number(
                        precioMax?.value
                    ) || Infinity;



                /* ------------------------------
                   HABITACIONES
                ------------------------------ */

                const habitaciones =
                    Number(
                        filtroHabitaciones?.value
                    ) || 0;



                /* ------------------------------
                   BAÑOS
                ------------------------------ */

                const banos =
                    Number(
                        filtroBanos?.value
                    ) || 0;



                /* ------------------------------
                   TIPOS SELECCIONADOS
                ------------------------------ */

                const tiposSeleccionados =
                    [
                        ...document.querySelectorAll(
                            'input[name="tipo"]:checked'
                        )
                    ].map(
                        input => input.value
                    );



                /* ------------------------------
                   OPERACIONES SELECCIONADAS
                ------------------------------ */

                const operacionesSeleccionadas =
                    [
                        ...document.querySelectorAll(
                            'input[name="operacion"]:checked'
                        )
                    ].map(
                        input => input.value
                    );



                /* ------------------------------
                   COMPROBAR FILTROS
                ------------------------------ */

                const cumplePrecio =
                    propiedad.precio >= minimo &&
                    propiedad.precio <= maximo;


                const cumpleHabitaciones =
                    propiedad.habitaciones >=
                    habitaciones;


                const cumpleBanos =
                    propiedad.banos >=
                    banos;


                const cumpleTipo =
                    tiposSeleccionados.length === 0 ||
                    tiposSeleccionados.includes(
                        propiedad.tipo
                    );


                const cumpleOperacion =
                    operacionesSeleccionadas.length === 0 ||
                    operacionesSeleccionadas.includes(
                        propiedad.operacion
                    );


                return (
                    cumplePrecio &&
                    cumpleHabitaciones &&
                    cumpleBanos &&
                    cumpleTipo &&
                    cumpleOperacion
                );

            }
        );


    paginaActual = 1;


    ordenarLista();


    mostrarPropiedades();

}



/* =====================================================
   ORDENAR
===================================================== */

function ordenarLista() {

    if (!ordenPropiedades) {
        return;
    }


    const orden =
        ordenPropiedades.value;



    /* MÁS RECIENTES */

    if (orden === "recientes") {

        propiedadesFiltradas.sort(
            (a, b) =>
                b.id - a.id
        );

    }



    /* PRECIO MENOR A MAYOR */

    if (
        orden === "precio-menor"
    ) {

        propiedadesFiltradas.sort(
            (a, b) =>
                a.precio - b.precio
        );

    }



    /* PRECIO MAYOR A MENOR */

    if (
        orden === "precio-mayor"
    ) {

        propiedadesFiltradas.sort(
            (a, b) =>
                b.precio - a.precio
        );

    }

}



/* =====================================================
   EVENTOS
===================================================== */


/* APLICAR FILTROS */

if (botonFiltros) {

    botonFiltros.addEventListener(
        "click",
        aplicarFiltros
    );

}



/* CAMBIAR ORDEN */

if (ordenPropiedades) {

    ordenPropiedades.addEventListener(
        "change",
        () => {

            ordenarLista();

            paginaActual = 1;

            mostrarPropiedades();

        }
    );

}



/* =====================================================
   MOSTRAR TODO AL CARGAR
===================================================== */

if (
    contenedor &&
    paginacion &&
    cantidadResultados
) {

    ordenarLista();

    mostrarPropiedades();

}







// ==========================================
// ANIMACIÓN DE LA CASA
// Frames 050 - 274
// ==========================================

gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("houseCanvas");
const ctx = canvas.getContext("2d");

const firstFrame = 50;
const lastFrame = 274;

const frameCount = lastFrame - firstFrame + 1;

const images = [];

const animation = {
    frame: 0
};


// ==========================================
// CARGAR FRAMES
// ==========================================

for (let i = firstFrame; i <= lastFrame; i++) {

    const img = new Image();

    img.src = `../frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

    images.push(img);
}

// ==========================================
// CANVAS
// ==========================================

function resizeCanvas() {

    const dpr = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    render();
}

window.addEventListener("resize", resizeCanvas);


// ==========================================
// DIBUJAR FRAME
// ==========================================

function render() {

    const img = images[Math.round(animation.frame)];

    if (!img || !img.complete || !img.naturalWidth) {
        return;
    }

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    const imageRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let width;
    let height;

    if (canvasRatio > imageRatio) {

        width = canvasWidth;
        height = width / imageRatio;

    } else {

        height = canvasHeight;
        width = height * imageRatio;

    }

    const x = (canvasWidth - width) / 2;
    const y = (canvasHeight - height) / 2;

    ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );

    ctx.drawImage(
        img,
        x,
        y,
        width,
        height
    );
}


// ==========================================
// PRIMER FRAME
// ==========================================

images[0].onload = function () {

    resizeCanvas();

    render();

};


// ==========================================
// SCROLL → FRAMES
// ==========================================

gsap.to(animation, {

    frame: frameCount - 1,

    ease: "none",

    snap: "frame",

    scrollTrigger: {

        trigger: ".house-animation",

        start: "top top",

        end: "bottom bottom",

        scrub: 0.5,

        markers: false

    },

    onUpdate: render

});
