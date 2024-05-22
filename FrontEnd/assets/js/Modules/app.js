const listaSorteos = document.querySelector('.lista-sorteos');
let obtenerSorteos = async () => {
    const url = `http://localhost:5101/api/Sorteo`;
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log('carga de datos exitosa');
        return result;
    } catch (error) {
        console.error('carga de datos fallida: ' + error);
    }
}

async function mostrarSorteos() {
    let sorteosData = await obtenerSorteos();
    const sorteos = sorteosData.map(
        sorteo =>
            `<div class="card">
                <div class="head">
                    <div>
                        <h2>${sorteo.nombre}</h2>
                        <p>Sorteo ID: ${sorteo.id}</p>
                    </div>
                    <i class='bx bx-trending-up icon'></i>
                </div>
                <p>Premios: ${sorteo.premios}</p>
                <p>Condiciones: ${sorteo.condiciones}</p>
                <p>Fecha de Inicio: ${sorteo.fechaInicio}</p>
                <button class="btn-inscribirse" data-sorteo-id="${sorteo.id}">Inscripción</button>
            </div>`).join('');

    listaSorteos.innerHTML = '';
    listaSorteos.insertAdjacentHTML("beforeend", sorteos);

    const botonesInscribirse = document.querySelectorAll(".btn-inscribirse");
    botonesInscribirse.forEach(boton => {
        boton.addEventListener("click", async () => {
            const sorteoId = boton.dataset.sorteoId;
            // Aquí puedes llamar a una función para manejar la inscripción en el sorteo
            await usuarioHaSubidoDocumento(sorteoId);
        });
    });
}

async function usuarioHaSubidoDocumento(sorteoId) {
    const correoElectronico = localStorage.getItem("correoElectronico");

    if (!correoElectronico) {
        window.alert("Sesión no válida");
        return false;
    } else {
        const endpointUrl = `http://localhost:5101/api/Usuarios/existeImagen/${correoElectronico}`;

        try {
            const response = await fetch(endpointUrl);
            console.log(response);
            if (!response.ok) {
                new Error("El servidor no respondió correctamente");
                mostrarFormularioDocumentoIdentidad();
            }else{
                inscribirUsuario(sorteoId);
            }

            const data = await response.json();

            if (data.tieneImagenDocumento) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un error al verificar si el usuario ha subido el documento");
            return false;
        }
    }
}

function mostrarFormularioDocumentoIdentidad() {
    // Redireccionar a la página de carga de documento de identidad
    window.location.href = 'pages/inscripcionForm.html';
}

function inscribirUsuario(sorteoId) {
    const correoElectronico = localStorage.getItem('correoElectronico');

    console.log(correoElectronico);
    console.log(sorteoId);

    if (!correoElectronico || !sorteoId) {
        alert('Error: Datos insuficientes para realizar la inscripción.');
        return;
    }

    // Crear objeto de datos para enviar al servidor
    const data = {
        CorreoElectronico: correoElectronico,
        SorteoId: sorteoId
    };

    // Endpoint de inscripción del usuario
    const endpointUrl = "http://localhost:5101/api/Inscripciones/inscribir";

    // Realizar la solicitud al servidor
    fetch(endpointUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al inscribir al usuario.');
            }
            return response.json();
        })
        .then(data => {
            // Si la inscripción es exitosa, mostrar mensaje y redireccionar
            alert('¡Usuario inscrito exitosamente!');
            window.location.href = 'index.html'; // Redireccionar a la página principal
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error: No se pudo inscribir al usuario.');
        });
}


mostrarSorteos();

export default mostrarSorteos();