document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sign-up").addEventListener("click", function (event) {
        event.preventDefault();
        var nombres = document.getElementById("nombres").value;
        var nombreUsuario = document.getElementById("nombre-usuario").value;
        var passwordConfirm = document.getElementById("password").value;
        var password = document.getElementById("password").value;

        if (password !== passwordConfirm) {
            window.alert("Las contraseñas no coinciden");
        } else {
            var data = {
                Nombres: nombres,
                NombreUsuario: nombreUsuario,
                ClaveHash: password
            };
        }
        if (nombreUsuario == "" || password == "" || passwordConfirm == "" || nombres == "") {
            window.alert("No se admiten campos vacios")
        } else {
            const endpointUrl = "http://localhost:5124/api/Usuarios/registro";
            fetch(endpointUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => {
                    console.log(response);
                    if (response.status === 201) {
                        window.location.href = "/FrontEnd/Pages/sign-in.html";
                        localStorage.setItem('nombreUsuario', nombreUsuario);
                    } else if (response.status === 400) {
                        window.alert("El usuario ya está registrado")
                        throw new Error('El usuario ya está registrado');
                    } else {
                        window.alert("Campos no validos")
                        throw new Error('Error al registrar usuario');
                    }
                })
                .catch(error => {
                    alert(error.message);
                });
        }
    });
});