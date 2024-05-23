let btnEliminar = document.querySelector("btn-eliminar");
let btnEditar = document.querySelector("btn-editar");
let btnAgregar = document.querySelector("btn-Agregar");
let cargarTabla;

let pedirData = async () => {
    let URL = 'http://localhost:5124/api/Usuarios';
    const respuesta = await fetch(URL);
    const datos = await respuesta.json();
    console.log(datos);
    return datos;
}

//carga de datos en tabla
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#tbody')
    cargarTabla = async () => {
        tableBody.innerHTML = '';
        let datos = await pedirData();
        datosActuales = datos;
        const elementos = datos.map(
            elemento => `
            <tr>
            <td>${elemento.id}</td>
            <td>${elemento.nombres}</td>
            <td>${elemento.nombreUsuario}</td>
            <td>
                <button id="${elemento.id}" onclick=eliminar(this) class="btn btn-danger">Eliminar</button>
                <button id="${elemento.id}" onclick=editar(this) class="btn btn-primary">Editar</button>
            </td>
        </tr>`
        ).join('');

        tableBody.insertAdjacentHTML('beforebegin', elementos);
    }
    cargarTabla()
})


function eliminar(btn) {
    Swal.fire({
        title: "Estas seguro?",
        text: "No podras revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarUsuario(btn);
            Swal.fire({
                title: "Eliminado!",
                text: "El usuario ha sido eliminado.",
                icon: "success"
            });
        }
        // location.reload();
    });

    function eliminarUsuario(btn) {
        var url = "http://localhost:7173/api/Usuarios/" + btn.id;
        var options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ocurrió un problema al eliminar el usuario.');
                }
                return response.json();
            })
            .then(data => {
                console.log('El usuario fue eliminado exitosamente:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function editar(btn) {
    Swal.fire({
        title: "Actualizar información de usuario",
        html:
            `<input id="newName" class="swal2-input" placeholder="Nuevo nombre" autofocus>
           <input id="newUsername" class="swal2-input" placeholder="Nuevo nombre de usuario">`,
        focusConfirm: false,
        preConfirm: async () => {
            Nombres = document.getElementById('newName').value;
            NombreUsuario = document.getElementById('newUsername').value;
            try {
                const apiUrl = `http://localhost:5124/api/Usuarios/${btn.id}`;
                const response = await fetch(apiUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Nombres, NombreUsuario })
                });
                if (!response.ok) {
                    throw new Error(JSON.stringify(await response.json()));
                }
                return {
                    Nombres, NombreUsuario
                };
            } catch (error) {
                Swal.showValidationMessage(`Error al actualizar el usuario: ${error}`);
            }
        },
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            const { Nombres, NombreUsuario } = result.value;
            Swal.fire({
                title: `Usuario actualizado`,
                html: `
              <p>Nombre actualizado: ${Nombres}</p>
              <p>Nombre de usuario actualizado: ${NombreUsuario}</p>
            `
            })
        }
        location.reload();
    });
}

function agregar(btn) {
    Swal.fire({
        title: "Agregar nuevo usuario",
        html:
            `<input id="newName" class="swal2-input" placeholder="Nuevo nombre" autofocus>
           <input id="newUsername" class="swal2-input" placeholder="Nuevo nombre de usuario">
           <input type="password" id="newPassword" class="swal2-input" placeholder="Nueva contraseña">
           <input type="password" id="confirmPassword" class="swal2-input" placeholder="Repetir contraseña">`,
        focusConfirm: false,
        preConfirm: async () => {
            const Nombres = document.getElementById('newName').value;
            const NombreUsuario = document.getElementById('newUsername').value;
            const ClaveHash = document.getElementById('newPassword').value;
            const ConfirmClaveHash = document.getElementById('confirmPassword').value;

            // Validar que las contraseñas coincidan
            if (ClaveHash !== ConfirmClaveHash) {
                Swal.showValidationMessage('Las contraseñas no coinciden');
                return false;
            }

            try {
                const apiUrl = "http://localhost:5124/api/Usuarios/registro";
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Nombres, NombreUsuario, ClaveHash })
                });
                if (!response.ok) {
                    throw new Error(JSON.stringify(await response.json()));
                }
                return {
                    Nombres,
                    NombreUsuario
                };
            } catch (error) {
                Swal.showValidationMessage(`Error al agregar el usuario: ${error}`);
            }
        },
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            const { Nombres, NombreUsuario } = result.value;
            Swal.fire({
                title: `Usuario agregado`,
                html: `
              <p>Nombre: ${Nombres}</p>
              <p>Nombre de usuario: ${NombreUsuario}</p>
            `
            });
        }
        location.reload();
    });
}